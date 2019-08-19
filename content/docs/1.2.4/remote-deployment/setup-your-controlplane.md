# Setup Your Control Plane

Every ioFog ECN (Edge Compute Network) starts with a Control Plane that allows you to manage your ECN's resources.

In this guide, our Control Plane will consist of a single Controller instance. In future, we will show you how to deploy a highly available Control Plane with multiple Controller instances.

There are two flavours of Controller deployments - Vanilla and Kubernetes. If you have a Kubernetes cluster, you can deploy a Controller directly on to it. Otherwise, a Linux remote host will do just fine.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Have you tried deploying a local ECN first?</h3>
  <p>In this guide we assume you are up and running with iofogctl. We recommened going through the <a href="https://iofog.org/docs/1.2.0/tools/iofogctl.html">Quick Start Guide</a> before continuing on here. </p>
</aside>

## Deploy Controllers on Kubernetes

Create a template of controlplane.yaml like so:

```bash
echo "---
iofoguser:
  name: <First Name>
  surname: <Surname>
  email: <Email Address>
  password: <Password>
controllers:
- name: Controller-1
  kubeconfig: ~/.kube/config" > /tmp/controlplane.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy controlplane -f /tmp/controlplane.yaml
```

## Deploy Controllers on Remote Hosts

Create a template of controlplane.yaml like so:

```bash
echo "---
iofoguser:
  name: <First Name>
  surname: <Surname>
  email: <Email Address>
  password: <Password>
controllers:
- name: Controller-1
  user: <Remote Username>
  host: <Remote Hostname>
  keyfile: <~/.ssh/id_rsa>" > /tmp/controlplane.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy controlplane -f /tmp/controlplane.yaml
```

## Verify the Deployment

We can use the following commands to verify the Control Plane is up and running:

```bash
iofogctl get controllers
```

```bash
iofogctl describe controlplane
```

[Continue To Next Step: Setup your Connectors](setup-your-connectors.html).