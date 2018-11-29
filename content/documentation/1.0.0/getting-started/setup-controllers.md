---
title: "Setup Your Controllers"
category: "Getting Started"
type: "documentation"
version: "1.0.0"
---

# Setup Your Controllers
Since your Edge Compute Network is likely distributed—composed of many different devices across networks, each with potentially differing microservices—a piece of software called the **Controller** is used for orchestration of the different [Agents](agents-overview).

Because the Controller daemon keeps track of all your Agents automatically, even across complicated network configurations, you can use it to maintain the entire fleet, remotely. Small Edge Compute Networks will only need a single Controller, however, running multiple Controllers is also supported for increased resiliency.

### Minimum Requirements
  - Processor: x86-64 or ARM Dual Core or better
  - RAM: 1 GB minimum
  - Hard Disk: 5 GB minimum
  - Linux kernel v3.10+ (Ubuntu, CentOS, Raspbian, etc), macOS 10.12+, or Windows 7+
  - Node.js v8+ and NPM

## Setup
#### Node.js and NPM
The Controller software runs on Node.js, which is a JavaScript runtime built on Chrome's V8 JavaScript engine.

There are a number of ways of installing Node.js and NPM.

  - [Website download](https://nodejs.org/en/download/)
  - [With a Package Manager](https://nodejs.org/en/download/package-manager/) e.g. apt-get
  - [Using NVM](https://github.com/creationix/nvm#install-script) the Node Version Manager

### Install Controller Daemon
```sh
sudo npm install -g iofogcontroller --unsafe-perm
```

## Dev Mode
The Controller has a Dev Mode that allows you to get up and running more quickly without needing to deal with SSL certificates.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Dev Mode must be enabled on all Controllers, Connectors, and Agents</h3>
  <p>When you enable Dev Mode on your Controller, make sure all of your Agents and Connectors are also in Dev Mode, otherwise they will not be able to communicate.</p>
  <p>When you're ready for production, make sure you disable Dev Mode on all of them as well, and have valid SSL certificates installed.</p>
</aside>

To enter Dev Mode:

```sh
iofog-controller config dev-mode --on
```

and then to disable Dev Mode:

```sh
iofog-controller config dev-mode --off
```

With this enabled, the Controller will send and receive communications using `http://`, not `https://`, bypassing any need for SSL certificates.

## SSL Certificates
When not running in developer mode, the Controller requires a valid SSL certificate and key.

Ideally certificates would be signed by a Certificate Authority, but because that would require a public domain name, self-signed certificates are accepted as well.

### Using a Certificate Authority-Signed Certificate
To use a certificate signed by a supported Certificate Authority (CA) for your domain name, we'll need three things from them:

  - Intermediate certificate (from CA)
  - Your domain's SSL certificate
  - Your domain's SSL key

Instructions on how to obtain these vary, but [Let's Encrypt](https://letsencrypt.org/) (free!), [Symantec](https://www.websecurity.symantec.com/), [GlobalSign](https://www.globalsign.com/), and [Digicert](https://www.digicert.com/) are popular choices among others.

You'll want to place them somewhere safe but accessible on your Controller's file system. We can then add them to our Controller's configuration:

```sh
iofog-controller config add --intermediate-cert=path/to/intermediate.cert
iofog-controller config add --ssl-cert=path/to/ssl.cert
iofog-controller config add --ssl-key=path/to/ssl.key
```

### Creating a Self-Signed Certificate
Creating a self-signed certificate can be done a number of ways, but the most common is by using [OpenSSL](https://www.openssl.org/)

We'll create these two:

  - SSL certificate
  - SSL key

```sh
openssl req \
  -newkey rsa:2048 -nodes -keyout iofog.key \
  -x509 -days 365 -out iofog.crt
```

You'll want to place them somewhere safe but accessible on your Controller's file system. We can then add them to our Controller's configuration:

```sh
iofog-controller config add --ssl-cert=path/to/ssl.cert
iofog-controller config add --ssl-key=path/to/ssl.key
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Use the same certificate for Controllers, Connectors, and Agents</h3>
  <p>If you use self-signed certificates your Controllers, Connectors, and Agents likely need to be configured to use the same certificate/key pair so their communication is trusted.</p>
</aside>

For more information about creating self-signed certificates, [see this guide](https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs).

## Setup Your Users
Since the Controller can be accessed via REST calls to remotely control your ioFog network, if you plan to use this functionality you'll need to setup at least one user for remote authentication.

```sh
iofog-controller user add \
  --email <email> \
  --first-name <firstName> \
  --last-name <lastName> \
  --password <password>
```

To learn more about the REST APIs available for managing your Controller remotely, visit the [REST API Reference](rest-api-reference).

### Create Your ioFog Nodes
Your Controller manages all your ioFog nodes remotely by communicating with the [Agent](agents-overview) running on them.

To setup an ioFog node, it must first be running an Agent. Once it is, you can add it to your Controller and then receive a provisioning key that you'll add to your Agent.

Using the `iofog-controller iofog add` command we'll pass in a unique `name` for our node as well as the `fog-type`, which is number signifying the node's CPU architecture: `0` for automatic detection, `1` for x86 (and x64), and `2` for ARM. This command will return a unique node ID we'll use in our next step.

```sh
iofog-controller iofog add --name "my-fog-node" --fog-type 0
```

There is a number of other optional configuration options, such as CPU/memory/disk limits, enabling bluetooth, and others found in the [Controller CLI reference](controllers-cli-usage).

Next, copy the node ID that was return from calling `iofog-controller iofog add` above and use it to create a provisioning key:

```sh
iofog-controller iofog provisioning-key --node-id <node_id>
```

You can then use provide this provisioning key to [setup an Agent](setup-your-agents) on your edge node.

The key is only valid for **20 minutes** and is one-time use only.

## Start The Controller
Our Controller is all setup, let's go ahead and start it up!

```sh
iofog-controller start
```

## Conclusion
We now have a running Controller! Next you'll want to setup and configure your ioFog [node Agents](setup-your-agents), and optionally [set up your Connector](setup-your-connectors).

You can also [learn more about Controllers](controllers-overview) or change additional [configuration options](controllers-cli-usage).
