# What's New in ioFog 2?

- [ioFog Connector](https://github.com/eclipse-iofog/Connector) removed from the ECN architecture and replaced with [ioFog Router](https://github.com/eclipse-iofog/router), [Skupper Proxy](https://github.com/eclipse-iofog/skupper-proxy) and [ioFog Port Manager](https://github.com/eclipse-iofog/port-manager). See [Architecture Concepts](../getting-started/architecture.html) article for details
- Improved [registry and catalog items management](../microservices/microservice-registry-catalog.html) in ioFog Controller
- [Exposing public ports](../microservices/microservice-exposing.html) for deployed microservices
- [Docker image pruning](../agent-management/docker-image-pruning.html) feature for ioFog Agent
- [Attach, detach, and move](../agent-management/attach-detach.html) ioFog Agents between ECNs
- [Volume management](../agent-management/volumes.html) for pushing Microservice data to Agents
- [Moving and renaming microservices](../microservices/microservice-move-rename.html) support in iofogctl
- [Current namespace](../iofogctl/getting-familiar.html#working-with-namespaces) configuration in iofogctl
- [Platform tools repository](https://github.com/eclipse-iofog/platform) is no longer supported, please follow our guide on how to [Prepare your Kubernetes cluster](../platform-deployment/kubernetes-prepare-cluster.html)

Following is a list of API breakages and other important changes to user interaction, mostly on the `iofogctl` usage.

## New YAML Kinds

We have split up the previous ControlPlane kind into three: ControlPlane, KubernetesControlPlane, and LocalControlPlane. This change makes our deployment specs more explicit and less error prone. See the [reference docs](../reference-iofogctl/reference-control-plane.html) for full details.

### New Route kind

We have extracted `Routes` to become a first class kind. Routes now require a name and can be deployed as part of an application, or as a separate kind.
Routes are no longer supported inside the `Microservice` kind. See the [reference docs](../reference-iofogctl/reference-route.html) for full details.

Before:

```yaml
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: msvc-1
spec:
  agent:
    name: agent-name
    config: {}
  images:
    x86: hello-world
  env:
    - key: MY_ENV
      value: 42
  ports:
    - internal: 80
      external: 5000
  rootHostAccess: true
  volumes: []
  commands: []
  config:
    config-key: 'config-value'
  application: app-1
  routes:
    - dest-msvc-name
```

After:

```yaml
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: msvc-1
spec:
  agent:
    name: agent-name
    config: {}
  images:
    x86: hello-world
  env:
    - key: MY_ENV
      value: 42
  ports:
    - internal: 80
      external: 5000
  rootHostAccess: true
  volumes: []
  commands: []
  config:
    config-key: 'config-value'
  application: app-1
---
apiVersion: iofog.org/v2
kind: Route
metadata:
  name: my-route
spec:
  from: msvc-1
  to: dest-msvc-name
```

### New Volume Kind

Does your microservice require some secret files or initialisation data?

You have always been able to use volume mappings to mount agent folders into your Microservice container. However, until now there was no way to send those files/folders to your Agent using iofogctl.

We have now introduced a new `Volume` kind that which, when deployed, will let iofogctl copy folders over to your Agents over SSH.

```yaml
apiVersion: iofog.org/v2
kind: Volume
spec:
  name: secret
  source: /tmp/
  destination: /tmp/secrets/
  permissions: 666
  agents:
    - agent-1
    - agent-2
```

This will create a folder `/tmp/secrets/` on both agents `agent-1` and `agent-2`, and copy the contents of `/tmp/` of the computer running iofogctl into it.

## Container Key added to Microservice YAML Specification

We realised that the specification for Microservices was a bit confusing, so we have added a new `container` key. The container key contains all configuration related to the actual Docker container running on the Agent.

Before:

```yaml
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: msvc-1
spec:
  agent:
    name: agent-name
    config: {}
  images:
    x86: hello-world
  env:
    - key: MY_ENV
      value: 42
  ports:
    - internal: 80
      external: 5000
  rootHostAccess: true
  volumes: []
  commands: []
  config:
    config-key: 'config-value'
  application: app-1
```

After:

```yaml
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: msvc-1
spec:
  agent:
    name: alpaca-1
    config: {}
  images:
    x86: hello-world
  container: # This is the new key
    env:
      - key: MY_ENV
        value: 42
    ports:
      - internal: 80
        external: 5000
    rootHostAccess: true
    volumes: []
    commands: []
  config:
    config-key: 'config-value'
  application: app-1
```

This way it is clear as to which information relates to the ioFog Microservice and which information relates to the configuration of the actual container running on the Agent.

## Configure Current Namespace

You can now configure which namespace is used as by default by running:

```bash
iofogctl configure current-namespace namespace-1
```

This allows you to use any namespace when omitting the `--namespace` or `-n` flag from iofogctl commands.

## Prune Docker on an Agent

Agent disk space is a precious resource. We can reclaim disk space by pruning Docker images from our Agents:

```bash
iofogctl prune agent agent-1
```

You can also configure an automated pruning frequency using the `AgentConfig` kind

```yaml
apiVersion: iofog.org/v2
kind: AgentConfig
metadata:
  name: alpaca-1
spec:
  pruningFrequency: 300 # Prune every 300 seconds
```

## Move a Microservice to another Agent

Up until now, if you needed to move a Microservice to another Agent, you had to update its deployment YAML file, and redeploy the Microservice.

Now, you can simply use:

```bash
iofogctl move microservice msvc-1 agent-2
```

## Detach / Attach an Agent

Ever wondered how to transfer an Agent from one ECN to another? It's very simple:

```bash
iofogctl detach agent agent-1 -n namespace-1
iofogctl attach agent agent-1 -n namespace-2
```

Keep in mind that detaching an agent will delete its connection with the Controller, and all Microservices will be shut down.

We can also move Agents between Namespaces with a single command. The following command will move agent-1 from namespace-1 to namespace-2:

```bash
iofogctl move agent agent-1 -n namespace-1 namespace-2
```

## Microservice Public Ports

Public Ports allow your microservices to securely expose public endpoints without opening ports on your Agents.

When deploying applications and microservices, you can now specify extra fields (`public`, `host` and `protocol`) when configuring the port mappings of your container.

If `public` is specified, this will open a tunnel that will forward all traffic incoming onto the port exposed by the container.

`host` allows you to specify the Agent that will open the public port, the default value being that the public port is opened alongside your Controller (same host for a Vanilla Controller, as a separate Load Balancer for a K8s deployment).

`protocol` lets you decide between `http` and `tcp`. It tells the public port which type of traffic to forward. the default value is `http`.

```yaml
...
name: msvc-1
agent:
 name: agent-1
container:
 ...
 ports:
 - internal: 80
   external: 5000
   proxy: true
   protocol: tcp
...
```

Deploying such a configuration would result in a port being opened on the public host, and all incoming tcp traffic would be tunneled to agent-1, port 5000.

The public address can be retrieved using:

```bash
iofogctl describe microservice msvc-1
```

The outputted YAML will contain a `publicLink` key, with the value set to the URL of the public port.

## Connector has been Replaced with AMQP Routers

We have removed Connector from ioFog altogether.

The communication between Agents, the transmission of ioMessages, and the public port tunneling is done using AMQP routers.

By default, when deploying a Controller, an interior router gets deployed next to it. If not specified otherwise at deploy time, each Agent will run an edge router, connected to the main interior router.

Using the `AgentConfig` kind, it is possible to define your own network topology, and run an interior router on an Agent, or have an Agent that does not run any router but connects to the edge router of another accessible Agent on its network.

When the network topology is customised, it allows for direct communication between Agents on the same network, without going back upstream to the default interior router.

If you want to know more about this, please contact us on Slack and a member of our team will take the time of helping you through setting up your own network topology.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/getting-started/whats-new.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
