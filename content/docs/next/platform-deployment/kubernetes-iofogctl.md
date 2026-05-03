
<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Not interested in using Kubernetes?</h3>
    <p>There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Remote Control Plane on a Kubernetes cluster. Go to <a href="../platform-deployment/remote-control-plane.html">Remote - Deploy Control Plane</a> to deploy the Control Plane on a Linux host instead. Keep in mind that in such case, it will be necessary to prepare the host for Controller as well.</p>
</aside>

# Kubernetes - Deploy Control Plane Using iofogctl

Every Edge Compute Network ('ECN') starts with a Control Plane that allows us to manage our ECN's resources.

In this guide, our Control Plane will deploy a single Controller instance.


<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> We use YAML to define ioFog resources</h3>
    <p>The following procedures will define resources in YAML for iofogctl to consume. Specification of those YAML resources can be found <a href="../yaml-references/reference-control-plane.html">here</a>.</p>
</aside>


## Deploy a Control Plane on Kubernetes

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Prepare your Keycloak Realms for Eclipse ioFog</h3>
    <p>We recommened going through the <a href="../platform-deployment/prepare-realm.html">Keycloak Installation Guide</a> before continuing on here.</p>
</aside>

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> NATs Replica</h3>
    <p>When NATs enabled. The minimum replica should be 2 in order to initialize NATs JetStream Cluster.</p>
</aside>

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Setup your db for production environment</h3>
  Eclipse ioFog support both `mysql` and `postgres` as an external databases.
  If you must provide external db configuration if you want to deploy `Controller` with replica > 1
  <p>We recommened going through the <a href="../platform-deployment/database.html">Database Installation Guide</a> before continuing on here.</p>
</aside>

Create a template of controlplane.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v3
kind: KubernetesControlPlane
metadata:
  name: albatros-1
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  config: ~/.kube/config
  replicas:
    controller: 1
    nats: 2
  # database:
  #  provider: mysql/postgres
  #  user: 
  #  host: 
  #  port: 
  #  password: 
  #  databaseName: pot
  #  ssl: true/false 
  #  ca: base64 encoded string
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey:
    ssl: external
    controllerClient: iofog-controller
    controllerSecret: 
    viewerClient: ecn-viewer
  nats:
    enabled: true
    jetStream:
      storageSize: "10Gi"  # PVC and max_file_store
      memoryStoreSize: "1Gi"  # max_memory_store
      # storageClassName: ""
  images:
    # pullSecret: pull-srect
    operator: ghcr.io/eclipse-iofog/operator:3.7.2
    controller: ghcr.io/eclipse-iofog/controller:3.7.3
    router: ghcr.io/eclipse-iofog/router:3.7.0
    # nats: ghcr.io/eclipse-iofog/nats:2.12.4   # when NATs is enabled (spec.nats.enabled)
  services:
    controller:
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
      # externalTrafficPolicy:
    router:
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
      # externalTrafficPolicy:
    nats: # for NATs Cluster, Leaf, MQTT ports
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
      # externalTrafficPolicy:
    natsServer:  # for core NATs server and monitoring ports
      type:  LoadBalancer/ClusterIP
      # annotations:
      #  service.beta.kubernetes.io/azure-load-balancer-internal: "true"
      # externalTrafficPolicy:
  # controller:
  #  ecnViewerUrl: https://
  #  https: true
  #  secretName:
  #  logLevel: info
  # ingresses:
  #  controller:
  #    annotations:
  #      # cert-manager.io/cluster-issuer: letsencrypt
  #      # nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
  #      # nginx.ingress.kubernetes.io/backend-protocol: "https"
  #    ingressClassName: nginx
  #    host: 
  #    secretName:
  #  router:
  #    address: 
  #    messagePort: 5671
  #    interiorPort: 55671
  #    edgePort: 45671" > /tmp/controlplane.yaml

```

Make sure to specify the correct value for the `config` field. Here we implicitly use the default namespace. Note that iofogctl will deploy to the Kubernetes namespace that it is configured to use through the `-n` flag or to the default namespace we set via `iofogctl configure current-namespace ...`. This means that by following these examples, we end up installing the Control Plane in `default` namespace on the cluster. Therefore it is recommended to use a namespace instead.

Once we have edited the fields to our liking, we can go ahead and run:

```bash
iofogctl deploy -f /tmp/controlplane.yaml
```

Naturally, we can also use `kubectl` to see what is happening on the Kubernetes cluster.

```bash
kubectl get all
```

The next section covers how to do the same thing we just did, but on a remote host instead of a Kubernetes cluster. We can <a href="#verify-the-deployment">skip ahead</a>.

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
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/kubernetes-iofogctl.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>