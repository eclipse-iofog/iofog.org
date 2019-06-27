# Deploy Our Microservice

In this step we'll learn how to deploy our newly created microservice to our ioFog tutorial environment.

## Register Our Docker Image

With our Docker image from the previous step in hand, it's time to publish it to a [Docker Registry](https://docs.docker.com/registry/).

While we can use a custom registry (or the public [Docker Hub](https://hub.docker.com/)), the Controller also comes with a built-in private registry that represents the local cache on the ioFog edge compute nodes.

To get a list of the container registries, we can use `registry list`:

```bash
docker exec -it iofog-controller iofog-controller registry list
```

We should see two registries. The first is [Docker Hub](https://hub.docker.com/) and the second is the built-in private registry, which we're going to use.

```json
{
  "id": 2,
  "url": "from_cache",
  "isPublic": true,
  "isSecure": true,
  "certificate": "",
  "requiresCert": false,
  "username": "",
  "userEmail": "",
  "userId": null
}
```

The unique ID for the built-in registry is always `2`.

Now that we have that registry ID, we can use it to add our Docker image to its catalog. We'll provide `iofog-tutorial/moving-average:v1` as the x86-image of our microservice:

```bash
$ docker exec -it iofog-controller \
    iofog-controller catalog add \
    --name "Moving Average" \
    --x86-image lkrcal/moving-average:v1 \
    --registry-id 2 \
    --user-id 1
```

This command will return a catalog ID that we'll use in the next step, which in this case is `105`.

## Add Our Microservice

Now that the Docker image containing our microservice code is registered, we can spin up new copies of it also using the Controller.

Instantiating a new microservice is done using the `microservice add` command. We need to provide several options and the most notable is the catalog ID we received in the previous section as well as a node UUID, which is the UUID of the edge node that this microservice should run on.

So let's find the UUID for the first Agent with the name "Agent 1":

```bash
docker exec -ti iofog-controller iofog-controller iofog list
```

In our case, the default agent has a UUID of `vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC`. Using that UUID together with the reference to the catalog, we can pass it and our other arguments to instantiate the microservice. This is also a great opportunity to include our custom config for our `maxWindowSize`.

```bash
docker exec -it iofog-controller \
    iofog-controller microservice add \
    --name "Moving Average" \
    --catalog-id 105 \
    --config '{ "maxWindowSize": 10 }' \
    --iofog-uuid vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC \
    --flow-id 1 \
    --user-id 1
```

This command will return the microservice UUID, which we'll then use in the next step to set up our routes. In our case, the returned UUID of the microservice is `ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23`.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Flow IDs</h3>
  <p>We provided <code class="language-text">--flow-id 1</code> because our tutorial environment already has a default "flow" setup. <a href="../controllers/cli-usage.html#flow">Learn more about flows</a>.</p>
</aside>

[View all CLI options](../controllers/cli-usage.html#microservice)

## Setup Our Routes

With the microservice UUID from the last step, let's change our routes so that our new microservice is placed between the Sensors and the REST API.

First, let's remove the old route from the Sensors to the REST API. We need to retrieve the microservice UUIDs for Sensors and the REST API:

```bash
docker exec -ti iofog-controller iofog-controller microservice list
```

An example output can look like the following. Note that although many attributes are not shown in this output, we can clearly see all the UUIDs and routes.

```json
{
  "microservices": [
    {
      "name": "Sensors",
      "uuid": "PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb",
      "catalogItemId": 102,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "routes": ["NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3"]
    },
    {
      "name": "Rest API",
      "uuid": "NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3",
      "catalogItemId": 103,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC"
    },
    {
      "name": "Freeboard",
      "uuid": "BrKHZf9PTcT6yjKcrpnRVBcYPFqxqXxb",
      "catalogItemId": 104,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC"
    },
    {
      "name": "Moving Average",
      "uuid": "ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23",
      "config": "{ \"maxWindowSize\": 10 }",
      "catalogItemId": 105,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC"
    }
  ]
}
```

After finding those two UUIDs in the list, provide the Sensors UUID and API UUID separated by a semicolon.

```bash
docker exec -ti iofog-controller \
    iofog-controller microservice route-remove \
        --route PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb:NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3
```

Now we need to place two new routes: one from the Sensors to Moving Average, and another from Moving Average to the REST API;\. The resulting message flow will then have our new microservice in between Sensors and the REST API microservices.

```bash
docker exec -ti iofog-controller \
    iofog-controller microservice route-create \
        --route PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb:ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23

docker exec -ti iofog-controller \
    iofog-controller microservice route-create \
        --route ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23:NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3
```

The new configuration of microservices should look like this:

```json
{
  "microservices": [
    {
      "name": "Sensors",
      "uuid": "PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb",
      "catalogItemId": 102,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "routes": ["ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23"]
    },
    {
      "name": "Rest API",
      "uuid": "NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3",
      "catalogItemId": 103,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC"
    },
    {
      "name": "Freeboard",
      "uuid": "BrKHZf9PTcT6yjKcrpnRVBcYPFqxqXxb",
      "catalogItemId": 104,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC"
    },
    {
      "name": "Moving Average",
      "uuid": "ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23",
      "config": "{ \"maxWindowSize\": 10 }",
      "catalogItemId": 105,
      "iofogUuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "routes": ["NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3"]
    }
  ]
}
```

Finally, the moment of truth! Let's first try a curl request to our REST API.

```bash
curl http://0.0.0.0:10101/
```

If everything is working correctly, the JSON returned should be our new moving averages and contain our `"isAverage": true` field we added.

We can also open up the [Freeboard dashboard](http://localhost:10102/?load=dashboard.json) to view the averaged values! Note that `?load=dashboard.json` in the URL loads a predefined dashboard for this tutorial. The dashboard definition is already part of the Freeboard container.

## Update a Microservice

Once a microservice is up and running, we will probably need to modify it later, which we can also do with the Controller.

The `microservice update` command is used to update a particular microservice. We can easily update the configuration of our Moving Average microservice.

```bash
docker exec -ti iofog-controller \
    iofog-controller microservice update \
        --microservice-uuid ydmtBFxJhxvVgLKfM2qLPj4KtcVgdg23 \
        --config '{ "maxWindowSize": 100 }'
```

[View all CLI options](../controllers/cli-usage.html#microservice)

## Conclusion

Congratulations! You've now have the fundamentals of ioFog. Once you're feeling more comfortable you can start setting up [ioFog in production](../getting-started/setup-your-controllers.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
