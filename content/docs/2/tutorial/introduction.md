# Introduction

In this tutorial we will use a tutorial project to set up a local ECN with a set of example Microservices.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Familiar with the Core Concepts?</h3>
  <p>If you aren't already familiar with the core concepts of ioFog, you'll want to check out <a href="../getting-started/core-concepts.html">our Core Concepts</a> section.</p>
</aside>

## Prerequisites

The ioFog demo requires one of the following systems and tools to be installed. The scripts in this demo do not install any of these tools, but they check for sufficient versions.

Supported operating systems:

- Linux (kernel v3.10+)
- macOS 10.12+

Required tools:

- `Docker 1.10+`: Open platform for developing, shipping, and running applications. ([installation instructions](https://docs.docker.com/install/))
- `iofogctl 2.0.0+`: CLI tool and a one-stop-shop for all your ioFog needs. ([installation instructions](../getting-started/quick-start-local.html))

Make sure to follow the Docker [post-installation instructions](https://docs.docker.com/install/linux/linux-postinstall/) so that the Docker daemon can work without `sudo`. Otherwise, the commands in this guide will not work.

## Setup Demo Project

On Unix based systems, download our tar.gz package.

```bash
mkdir -p /tmp/iofog/demo
cd /tmp/iofog/demo
curl -L -o demo.tar.gz https://github.com/eclipse-iofog/demo/archive/v2.0.0-rc3.tar.gz
tar -zxvf demo.tar.gz --strip-components=1
```

## Bootstrap the Project

To get going, all we need to do is run:

```sh
./start.sh tutorial
```

We can optionally verify the ioFog stack is provisioned correctly. The automated tests run a smoke test suite on the ioFog stack, testing basic operations.

```sh
./test.sh
```

<aside class="notifications note">
  <p>Under the hood, those shell scripts are using iofogctl and YAML files to set up your environment. You'll get to use iofogctl directly in the next few sections. Impatient to know more? Dive directly into its <a href="../iofogctl/introduction.html" target="_blank">documentation</a>.</p>
</aside>

## Get To Know ioFog

With a working ioFog environment set up, we're now ready to get to know ioFog.

[Continue To Next Step: Get To Know ioFog](get-to-know-iofog.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you run into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/tutorial/introduction.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
