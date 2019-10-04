# Introduction

In this tutorial, we'll cover how to create, deploy, and manage our first microservices using ioFog.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Familiar with the Core Concepts?</h3>
  <p>If you aren't already familiar with the core concepts of ioFog, you'll want to check out <a href="../getting-started/core-concepts.html">our Core Concepts</a> section.</p>
</aside>

## Setup Demo Project

In this tutorial, we are going to extend on the ioFog demo project we have previously used in [Quickstart](../getting-started/quick-start.html). Please follow the instructions on how to download all prerequisites required for running the demo project.

We can skip this section if we have already downloaded the demo project from [Quickstart](../getting-started/quick-start.html).

On Unix based systems, download our tar.gz package.

```bash
cd where/we/want/iofog-demo
curl -L -o demo.tar.gz https://github.com/eclipse-iofog/demo/archive/v1.3.0.tar.gz
tar -zxvf demo.tar.gz --strip-components=1
```

On windows, [download tutorial .zip package](https://github.com/eclipse-iofog/demo/archive/v1.3.0.zip). Then unzip the contents into a preferred working directory.

## Bootstrap the Project

Unlike in the Quickstart, this time we spin up the ioFog stack (Agent, Controller, and Connector) if not already up and additionally we spin up tutorial services on our local machine. We will use the ioFog stack and tutorial microservices later in the tutorial.

```sh
$ ./start.sh tutorial
```

We can optionally verify the ioFog stack is provisioned correctly. The automated tests run a smoke test suite on the ioFog stack, testing basic operations.

```sh
$ ./test.sh
```

When we are finished, we can tear down the ioFog stack and all services deployed on it.

```sh
$ ./stop.sh
```

## Get To Know ioFog

With a working ioFog environment set up, we're now ready to get to know ioFog.

[Continue To Next Step: Get To Know ioFog](get-to-know-iofog.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you run into an issue, have a question, or just want to get plugged into the community, head over to our <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>
