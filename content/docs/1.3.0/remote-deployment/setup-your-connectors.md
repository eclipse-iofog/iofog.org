# Setup Your Connectors

Connectors are components of an ioFog Edge Compute Network ('ECN') which allow distributed Microservices to communicate amongst one another.

Like Controllers, there are two flavours of Connector deployments - Vanilla and Kubernetes. You are free to deploy Connectors onto the same Kubernetes cluster or remote host as your Controller. The latter approach is not recommended for production environments.

## Deploy Connectors on Kubernetes

Create a template of connectors.yaml like so:

```bash
echo "---
name: meerkat-1
kubeconfig: ~/.kube/config" > /tmp/connector.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy connector -f /tmp/connector.yaml
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href=#verify-the-deployment>skip ahead</a>.

## Deploy Connectors on Remote Hosts

Create a template of connector.yaml like so:

```bash
echo "---
name: meerkat-1
user: foo
host: 38.101.23.3
keyfile: ~/.ssh/id_rsa" > /tmp/connector.yaml
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
