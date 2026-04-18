
<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Not interested in using Kubernetes?</h3>
    <p>There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Control Plane on a Kubernetes cluster. Go to <a href="../platform-deployment/remote-control-plane.html">Remote - Deploy Control Plane</a> to deploy the Control Plane on a Linux host instead. Keep in mind that in such case, it will be necessary to prepare the host for Controller as well.</p>
    <p>Also, this guide will use Helm to deploy the Control Plane on the cluster. To use iofogctl instead, go to <a href="../platform-deployment/kubernetes-iofogctl.html"> Kubernetes - Deploy Control Plane Using iofogctl</a>.</p>
</aside>

# Kubernetes - Deploy Control Plane Using Helm

In this tutorial, we will install the Eclipse ioFog Control Plane on Kubernetes using Helm.

The Helm Chart deploys the ioFog operator (iofog-operator) and creates a `ControlPlane` custom resource instance automatically. The Operator consumes this CRD and creates deployments for the Controller, Router, and (when enabled) NATs, as well as associated services. Image versions (e.g. operator 3.7.0, controller, router, NATs) are configurable in the chart values; see the [Control Plane YAML Specification](../yaml-references/reference-control-plane.html) for NATs and Router options.

## Prerequisites

- **Helm 3** - [Helm installation instructions](https://helm.sh/docs/using_helm/#installing-helm)
- **Kubernetes 1.22+** - The chart uses `apiextensions.k8s.io/v1` CRDs
- **kubectl** - [kubectl installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- A working Kubernetes cluster (GKE, EKS, AKS, Minikube, or any other Kubernetes distribution)

## Add the Helm Repository

Add the Datasance Helm [repotsitory](https://github.com/Datasance/helm) to your local index:

```bash
helm repo add datasance https://datasance.github.io/helm
helm repo update
```

## Install the Chart

Install the Chart while specifying the required authentication configuration. The chart requires Keycloak/OpenID Connect authentication settings. You can provide these values either via a values file or using `--set` flags.

### Quick Install with Flags

```bash
helm install pot-operator datasance/pot -n pot --create-namespace \
  --set controlplane.spec.auth.url=https://keycloak.example.com \
  --set controlplane.spec.auth.realm=pot \
  --set controlplane.spec.auth.realmKey=master \
  --set controlplane.spec.auth.ssl=true \
  --set controlplane.spec.auth.controllerClient=pot-controller \
  --set controlplane.spec.auth.controllerSecret=supersecret \
  --set controlplane.spec.auth.viewerClient=pot-viewer
```

### Install with Values File

Create a `myvalues.yaml` file with your configuration:

```yaml
operator:
  image: ghcr.io/eclipse-iofog/operator:3.7.2
controlplane:
  spec:
    replicas:
      controller: 1
      nats: 2
    nats:
      enabled: true
    # Database is optional; if omitted, the controller uses internal SQLite.
    # When using SQLite, keep controller replicas at 1.
    database:
      provider: postgres
      host: db
      port: 5432
      user: pot
      password: changeme
      databaseName: pot
      ssl: false
    auth:
      url: https://keycloak.example.com
      realm: pot
      realmKey: master
      ssl: true
      controllerClient: pot-controller
      controllerSecret: supersecret
      viewerClient: pot-viewer
```

Then install using the values file:

```bash
helm install pot-operator datasance/pot -n pot --create-namespace \
  -f pot-operator-values.yaml
```

The install creates:

- CRDs for `controlplanes.datasance.com`
- The ioFog operator (iofog-operator) Deployment + RBAC + ServiceAccount
- One ControlPlane instance (toggle with `controlplane.create`)

### Verify Installation

To list all Helm releases, run:

```bash
helm list -n pot
```

The result should look like this:

```plain
NAME          REVISION  UPDATED                   STATUS    CHART        APP VERSION  NAMESPACE
pot-operator  1         Tue Dec  8 21:34:42 2025  DEPLOYED  pot-3.7.0    3.7.0        pot
```
## Configuration

Edit `values.yaml` or provide your own overrides (e.g. `test-values.yaml`). Key sections:

- **`operator.*`**: image, replicaCount, resources, scheduling, extraEnv/extraArgs, serviceAccount, RBAC.
- **`controlplane.*`**: metadata and full ControlPlane `.spec` (auth, database, controller, events, images, services, nats, ingresses, vault, replicas).
- **`crds.install`**: whether to install the ControlPlane CRD.

### Required values

Must be set via values or `--set`:

- **Auth** (Keycloak / OIDC): `controlplane.spec.auth.url`, `realm`, `realmKey`, `ssl`, `controllerClient`, `controllerSecret`, `viewerClient`
- **Database** (required in ControlPlane CRD v3): `controlplane.spec.database` with at least `provider`, `host`, `port`, `user`, `password`, `databaseName`. For SQLite use `provider: sqlite` with empty host/port/user/password/databaseName as needed.

### Optional / common overrides

- **Operator**: `operator.image` (default `ghcr.io/eclipse-iofog/operator:3.7.2`), `operator.replicaCount`, `operator.resources`, `operator.nodeSelector`, `operator.tolerations`, `operator.affinity`, `operator.serviceAccount.create|name`, `operator.imagePullSecrets`
- **ControlPlane metadata**: `controlplane.create`, `controlplane.name`, `controlplane.namespace`
- **Replicas**: `controlplane.spec.replicas.controller`, `controlplane.spec.replicas.nats` (min 2 when NATs enabled)
- **Images**: `controlplane.spec.images.controller`, `router`, `nats`, `pullSecret`
- **Services**: `controlplane.spec.services.controller|router|nats|natsServer` with `type`, `address`, `annotations`, `externalTrafficPolicy` (e.g. `Local` or `Cluster`)
- **NATs**: `controlplane.spec.nats.enabled`, `controlplane.spec.nats.jetStream.memoryStoreSize`, `storageSize`, `storageClassName`
- **Controller**: `controlplane.spec.controller.logLevel`, `https`, `secretName`, `pidBaseDir`, `ecn`, `ecnViewerPort`, `ecnViewerUrl`
- **Ingresses**: `controlplane.spec.ingresses.controller|router|nats` (host, ingressClassName, address, ports)
- **Events**: `controlplane.spec.events.auditEnabled`, `retentionDays`, `cleanupInterval`, `captureIpAddress`
- **Vault** (optional): `controlplane.spec.vault.enabled`, `provider`, `basePath`, and provider-specific config (`hashicorp`, `aws`, `azure`, `google`)

### Quick install with flags (example)

```bash
helm install pot datasance/pot -n pot --create-namespace \
  --set controlplane.spec.auth.url=https://keycloak.example.com \
  --set controlplane.spec.auth.realm=pot \
  --set controlplane.spec.auth.realmKey=master \
  --set controlplane.spec.auth.ssl=external \
  --set controlplane.spec.auth.controllerClient=pot-controller \
  --set controlplane.spec.auth.controllerSecret=supersecret \
  --set controlplane.spec.auth.viewerClient=pot-viewer \
  --set controlplane.spec.database.provider=sqlite \
  --set controlplane.spec.database.host="" \
  --set controlplane.spec.database.port=0 \
  --set controlplane.spec.database.user="" \
  --set controlplane.spec.database.password="" \
  --set controlplane.spec.database.databaseName="" \
  --set controlplane.spec.database.ssl=false
```

### Example values override

```yaml
operator:
  image: ghcr.io/eclipse-iofog/operator:3.7.2

controlplane:
  create: true
  name: pot
  spec:
    # Database is required in CRD v3. Use sqlite for single-replica or postgres for HA.
    database:
      provider: postgres
      host: db
      port: 5432
      user: pot
      password: changeme
      databaseName: pot
      ssl: false
      ca: ""
    auth:
      url: https://keycloak.example.com
      realm: pot
      realmKey: master
      ssl: external
      controllerClient: pot-controller
      controllerSecret: supersecret
      viewerClient: pot-viewer
    replicas:
      controller: 1
      nats: 2
    images:
      controller: ghcr.io/eclipse-iofog/controller:3.7.3
      router: ghcr.io/eclipse-iofog/router:3.7.0
      nats: ghcr.io/eclipse-iofog/nats:2.12.4
    services:
      controller:
        type: LoadBalancer
      router:
        type: LoadBalancer
      nats:
        type: LoadBalancer
      natsServer:
        type: LoadBalancer
    nats:
      enabled: true
```

## Lint (local chart)

From the repo root:

```bash
helm lint charts/pot
```

## Upgrade

```bash
helm upgrade pot datasance/pot -n pot -f myvalues.yaml
```

For a local chart:

```bash
helm upgrade pot ./charts/pot -n pot -f test-values.yaml
```

## Uninstall

```bash
helm uninstall pot -n pot
```


**Note:** CRDs remain by default after uninstallation. Remove them manually if desired:

```bash
kubectl delete crd controlplanes.datasance.com
```

## Connection to Installed Control Plane

Once the installation is complete, you can connect to the Controller using [iofogctl](../iofogctl/introduction.html). Make sure the `--namespace` matches the one used during `helm install`:

#### Connect to Installed Control Plane as a KubernetesControlPlane
```bash
iofogctl create namespace pot
iofogctl connect --email foo.bar@example.com --kube ~/.kube/config --namespace pot
```

#### Connect to Installed Control Plane as a RemoteControlPlane
```bash
iofogctl create namespace pot
iofogctl connect --email foo.bar@example.com --name pot --ecn-addr <http://controller-endpoint:51121> -n pot
```
You will need to authenticate using your Keycloak credentials configured during installation.


<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Where to go from here?</h3>
    <p>Having our Control Plane up and running, we can now go to <a href="../platform-deployment/setup-your-agents.html">Setup Agents</a> guide to deploy our Agents and finalize the ECN deployment.</p>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/kubernetes-helm.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
