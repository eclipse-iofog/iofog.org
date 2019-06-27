# Manage Our Microservices

In this step of the tutorial we're ready to learn the basics of managing microservices inside our [Tutorial project](../tutorial/introduction.html).

## Basic Controller CLI Interactions

The Agent daemon runs microservices on our edge nodes locally, but it is controlled remotely by the Controller. Let's learn some of the most common Controller commands.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Production vs. Development</h3>
  <p>Throughout the rest of this tutorial remember that, while we're running our ioFog network entirely locally using Docker, in production it doesn't have to be--and probably won't. Our Controller and Connector will likely be running on cloud servers and our edge node devices in the wild will each be running their own Agent.</p>
</aside>

This tutorial includes 3 microservices already running. We can view any configured microservices using Controller CLI: `microservice list`.

```bash
docker exec -ti iofog-controller iofog-controller microservice list
```

This returns a JSON object containing the full list, along with their configuration. The most important microservices currently running are:

###### Tutorial Microservices

The tutorial consists of 3 microservices deployed on top of ioFog stack.

The _Sensors_ microservice pretends to be reading data from a local hardware sensor. The data it produces is published with [the SDK](../writing-microservices/sdk.html) and routed through the [Connector](../connectors/overview.html) to the REST API microservice, so that it can be read by other microservices that only understand REST API.

[Sensors microservice source code on Github](https://github.com/ioFog/example-microservices/tree/master/sensors-data)

The _REST API_ is a generic microservice that provides a REST API web server, allowing access to any arbitrary data source connected using the Controller.

[REST API microservice source code on Github](https://github.com/ioFog/example-microservices/tree/master/json-rest-api-cors-enabled)

_Freeboard_ is the last microservice that provides an HTML dashboard to view the real-time results coming from a rest API data source. In the case of our tutorial, the source of the data is our REST API microservice.

## Routes

The Sensors and REST API microservices are generic. They are not hardcoded to talk with each other, instead, the relationship dictating the flow of data was configured with the Controller. This is in the spirit of the microservice architecture, separating concerns into pieces so that we can combine and interchange them.

To connect microservices together, the Controller has the concept of routes.

Routes can be listed from the `microservice list` or `microservice info` commands. We can see that a route has already been set up for us: the Sensors microservice has its destination (output) directed to the REST API microservice.

We can add or remove them with `microservice route-create --route` and `microservice route-remove --route` respectively, while passing in the source and destination microservice UUIDs separated by a colon. These UUIDs are returned when we start a microservice, but can also be obtained later from the result of `microservice list`.

```bash
docker exec -ti iofog-controller \
    iofog-controller microservice route-create --route <source_uuid>:<dest_uuid>
```

The unique UUID for each microservice varies, so ours will be different. This is a sample output from `microservices list`, with a route to another microservice.

```json
 "microservices": [
    {
      "uuid": "PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb",
      "config": "{}",
      "name": "Sensors",
      "rootHostAccess": false,
      "logSize": 0,
      "delete": false,
      "deleteWithCleanup": false,
      "flowId": 1,
      "catalogItemId": 102,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "userId": 1,
      "ports": [],
      "volumeMappings": [],
      "routes": [
        "NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3"
      ]
    },
    {
      "uuid": "NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3",
      "config": "{}",
      "name": "Rest API",
      "rootHostAccess": false,
      "logSize": 0,
      "delete": false,
      "deleteWithCleanup": false,
      "flowId": 1,
      "catalogItemId": 103,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "userId": 1,
      "ports": [
        {
          "internal": 80,
          "external": 10101,
          "publicMode": false
        }
      ],
      "volumeMappings": [],
      "routes": []
    }
  ]
```

## Create Our First Microservice

Next up, we're going to create our very first microservice to run on ioFog.

[Continue To Next Step: Create Our First Microservice](create-our-first-microservice-javascript.html)
