---
title: "Quick Start"
category: "Getting Started"
type: "documentation"
version: "0.1"
---

# Quick Start
In this Quick Start guide we'll create a simple ioFog setup <b>on a single Linux machine</b>, allowing you to quickly get a feel for ioFog.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-node.svg" alt=""> Want to setup for production?</h3>
  <p>This Quick Start guide is intended to get you up and running as quickly as possible, running everything on a single machine.</p>
  <p>To setup your production environment, you'll likely want to instead:
    <ul>
      <li><a href="setup-your-agents">Install the Agent</a> on each of your edge nodes</li>
      <li><a href="setup-your-controllers">Setup your Controller</a></li>
      <li><a href="setup-your-connectors">Setup your Connector</a></li>
    </ul>
  </p>
</aside>

#### Requirements
- Linux x86 (Ubuntu, Debian, Fedora, Red Hat, CentOS, Raspbian, etc)

## Automatic Setup

```bash
curl -sSf https://iofog.org/quick-start.sh | sh
```

This will do the work of installing the correct daemon for your operating system as well setting up Docker and Java, if they aren't already.

## Getting To Know ioFog
