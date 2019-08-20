# Setup Your Control Plane

Every Edge Compute Network ('ECN') starts with a Control Plane that allows you to manage your ECN's resources.

In this guide, our Control Plane will start off with a single Controller instance. Towards the end of this guide, we will see how to deploy a highly available Control Plane with multiple Controller instances.

There are two flavours of Controller deployments - Vanilla and Kubernetes. If you have a Kubernetes cluster, you can deploy a Controller directly onto it. Otherwise, a Linux remote host will do just fine.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">We use YAML to define ioFog resources</h3>
  <p>The following procedures will define resources in YAML for iofogctl to consume. Specification of those YAML resources can be found <a href=../tools/iofogctl/yaml-spec.html>here</a>.</p>
</aside>

## Deploy Controllers on Kubernetes

Create a template of controlplane.yaml like so:

```bash
echo "---
iofoguser:
  name: Foo
  surname: Bar
  email: user@domain.com
  password: iht234g9afhe
controllers:
- name: Controller-A
  kubeconfig: ~/.kube/config" > /tmp/controlplane.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy controlplane -f /tmp/controlplane.yaml
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href=#verify-the-deployment>skip ahead</a>.

## Deploy Controllers on Remote Hosts

Create a template of controlplane.yaml like so:

```bash
echo "---
iofoguser:
  name: Foo
  surname: Bar
  email: user@domain.com
  password: iht234g9afhe
controllers:
- name: Controller-A
  user: bar
  host: 38.101.23.2
  keyfile: ~/.ssh/id_rsa" > /tmp/controlplane.yaml
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
iofogctl describe controller Controller-A
```
```bash
iofogctl describe controlplane
```

[Continue To Next Step: Setup your Connectors](setup-your-connectors.html).