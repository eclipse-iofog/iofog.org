# Quick Start With Local Deployment

In this guide we will:

- Install the prerequisites and tools required to create and manage Edge Compute Networks ('ECNs')
- Create an ECN on a local machine to demonstrate the processes and components involved in an ECN
- Deploy a set of Microservices on our local ECN

## Prerequisites

- `Docker 1.10+`: Open platform for developing, shipping, and running applications. ([installation instructions](https://docs.docker.com/install/))

#### Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@2.0
```

#### Install iofogctl on Windows

The Windows binary can be downloaded from https://storage.googleapis.com/iofogctl/win/2.0/iofogctl.exe.

##### Prepare Windows

In order to use `iofogctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)
- Enable Hyper-V in Powershell `Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart`
- Ensure that docker is running with [Linux containers mode](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers)

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=2.0.4
```

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-2.0.4-1.x86_64
```

#### Verify iofogctl Installation

Run `iofogctl version` to verify we have successfully installed the CLI.

## Deploy ioFog Locally

We can use `iofogctl deploy` to install and provision ECN components. Here we will deploy a containerized ECN locally.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about iofogctl?</h3>
  <p>We aren't going into detail about iofogctl here because we want to show you how simple it can be to get going with ioFog. Please make sure to check out the full iofogctl documentation <a href="../iofogctl/introduction.html">here</a>.</p>
</aside>

Go ahead and paste the following commands into the terminal:

```bash
echo "---
apiVersion: iofog.org/v2
kind: LocalControlPlane
metadata:
  name: ecn
spec:
  iofogUser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  controller:
    container:
      image: iofog/controller:2.0.1
---
apiVersion: iofog.org/v2
kind: LocalAgent
metadata:
  name: local-agent
spec:
  container:
    image: iofog/agent:2.0.4
" > /tmp/quick-start.yaml
iofogctl deploy -f /tmp/quick-start.yaml
```

After the deployment has successfully completed, we can verify the resources we specified in the YAML file are running on our local machine.

```bash
iofogctl get all
```

Which should output something similar to:

```plain
NAMESPACE
default

CONTROLLER      STATUS    AGE           UPTIME      ADDR             VERSION        PORT
local           online    22m29s        22m35s      0.0.0.0          2.0.1          51121

AGENT           STATUS    AGE           UPTIME      ADDR             VERSION
local-agent     RUNNING   22m7s         22m7s       150.179.102.91   2.0.4

APPLICATION     STATUS    MICROSERVICES

MICROSERVICE    STATUS    AGENT         ROUTES      VOLUMES          PORTS

VOLUME          SOURCE    DESTINATION   PERMISSIONS	AGENTS

ROUTE           SOURCE MSVC     DEST MSVC

```

**NB:** The Agent status might say `UNKNOWN` for up to 30s. It is the time for the agent to report back its liveness to the controller.

The `Controller` acts as a control plane, it will be our main point of access and communication with our ECN. If we want to find out more about Controller, please read <a href="../reference-controller/overview.html">this</a>.

The `Agent` is the component that is meant to run on our edge devices. Once it has registered itself with a Controller, the Agent will be in charge of actually pulling the microservices images and starting / stopping the microservices on our edge device. If we want to find out more about Agent, please read <a href="../reference-agent/overview.html">this</a>.

Those components are all currently running as separate Docker containers on our local machine. We can list the active containers by running:

```bash
docker ps
```

Which should output something similar to:

```plain
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                                                          NAMES
71927882293f        iofog/router:latest             "/qpid-dispatch/laun…"   15 minutes ago      Up 15 minutes       0.0.0.0:5672->5672/tcp, 0.0.0.0:56721-56722->56721-56722/tcp   iofog_PJFbk3ZHjX3RkNWxwcRqzDXnKV6mLHmq
8454ca70755b        iofog/agent:2.0.4              "sh /start.sh"           15 minutes ago      Up 15 minutes                                                                      iofog-agent
dc7568ad1708        iofog/controller:2.0.1         "node /usr/local/lib…"   16 minutes ago      Up 16 minutes       0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp                 iofog-controller
```

## Deploy Microservices

Now that our local ECN is up, lets put it to use. The following commands will deploy a demonstration application on your ECN:

```bash
echo "---
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: health-care-wearable
spec:
  microservices:
  - name: heart-rate-monitor
    agent:
      name: local-agent
      config:
        bluetoothEnabled: false
        abstractedHardwareEnabled: false
    images:
      arm: edgeworx/healthcare-heart-rate:arm-v1
      x86: edgeworx/healthcare-heart-rate:x86-v1
      registry: remote
    container:
      rootHostAccess: false
      ports: []
    config:
      test_mode: true
      data_label: Anonymous_Person
  - name: heart-rate-viewer
    agent:
      name: local-agent
    images:
      arm: edgeworx/healthcare-heart-rate-ui:arm
      x86: edgeworx/healthcare-heart-rate-ui:x86
      registry: remote
    container:
      rootHostAccess: false
      ports:
        - external: 5000
          internal: 80
          proxy: true
      env:
        - key: BASE_URL
          value: http://localhost:8080/data
  routes:
  - name: monitor-to-viewer
    from: heart-rate-monitor
    to: heart-rate-viewer" > /tmp/quick-start-app.yaml
iofogctl deploy -f /tmp/quick-start-app.yaml
```

This deploys two microservices: `heart-rate-monitor` and `heart-rate-viewer`. The former generates mock heart rate data that would normally be generated with a physical heart monitoring device, and the latter is a web application that offers a live visualisation of the generated data.

After `iofogctl deploy -f /tmp/quick-start-app.yaml` has completed, the agent will have to download each microservice image and start them.

You can follow the progress by running the command:

```bash
watch iofogctl get microservices
```

Which will output something similar to:

```plain
Every 2.0s: iofogctl get microservices                                                                                                                     Nehas-MacBook-Pro.local: Tue Apr  7 11:18:43 2020

NAMESPACE
default

MICROSERVICE            STATUS          AGENT           ROUTES                  VOLUMES                 PORTS
heart-rate-monitor      QUEUED          local-agent     heart-rate-viewer
heart-rate-viewer       QUEUED          local-agent                                                     5000:80
```

Once both microservice status are 'RUNNING', the microservices have started. We will be able to see the web application on our browser at <a href="http://localhost:5000/" target="_blank">http://localhost:5000</a>.

## Teardown

To remove our ECN and any microservices deployed on it, we can run the following command:

```bash
iofogctl delete all
```

## Next Steps

Now that you have seen what ioFog is about, you can create a real ECN with remote hosts. Instructions are found [here](../platform-deployment/introduction.html).

We can also try deploying other Microservices on the local ECN. We can find instructions on writing our own Microservice [here](../developing-microservices/overview.html) and a step-by-step [tutorial](../tutorial/introduction.html).

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/getting-started/quick-start-local.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
