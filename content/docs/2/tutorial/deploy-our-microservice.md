# Deploy Our Microservice

In this step we'll learn how to deploy our newly created microservice to our ioFog tutorial environment.

Before deploying our new microservice, take a look at the current output of the Freeboard at <a href="http://localhost:10102/?load=dashboard.json" target="_blank">http://localhost:10102/?load=dashboard.json</a>

## Register Our Docker Image

With our Docker image from the previous step in hand, it's time to publish it to a [Docker Registry](https://docs.docker.com/registry/).

While we can use a custom registry (or the public [Docker Hub](https://hub.docker.com/)), the Controller also comes with a built-in private registry that represents the local cache on the ioFog edge compute nodes.

To get a list of the container registries, we can use `iofogctl get registries`

```bash
iofogctl get registries

NAMESPACE
default

ID              URL                     USERNAME        PRIVATE         SECURE
1               registry.hub.docker.com                 false           true
2               from_cache                              false           true
```

or the legacy Controller CLI `registry list` command:

```bash
iofogctl legacy controller local-controller registry list
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

The unique ID for the built-in registry is always `2`, and always `1` for Docker hub.

## Add Our Microservice

The Docker image containing our microservice code is registered with our local image cache. We can spin up new copies of it using the Controller through `iofogctl`.

If you spent some time looking around the folder structure, you might have noticed the file `init/tutorial/config.yaml`

```yaml
cat init/tutorial/config.yaml
---
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: tutorial
spec:
  microservices:
    - name: sensors
      agent:
        name: local-agent
      config: {}
      images:
        x86: iofog/sensors:latest
        registry: remote
      container:
        volumes: []
        ports: []
        env: []
    - name: rest-api
      agent:
        name: local-agent
      config: {}
      images:
        x86: iofog/freeboard-api:latest
        registry: remote
      container:
        volumes: []
        ports:
          - internal: 80
            external: 10101
        env: []
    - name: freeboard
      agent:
        name: local-agent
      config: {}
      images:
        x86: iofog/freeboard:latest
        registry: remote
      container:
        volumes: []
        ports:
          - internal: 80
            external: 10102
        env: []
  routes:
    - from: sensors
      to: rest-api
```

This yaml file has been used to describe to `iofogctl` what our set of microservices (application) should look like, and how they are configured. You can find a complete description of the YAML format [here](../reference-iofogctl/reference-application.html), but for now let's focus on the main parts.

- The file describes an application, named `tutorial`.
- It has 3 microservices.
- Each microservice runs on the agent named `local-agent`.
- Each microservice has its own docker image for x86 devices.
- Some microservices expose ports.
- There is a route from the `sensors` microservice to the `rest-api` microservice.

To add our new microservice, go ahead and edit this file by adding our new microservice to the list of microservices:

```yaml
---
- name: moving-average
  agent:
    name: local-agent
  config:
    maxWindowSize: 40
  images:
    x86: iofog-tutorial/moving-average:v1
    registry: local
  container:
    volumes: []
    ports: []
    env: []
```

It is very important to note that we are specifying `local` as the value for `images:registry` (instead of `remote` for the other microservices), this instructs the ioFog Agent to use its local cache, and not Docker hub.

## Setup Our Routes

Let's change our routes so that our new microservice is placed between the Sensors and the REST API.

Edit the `routes` section from the YAML file to the following.

```yaml
routes:
  - from: sensors
    to: moving-average
  - from: moving-average
    to: rest-api
```

Which will effectively create the following pipeline for our data `Sensor` -> `moving-average` -> `rest-api`

## Update the application

Now that our config YAML file is ready and describes the new state of our application, we can use `iofogctl` to deploy our application.

```bash
iofogctl deploy application -f init/tutorial/config.yaml
```

Verify that the application got updated as expected

```console
iofogctl get microservices

MICROSERVICE    STATUS    AGENT        ROUTES          VOLUMES  PORTS
rest-api	      RUNNING   local-agent	 10101:80
freeboard	      RUNNING   local-agent	 10102:80
moving-average  QUEUED    local-agent  rest-api
sensors         RUNNING   local-agent	 moving-average
```

It will take some time for the ioFog Agent to spin up the new microservice. You can monitor the status of our newly created microservice using `iofogctl get microservices`.

If you don't have access to the YAML file describing your application, you can always retrieve it using iofogctl and running: `iofogctl describe application APPLICATION_NAME [-o config.yaml]`

## Update a Microservice

Once a microservice is up and running, we will probably need to modify it later, which we can also do with the Controller.

You can either redeploy the entire application using the same steps we just did. Iofogctl is smart enough to only patch the required changes to an existing application.

But you can also directly deploy a microservice! First, let's use `iofogctl` to retrieve the microservice configuration for our `moving-average` microservice.

```console
iofogctl describe microservice moving-average -o moving-average.yaml && cat moving-average.yaml

apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: moving-average
  namespace: default
spec:
  uuid: H3cZ2LQ9hxyM6X7X6xV2q2w6mH3zp7Wc
  name: moving-average
  agent:
    name: local-agent
    config:
      dockerUrl: unix:///var/run/docker.sock
      diskLimit: 50
      diskDirectory: /var/lib/iofog-agent/
      memoryLimit: 1024
      cpuLimit: 80
      logLimit: 10
      logDirectory: /var/log/iofog-agent/
      logFileCount: 10
      statusFrequency: 30
      changeFrequency: 60
      deviceScanFrequency: 60
      bluetoothEnabled: false
      watchdogEnabled: false
      abstractedHardwareEnabled: false
  images:
    catalogId: 0
    x86: iofog-tutorial/moving-average:v1
    arm: ""
    registry: local
  config:
    maxWindowSize: 40
  container:
    rootHostAccess: false
    ports: []
    volumes: []
    env: []
  routes:
  - rest-api
  application: tutorial
```

You will notice a few minor changes compared to the description we provided when we deployed the microservice as part of our application:

- We now have an `application` field. This is required for iofogctl to know which application the microservice is part of.
- The microservice routes destinations are listed under a `routes` field.
- We have many more fields related to the required configuration of the ioFog Agent.

Find the complete yaml description [here](../reference-iofogctl/reference-application.html#microservice)

Now let's say we want to update the configuration of our microservice!

Go ahead and edit the newly created `moving-average.yaml` file, and update the `config` field (Warning: not the `agent:config`, but the root `config` field) to the following:

```yaml
config:
  maxWindowSize: 100
```

Then you can use iofogctl to deploy your microservice

```console
iofogctl deploy -f moving-average.yaml
```

And see the result with

```console
iofogctl get microservices

MICROSERVICE    STATUS   AGENT        ROUTES          VOLUMES  PORTS
rest-api        RUNNING  local-agent                           10101:80
freeboard       RUNNING  local-agent                           10102:80
moving-average  RUNNING  local-agent  rest-api
sensors         RUNNING  local-agent  moving-average

```

## Conclusion

Have a look at new output of the [Freeboard dashboard](http://localhost:10102/?load=dashboard.json). This should now display the values modified by moving average and look similar to this:
<img src="/images/Freeboard_2.png" style="max-width:100%;border-radius: 0.3em;margin: 35px 0;" />

The magic about microservices and ioFog is that none of those microservice is specifically designed or requires to work with the other microservice. Using ioFog, you can create smart and secure communication channels between independant microservices and easily manage a fleet of Edge devices and microservices.

Congratulations! You've now have the fundamentals of ioFog. Next, try developing Microservices on an ECN deployed on remote hosts. See this [guide](../platform-deployment/introduction.html) for deploying remotely.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/tutorial/deploy-our-microservice.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
