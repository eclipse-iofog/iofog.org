# Kubernetes - Deploy Control Plane Using iofogctl

Every Edge Compute Network ('ECN') starts with a Control Plane that allows you to manage your ECN's resources.

In this guide, our Control Plane will deploy a single Controller instance.

There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Kubrenetes Control Plane.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">We use YAML to define ioFog resources</h3>
  <p>The following procedures will define resources in YAML for iofogctl to consume. Specification of those YAML resources can be found <a href=../iofogctl/platform-yaml-spec.html>here</a>.</p>
</aside>

## Deploy a Control Plane on Kubernetes

Create a template of controlplane.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v2
kind: KubernetesControlPlane
metadata:
  name: albatros-1
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  config: ~/.kube/config" > /tmp/controlplane.yaml
```

Make sure to specify the correct value for the `config` field. Here we implicitly use the default namespace. Note that iofogctl will deploy to the Kubernetes namespace that it is configured to use through the `-n` flag or to the default namespace you set via `iofogctl configure default-namespace ...`

Once you have edited the fields to your liking, go ahead and run:

```bash
iofogctl deploy -f /tmp/controlplane.yaml
```

Naturally, we can also use `kubectl` to see what is happening on the Kubernetes cluster.

```bash
kubectl get all
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href=#verify-the-deployment>skip ahead</a>.

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

[Continue To Next Step: Setup your Agents](setup-your-agents.html).

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/platform-deployment/remote-control-plane.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
