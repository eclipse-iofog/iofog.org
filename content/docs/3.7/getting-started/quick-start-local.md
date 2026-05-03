# Quick Start With Local Deployment

In this guide we will:

- Install the prerequisites and tools required to create and manage Edge Compute Networks ('ECNs')
- Create an ECN on a local machine to demonstrate the processes and components involved in an ECN
- Deploy a set of Microservices on our local ECN

## Prerequisites

- `Docker v26.0+`: Open platform for developing, shipping, and running applications. ([installation instructions](https://docs.docker.com/install/))

#### Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl
```

#### Install iofogctl on Windows

The Windows binary can be downloaded from [Eclipse ioFog Packages](https://github.com/eclipse-iofog/iofogctl/releases/download/v3.7.0/iofogctl.exe).

##### Prepare Windows

In order to use `iofogctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- Follow the guidelines for using WSL2 or Hyper-V backend [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)
- Ensure that docker is running with [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
wget -qO- https://iofog.datasance.com/iofog.gpg | sudo tee /etc/apt/trusted.gpg.d/iofog.gpg >/dev/null
echo "deb [arch=all signed-by=/etc/apt/trusted.gpg.d/iofog.gpg] https://iofog.datasance.com/deb stable main" | sudo tee /etc/apt/sources.list.d/iofog.list >/dev/null
sudo apt update
sudo apt install iofogctl -y

```

And similarly, the RPM package can be installed like so:

```bash
cd /etc/yum.repos.d ; curl https://iofog.datasance.com/iofog.repo -LO
sudo yum update
sudo yum install iofogctl
```

#### Verify iofogctl Installation

Run `iofogctl version` to verify we have successfully installed the CLI.

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Prepare your Keycloak Realms for Eclipse ioFog</h3>
    <p>We recommened going through the <a href="../platform-deployment/prepare-realm.html">Keycloak Installation Guide</a> before continuing on here.</p>
</aside>

## Deploy **ioFog** Locally

We can use `iofogctl deploy` to install and provision ECN components. Here we will deploy a containerized ECN locally.


<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Want to know more about iofogctl?</h3>
    <p>We aren't going into detail about iofogctl here because we want to show you how simple it can be to get going with **ioFog**. Please make sure to check out the full iofogctl documentation <a href="../iofogctl/introduction.html">here</a>.</p>
</aside>


Go ahead and paste the following commands into the terminal:

```bash
echo "---
apiVersion: iofog.org/v3
kind: LocalControlPlane
metadata:
  name: ecn
spec:
  iofogUser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: exter
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  nats:
    enabled: false
  controller:
    container:
      image: ghcr.io/eclipse-iofog/controller:3.7.3
---
apiVersion: iofog.org/v3
kind: LocalAgent
metadata:
  name: local-agent
spec:
  container:
    image: ghcr.io/eclipse-iofog/agent:3.7.0
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

CONTROLLER      STATUS    AGE           UPTIME      ADDR             PORT
local           online    22m29s        22m35s      0.0.0.0          51121

AGENT           STATUS    AGE           UPTIME      ADDR             VERSION
local-agent     RUNNING   22m7s         22m7s       150.179.102.91   3.7.0

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
71927882293f        ghcr.io/eclipse-iofog/router:3.7.0             "/qpid-dispatch/laun…"   15 minutes ago      Up 15 minutes       0.0.0.0:5672->5672/tcp, 0.0.0.0:56721-56722->56721-56722/tcp   iofog_PJFbk3ZHjX3RkNWxwcRqzDXnKV6mLHmq
8454ca70755b        ghcr.io/eclipse-iofog/agent:3.7.0             "sh /start.sh"           15 minutes ago      Up 15 minutes                                                                      iofog-agent
dc7568ad1708        ghcr.io/eclipse-iofog/controller:3.7.3         "node /usr/local/lib…"   16 minutes ago      Up 16 minutes       0.0.0.0:51121->51121/tcp, 0.0.0.0:8008->80/tcp                 iofog-controller
```

## Teardown

To remove our ECN and any microservices deployed on it, we can run the following command:

```bash
iofogctl delete all
```

## Next Steps

Now that you have seen what **ioFog** is about, you can create a real ECN with remote hosts. Instructions are found [here](../platform-deployment/introduction.html).

We can also try deploying other Microservices on the local ECN. We can find instructions on writing our own Microservice [here](../developing-microservices/overview.html) and a step-by-step [tutorial](../tutorial/introduction.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/getting-started/quick-start-local.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>