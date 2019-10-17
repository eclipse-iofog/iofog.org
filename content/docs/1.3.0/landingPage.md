## Eclipse-ioFog 

### 1.3.0 Beta

[Get Started with release 1.3.0 Beta](/getting-started/core-concepts.html)

1.3.0 brings new quality of life improvements as well as a set of backend changes that extend and unify ioFog's capabilities.

### What's New?

- **ioFog Kubernetes support has been improved** by expanding the ioFog Kubernetes Operator's capabilities. Now orchestration of ioFog Kubernetes is handled by the Operator. Previously, Helm and iofogctl were handling this orchestration themselves, in disparate ways.
- **ioFog Controller** has been updated to allow for **external databases** to be used instead of the embedded SQLite default database. Helm and iofogctl have been updated to allow users to integrate their external databases during the deployment process.
- The unified CLI, iofogctl, has been improved to allow users more **granular control over resources like Connectors and Microservices**.
- iofogctl's YAML specification has been updated to accommodate its new features.
- Users can now **view realtime deployment status of Microservices through iofogctl** due to improvements to both ioFog Controller and Agent.
- The **iofog-go-sdk** has been updated to provide an **HTTP client for ioFog Controller's REST API**.

### Changelogs

- [Controller](https://github.com/eclipse-iofog/Controller/blob/v1.3.0-beta/CHANGELOG-1.3.md)
- [Agent](https://github.com/eclipse-iofog/Agent/blob/v1.3.0-beta/CHANGELOG-1.3.md)
- [Operator](https://github.com/eclipse-iofog/iofog-operator/blob/v1.3.0-beta/CHANGELOG-1.3.md)
- [Kubelet](https://github.com/eclipse-iofog/iofog-kubelet/blob/v1.3.0-beta/CHANGELOG-1.3.md)
- [iofogctl](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0-rc3/CHANGELOG-1.3.md)
- [Helm](https://github.com/eclipse-iofog/helm/blob/release/1.3.0/CHANGELOG.md)
- [ioFog Golang SDK](https://github.com/eclipse-iofog/iofog-go-sdk/blob/v1.3.0-beta/CHANGELOG-1.3.md)
- [Demo Project](https://github.com/eclipse-iofog/demo/blob/v1.3.0-beta/CHANGELOG-1.3.md)

### Current Stable Version:

**ioFog 1.2.5** is the latest stable version of ioFog release.
 
[Documentation for the current stable release](/docs/1.2.0/getting-started/core-concepts.html)

### Doc Overview Section

Index:
* [iofogctl](#iofogctl)
* [Agent](#Agent)
* [Controller](#Controller)
* [Connector](#Connector)
* [Kubelet](#Kubelet)
* [Platform Tools](#Platform Tools)

#### iofogctl

iofogctl is a control plane CLI to allow you, from a single computer, build an Edge Compute Network(ECN), deploy microservices, and create data routes between agents.
Through this control plane you can manage multiple ECNs at once, through standard namespaces or by simply seperating your controllers and agent connections manually.

To get started using iofogctl follow [these instructions](./tools/iofogctl/usage.html)

The following sections can all be handled through iofogctl, however, if you wish to set them up manually, please look at the relevant section below

#### Agent

Agent is your daemon on your edge device. This will setup docker and ioFog, 
on your device, which you can then connect your your controller. For instructions on setting this up manually please follow 
[this guide](./agents/overview.html)

#### Controller

Controller will act as your central entry point to your ioFog Edge Compute Network(ECN). 
This will manage your Connectors, Agents, and microservice deployments. 

To deploy Controller manually and not through iofogctl, please see [this guide](./controllers/overview.html)

#### Connector

Connector will facilitate inter-Agent communication for microservices to send data to each other in a secure fashion.

Connector setup can be done manually by following [this guide](./connectors/overview.html)

#### Platform Tools

Platform tools are a set of tools built by the ioFog team to make large deployments easier. This includes using terraform, and helm deploys to setup your devices easily.

For Helm instructions, please follow the [how to helm guide](./tools/how-to-helm.html)

For other platform tools, such as terraform, see our [platform tools guide](./tools/how-to-helm.html)


