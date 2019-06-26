# Get To Know ioFog

In this step of the tutorial we'll better familiarize ourselves with the ioFog environment [we just set up](introduction.html) in the previous step.

## Docker Environment

Verify manually that the ioFog stack containers are correctly started. Note that it may take a minute or two for ioFog to start the tutorial microservices. The output should look like the following.

```console
$ docker ps --filter "name=iofog"

CONTAINER ID IMAGE                      COMMAND                CREATED            STATUS            PORTS                    NAMES
baefdede1949 iofog/freeboard:latest     "nginx -g 'daemon of…" 14 seconds ago     Up 13 seconds     0.0.0.0:10102->80/tcp    iofog_BrKHZf9PTcT6yjKcrpnRVBcYPFqxqXxb
ce6d14551a57 iofog/freeboard-api:latest "node /src/index.js"   17 seconds ago     Up 16 seconds     0.0.0.0:10101->80/tcp    iofog_NZp8HZ7xpztPyC4dpRQx4w3Jd8x9jNF3
43c00c7c9fc0 iofog/sensors:latest       "node /sensors/index"  20 seconds ago     Up 19 seconds                              iofog_PDRRQcbD6DVZJy9QBJQB7JyzH7RgLJCb
5df0afa1018a demo_iofog-agent           "/usr/bin/supervisord" About a minute ago Up About a minute 0.0.0.0:8081->22/tcp     iofog-agent
7146cd77d400 demo_iofog-controller      "sh -c 'iofog-contro…" About a minute ago Up About a minute 0.0.0.0:51121->51121/tcp iofog-controller
9e64f5e1afd4 demo_iofog-connector       "sh -c 'service iofo…" About a minute ago Up About a minute 0.0.0.0:53321->8080/tcp  iofog-connector
```

We can also see that in the PORTS column some of these containers have published [port mappings](https://docs.docker.com/config/containers/container-networking/):

For example, there's a microservice running an instance of [Freeboard](https://github.com/Freeboard/freeboard), an open source visualization dashboard for IoT devices. It's running a web server that serves the dashboard. Go ahead and try it out at http://localhost:10102/?load=dashboard.json

The Freeboard microservice doesn't know it's running locally, so it could just as well be running on real edge node hardware!

## Shell Into Our Containers

Our tutorial environment has three ioFog containers:

- iofog-agent (see [Agents](../agents/overview.html))
- iofog-controller (see [Controller](../controllers/overview.html))
- iofog-connector (see [Connector](../connectors/overview.html)

We can think of each of these containers as if they were deployed on separate devices. In production, our Controller is most often running on a cloud server and our Agents are each running on individual edge hardware nodes in the field. The Controller is controlling the Agent the same way it would if the devices were hundreds of miles away, and the Connector can broker communication between any microservices we run.

To interact with our containers we can use the [`docker exec -ti`](https://docs.docker.com/engine/reference/commandline/exec/) command.

#### Agent's Container

Let's start by using the `iofog-agent` CLI to find out its status. Note that the first `iofog-agent` in the following command stands for the container name, and the second `iofog-agent` is the executable wrapped in the container.

```console
$ docker exec -ti iofog-agent iofog-agent status

  ioFog daemon                : RUNNING
  Memory Usage                : about 95.28 MiB
  Disk Usage                  : about 12.55 MiB
  CPU Usage                   : about 6.70%
  Running Microservices       : 2
  Connection to Controller    : ok
  Messages Processed          : about 54,856
  System Time                 : 01/01/2018 12:00 AM
```

There's also `iofog-agent info`, used to view this Agent's settings:

```console
$ docker exec -ti iofog-agent iofog-agent info

  Iofog UUID                               : j83KyXWWd2gZ4K8wXYDDYhVK2834XVnB
  IP Address                               : 172.17.0.4
  Network Interface                        : eth0
  Developer's Mode                         : on
  ioFog Controller                         : http://iofog-controller:51121/api/v3/
  ioFog Certificate                        : /etc/iofog-agent/cert.crt
  Docker URL                               : unix:///var/run/docker.sock
  Disk Usage Limit                         : 50.00 GiB
  Message Storage Directory                : /var/lib/iofog-agent/
  Memory RAM Limit                         : 4096.00 MiB
  CPU Usage Limit                          : 80.00%
  Log Disk Limit                           : 10.00 GiB
  Log File Directory                       : /var/log/iofog-agent/
  Log Rolling File Count                   : 10
  Status Update Frequency                  : 30
  Get Changes Frequency                    : 60
  Scan Devices Frequency                   : 60
  Post Diagnostics Frequency               : 10
  Isolated Docker Containers Mode          : off
  GPS mode                                 : off
  GPS coordinates(lat,lon)                 :
  Fog type                                 : intel_amd
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more Agent commands</h3>
  <p>If you want to learn about all the possible commands you can use on iofog-agent checkout the <a href="../agents/cli-usage.html">CLI Usage guide</a>.</p>
</aside>

#### Controller's Container

Now, let's try listing all the preconfigured ioFog nodes using the Controller CLI.

```console
$ docker exec -ti iofog-controller iofog-controller iofog list
{
  "fogs": [
    {
      "uuid": "vH6vfNzLwHK483CwHRJyyPZtNZ2m46zC",
      "name": "Default Fog",
      "location": null,
      "gpsMode": "off",
...
```

This should give us a JSON response containing a list of edge nodes already registered with the Controller. In our case we should get a single node, `"name": "Default Fog"`. This "node" is the container environment of iofog-agent. Remember that in production, instead of being containers running locally on our machine, these nodes would be real edge hardware as part of our Edge Compute Network (ECN), where oour microservices run.

## Manage Our Microservices

Now that we know our way around a bit, let's learn how to manage and launch microservices!

[Continue To Next Step: Manage Our Microservices](manage-our-microservices.html).
