# Manage Our Microservices

In this step of the tutorial we're ready to learn the basics of managing microservices inside our [Tutorial project](../tutorial/introduction.html).

## Basic Controller CLI Interactions

The Agent daemon runs microservices on our edge nodes locally, but it is controlled remotely by the Controller. Let's learn some of the most common Controller commands.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Production vs. Development</h3>
  <p>Throughout the rest of this tutorial remember that, while we're running our ioFog network entirely locally using Docker, in production it doesn't have to be--and probably won't. Our Controller and Connector will likely be running on cloud servers and our edge node devices in the wild will each be running their own Agent.</p>
</aside>

This tutorial includes 3 microservices already running. We can view any configured microservices using `iofogctl`:

```console
iofogctl get microservices

MICROSERVICE	STATUS		AGENT		CONFIG		ROUTES		VOLUMES		PORTS
Sensors		    RUNNING		local-agent	{}		    Rest API
Rest API	    RUNNING		local-agent	{}						            10101:80
Freeboard	    RUNNING		local-agent	{}						            10102:80


```

This returns a list of microservices along with their status, agent it is running on, configuration, routes, volume mapping and port mapping. The most important microservices currently running are:

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

Routes can be listed from the `iofogctl get microservices` or `iofogctl describe microservice <microservice_name>` commands. We can see that a route has already been set up for us: the Sensors microservice has its destination (output) directed to the REST API microservice.

```console
$ iofogctl describe microservice Sensors

name: Sensors
agent:
  name: local-agent
  config:
    dockerurl: unix:///var/run/docker.sock
    disklimit: 50
    diskdirectory: /var/lib/iofog-agent/
    memorylimit: 1024
    cpulimit: 80
    loglimit: 10
    logdirectory: /var/log/iofog-agent/
    logfilecount: 10
    statusfrequency: 30
    changefrequency: 60
    devicescanfrequency: 60
    bluetoothenabled: false
    watchdogenabled: false
    abstractedhardwareenabled: false
images:
  catalogid: 0
  x86: iofog/sensors:latest
  arm: ""
  registry: remote
config: {}
roothostaccess: false
ports: []
volumes: []
env: []
routes:
- Rest API
application: tutorial
```

We'll discover later on how to create and remove routes using iofogctl.

## Create Our First Microservice

Next up, we're going to create our very first microservice to run on ioFog.

[Continue To Next Step: Create Our First Microservice](create-our-first-microservice-javascript.html)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
