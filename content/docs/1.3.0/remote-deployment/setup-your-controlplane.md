# Setup Your Control Plane

Every Edge Compute Network ('ECN') starts with a Control Plane that allows you to manage your ECN's resources.

In this guide, our Control Plane will deploy a single Controller instance. Our enterprise solution can be used to deploy multiple, highly available Controller instances within a single Control Plane but that process is not covered here.

There are two flavours of Controller deployments - Vanilla and Kubernetes. If you have a Kubernetes cluster, you can deploy a Controller directly onto it. Otherwise, a Linux remote host will do just fine.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">We use YAML to define ioFog resources</h3>
  <p>The following procedures will define resources in YAML for iofogctl to consume. Specification of those YAML resources can be found <a href=../tools/iofogctl/stack-yaml-spec.html>here</a>.</p>
</aside>

## Deploy Controllers on Kubernetes

Create a template of controlplane.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: albatros-1
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  controllers:
  - name: alpaca-1
    kubeConfig: ~/.kube/config" > /tmp/controlplane.yaml
```

Make sure to specify the correct value for the `kubeconfig` field.

Once you have edited the fields to your liking, go ahead an run:

```bash
iofogctl deploy controlplane -f /tmp/controlplane.yaml
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href=#verify-the-deployment>skip ahead</a>.

## Deploy Controllers on Remote Hosts

Create a template of controlplane.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  controllers:
  - name: alpaca-1
    user: bar
    host: 38.101.23.2
    keyFile: ~/.ssh/id_rsa" > /tmp/controlplane.yaml
```

Make sure to edit the `user`, `host`, and `keyfile` fields to correspond with the remote host you are deploying to.

Once you have edited the fields to your liking, go ahead an run:

```bash
iofogctl deploy controlplane -f /tmp/controlplane.yaml
```

## Verify the Deployment

We can use the following commands to verify the Control Plane is up and running:

```bash
iofogctl get controllers
```

```bash
iofogctl describe controller alpaca-1
```

```bash
iofogctl describe controlplane
```

[Continue To Next Step: Setup your Connectors](setup-your-connectors.html).
