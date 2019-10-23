# Setup Your Connectors

Connectors are components of an ioFog Edge Compute Network ('ECN') which allow distributed Microservices to communicate amongst one another.

Like Controllers, there are two flavours of Connector deployments - Vanilla and Kubernetes. You are free to deploy Connectors onto the same Kubernetes cluster or remote host as your Controller. The latter approach is not recommended for production environments.

## Deploy Connectors on Kubernetes

Create a template of connectors.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: meerkat-1
spec:
  kubeConfig: ~/.kube/config" > /tmp/connector.yaml
```

To deploy, run:

```bash
iofogctl deploy -f /tmp/connector.yaml
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href=#verify-the-deployment>skip ahead</a>.

## Deploy Connectors on Remote Hosts

Create a template of connector.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: meerkat-1
spec:
  user: foo
  host: 38.101.23.3
  keyFile: ~/.ssh/id_rsa" > /tmp/connector.yaml
```

Make sure to edit the `user`, `host`, and `keyfile` fields to correspond with the remote host you are deploying to.

Once you have edited the fields to your liking, go ahead an run:

```bash
iofogctl deploy -f /tmp/connector.yaml
```

## Verify the Deployment

We can use the following commands to verify the Connector is up an running:

```bash
iofogctl get connectors
```

```bash
iofogctl describe connector meerkat-1
```

[Continue To Next Step: Setup your Agents](setup-your-agents.html).
