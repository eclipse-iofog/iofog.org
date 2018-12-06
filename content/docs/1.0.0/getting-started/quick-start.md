# Quick Start

In this Quick Start guide we'll download a simple ioFog setup <b>on your local machine</b> containing a [Controller](../controllers/overview.html), [Connector](../connectors/overview.html), and an [Agent](../agents/overview.html). This gives you a quick way to start playing with ioFog, but can also be used as your local development environment on any machine that can run Docker.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Want to setup for production?</h3>
  <p>This Quick Start guide is intended to get you up and running as quickly as possible, running everything on your local machine.</p>
  <p>To setup your production environment, you'll likely want to instead:
  </p>
  <ul>
      <li><a href="setup-your-controllers">Setup your Controller</a></li>
      <li><a href="setup-your-connectors">Setup your Connector</a></li>
      <li><a href="setup-your-agents">Setup the Agent</a> on each of your edge nodes</li>
    </ul>
</aside>

#### Minimum Requirements

ioFog requires a Linux environment, however this Quick Start has everything already setup inside a Linux [Docker container](https://docs.docker.com/get-started/) that can run on Mac or Windows as well.

- **Linux** v3.10+ (Ubuntu, CentOS, Raspbian, etc), **macOS** 10.12+, or **Windows** 7+
- **Docker** 1.10+

## Setup

- [Linux](#linux)
- [macOS](#macos)
- [Windows](#windows)

### Linux

---

#### Install Docker

You can install the latest version of Docker with following command:

```sh
curl -sSf https://get.docker.com/ | sh
```

or

Download Docker for [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/), or [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/).

Next we need to install Docker Compose. For the latest instructions [see the Docker Compose Install Guide](https://docs.docker.com/compose/install/#install-compose), however it should be similar to this:

```sh
# This has version 1.22.0 hardcoded, you probably
# should change it to what ever the latest version is!

sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### Download ioFog Quick Start

Finally we need to download the ioFog Quick Start project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

```sh
cd where/you/want/quick-start-project
curl -L -o quick-start.tar.gz https://github.com/ioFog/demo/archive/blank-environment.tar.gz
tar -zxvf quick-start.tar.gz --strip-components=1
```

[Once you're done, you can skip straight to the next section](#bootstrap-the-project)

### macOS

---

#### Install Docker

Docker for Mac can be installed from the Docker Store

[Download Docker from Docker Store](https://docs.docker.com/docker-for-mac/install/)

#### Download ioFog Quick Start

Finally we need to download the ioFog Quick Start project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

```sh
cd where/you/want/quick-start-project
curl -L -o quick-start.tar.gz https://github.com/ioFog/demo/archive/blank-environment.tar.gz
tar -zxvf quick-start.tar.gz --strip-components=1
```

or alternatively you can manually download it:

[Download Tutorial project](https://github.com/ioFog/demo/archive/blank-environment.zip)

[Once you're done, you can skip straight to the next section](#bootstrap-the-project)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Mac?</h3>
  <p>Docker for Mac allows you to run Linux containers on your Mac. Under the hood it uses a <a href="https://docs.docker.com/docker-for-mac/docker-toolbox/">lightweight Virtual Machine</a> to provide the Linux environment to containers.</p>
</aside>

### Windows

---

#### Install Docker

Docker for Windows can be installed from the Docker Store:

[Download Docker from Docker Store](https://docs.docker.com/docker-for-windows/install/)

#### Download ioFog Quick Start

Finally we need to download the ioFog Quick Start project, which will use Docker to run Linux containers for an ioFog [Agent](../agents/overview.html), [Controller](../controllers/overview.html), and [Connector](../connectors/overview.html) that are already setup for you.

[Download Quick Start project](https://github.com/ioFog/demo/archive/blank-environment.zip)

You'll then need to unzip the contents into your preferred working directory.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Docker for Windows?</h3>
  <p>Docker for Windows allows you to run Linux containers on your Windows. Under the hood it uses a lightweight Virtual Machine to provide the Linux environment to containers.</p>
</aside>

## Bootstrap the Project

Inside the project directory we downloaded, go ahead and run:

```sh
docker-compose up --detach
```

The first time this is run it will download and build several Docker images for our ioFog setup. This may take a few minutes.

After it's all up, confirm it's working correctly by running `docker ps`:

```sh
docker ps
```

You should see three containers running:

```sh
CONTAINER ID    IMAGES                         etc...     NAMES
...             iofog-env_iofog-agent                     iofog-agent
...             iofog-env_iofog-controller                iofog-controller
...             iofog-env_iofog-connector                 iofog-connector
```

When you're done, you can shut everything down with `docker-compose stop`

```sh
docker-compose stop
# or to stop as well as remove the container/networking:
docker-compose down
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
