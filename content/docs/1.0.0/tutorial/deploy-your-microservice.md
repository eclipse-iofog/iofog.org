# Deploy Your Microservice

In this step we'll learn how to deploy our newly created microservice to our ioFog tutorial environment.

## Register Your Docker Image

With our Docker image from the previous step in hand, it's time to publish it to a [Docker Registry](https://docs.docker.com/registry/).

While you can use a custom registry (or the public [Docker Hub](https://hub.docker.com/)), the Controller also comes with a built-in private registry that represents the local cache on the ioFog edge compute nodes.

To get a list of the container registries, we can use `registry list`:

```sh
iofog-controller registry list
```

You should see two, the first being [Docker Hub](https://hub.docker.com/), but we're going to use the second one, which is the built-in private registry:

```json
{
  "id": 2,
  "url": "from_cache",
  "isPublic": true,
  "isSecure": true,
  "certificate": "",
  "requiresCert": false,
  "username": "",
  "password": "",
  "userEmail": "",
  "userId": null
}
```

The unique ID for the built-in registry is always `2`.

Now that we have that registry ID, we can use it to add our Docker image to its catalog. We'll provide `yourname/moving-average:v1` as the x86-image of our microservice:

```sh
# registry ID 2 is the internal private one provided by ioFog
iofog-controller catalog add \
  --name "Moving Average" \
  --x86-image yourname/moving-average:v1 \
  --registry-id 2 \
  --user-id 1
```

This command will return a catalog ID that we'll use in the next step.

## Add Your Microservice

Now that the Docker image containing our microservice code is registered, we can spin up new copies of it also using the Controller.

Instantiating a new microservice is done using the `microservice add` command. We need to provide several options, the most notable being the catalog ID we received in the previous section as well as a node UUID—which is the UUID of the edge node we want this microservice to run on.

So let's find the UUID for the first Agent with the name "Agent 1":

```sh
iofog-controller iofog list
```

Using that UUID, we can pass it and our other arguments to instantiate the microservice:

```sh
iofog-controller microservice add \
  --name "Moving Average 1" \
  --catalog-id <catalog_id> \
  --config '{ "maxWindowSize": 10 }' \
  --iofog-uuid <iofog_uuid> \
  --flow-id 1
```

This is also a great opportunity to include our custom config for our `maxWindowSize`.

This command will return the microservice UUID, which we'll then use in the next step to setup our routes.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Flow IDs</h3>
  <p>We provided <code class="language-text">--flow-id 1</code> because our tutorial environment already has a default "flow" setup. <a href="../controllers/cli-usage.html#flow">Learn more about flows</a>.</p>
</aside>

[View all CLI options](../controllers/cli-usage.html#microservice)

## Setup Our Routes

With the microservice UUID from the last step, let's change our routes so that our new microservice is placed between the Sensors and the REST API.

First, let's remove the old route from the Sensors to the REST API. We need to retrieve the microservice UUIDs for Sensors and the REST API:

```sh
iofog-controller microservice list
```

After finding those two UUIDs in the list, provide the Sensors UUID and API UUID separated by a semicolon to `microservice route-remove --route <source_uuid>:<dest_uuid>`:

```sh
# Note the semicolon between the two UUIDs!
iofog-controller microservice route-remove \
  --route <sensors_uuid>:<api_uuid>
```

Now we need to place two new routes: one from the Sensors to Moving Average, and another from Moving Average to the REST API; this places our new microservice in between them.

```sh
# Sensors -> Moving Average
iofog-controller microservice route-create \
  --route <sensors_uuid>:<moving_average_uuid>

# Moving Average -> REST API
iofog-controller microservice route-create \
  --route <moving_average_uuid>:<rest_api_uuid>
```

Finally, for the moment of truth. Let's first try a curl request to our REST API:

```sh
curl http://localhost:10101/
```

If everything is working correctly, the JSON returned should be our new moving averages and contain our `"isAverage": true` field we added.

We can also open up the [Freeboard dashboard](http://localhost:10102/?load=dashboard.json) to view the averaged values!

## Update a Microservice

Once a microservice is up and running you will probably need to modify it later, which we can also do with the Controller.

The `microservice update` command is used to update a particular microservice:

```sh
iofog-controller microservice update \
  --microservice-uuid <uuid> \
  --config '{ "maxWindowSize": 100 }' \
```

[View all CLI options](../controllers/cli-usage.html#microservice)

## Conclusion

Congratulations! You've now have the fundamentals of ioFog. Once you're feeling more comfortable you can create a blank [Development Environment](../gettings-started/quick-start.html) locally, or start setting up [ioFog in production](../getting-started/setup-your-controllers.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
