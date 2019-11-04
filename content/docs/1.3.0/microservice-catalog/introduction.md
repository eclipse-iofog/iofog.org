# Core concept

During the [Quickstart](/docs/1.3.0/getting-started/quick-start.html) and the [tutorial](/docs/1.3.0/tutorial/introduction.html), we specified the images to be used for each microservice, for each type of agent.

That was nice and easy, but what if you need to deploy the same code on a lot of agents ? You'd need to specify the images for each microservice. Wouldn't it be nice to have a way to specify the images to be used for each type of agent once for all, then reuse this configuration ?

That's where the Controller microservice catalog comes into play !

Each ioFog Controller comes with a built-in microservice catalog. You can see the list of preconfigured microservices images using `iofogctl`

```console
$ iofogctl get catalog

NAMESPACE
default

ID		NAME				            DESCRIPTION											                                            REGISTRY	X86					                ARM
4		Diagnostics			            0												                                                remote		iofog/diagnostics			        iofog/diagnostics-arm
5		Hello Web Demo			        A simple web server to test Eclipse ioFog.							                            remote		iofog/hello-web				        iofog/hello-web-arm
6		Open Weather Map Data		    A stream of data from the Open Weather Map API in JSON format					                remote		iofog/open-weather-map			    iofog/open-weather-map-arm
7		JSON REST API			        A configurable REST API that gives JSON output							                        remote		iofog/json-rest-api			        iofog/json-rest-api-arm
8		Temperature Converter		    A simple temperature format converter								                            remote		iofog/temperature-conversion		iofog/temperature-conversion-arm
9		JSON Sub-Select			        Performs sub-selection and transform operations on any JSON messages				            remote		iofog/json-subselect			    iofog/json-subselect-arm
10		Humidity Sensor Simulator	    Humidity Sensor Simulator for Eclipse ioFog							                            remote		iofog/humidity-sensor-simulator		iofog/humidity-sensor-simulator-arm
11		Seismic Sensor Simulator	    Seismic Sensor Simulator for Eclipse ioFog							                            remote		iofog/seismic-sensor-simulator		iofog/seismic-sensor-simulator-arm
12		Temperature Sensor Simulator	Temperature Sensor Simulator for Eclipse ioFog							                        remote		iofog/temperature-sensor-simulator	iofog/temperature-sensor-simulator-arm
13		Common Logging			        Container which gathers logs and provides REST API for adding and querying logs from containers	remote		iofog/common-logging			    iofog/common-logging-arm
14		JSON Generator			        Container generates ioMessages with contentdata as complex JSON object.				            remote		iofog/json-generator			    iofog/json-generator-arm

```

Instead of specifying the images for each agent type, you can use a catalog ID.

We can see that there is a `Hello Web Demo` catalog item that is configured with the `iofog/hello-web` image for x86 agents, and `iofog/hello-web-arm` for arm agents.

So, to deploy a microservice running those images, we can use the following yaml:

```yaml
$ echo "---
apiVersion: iofog.org/v1
kind: Microservice
metadata:
  name: Hello Web Microservice
spec:
  agent:
    name: agent-name
  images:
    catalogID: 5
  config: {}
  rootHostAccess: false
  ports: []
  volumes: []
  env: []
  routes: []
  application: my-application
" > ./hello-web-catalog.yaml

$ iofogctl deploy microservice -f hello-web-catalog.yaml
```

NB: This assumes you have an iofogctl stack running, with an agent called `agent-name` and an application called `my-application`

We can check that the expected images have been used by using iofogctl to describe our newly created microservice:

```yaml
$ iofogctl describe microservice 'Hello Web Microservice'

apiVersion: iofog.org/v1
kind: Microservice
metadata:
  name: Hello Web Microservice
spec:
  agent:
    name: agent-name
    config:
      dockerURL: unix:///var/run/docker.sock
      diskLimit: 50
      diskDirectory: /var/lib/iofog-agent/
      memoryLimit: 4096
      cpuLimit: 80
      logLimit: 10
      logDirectory: /var/log/iofog-agent/
      logFileCount: 10
      statusFrequency: 30
      changeFrequency: 60
      deviceScanFrequency: 60
      bluetoothEnabled: false
      watchdogEnabled: false
      abstractedHardwarEenabled: false
  images:
    catalogID: 5
    x86: iofog/hello-web
    arm: iofog/hello-web-arm
    registry: remote
  config: {}
  rootHostAccess: false
  ports: []
  volumes: []
  env: []
  application: my-application
```

## Create your own catalog items

You can also use iofogctl to create your own catalog items.

```console
$ iofogctl create catalogitem Postgresql --registry remote --x86 postgres:latest --arm postgres:latest --description 'Postgresql database'
```

```console
$ iofogctl get catalog | grep 'Postgresql'

15		Postgresql	Postgresql database		remote		postgres:latest			postgres:latest
```

We used grep to filter the ouput, but the columns are the same as above. You can now use the `images:catalogID` field set to 15 in order to deploy postgres databases on your agents.
