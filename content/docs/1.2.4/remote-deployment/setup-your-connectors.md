# Setup Your Connectors

Connectors are components of an ioFog Edge Compute Network ('ECN') which allow distributed Microservices to communicate amongst one another.

Like Controllers, there are two flavours of Connector deployments - Vanilla and Kubernetes. You are free to deploy Connectors onto the same Kubernetes cluster or remote host as your Controller. The latter is not recommended for production environments.

## Deploy Connectors on Kubernetes

Create a template of connectors.yaml like so:

```bash
echo "---
name: Connector-1
kubeconfig: ~/.kube/config" > /tmp/connector.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy connector -f /tmp/connector.yaml
```

## Deploy Connectors on Remote Hosts

Create a template of connector.yaml like so:

```bash
echo "---
name: Connector-1
user: <Remote Username>
host: <Remote Hostname>
keyfile: <~/.ssh/id_rsa>" > /tmp/connector.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy connector -f /tmp/connector.yaml
```

## Verify the Deployment

We can use the following commands to verify the Connector is up an running:

```bash
iofogctl get connectors
```

```bash
iofogctl describe connector Connector-1
```

[Continue To Next Step: Setup your Agents](setup-your-agents.html).