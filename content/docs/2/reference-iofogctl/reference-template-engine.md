# Template engine for ioFog configuration

For every `yaml` configuration files and also for the corresponding controller API, the template parametric expression can be used for every string value attribute.

The engine in the background is [liquidjs](https://liquidjs.com/index.html), to see all the capabilities about filters and tags, see the documentation.

```yaml
---
apiVersion: iofog.org/v2
kind: Application  # What are we deploying
metadata:
  name: edai-smartbuilding-rules-engine # Application name

# Specifications of the application
spec:
  # List of microservices composing your application
  microservices:
    - name: rulesengine
      agent:
        name: agent-aismall01
        config: {}
      images:
        x86: nodered/node-red:latest
        arm: nodered/node-red:latest
        registry: remote
      config: {}
      container:
        rootHostAccess: false
        volumes: []
        ports:
          - internal: 1881
            external: 1882
        env:  
          - key: selfname
            value: "{{ self.name | upcase }}" # setting the application name to the microservice in uppercase
          - key: sharedToken
            value: "sekrittoken" # setting secret token once
          - key: http_proxy
            value: "http://myproxy.fr:8080/"  # setting corporate proxy once
          - key: https_proxy
            value: "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}" # get the https proxy from rulesengine ms and env http_proxy
    - name: ms2
      agent:
        name: agent-aismall01
        config: {}
      images:
        x86: XXX/img1
        arm: XXX/img2
        registry: remote
      config: {}
      container:
        rootHostAccess: false
        volumes: []
        ports:
          - internal: 1883
            external: 1884
        env:  
          - key: selfname
            value: "{{ self.name | upcase }}" # setting the application name to the microservice in uppercase
          - key: sharedToken
            value: "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\", \"sharedToken\" | first | map: \"value\" | first }}" # get the sharedToken from rulesengine ms and env sharedToken
          - key: http_proxy
            value: "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}" # get the http proxy from rulesengine ms and env http_proxy
          - key: https_proxy
            value: "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}" # get the https proxy from rulesengine ms and env http_proxy
          - key: rulesengineHOST
            value: "{%  assign curmsvc= self.microservices | where: \"name\", \"msvc-1\" | first %}{{ curmsvc | findAgent: agents | map: \"host\" }}"  # get the host where a microservice is running via agent
          - key: rulesenginePORT
            value: "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"ports\" | first | map: \"external\" | first }}"
          - key: redisHost # get host and port of a mciroservice
            value: "{% assign redismsvc = microservices | where: \"name\", \"redistest\" | first %}{{ redismsvc | findAgent: agents | map: \"host\"}}:{{ redismsvc | map: \"ports\" | first | first |map: \"external\" | first }}"
          - key: edgeResLiveness # Get edge resource endpoint for a specific version
            value: "{{ \"com.orange.smart-door\" | findEdgeResource: \"0.0.1\" | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"liveness\" | first | map: \"url\" }}"
          - key: edgeResVersion  # Get edge resource endpoint
            value: "{{ \"com.orange.smart-door\" | findEdgeResource            | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"version\" | first | map: \"url\" }}"
```

with controller API the same configuration looks like:

```json
{
    "name": "edai-smartbuilding-rules-engine",
    "isSystem": false,
    "description": "Description",
    "isActivated": true,
    "microservices": [
        {
            "name": "rulesengine",
            "config": "string",
            "images": [
                {
                    "containerImage": "nodered/node-red:latest",
                    "fogTypeId": 1
                },
                {
                    "containerImage": "nodered/node-red:latest",
                    "fogTypeId": 2
                }
            ],
            "registryId": 1,
            "application": "edai-smartbuilding-rules-engine",
            "iofogUuid": "node-id",
            "rootHostAccess": true,
            "logSize": 0,
            "volumeMappings": [],
            "ports": [
                {
                    "internal": 1881,
                    "external": 1882
                }
            ],
            "routes": [],
            "env": [
                { 
                    "key": "selfname",
                    "value": "{{ self.name | upcase }}"
                },
                {
                    "key": "sharedToken",
                    "value": "sekrittoken"
                },
                {
                    "key": "http_proxy",
                    "value": "http://myproxy:8080/"
                },
                {
                    "key": "https_proxy",
                    "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
                }
            ],
            "cmd": []
        },
        {
            "name": "ms2",
            "config": "string",
            "images": [
                {
                    "containerImage": " XXX/img1",
                    "fogTypeId": 1
                },
                {
                    "containerImage": " XXX/img2",
                    "fogTypeId": 2
                }
            ],
            "registryId": 1,
            "application": "edai-smartbuilding-rules-engine",
            "iofogUuid": "node-id",
            "rootHostAccess": true,
            "logSize": 0,
            "volumeMappings": [],
            "ports": [
                {
                    "internal": 1883,
                    "external": 1884
                }
            ],
            "routes": [],
            "env": [
                { 
                    "key": "selfname",
                    "value": "{{ self.name | upcase }}"
                },
                {
                    "key": "sharedToken",
                    "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\", \"sharedToken\" | first | map: \"value\" | first }}"
                },
                {
                    "key": "http_proxy",
                    "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
                },
                {
                    "key": "https_proxy",
                    "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
                },
                {
                    "key": "rulesengineHOST",
                    "value": "{%  assign curmsvc= self.microservices | where: \"name\", \"msvc-1\" | first %}{{ curmsvc | findAgent: agents | map: \"host\" }}"
                },
                {
                    "key": "rulesenginePORT",
                    "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"ports\" | first | map: \"external\" | first }}"
                },
                {
                    "key": "redisHost",
                    "value": "{% assign redismsvc = microservices | where: \"name\", \"redistest\" | first %}{{ redismsvc | findAgent: agents | map: \"host\"}}:{{ redismsvc | map: \"ports\" | first | first |map: \"external\" | first }}"
                },
                {
                    "key": "edgeResLiveness",
                    "value": "{{ \"com.orange.smart-door\" | findEdgeResource: \"0.0.1\" | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"liveness\" | first | map: \"url\" }}"
                },
                {
                    "key": "edgeResVersion",
                    "value": "{{ \"com.orange.smart-door\" | findEdgeResource            | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"version\" | first | map: \"url\" }}"
                }
            ],
            "cmd": []
        }
    ]
}
```

The context for scripting contains the variables:

| variable      | Description                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| self          | This is the current object. if deploying an application, this is the current description of the application.          |
| microservices | This is the list of the microservices deployed on the controller.                                                     |
| agents        | This is the list of agents deployed on the controller.                                                                |

The extra liquid filters available are:

| filter syntax                                                            | Description                                                                                                           |
| -----------------------------------------------------------------        | --------------------------------------------------------------------------------------------------------------------- |
| `agentName` \| findAgent: agents                                          | Give the agent of `agentName` in the `agents` list                                                                   |
| `resName` \| findEdgeResource or `resName` \| findEdgeResource: `version`| Give all the edge ressource of name `resName` or only `version` requested                                             |


## Caveats

The algoritmic operator of `liquidjs` or variable assignment have the scope on the processing string.

```yaml
---
....
          - key: testaffect
            value: "{% assign ms =self.microservices | where: \"name\", \"rulesengine\" | first %}{{ ms.env | where: \"key\" , \"http_proxy\" | first }}"
....
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/reference-iofogctl/reference-template-engine.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
