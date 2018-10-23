---
title: "Setup Your Agents"
category: "Getting Started"
type: "documentation"
version: "0.1"
---

# Setup Your Agents

An ioFog Agent is the microservice platform that runs on your individual edge hardware nodes. To set it up, you'll need to install the 'iofog' daemon on each of these devices.

### Minimum Requirements

The Agent daemon runs on nearly any Linux device with Docker and Java.

- Processor: x86-64, Dual Core or better
- RAM: 1 GB minimum
- Hard Disk: 5 GB minimum
- Linux v3.10 or higher (Ubuntu, Debian, Fedora, Red Hat, CentOS, Raspbian, etc)
- Docker v1.10 or higher
- Java Runtime v8.0.0 or higher

## Automatic Setup (recommended)
If your edge device has an internet connection it can be set up automatically using our install script:

```bash
curl -sSf https://iofog.org/install.sh | sh
```

This will do the work of installing the correct daemon for your operating system as well setting up Docker and Java, if they aren't already.

Once installation is complete you can go straight to [setting up your Controller](setup-your-controllers), or learn more about the [Agent](agent-overview).

***

## Manual Setup (alternative)
If for any reason you'd prefer to set things up manually, you can install Docker and Java using your preferred method, and then install the 'iofog' daemon.

### Install Dependencies
#### Docker
You can install the latest version of Docker with following command:

```bash
curl -sSf https://get.docker.com/ | sh
```

Or you using one of the other methods available at [docker.com](https://docs.docker.com/install/).

#### Java
Unfortunately there isn't single curl script you can use to install Java.

You can find official Java SE Runtime downloads on [Oracle's website](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) or alternatively install the [OpenJDK Runtime](http://openjdk.java.net/install/).

### Install iofog Daemon
#### Ubuntu/Debian
```bash
curl https://iofog.org/download/linux/iofog.deb
sudo dpkg -i iofog.deb
```

<!--
TODO: maybe apt-get, but lots of work for little benefit in our case AFAIK.
Maybe if we want to have iofog services shared via a custom registry?

```
curl -fsSL https://iofog.org/download/linux/ubuntu/gpg | apt-key add -
```
-->


#### CentOS/Red Hat/Fedora
```bash
curl https://iofog.org/download/linux/iofog.rpm
sudo yum install iofog.rpm
```

#### Download the Binaries
The ioFog project download consists of a number of jar files and shell scripts. It requires Java, Docker, and to be run on an x86 Linux environment.

```bash
curl https://iofog.org/download/linux/iofog.tar.gz
tar xzvf iofog.tar.gz

# Optional: move it to a directory on your executable path
sudo cp iofog/* /usr/bin/
```
