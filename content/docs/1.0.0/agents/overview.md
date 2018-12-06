# Agents
<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Need to setup your Agents?</h3>
  <p>Instructions on how to install the Agent daemon on your fog nodes <a href="../getting-started/setup-your-agents.html">can be found here</a>.</p>
</aside>

An **Edge Compute Network** (ECN) running ioFog is made up of one or more devices, referred to as **nodes**. Each node runs a daemon service called an **Agent**. Each node's Agent locally handles the starting, stopping, and management of the one or more [**microservices**](../writing-microservices/overview.html) running on that particular node. These microservices are deployed as Linux kernel containers (LXC), commonly using [Docker](https://docs.docker.com/engine/docker-overview/#the-docker-platform).

While the Agent daemon is a CLI, after setting things up a majority of your management tasks—such as starting/stopping microservices—will instead be done using the [Controller](../controllers/overview.html), which controls the Agent on your behalf, remotely. This allows you to deploy and maintain microservices without needing to SSH directly onto every edge node device.

For full usage details see the [Agent CLI Usage](cli-usage.html) page.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Learn more about microservices</h3>
  <p>The Agent is what gives your edge nodes the ability to spawn microservices. If you'd like to learn more about them, check out the <a href="../writing-microservices/overview.html">Microservices Overview</a></p>
</aside>
