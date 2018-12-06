# Manage Your Microservices
In this step of the tutorial we're ready to learn the basics of managing microservices inside our [Tutorial project](../tutorial/introduction.html).

## Basic Commands
The Agent daemon runs microservices on your edge nodes locally, but it is controlled remotely by the Controller. Let's learn some of the most common Controller commands you'll use.

To start, let's enter a shell into our locally running iofog-controller container:

```sh
docker exec -ti iofog-controller bash
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Production vs. Development</h3>
  <p>Throughout the rest of this tutorial remember that, while we're running our ioFog network entirely locally using Docker, in production it doesn't have to be--and probably won't. Your Controller and Connector will likely be running on cloud servers and your edge node devices in the wild will each be running their own Agent.</p>
</aside>

This tutorial includes 5 microservices already running. We can view any configured microservices with `microservice list`:

```sh
iofog-controller microservice list
```

This returns a JSON object containing the full list, along with their configuration. The most important microservices currently running are:

###### Sensors
A microservice that pretends to be reading data from a local hardware sensor. The data it produces is published with [the SDK](../writing-microservices/sdk.html) and routed through the [Connector](../connectors/overview.html) so that it can be read by other microservices.

[Source Code](https://github.com/ioFog/example-microservices/tree/master/sensors-data)

###### API
A generic microservice that provides a REST API web server, allowing access to any arbitrary data source connected using the Controller.

[Source Code](https://github.com/ioFog/example-microservices/tree/master/json-rest-api-cors-enabled)

###### Freeboard
Another generic web server microservice that provides an HTML dashboard to view the real-time results coming from the API data source.

## Routes
The Sensors and REST API microservices are generic; they are not hardcoded to talk with each other, instead the relationship dictating the flow of data was configured with the Controller. This is in the spirit of the microservice architecture, separating concerns into pieces so that you can combine and interchange them.

To connect microservices together, the Controller has the concept of **routes**.

```sh
iofog-controller microservice route --add \
  --source-microservice-id <source_id> \
  --dest-microservice-id <dest_id>
```

We can add or remove them with `microservice route --add` and `microservice route --remove` respectively, while passing in the source and destination microservice IDs. These IDs are returned when you start a microservice, but can also be obtained later from the result of `microservice list`.

From the result of `microservice list` we can see that a route has already been set up for us: the Sensors microservice has its destination (output) directed to the API microservice.

The unique ID for each microservice varies, so yours will be different:

```json
[{
  "uuid": "Y2MdFhj6Jndk4rpLzdrPhqLfnPm4KPCC",
  "config": "{}",
  "name": "Sensors",
  // ...
  "routes": [{
    "isNetworkConnection": true,
    "destMicroservice": {
      "uuid": "QBy9pkbyfJ4twGNfcgWwc9QqzCh7xBxv" // <--- Sensors directed to API
    }
  }]
}]
```

## Create Your First Microservice
Next up, we're going to create our very first microservice to run on ioFog. To make it easier, our tutorial provides examples in several languages.

You can also skip straight to learning about how to [Deploy Microservices](deploy-your-microservice.html) instead.

Pick your preferred language:

- [JavaScript (Node.js)](create-your-first-microservice-javascript.html)
