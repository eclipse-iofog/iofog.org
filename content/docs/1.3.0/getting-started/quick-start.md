# Quick Start

In this guide we will:

- Install the prerequisites and tools required to create and manage ECN's ('Edge Compute Networks')
- Create an ECN on a local machine to demonstrate the processes and components involved in an ECN
- Deploy a set of Microservices on our local ECN

## Prerequisites

- `Docker 1.10+`: Open platform for developing, shipping, and running applications. ([installation instructions](https://docs.docker.com/install/))

#### Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@1.3
```

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=1.3.0-beta
```

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-1.3.0-beta-1.x86_64
```

#### Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.

## Deploy ioFog Locally

You can use `iofogctl deploy` to install and provision ioFog software. Now we will deploy ioFog locally by specifying localhost in the `host` fields of our yaml file.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about iofogctl?</h3>
  <p>We aren't going into detail about iofogctl here because we want to show you how simple it can be to get going with ioFog. Please make sure to check out the full iofogctl documentation <a href="../tools/iofogctl/usage.html">here</a>.</p>
</aside>

Go ahead an paste the following commands into your terminal:

```bash
echo "---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: ecn
spec:
  iofogUser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  controllers:
  - name: local-controller
    host: localhost
---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: local-connector
spec:
  host: localhost
---
apiVersion: iofog.org/v1
kind: Agent
metadata:
  name: local-agent
spec:
  host: localhost" > /tmp/quick-start.yaml
iofogctl deploy -f /tmp/quick-start.yaml
```

After the deployment has successfully completed, we can verify the resources we specified in the YAML file are running on our local machine.

```bash
iofogctl get all
```

Which should output something similar to:

```bash
NAMESPACE
default

CONTROLLER       STATUS		AGE		UPTIME		IP		    PORT
local-controller online		2m11s   2m14s		0.0.0.0		51121

CONNECTOR        STATUS		AGE		UPTIME		IP
local-connector  online		1m59s   1m59s		0.0.0.0

AGENT            STATUS		AGE		UPTIME		IP	            VERSION
local-agent      RUNNING	1m18s   28s         122.60.228.85   1.3.0-beta
```

The `Controller` acts as a control plane, it will be your main point of access and communication with your ECN. If you want to find out more about Controller, please read <a href="../controllers/overview.html">this</a>.

The `Connector` enables secure and private peer-to-peer communication between microservices. If you want to find out more about Connector, please read <a href="../connectors/overview.html">this</a>.

The `Agent` is the component that is meant to run on your edge devices. Once it has registered itself with a Controller, the Agent will be in charge of actually pulling the microservices images and starting / stopping the microservices on your edge device. If you want to find out more about Agent, please read <a href="../agents/overview.html">this</a>.

Those components are all currently running as separate Docker containers on your local machine. You can list the active containers by running:

```bash
docker ps
```

Which should output something similar to:

```bash
CONTAINER ID        IMAGE                     COMMAND             CREATED             STATUS              PORTS                                            NAMES
cdafcba43497        iofog/agent:latest        "sh /start.sh"      11 minutes ago      Up 11 minutes       0.0.0.0:54321->54321/tcp, 0.0.0.0:8081->22/tcp   iofog-agent
9d0f5be1297f        iofog/connector:latest    "sh /start.sh"      11 minutes ago      Up 11 minutes       0.0.0.0:8080->8080/tcp                           iofog-connector
cb8c784759ed        iofog/controller:latest   "sh /start.sh"      11 minutes ago      Up 11 minutes       0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp   iofog-controller
```

## Deploy Microservices

Now that our local ECN is up, lets put it to use. The following commands will deploy a demonstration application on your ECN:

```bash
echo '---
apiVersion: iofog.org/v1
kind: Application
metadata:
  name: HealthcareWearableExample
spec:
  microservices:
  - name: "heart-rate-monitor"
    agent:
      name: local-agent
    images: # Microservice docker images
      arm: "edgeworx/healthcare-heart-rate:arm-v1"
      x86: "edgeworx/healthcare-heart-rate:x86-v1"
    ports: []
    config:
      test_mode: true
      data_label: "Anonymous Person"
  - name: "heart-rate-viewer"
    agent:
      name: local-agent
    images:
      arm: "edgeworx/healthcare-heart-rate-ui:arm"
      x86: "edgeworx/healthcare-heart-rate-ui:x86"
    ports:
      - external: 5000
        internal: 80
    volumes: []
    env:
      - key: "BASE_URL"
        value: "http://localhost:8080/data"
  routes:
  - from: "heart-rate-monitor"
    to: "heart-rate-viewer"' > /tmp/quick-start-app.yaml
iofogctl deploy -f /tmp/quick-start-app.yaml
```

This deploys two microservices: `heart-rate-monitor` and `heart-rate-viewer`. The former generates mock heart rate data that would normally be generated with a physical heart monitoring device, and the latter is a web application that offers a live visualisation of the generated data.

After `iofogctl deploy -f /tmp/quick-start-app.yaml` has completed, the agent will have to download each microservice image and start them.

You can follow the progress by running the command:

```bash
watch iofogctl get microservices
```

Which will output something similar to:

```bash
Every 2.0s: iofogctl get microservices                                                                                                                                                  Alexandres-MacBook-Pro.local: Wed Sep 11 16:17:34 2019

MICROSERVICE            STATUS          AGENT           CONFIG                                                  ROUTES                  VOLUMES         PORTS
heart-rate-monitor      QUEUED          local-agent     {"data_label":"Anonymous Person","test_mode":true}      heart-rate-viewer
heart-rate-viewer       QUEUED          local-agent     {}                                                                                              5000:80
```

Once both microservice status are 'RUNNING', the microservices have started. You will be able to see the web application on your browser at <a href="http://localhost:5000/" target="_blank">http://localhost:5000</a>.

## Teardown

To remove our ECN and any microservices deployed on it, we can run the following command:

```bash
iofogctl delete all
```

## Next Steps

Now that you have seen what ioFog is about, you can create a real ECN with remote hosts. Instructions are found [here](../remote-deployment/introduction.html).

You can also try deploying other Microservices on the local ECN. You can find instructions on writing your own Microservice [here](../writing-microservices/overview.html).
