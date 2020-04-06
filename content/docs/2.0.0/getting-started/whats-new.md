# What's New in ioFog 2?

- [ioFog Connector](https://github.com/eclipse-iofog/Connector) removed from the ECN architecture and replaced with [ioFog Router](https://github.com/eclipse-iofog/router), [Skupper Proxy](https://github.com/eclipse-iofog/skupper-proxy) and [ioFog Port Manager](https://github.com/eclipse-iofog/port-manager), see [Architecture Concepts](../getting-started/architecture.html) article for details
- Improved [registry and catalog items management](../microservices/microservice-registry-catalog.html) in ioFog Controller
- [Exposing public ports](../microservices/microservice-exposing.html) for deployed microservices
- [Docker image pruning](../agent-management/docker-image-pruning.html) feature for ioFog Agent
- [Attach and detach](../agent-management/attach-detach.html) ioFog Agents between ECNs
- [Volume management](../agent-management/volumes.html) for pushing Microservice data to Agents
- [Moving and renaming microservices](../microservices/microservice-move-rename.html) support in iofogctl
- [Default namespace](../iofogctl/getting-familiar.html#working-with-namespaces) support in iofogctl
- [Platform tools repository](https://github.com/eclipse-iofog/platform) is no longer supported, please follow our guide on how to [Prepare your or managed Kubernetes cluster](../platform-deployment/kubernetes-prepare-cluster.html)

Following is a list of API breakages and other important changes to user interaction, mostly on the `iofogctl` usage.

## Small changes to the Microservice YAML structure

We realised that the specification for microservices was a bit confusing, so we have added a new `container` key in the spec. The container key contains all configuration related to the actual Docker container running on the Agent.

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
    - msvc-2
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
  routes:
    - msvc-2
```

This should make clearer what relates to the ioFog microservice, and what relates to the configuration of the actual container running on the Agent.

## Configure Default Namespace

You can now configure which namespace is used as the default one by running:

```bash
iofogctl configure default-namespace NAMESPACE
```

This allows you to use any namespace when omitting the `--namespace` flag from iofogctl commands.

## Prune Docker on an Agent

Agent disk space is a precious resource. We can reclaim disk space by pruning Docker images from our Agents:

```bash
iofogctl prune agent NAME
```

**Soon to come:**
You can also configure an automated pruning frequency using the `AgentConfig` kind

```yaml
apiVersion: iofog.org/v2
kind: AgentConfig
metadata:
  name: alpaca-1
spec:
  pruningFrequency: 300 # Prune every 300 seconds
```

## Move a microservice to another Agent

Up until now, if you needed to move a microservice to another agent, you had to update its deployment YAML file, and redeploy the microservice.

Now, you can simply use:

```bash
iofogctl move microservice NAME AGENT_NAME
```

## Detach / Attach an Agent

Ever wondered how to transfer an Agent from one ECN to another? It's very simple:

```bash
iofogctl detach agent NAME -n NAMESPACE_A
iofogctl attach agent NAME -n NAMESPACE_B
```

Keep in mind that detaching an agent will delete its connection with the Controller, and all microservices will be shut down.

If you have an Agent ready and running on a remote host, you can also attach it directly using host and ssh credentials:

```bash
iofogctl attach agent NAME --host HOST --host AGENT_HOST --user SSH_USER --port SSH_PORT --key SSH_PRIVATE_KEY_PATH
```

## New Volume Kind

Does your microservice require some secret files, or initialisation data?

You have always been able to use volume mappings to mount agent folders into your microservice container. However, until now there was no way to send those files/folders to your Agent using iofgoctl.

We have now introduced a new `Volume` kind that, when deployed, will let iofogctl copy folders over to your Agents, using SSH connections.

```yaml
apiVersion: iofog.org/v2
kind: Volume
spec:
  name: secret
  source: /tmp/
  destination: /tmp/secrets/
  permissions: 666
  agents:
    - name: agent-1
    - name: agent-2
```

This will create a folder `/tmp/secrets/` on both agents `agent-1` and `agent-2`, and will copy the contents of `/tmp/` of the computer running iofogctl into it.

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
   public: 5001
   protocol: tcp
...
```

Deploying such a configuration would result in port 5001 being opened on the Controller host, and all incoming tcp traffic would be tunneled to agent-1, port 5000.

The public address can be retrieved using:

```bash
iofogctl describe microservice NAME
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
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/getting-started/whats-new.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
