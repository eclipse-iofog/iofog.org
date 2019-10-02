# Get To Know ioFog

In this step of the tutorial we'll better familiarize ourselves with the ioFog environment [we just set up](introduction.html) in the previous step and `iofogctl`.

## Check Your Environment

You can have a comprehensive view of your Edge Cloud Network (ECN) and the running docker containers by using our `./status.sh` shell script.

```bash
$ ./status.sh
```

Or you can manually verify that the ioFog stack containers are correctly started. Note that it may take a minute or two for ioFog to start the tutorial microservices. The output should look like the following.

```console
$ iofogctl get all

NAMESPACE
default

CONTROLLER	      STATUS		AGE		    UPTIME		IP		    PORT
local-controller  online		1h4m		1h4m		0.0.0.0		51121

CONNECTOR	    STATUS		AGE		    UPTIME	    IP
local-connector	online		1h4m		1h4m		0.0.0.0

AGENT		STATUS		AGE		    UPTIME		IP		        VERSION
local-agent	RUNNING		1h4m		1h3m		91.178.63.198	1.3.0

APPLICATION	STATUS		MICROSERVICES
tutorial	RUNNING		Sensors, Rest API, Freeboard

MICROSERVICE	STATUS		AGENT		CONFIG		ROUTES		VOLUMES		PORTS
Rest API	    RUNNING		local-agent	{}						            10101:80
Freeboard	    RUNNING		local-agent	{}						            10102:80
Sensors		    RUNNING		local-agent	{}		    Rest API


```

```console
$ docker ps --filter "name=iofog"

CONTAINER ID        IMAGE                                           COMMAND                  CREATED             STATUS              PORTS                                            NAMES
840268cb60b4        iofog/freeboard:latest                          "nginx -g 'daemon of…"   2 minutes ago       Up 2 minutes        0.0.0.0:10102->80/tcp                            iofog_yKVryMQkkxCQt8wv4Qnkpq9dXG3C4W8q
fba02fc87010        iofog/freeboard-api:latest                      "node /src/index.js"     2 minutes ago       Up 2 minutes        0.0.0.0:10101->80/tcp                            iofog_tjG2LcvVkJtrzP9FHLqyGmBXptKZRxFT
b151f2e4946a        iofog/sensors:latest                            "node /sensors/index"    2 minutes ago       Up 2 minutes                                                         iofog_zL3qwCBhX9NBK4yWLjbkZY7QhKcJkChd
0789e92dd6d7        iofog/agent:latest                              "sh /start.sh"           About an hour ago   Up About an hour    0.0.0.0:54321->54321/tcp, 0.0.0.0:8081->22/tcp   iofog-agent
cf378c878cdf        iofog/connector:latest                          "sh /start.sh"           About an hour ago   Up About an hour    0.0.0.0:8080->8080/tcp                           iofog-connector
966ccd2092b8        iofog/controller:latest                         "sh /start.sh"           About an hour ago   Up About an hour    0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp   iofog-controller
```

We can also see that in the PORTS column some of these containers have published [port mappings](https://docs.docker.com/config/containers/container-networking/):

For example, there's a microservice running an instance of [Freeboard](https://github.com/Freeboard/freeboard), an open source visualization dashboard for IoT devices. It's running a web server that serves the dashboard. Go ahead and try it out at http://localhost:10102/?load=dashboard.json

The Freeboard microservice doesn't know it's running locally, so it could just as well be running on real edge node hardware!

## ioFog Containers

Our tutorial environment has three ioFog containers:

- iofog-agent (see [Agents](../agents/overview.html))
- iofog-controller (see [Controller](../controllers/overview.html))
- iofog-connector (see [Connector](../connectors/overview.html)

We can think of each of these containers as if they were deployed on separate devices. In production, our Controller is most often running on a cloud server and our Agents are each running on individual edge hardware nodes in the field. The Controller is controlling the Agent the same way it would if the devices were hundreds of miles away, and the Connector can broker communication between any microservices we run.

To interact with our containers we can use the [`docker exec -ti`](https://docs.docker.com/engine/reference/commandline/exec/) command.

### Iofogctl vs component CLIs

We are currently in the process of migrating all our management system into one tool to rule them all: `iofogctl` !

However, this process is still ongoing and eventhough you can do everything you need for this tutorial (and much more...) in iofogctl, you must know that every ioFog component (Agent, Controller, and Connector) has its local CLI (iofog-agent, iofog-controller, and iofog-connector) that can prove itself usefull.

#### Agent's Container

Let's start by using `iofogctl` to retrieve a detailed description of our Agent.

```console
$ iofogctl describe agent local-agent

uuid: xPqLmbQxXpZj6VbTZMcTDbbBgCNLyhkR
name: local-agent
location: ""
latitude: 50.8333
longitude: 4.3333
description: ""
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
createdtimerfc3339: "2019-09-13T09:14:13.846Z"
updatedtimerfc3339: "2019-09-13T10:37:57.424Z"
lastactive: 1568371077407
daemonstatus: RUNNING
uptimems: 5018195
memoryusage: 177.55567932128906
diskusage: 0.027621466666460037
cpuusage: 1.170568585395813
memoryviolation: "0"
diskviolation: "0"
cpuviolation: "0"
microservicestatus: ""
repositorycount: 2
repositorystatus: '[]'
laststatustimemsutc: 1568371070651
ipaddress: 172.17.0.4
ipaddressexternal: 91.178.63.198
processedmessaged: 124036
microservicemessagecount: 0
messagespeed: 86
lastcommandtimemsutc: 0
networkinterface: eth0
version: 1.3.0
isreadytoupgrade: false
isreadytorollback: false
tunnel: ""
```

Let's see how we can use the `iofog-agent` CLI to find out its status. Note that the first `iofog-agent` in the following command stands for the container name, and the second `iofog-agent` is the executable wrapped in the container.

```console
$ docker exec -ti iofog-agent iofog-agent status

ioFog daemon                : RUNNING
Memory Usage                : about 304.26 MiB
Disk Usage                  : about 33.06 MiB
CPU Usage                   : about 0.84 %
Running Microservices       : 3
Connection to Controller    : ok
Messages Processed          : about 144,638
System Time                 : 13/09/2019 10:41 AM
System Available Disk       : 43992.22 MB
System Available Memory     : 862.21 MB
System Total CPU            : 1.30 %
```

There's also `iofog-agent info`, used to view this Agent's settings:

```console
$ docker exec -ti iofog-agent iofog-agent info

Iofog UUID                               : xPqLmbQxXpZj6VbTZMcTDbbBgCNLyhkR
IP Address                               : 172.17.0.4
Network Interface                        : eth0(dynamic)
Developer's Mode                         : on
ioFog Controller                         : http://iofog-controller:51121/api/v3/
ioFog Certificate                        : /etc/iofog-agent/cert.crt
Docker URL                               : unix:///var/run/docker.sock
Disk Usage Limit                         : 50.00 GiB
Message Storage Directory                : /var/lib/iofog-agent/
Memory RAM Limit                         : 1024.00 MiB
CPU Usage Limit                          : 80.00%
Log Disk Limit                           : 10.00 GiB
Log File Directory                       : /var/log/iofog-agent/
Log Rolling File Count                   : 10
null : INFO
Status Update Frequency                  : 30
Get Changes Frequency                    : 60
Scan Devices Frequency                   : 60
Post Diagnostics Frequency               : 10
Isolated Docker Containers Mode          : off
GPS mode                                 : auto
GPS coordinates(lat,lon)                 : 50.8333,4.3333
Fog type                                 : intel_amd
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more Agent commands</h3>
  <p>If you want to learn about all the possible commands you can use on iofog-agent checkout the <a href="../agents/cli-usage.html">CLI Usage guide</a>.</p>
</aside>

#### Controller's Container

Let's list all the configured ioFog nodes using `iofogctl`.

```console
$ iofogctl get agents

NAMESPACE
default

AGENT		STATUS		AGE		    UPTIME		IP		        VERSION
local-agent	RUNNING		1h26m		1h25m		91.178.63.198	1.3.0


```

Now, let's try listing all the preconfigured ioFog nodes using the Controller CLI.

```console
$ docker exec -ti iofog-controller iofog-controller iofog list
{
  "fogs": [
    {
      "lastActive": 1568371373399,
      "daemonOperatingDuration": 5312950,
      "daemonLastStart": 1568366050335,
      "systemAvailableDisk": 46123114496,
      "systemAvailableMemory": 890736640,
      "repositoryCount": 2,
      "systemTime": 1568371324278,
      "lastStatusTime": 1568371365808,
      "processedMessages": 149610,
      "messageSpeed": 86,
      "lastCommandTime": 0,
      "logFileCount": 10,
      "uuid": "xPqLmbQxXpZj6VbTZMcTDbbBgCNLyhkR",
      "name": "local-agent",

...
```

This should give us a JSON response containing a list of edge nodes already registered with the Controller. In our case we should get a single node, `"name": "local-agent"`. This "node" is the container environment of iofog-agent. Remember that in production, instead of being containers running locally on our machine, these nodes would be real edge hardware as part of our Edge Compute Network (ECN), where our microservices run.

## Manage Our Microservices

Now that we know our way around a bit, let's learn how to manage and launch microservices!

[Continue To Next Step: Manage Our Microservices](manage-our-microservices.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
