#!/usr/bin/env sh

CONTROLLER_HOST="http://localhost:51121/api/v3"
CONTROLLER_LOGIN="user@domain.com"
CONTROLLER_PASSWORD="#Bugs4Fun"

check_connector() {
    item=$(curl --request POST \
        --url http://localhost:53321/api/v2/status \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data mappingid=all)
    connectorStatus=$(echo $item | jq -r .status)
    
    if [ "$connectorStatus" != "running" ]; then
        echo "Connector container is not running"
        exit 1
    fi
}

check_controller() {
    item=$(curl --request GET --url $CONTROLLER_HOST/status)
    connectorStatus=$(echo $item | jq -r .status)
    
    if [ "$connectorStatus" != "online" ]; then
        echo "Controller container is not running"
        exit 1
    fi
}

if ! hash jq 2>/dev/null; then
    echo '"jq" command not found. Please install "jq" and try again.'
    exit 1
fi

check_connector
check_controller

controllerIp=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' iofog-controller)

item=$(curl --request POST \
    --url $CONTROLLER_HOST/user/login \
    --header 'Content-Type: application/json' \
    --data '{"email":"'"$CONTROLLER_LOGIN"'","password":"'"$CONTROLLER_PASSWORD"'"}')
token=$(echo $item | jq -r .accessToken)

catalog=$(curl -X GET \
    $CONTROLLER_HOST/catalog/microservices \
    --header "Authorization: $token" \
    --header 'Content-Type: application/json')
sensorsId=$(echo $catalog | jq -r '.catalogItems[] | select(.name == "Sensors") | .id')
if [ -z "$sensorsId" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/catalog/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"Sensors","category": "DEMO","publisher":"Edgeworx","registryId":1,"images":[{"containerImage":"iofog/sensors:latest","fogTypeId":1}]}')
    sensorsId=$(echo $item | jq -r .id)
fi
apiId=$(echo $catalog | jq -r '.catalogItems[] | select(.name == "Rest API") | .id')
if [ -z "$apiId" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/catalog/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"Rest API","category": "DEMO","publisher":"Edgeworx","registryId":1,"images":[{"containerImage":"iofog/freeboard-api:latest","fogTypeId":1}]}')
    apiId=$(echo $item | jq -r .id)
fi
freeboardId=$(echo $catalog | jq -r '.catalogItems[] | select(.name == "freeboard") | .id')
if [ -z "$freeboardId" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/catalog/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"freeboard","category": "DEMO","publisher":"Edgeworx","registryId":1,"images":[{"containerImage":"iofog/freeboard:latest","fogTypeId":1}]}')
    freeboardId=$(echo $item | jq -r .id)
fi

agent1="iofog-agent-tutorial-1"
agent2="iofog-agent-tutorial-2"
agents=$(curl --request GET \
    --url $CONTROLLER_HOST/iofog-list \
    --header "Authorization: $token" \
    --header 'Content-Type: application/json')
uuid1=$(echo $agents | jq -r '.fogs[] | select(.name == "'"$agent1"'") | .uuid')
uuid2=$(echo $agents | jq -r '.fogs[] | select(.name == "'"$agent2"'") | .uuid')
if [ -z "$uuid1" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/iofog \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name": "'"$agent1"'","fogType": 1}')
    uuid1=$(echo $item | jq -r .uuid)
fi
if [ -z "$uuid2" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/iofog \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name": "'"$agent2"'","fogType": 1}')
    uuid2=$(echo $item | jq -r .uuid)
fi

flows=$(curl -X GET \
    $CONTROLLER_HOST/flow \
    --header "Authorization: $token" \
    --header 'Content-Type: application/json')
flowId=$(echo $flows | jq -r '.flows[] | select(.name == "Flow") | .id')
if [ -z "$flowId" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/flow \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name": "Flow","isActivated":true}')
    flowId=$(echo $item | jq -r .id)
fi

microservices=$(curl -X GET \
    $CONTROLLER_HOST/microservices?flowId=$flowId \
    --header "Authorization: $token" \
    --header 'Content-Type: application/json')
apiUUID=$(echo $microservices | jq -r '.microservices[] | select(.name == "API") | .uuid')
if [ -z "$apiUUID" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"API","config":"{}","catalogItemId":'"$apiId"',"flowId":'"$flowId"',"iofogUuid":"'"$uuid2"'","rootHostAccess":false,"logSize":5,"volumeMappings":[],"ports":[{"internal":80,"external":10101,"publicMode":false}],"routes":[]}')
    apiUUID=$(echo $item | jq -r .uuid)
fi
sensorsUUID=$(echo $microservices | jq -r '.microservices[] | select(.name == "Sensors") | .uuid')
if [ -z "$sensorsUUID" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"Sensors","config":"{}","catalogItemId":'"$sensorsId"',"flowId":'"$flowId"',"iofogUuid":"'"$uuid1"'","rootHostAccess":false,"logSize":5,"volumeMappings":[],"ports":[],"routes":[]}')
    sensorsUUID=$(echo $item | jq -r .uuid)
    item=$(curl -X POST \
        --url "$CONTROLLER_HOST/microservices/$sensorsUUID/routes/$apiUUID" \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json')
fi
freeboardUUID=$(echo $microservices | jq -r '.microservices[] | select(.name == "freeboard") | .uuid')
if [ -z "$freeboardUUID" ]
then
    item=$(curl --request POST \
        --url $CONTROLLER_HOST/microservices \
        --header "Authorization: $token" \
        --header 'Content-Type: application/json' \
        --data '{"name":"freeboard","config":"{}","catalogItemId":'"$freeboardId"',"flowId":'"$flowId"',"iofogUuid":"'"$uuid2"'","rootHostAccess":false,"logSize":5,"volumeMappings":[],"ports":[{"internal":80,"external":10102,"publicMode":false}],"routes":[]}')
    freeboardUUID=$(echo $item | jq -r .uuid)
fi

docker inspect $agent1 > /dev/null 2>&1
if [ $? -eq 1 ]; then
    docker run -d --name $agent1 --env NODE_NAME=$agent1 --link iofog-controller:iofog-controller --privileged -v /var/run/docker.sock:/var/run/docker.sock iofog-agent > /dev/null 2>&1
fi

docker inspect $agent2 > /dev/null 2>&1
if [ $? -eq 1 ]; then
    docker run -d --name $agent2 --env NODE_NAME=$agent2 --link iofog-controller:iofog-controller --privileged -v /var/run/docker.sock:/var/run/docker.sock iofog-agent > /dev/null 2>&1
fi