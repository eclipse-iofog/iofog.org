<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Want to deploy on Kubernetes cluster instead?</h3>
    <p>There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Remote Control Plane on a single Linux remote host. Go to <a href="../platform-deployment/kubernetes-prepare-cluster.html">Kubernetes - Prepare A Cluster</a> to deploy the Control Plane on Kubernetes Cluster instead.</p>
</aside>

# Remote Host - Deploy Control Plane

Every Edge Compute Network ('ECN') starts with a Control Plane that allows us to manage ECN's resources.

In this guide, our Control Plane will deploy a single Controller instance on a remote host.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> We use YAML to define ioFog resources</h3>
    <p>The following procedures will define resources in YAML for iofogctl to consume. Specification of those YAML resources can be found <a href= "/docs/yaml-references/reference-control-plane">here</a>.</p>
</aside>

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Prepare your Keycloak Realms for Eclipse ioFog</h3>
    <p>We recommened going through the <a href="../platform-deployment/prepare-realm.html">Keycloak Installation Guide</a> before continuing on here.</p>
</aside>

## Deploy a Control Plane on a Remote Host

Create a template of controlplane.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: exter
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  events:
    auditEnabled: true
    retentionDays: 14
    captureIpAddress: true
  nats:
    enabled: true
  controllers:
  - name: alpaca-1
    host: 38.101.23.2
    ssh:
      user: bar
      keyFile: ~/.ssh/id_rsa" > /tmp/controlplane.yaml
```

Make sure to edit the `host`, `ssh.user`, and `ssh.keyFile` fields to correspond with the remote host we are deploying to.

Once we have edited the fields to our liking, go ahead and run:

```bash
iofogctl deploy -f /tmp/controlplane.yaml
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

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Where to go from here?</h3>
  <p>Having our Control Plane up and running, we can now go to <a href="../platform-deployment/setup-your-agents.html">Setup Agents</a> guide to deploy our Agents and finalize the ECN deployment.</p>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/remote-control-plane.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
