# Setup Your Control Plane

Every ioFog ECN (Edge Compute Network) starts with a Control Plane that allows you to manage your ECN's resources.

In this guide, our Control Plane will consist of a single Controller instance. In future, we will show you how to deploy a highly available Control Plane with multiple Controller instances.

There are two flavours of Controller deployments - Vanilla and Kubernetes. If you have a Kubernetes cluster, you can deploy a Controller directly on to it. Otherwise, a Linux remote host will do just fine.

## Deploy Controllers on Kubernetes

Create a template of controllers.yaml like so:

```bash
echo "---
controllers:
- name: Controller-1
  kubeconfig: ~/.kube/config
  iofoguser:
    name: <First Name>
    surname: <Surname>
    email: <Email Address>
    password: <Password>" > /tmp/controllers.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy controllers -f /tmp/controllers.yaml
```

## Deploy Controllers on Remote Hosts

Create a template of controllers.yaml like so:

```bash
echo "---
controllers:
- name: Controller-1
  user: <Remote Username>
  host: <Remote Hostname>
  keyfile: <~/.ssh/id_rsa>
  iofoguser:
    name: <First Name>
    surname: <Surname>
    email: <Email Address>
    password: <Password>" > /tmp/controllers.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy -f /tmp/controllers.yaml
```

## Verify the Deployment

We can use the following commands to verify the Control Plane is up and running:

```bash
iofogctl get controllers
```

```bash
iofogctl describe controller Controller-1
```

[Continue To Next Step: Setup your Agents](setup-your-agents.html).