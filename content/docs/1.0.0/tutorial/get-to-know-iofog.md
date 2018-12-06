# Get To Know ioFog

In this step of the tutorial we'll better familiarize ourselves with the ioFog environment [we just set up](introduction.html) in the previous step.

## Docker Environment

To verify everything is up and working correctly, run `docker ps`:

```sh
docker ps
```

You should see a number of containers running.

We can also see that in the PORTS column some of these containers have published [port mappings](https://docs.docker.com/config/containers/container-networking/):

```sh
PORTS                      NAMES
0.0.0.0:51121->51121/tcp   iofog-controller
                           iofog-agent-1
                           iofog-agent-2
0.0.0.0:53321->8080/tcp    iofog-connector
```

For example, there's a microservice running an instance of [Freeboard](https://github.com/Freeboard/freeboard), an open source visualization dashboard for IoT devices. It's running a web server that serves the dashboard, try it out: http://localhost:10102/?load=dashboard.json

The Freeboard microservice doesn't know it's running locally, so it could just as well be running on real edge node hardware!

## Shell Into Your Containers

Our tutorial environment has four containers, the most important are: iofog-agent-1, iofog-agent-2, iofog-controller, and iofog-connector. As their names imply, they contain two [Agents](../agents/overview.html), a [Controller](../controllers/overview.html), and a [Connector](../connectors/overview.html).

You can think of each of these containers as if they were separate devices. In production, your Controller is most often running on a cloud server and your Agents are each running on individual edge hardware nodes in the field. The Controller is controlling the Agent the same way it would if the devices were hundreds of miles away, and the Connector can broker communication between any microservices you run.

To create a shell (bash) environment into one of your containers you can use the [`docker exec -ti`](https://docs.docker.com/engine/reference/commandline/exec/) command.

#### Agent's Containers

Let's start a shell into one of the containers that is running one the two Agents.

```sh
docker exec -ti iofog-agent-1 bash
```

Now we're inside the first Agent container and can use the `iofog-agent` daemon to find out its status. Try this one:

```sh
iofog-agent status

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

```sh
iofog-agent info

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

When you're ready to leave the current container, simply use `exit`.

```sh
exit
```

This tutorial has another Agent too, `iofog-agent-2`, you might check it out as well!

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more Agent commands</h3>
  <p>If you want to learn about all the possible commands you can use on iofog-agent checkout the <a href="../agents/cli-usage.html">CLI Usage guide</a>.</p>
</aside>

#### Controller's Container

After we've exited from our Agent's containers, let's start a shell into the Controller's container:

```sh
docker exec -ti iofog-controller bash
```

Since this "device" is running our Controller daemon, inside this shell we can now issue commands to it. Try this one:

```sh
iofog-controller iofog list
```

This should give you a JSON response containing a list of edge nodes already registered with the Controller. In our case we should get two nodes, `"name": "Agent 1"` and `"name": "Agent 2"`. These "nodes" are the container environments iofog-agent-1 and iofog-agent-2. Remember that in production, instead of being containers running locally on your machine, these nodes would be real edge hardware, part of your Edge Compute Network, where your microservices run.

When you want to exit that session, you can use the `exit` command again.

## Manage Your Microservices

Now that we know our way around a bit, let's learn how to manage and launch microservices!

[Continue To Next Step](manage-your-microservices.html).
