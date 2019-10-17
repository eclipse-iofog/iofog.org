## Eclipse-ioFog 

### 1.2.0 Release

[Get Started with release 1.2.0 Beta](/getting-started/core-concepts.html)

1.2.0 brings new quality of life improvements as well as a set of backend changes that extend and unify ioFog's capabilities.


### What's New?

- **Kubernetes integration!** First release of ioFog supporting Kubernetes integration, and first releases of [iofog-kubelet](https://github.com/eclipse-iofog/iofog-kubelet/releases/tag/v1.2.0) and [iofog-operator](https://github.com/eclipse-iofog/iofog-operator/releases/tag/v1.2.0) microservices
- **[Iofogctl](https://github.com/eclipse-iofog/iofogctl/releases/tag/v1.2.0)** command line interface for management of Edge Compute Networks (see [iofogctl tutorial](/docs/1.2.0/tools/iofogctl.html)) running on both Linux and Mac
- **[Helm chart](https://github.com/eclipse-iofog/helm/releases/tag/v1.2.0)** for easy installation of ioFog Edge Compute Network to existing Kubernetes cluster (see [helm tutorial](/docs/1.2.0/getting-started/how-to-helm.html))
- **[Platform tools](https://github.com/eclipse-iofog/platform/tree/1.2.0)** for easy infrastructure and Kubernetes cluster setup on Google Cloud Platform and Packet (see [platform tutorial](/docs/1.2.0/tools/platform-tools.html))
- Many bugfixes in the ioFog engine: [controller](https://github.com/eclipse-iofog/Controller/releases/tag/v1.2.0), [connector](https://github.com/eclipse-iofog/Connector/releases/tag/v1.2.0) and [agent](https://github.com/eclipse-iofog/Agent/releases/tag/v1.2.0)

### Changelogs

##### Agent (v1.2.0)

- Send Agent's external IP to Controller
- Bugfix: Selecting the network interface that has Controller connectivity
- Bugfix: Use local docker images when offline

##### Connector (v1.2.0)

- Limit port range to 50 ports in default configuration file

##### Controller (v1.2.0)

- Return Agent's external IP for Kubelet
- Add uptime to status endpoint
- Bugfix: Requests not failing if with additional properties

##### Kubelet (v1.2.0)

- Initial release!

##### Iofogctl (v1.2.0)

- Initial release!

##### Helm Chart (v1.2.0)

- Initial release!

##### Platform Tools (v1.2.0)

- Initial release!

### Current Stable Version:

**ioFog 1.2.5** is the latest stable version of ioFog release.
 
[Documentation for the current stable release](./getting-started/core-concepts.html)

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

#### Agent

Agent is your daemon on your edge device. This will setup docker and ioFog, 
on your device, which you can then connect your your controller. For instructions on setting this up see
[Agents Overview](/agents/overview.html)

#### Controller

Controller will act as your central entry point to your ioFog Edge Compute Network(ECN). 
This will manage your Connectors, Agents, and microservice deployments. 

To deploy Controller manually and not through iofogctl, please see [this guide](./controllers/overview.html)

#### Connector

Connector will facilitate inter-Agent communication for microservices to send data to each other in a secure fashion.

#### Kubelet

#### Platform Tools