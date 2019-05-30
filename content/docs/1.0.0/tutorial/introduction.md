# Introduction

In this tutorial, we'll cover how to create, deploy, and manage your first microservices using ioFog.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Familiar with the Core Concepts?</h3>
  <p>If you aren't already familiar with the core concepts of ioFog, you'll want to check out <a href="../getting-started/core-concepts.html">our Core Concepts</a> section.</p>
</aside>

### Minimum Requirements

ioFog requires a Linux environment, however this Tutorial has everything already setup inside a Linux [Docker container](https://docs.docker.com/get-started/) that can run on Mac or Windows as well.

- **Linux** v3.10+ (Ubuntu, CentOS, etc), **macOS** 10.12+, or **Windows** 7+
- **Docker** 1.10+

## Setup

- [Linux](#linux)
- [macOS](#macos)
- [Windows](#windows)
- [Raspbian](#raspbian-usage)

### Linux

---

#### Install Docker and Docker-Compose

You can install the latest version of Docker with following command:

```bash
curl -sSf https://get.docker.com/ | sh
```

Or download Docker manually for: [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/) or [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/).

Next we need to install Docker Compose. For the latest instructions [see the Docker Compose Install Guide](https://docs.docker.com/compose/install/#install-compose). Note the version to download. This tutorial requires docker-compose version `1.24`.

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Download Tutorial Project

Finally we need to download the Tutorial project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

```bash
cd where/you/want/tutorial-project
curl -L -o tutorial.tar.gz https://github.com/ioFog/demo/archive/develop.tar.gz
tar -zxvf tutorial.tar.gz --strip-components=1
```

[Once you're done, you can skip straight to the next section](#bootstrap-the-project)

### macOS

---

#### Install Docker

Docker for Mac can be installed from the Docker Store

[Download Docker from Docker Store](https://docs.docker.com/docker-for-mac/install/)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Mac?</h3>
  <p>Docker for Mac allows you to run Linux containers on your Mac. Under the hood it uses a <a href="https://docs.docker.com/docker-for-mac/docker-toolbox/">lightweight Virtual Machine</a> to provide the Linux environment to containers.</p>
</aside>

#### Download Tutorial Project

Next we need to download the Tutorial project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

```sh
cd where/you/want/tutorial-project
curl -L -o tutorial.tar.gz https://github.com/ioFog/demo/archive//develop.tar.gz
tar -zxvf tutorial.tar.gz --strip-components=1
```

or alternatively you can manually download it:

[Download Tutorial project](https://github.com/ioFog/demo/archive/demo-environment.zip)

[Once you're done, you can skip straight to the next section](#bootstrap-the-project)

### Windows

---

#### Install Docker

Docker for Windows can be installed from the Docker Store:

[Download Docker from Docker Store](https://docs.docker.com/docker-for-windows/install/)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Windows?</h3>
  <p>Docker for Windows allows you to run Linux containers on your Windows. Under the hood it uses a lightweight Virtual Machine to provide the Linux environment to containers.</p>
</aside>

#### Download Tutorial Project

Next we need to download the Tutorial project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

[Download Tutorial project](https://github.com/ioFog/demo/archive//develop.zip)

Unzip the contents into your preferred working directory.

### Raspbian Usage

---

While we fully support using Raspberry Pi's as workers on the edge environment, they are not meant
to be used as the Controller and Connector infrastructure. The normal quick-starts above will bring up an entire containerized
edge environment for usage, while this section will specify using the Raspberry Pi as an agent in your
edge infrastructure.

#### Raspbian Agents

We have a general guide for Agent Setup [**Here.**](https://iofog.org/docs/1.0.0/getting-started/setup-your-agents.html)

## Bootstrap the Project

Start by spinning up the ioFog stack (Agent, Controller, and Connector) and tutorial services on your local machine. This creates a fully configured Edge Compute Network (ECN) and deploys microservices that we will use later in the tutorial.

```sh
$ ./start.sh tutorial
```

You can optionally verify the ioFog stack is provisioned correctly. The automated tests run a smoke test suite on the  ioFog stack, testing basic operations.

```sh
$ ./test.sh
```

When you are finished, tear down the ioFog stack and all services deployed on it.

```sh
$ ./stop.sh
```

## Get To Know ioFog

With a working ioFog environment set up, we're now ready to [get to know ioFog](get-to-know-iofog.html).

[Continue To Next Step](get-to-know-iofog.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you run into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
