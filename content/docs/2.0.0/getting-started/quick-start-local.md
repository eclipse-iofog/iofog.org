# Quick Start With Local Deployment

In this guide you will:

- Install the prerequisites and tools required to create and manage Edge Compute Networks ('ECNs')
- Create an ECN on a local machine to demonstrate the processes and components involved in an ECN
- Deploy a set of Microservices on your local ECN

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

In order to use `iofogctl` to deploy an ECN locally on Windows you will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)
- Enable Hyper-V in Powershell `Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart`
- Ensure that docker is running with [Linux containers mode](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers)

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl
```

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl
```

#### Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.

## Deploy ioFog Locally

You can use `iofogctl deploy` to install and provision ECN components. Here you will deploy a containerized ECN locally.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about iofogctl?</h3>
  <p>You aren't going into detail about iofogctl here because you want to show you how simple it can be to get going with ioFog. Please make sure to check out the full iofogctl documentation <a href="../iofogctl/introduction.html">here</a>.</p>
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
      image: iofog/controller:2.0.0-beta2
---
apiVersion: iofog.org/v2
kind: LocalAgent
metadata:
  name: local-agent
spec:
  container:
    image: iofog/agent:2.0.0-beta2
" > /tmp/quick-start.yaml
iofogctl deploy -f /tmp/quick-start.yaml
```

After the deployment has successfully completed, you can verify the resources you specified in the YAML file are running on your local machine.

```bash
iofogctl get all
```

Which should output something similar to:

```plain
NAMESPACE
default

CONTROLLER      STATUS    AGE           UPTIME      ADDR             PORT
local           online    22m29s        22m35s      0.0.0.0          51121

AGENT           STATUS    AGE           UPTIME      ADDR             VERSION
local-agent     RUNNING                 22m7s       150.179.102.91   2.0.0-beta2

APPLICATION     STATUS    MICROSERVICES

MICROSERVICE    STATUS    AGENT         ROUTES      VOLUMES          PORTS

VOLUME          SOURCE    DESTINATION   PERMISSIONS	AGENTS
```

**NB:** The Agent status might say `UNKNOWN` for up to 30s. It is the time for the agent to report back its liveness to the controller.

The `Controller` acts as a control plane, it will be your main point of access and communication with your ECN. If you want to find out more about Controller, please read <a href="../reference-controller/overview.html">this</a>.

The `Agent` is the component that is meant to run on your edge devices. Once it has registered itself with a Controller, the Agent will be in charge of actually pulling the microservices images and starting / stopping the microservices on your edge device. If you want to find out more about Agent, please read <a href="../reference-agent/overview.html">this</a>.

Those components are all currently running as separate Docker containers on your local machine. You can list the active containers by running:

```bash
docker ps
```

Which should output something similar to:

```plain
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS              PORTS                                                          NAMES
71927882293f        iofog/router:latest            "/qpid-dispatch/laun…"   15 minutes ago      Up 15 minutes       0.0.0.0:5672->5672/tcp, 0.0.0.0:56721-56722->56721-56722/tcp   iofog_PJFbk3ZHjX3RkNWxwcRqzDXnKV6mLHmq
8454ca70755b        iofog/agent:2.0.0-beta2        "sh /start.sh"           15 minutes ago      Up 15 minutes                                                                      iofog-agent
dc7568ad1708        iofog/controller:2.0.0-beta2   "node /usr/local/lib…"   16 minutes ago      Up 16 minutes       0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp                 iofog-controller
```

## Deploy Microservices

Now that your local ECN is up, lets put it to use. The following commands will deploy a demonstration application on your ECN:

```bash
echo "---
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: HealthcareWearable
spec:
  microservices:
  - name: heart-rate-monitor
    agent:
      name: local-agent
      config:
        bluetoothEnabled: false # this will install the iofog/restblue microservice
        abstractedHardwareEnabled: false
    images:
      arm: edgeworx/healthcare-heart-rate:arm-v1
      x86: edgeworx/healthcare-heart-rate:x86-v1
      registry: remote # public docker
    container:
      rootHostAccess: false
      volumes:
        - hostDestination: /tmp/msvc
          containerDestination: /tmp
          accessMode: z
      ports: []
    config:
      test_mode: true
      data_label: 'Anonymous_Person'
  # Simple JSON viewer for the heart rate output
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
        # The ui will be listening on port 80 (internal).
        - external: 5000
          internal: 80
          public: 5000
      volumes:
      - hostDestination: /tmp/iofog
        containerDestination: /data
        accessMode: rw
      env:
        - key: BASE_URL
          value: http://localhost:8080/data
  routes:
  # Use this section to configure route between microservices
  # Use microservice name
  - from: heart-rate-monitor
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
heart-rate-monitor      QUEUED          local-agent     heart-rate-viewer       /tmp/msvc:/tmp
heart-rate-viewer       QUEUED          local-agent                             /tmp/iofog:/data        5000:80
```

Once both microservice status are 'RUNNING', the microservices have started. You will be able to see the web application on your browser at <a href="http://localhost:5000/" target="_blank">http://localhost:5000</a>.

## Teardown

To remove your ECN and any microservices deployed on it, you can run the following command:

```bash
iofogctl delete all
```

## Next Steps

Now that you have seen what ioFog is about, you can create a real ECN with remote hosts. Instructions are found [here](../platform-deployment/introduction.html).

You can also try deploying other Microservices on the local ECN. You can find instructions on writing your own Microservice [here](../writing-microservices/overview.html) and a step-by-step [tutorial](../tutorial/introduction.html).

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/getting-started/quick-start-local.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
