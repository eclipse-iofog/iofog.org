# Overview

An **Edge Compute Network** (ECN) running ioFog is made up of one or more devices, referred to as **nodes**. Each node runs a daemon service called an **Agent**. Each node's Agent locally handles the starting, stopping, and management of the one or more microservices running on that particular node. These microservices are deployed as Linux kernel containers (LXC), commonly using [Docker](https://docs.docker.com/engine/docker-overview/#the-docker-platform).

While the Agent daemon is a CLI, after setting things up a majority of your management tasks—such as starting/stopping microservices—will instead be done using the [Controller](../reference-controller/overview.html), which controls the Agent on your behalf, remotely. This allows you to deploy and maintain microservices without needing to SSH directly onto every edge node device.

For full usage details see the [Agent CLI Usage](cli-usage.html) page.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more about microservices</h3>
  <p>The Agent is what gives your edge nodes the ability to spawn microservices. If you'd like to learn more about them, check out the <a href="../developing-microservices/overview.html">Microservices Overview</a></p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/reference-agent/overview.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
