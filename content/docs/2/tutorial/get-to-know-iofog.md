# Get To Know ioFog

In this step of the tutorial we'll better familiarize ourselves with the ioFog environment [we just set up](introduction.html) in the previous step and `iofogctl`.

## Check Your Environment

You can have a comprehensive view of your Edge Cloud Network (ECN) and the running docker containers by using our `./status.sh` shell script.

```bash
./status.sh
```

Or you can manually verify that the ioFog stack containers are correctly started. Note that it may take a minute or two for ioFog to start the tutorial microservices. The output should look like the following.

```console
iofogctl get all

NAMESPACE
default

CONTROLLER	      STATUS    AGE     UPTIME    IP        PORT
local-controller  online    1h4m    1h4m      0.0.0.0   51121

AGENT             STATUS    AGE     UPTIME    IP               VERSION
local-agent       RUNNING   1h4m    1h3m      104.196.255.116  2.0.0

APPLICATION   RUNNING    MICROSERVICES
tutorial      3/3        sensors, rest-api, freeboard
Test Flow     0/0

MICROSERVICE  STATUS   AGENT        ROUTES    VOLUMES  PORTS
rest-api      RUNNING  local-agent                     10101:80
freeboard     RUNNING  local-agent                     10102:80
sensors       RUNNING  local-agent  rest-api
```

```console
$ docker ps --filter "name=iofog"

CONTAINER ID        IMAGE                                          COMMAND                  CREATED             STATUS              PORTS                                                                               NAMES
20ad0be7a0cf        iofog/freeboard:latest                         "nginx -g 'daemon of…"   12 minutes ago      Up 12 minutes       0.0.0.0:10102->80/tcp                                                               iofog_w7Fvn28fWxQFrnNjvYwPMQ6ghqdKjfBq
7ce950bd971f        iofog/freeboard-api:latest                     "node /src/index.js"     12 minutes ago      Up 12 minutes       0.0.0.0:10101->80/tcp                                                               iofog_2tYXKdLncDhvNYBQYWmFzg9gm9MNkT7x
1fc59ab19b71        iofog/sensors:latest                           "docker-entrypoint.s…"   12 minutes ago      Up 12 minutes                                                                                           iofog_6VLjktywfnJt8NwjQf9PcF29TbLN9HRM
a2fb3fa95c94        quay.io/interconnectedcloud/qdrouterd:latest   "/home/qdrouterd/bin…"   13 minutes ago      Up 13 minutes       5671/tcp, 0.0.0.0:5672->5672/tcp, 55672/tcp, 0.0.0.0:56721-56722->56721-56722/tcp   iofog_rrkXQJMdvJZ8tPVhvMhvR9jWMDctYBPv
82e539cf4b88        iofog/agent:2.0.1                              "sh /start.sh"           14 minutes ago      Up 14 minutes                                                                                           iofog-agent
72fd11ff5d8d        iofog/controller:2.0.0                         "node /usr/local/lib…"   14 minutes ago      Up 14 minutes       0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp                                      iofog-controller
```

We can also see that in the PORTS column some of these containers have published [port mappings](https://docs.docker.com/config/containers/container-networking/):

For example, there's a microservice running an instance of [Freeboard](https://github.com/Freeboard/freeboard), an open source visualization dashboard for IoT devices. It's running a web server that serves the dashboard.

Wait for the microservices to be in a `RUNNING` state. It may take a few minutes as the images need to be pulled.

```bash
watch iofogctl get microservices
```

Go ahead and try the web app out at http://localhost:10102/?load=dashboard.json

The Freeboard microservice doesn't know it's running locally, so it could just as well be running on real edge node hardware!

## ioFog Containers

Our tutorial environment has two ioFog containers:

- [Agents](../reference-agent/overview.html)
- [Controllers](../reference-controller/overview.html)

We can think of each of these containers as if they were deployed on separate devices. In production, our Controller is most often running on a cloud server and our Agents are each running on individual edge devices in the field. The Controller is controlling the Agent the same way it would if the devices were hundreds of miles away.

### iofogctl vs component CLIs

We are currently in the process of migrating all our management system into one tool to rule them all: `iofogctl` !

However, this process is still ongoing and even though you can do everything you need for this tutorial (and much more...) in iofogctl, you must know that every ioFog component (Agent and Controller) has its local CLI (iofog-agent, iofog-controller) that can prove itself useful.

In the following sections we will us `iofogctl legacy ...` commands to use the older component CLIs. Note that, because we have a local ECN, we could also use `docker exec` instead.

#### Agent's Container

Let's start by using `iofogctl` to retrieve a detailed description of our Agent.

```console
iofogctl describe agent local-agent

apiVersion: iofog.org/v2
kind: AgentConfig
metadata:
  name: local-agent
  namespace: default
spec:
  uuid: 62GHyYgrGrfbYfhxwk9Q8LQW34VVMtKq
  name: local-agent
  location: ""
  latitude: -36.8486
  longitude: 174.754
  description: ""
  dockerUrl: unix:///var/run/docker.sock
  diskLimit: 50
  diskDirectory: /var/lib/iofog-agent/
...
```

Let's see how we can use the legacy `iofog-agent` CLI to find out its status.

```console
iofogctl legacy agent local-agent status

ioFog daemon                : RUNNING
Memory Usage                : about 51.19 MiB
Disk Usage                  : about 0.19 MiB
CPU Usage                   : about 0.99 %
Running Microservices       : 4
Connection to Controller    : ok
Messages Processed          : about 837
System Time                 : 20/04/2020 05:32 AM
System Available Disk       : 4559.27 MB (46.77 %)
System Available Memory     : 2717.61 MB
System Total CPU            : 32.58 %
```

There's also the legacy `info` command, used to view this Agent's settings:

```console
iofogctl legacy agent local-agent info

Iofog UUID                               : VB78m6tLdrtWNDgdr73VrmCxZ3ZRkxjB
IP Address                               : 10.138.0.41
Network Interface                        : ens4(dynamic)
Developer's Mode                         : on
ioFog Controller                         : http://172.17.0.2:51121/api/v3/
ioFog Certificate                        : /etc/iofog-agent/cert.crt
Docker URL                               : unix:///var/run/docker.sock
Disk Usage Limit                         : 50.00 GiB
Message Storage Directory                : /var/lib/iofog-agent/
Memory RAM Limit                         : 4096.00 MiB
CPU Usage Limit                          : 80.00%
Log Disk Limit                           : 10.00 GiB
Log File Directory                       : /var/log/iofog-agent/
Log Rolling File Count                   : 10
Log Level                                : INFO
Status Update Frequency                  : 10
Get Changes Frequency                    : 10
Scan Devices Frequency                   : 60
Post Diagnostics Frequency               : 10
Isolated Docker Containers Mode          : off
GPS mode                                 : auto
GPS coordinates(lat,lon)                 : 39.0438,-77.4874
Fog type                                 : intel_amd
Docker Pruning Frequency                 : 1
Available Disk Threshold                 : 90

```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more Agent commands</h3>
  <p>If you want to learn about all the possible commands you can use on iofog-agent checkout the <a href="../reference-agent/cli-usage.html">CLI Usage guide</a>.</p>
</aside>

#### Controller's Container

Let's list all the configured ioFog nodes using `iofogctl`.

```console
iofogctl get agents

NAMESPACE
default

AGENT       STATUS   AGE     UPTIME  ADDR             VERSION
local-agent	RUNNING  15m38s  15m38s  104.196.255.116  2.0.1
```

Now, let's try listing all the preconfigured ioFog nodes using the Controller CLI.

```console
iofogctl legacy controller local-controller iofog list

{
  "fogs": [
    {
      "lastActive": 1587360831027,
      "daemonOperatingDuration": 937515,
      "daemonLastStart": 1587359873075,
      "systemAvailableDisk": 4780654592,
      "systemAvailableMemory": 2847510528,
      "repositoryCount": 2,
      "systemTime": 1587360773069,
      "lastStatusTime": 1587360811615,
      "processedMessages": 848,
      "messageSpeed": 1,
      "lastCommandTime": 0,
      "logFileCount": 10,
      "uuid": "VB78m6tLdrtWNDgdr73VrmCxZ3ZRkxjB",
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

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/tutorial/get-to-know-iofog.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
