# Quick Start

In this Quick Start guide we'll download a simple ioFog setup containing a [Controller](../controllers/overview.html), [Connector](../connectors/overview.html), and an [Agent](../agents/overview.html). This gives you a quick way to establish a mininal Edge Compute Network (ECN) on our local machine and start playing with ioFog. This setup can also be used as a minimal local development environment on any machine that can run Docker.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Familiar with the Core Concepts?</h3>
  <p>If you aren't already familiar with the core concepts of ioFog, you'll want to check out <a href="../getting-started/core-concepts.html">our Core Concepts</a> section.</p>
</aside>

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Want to setup for production?</h3>
  <p>This Quick Start guide is intended to get us up and running as quickly as possible, running everything on our local machine.</p>
  <p>To setup for production environment, we want to instead:
  </p>
  <ul>
      <li><a href="setup-your-controllers.html">Setup your Controller</a></li>
      <li><a href="setup-your-connectors.html">Setup your Connector</a></li>
      <li><a href="setup-your-agents.html">Setup the Agent</a> on each of your edge nodes</li>
    </ul>
</aside>

### Minimum Requirements

ioFog requires a Linux environment, however this Tutorial has everything already setup inside a Linux [Docker container](https://docs.docker.com/get-started/) that can run on Mac or Windows as well.

- **Linux** v3.10+ (Ubuntu, CentOS, etc), **macOS** 10.12+, or **Windows** 7+
- **Docker** 1.10+

## Install Docker and Docker-Compose

### Linux

We can install the latest version of Docker with following command:

```bash
curl -sSf https://get.docker.com/ | sh
```

Or download Docker manually for: [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/) or [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/).

Next we need to install Docker Compose. For the latest instructions, [see the Docker Compose Install Guide](https://docs.docker.com/compose/install/#install-compose). This tutorial requires docker-compose version `1.24`.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### macOS

Docker for Mac can be installed from the Docker Store

[Download Docker from Docker Store](https://docs.docker.com/docker-for-mac/install/)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Mac?</h3>
  <p>Docker for Mac allows us to run Linux containers on Mac. Under the hood it uses a <a href="https://docs.docker.com/docker-for-mac/docker-toolbox/">lightweight Virtual Machine</a> to provide the Linux environment to containers.</p>
</aside>

To install Docker Compose on Mac, follow the instructions at [Docker Compose Install Guide](https://docs.docker.com/compose/install/#install-compose). This tutorial requires docker-compose version `1.24`.

### Windows

Docker for Windows can be installed from the Docker Store:

[Download Docker from Docker Store](https://docs.docker.com/docker-for-windows/install/)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Windows?</h3>
  <p>Docker for Windows allows us to run Linux containers on Windows. Under the hood it uses a lightweight Virtual Machine to provide the Linux environment to containers.</p>
</aside>

To install Docker Compose on Windows, follow the instructions at[Docker Compose Install Guide](https://docs.docker.com/compose/install/#install-compose). This tutorial requires docker-compose version `1.24`.

### Raspbian Usage

While we fully support using Raspberry Pi's as workers on the edge environment, they are not meant
to be used as the Controller and Connector infrastructure. The normal quick-starts above will bring up an entire containerized
edge environment for usage, while this section will specify using the Raspberry Pi as an agent in our
edge infrastructure.

#### Raspbian Agents

We have a general guide for Agent Setup [here.](/docs/1.3.0/getting-started/setup-your-agents.html)

## Download Tutorial Project

Finally, we need to download the Tutorial project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already set up.

On Unix based systems, download our tar.gz package.

```bash
cd where/we/want/iofog-demo
curl -L -o demo.tar.gz https://github.com/eclipse-iofog/demo/archive/v1.3.0.tar.gz
tar -zxvf demo.tar.gz --strip-components=1
```

On windows, [download tutorial .zip package](https://github.com/eclipse-iofog/demo/archive/v1.3.0.zip). Then unzip the contents into a preferred working directory.

## Bootstrap the Project

Start by spinning up the ioFog stack (Agent, Controller, and Connector) on our local machine. This creates a fully configured Edge Compute Network (ECN) without any microservices.

```sh
$ ./start.sh
```

We can optionally verify the ioFog stack is provisioned correctly. The automated tests run a smoke test suite on the ioFog stack, testing basic operations.

```sh
$ ./test.sh
```

When we are finished, we can tear down the ioFog stack and all services deployed on it.

```sh
$ ./stop.sh
```

## Shell Into Your Containers

Your newly setup development environment has three containers: iofog-agent, iofog-controller, and iofog-connector. As their names imply, they contain a running Agent, Controller, and Connector respectively.

You can think of each of these containers as if they were separate devices; the Controller is controlling the Agent the same way it would if the devices were hundreds of miles away, and the Connector can broker communication between any microservices you run.

To create a shell (bash) environment into one of your containers you can use the [`docker exec -ti`](https://docs.docker.com/engine/reference/commandline/exec/) command.

```sh
docker exec -ti iofog-controller bash
```

Now we're inside the iofog-controller container and can issue commands to our Controller. Try this one:

```sh
iofog-controller iofog list
```

This should give you a JSON response containing a list of edge nodes already registered with the Controller. In our case, a single node `"name": "ioFog Node"`. That "node" is actually the environment running inside the iofog-agent container.

## Conclusion

You that you have a local ioFog environment running, you can learn more [about Microservices](../microservices/overview.html), take the [Tutorial](../tutorial/introduction.html), or [setup your production environment](setup-your-controllers.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
