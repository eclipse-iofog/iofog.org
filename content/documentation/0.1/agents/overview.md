---
title: "Agents Overview"
category: "Agents"
type: "documentation"
version: "0.1"
---

# Agents
An Edge Compute Network (ECN) running ioFog is made up of one or more devices, referred to as **nodes**. Each node runs a daemon service called an **Agent**. Each node's Agent handles the starting, stopping, and management of the one or more [**microservices**](microservices-overview) running on that particular node. These microservices are deployed using [Docker containers](https://docs.docker.com/engine/docker-overview/#the-docker-platform).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-node.svg" alt=""> Need to setup your Agents?</h3>
  <p>Instructions on how to install the Agent daemon on your fog nodes <a href="setup-your-agents">can be found here</a>.</p>
</aside>

For full usage details see the [Agent CLI Usage](agent-cli-usage) page.
