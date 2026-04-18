

# Kinds of Resources

This page lists all YAML resource **kinds** that iofogctl and the operator support. Each kind has a dedicated specification page in the YAML References section. Control plane kinds (ControlPlane, KubernetesControlPlane, LocalControlPlane), Agent kinds, Application and Microservice, Platform IAM (Role, RoleBinding, NatsAccountRule, NatsUserRule), and other resources are documented below with short examples and links to the full specs.

## Common Header YAML Specification

Most `iofogctl` commands take YAML files as input. A file can contain one or more resources, separated by `---`. Every resource has a **header** (apiVersion, kind, metadata) and a **spec** (or **data** for Secret/ConfigMap) section.

```yaml
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default # Optional, defaults to value specified by iofogctl namespace flag
spec: ...
```

| Field              | Description                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiVersion         | Schema version. Use `iofog.org/v3`. |
| kind               | The resource type. Supported values: `ControlPlane`, `KubernetesControlPlane`, `LocalControlPlane`, `Controller`, `Agent`, `LocalAgent`, `AgentConfig`, `Registry`, `CatalogItem`, `Application`, `Microservice`, `Secret`, `Certificate`, `CertificateAuthority`, `ConfigMap`, `VolumeMount`, `Service`, `OfflineImage`, `Volume`, `Role`, `RoleBinding`, `NatsAccountRule`, `NatsUserRule`. |
| metadata           | Object containing metadata (name, optional namespace, optional tags). |
| metadata.name      | Unique identifier of the resource in its namespace. |
| metadata.namespace | Optional. Namespace for iofogctl to use for this resource. |
| metadata.tags      | Optional. Tags for `Agent`, `LocalAgent`, `AgentConfig`, and `Service` kinds. |
| spec               | Deployment specifications; structure depends on the kind. |
| data               | Used by `Secret` and `ConfigMap` kinds for key-value data. |

## ControlPlane

The `ControlPlane` kind specifies all the details required to deploy the ioFog Control Plane on a set of remote hosts.

```yaml
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  controllers:
    - name: vanilla
      host: 30.40.50.3
      ssh:
        user: foo
        keyFile: ~/.ssh/id_rsa
        port: 22
```

To learn more about the `ControlPlane` kind, please see [Control Plane YAML Specification](reference-control-plane.html).

## KubernetesControlPlane

The `KubernetesControlPlane` kind specifies all the details required to deploy the ioFog Control Plane on a Kubernetes cluster.

```yaml
apiVersion: iofog.org/v3
kind: KubernetesControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  config: ~/.kube/config
```

To learn more about the `KubernetesControlPlane` kind, please see [Control Plane YAML Specification](reference-control-plane.html).

## LocalControlPlane

The `LocalControlPlane` kind specifies all the details required to deploy the ioFog Control Plane locally as a docker container.

```yaml
apiVersion: iofog.org/v3
kind: LocalControlPlane
metadata:
  name: ecn
spec:
  iofogUser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  controller:
    container:
      image: ghcr.io/eclipse-iofog/controller:3.7.3
```

To learn more about the `LocalControlPlane` kind, please see [Control Plane YAML Specification](reference-control-plane.html).

## Controller

We can expand a Remote Control Plane by deploying a new Controller via the `Controller` kind.

```yaml
apiVersion: iofog.org/v3
kind: Controller
metadata:
  name: alpaca
  namespace: default
spec:
  host: 30.40.50.5
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa
    port: 22
```

To learn more about the `Controller` kind, please see [Control Plane YAML Specification](reference-control-plane.html).

## Agent

Once a Control Plane is set up, we can deploy Agents to remote hosts via the `Agent` kind.

```yaml
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: meerkat
  namespace: default
spec:
  host: 30.40.50.6
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa
    port: 22
```

To learn more about the `Agent` kind, please see [Agent YAML Specification](reference-agent.html).

## LocalAgent

Once a Control Plane is set up, we can deploy Agents as a local container via the `LocalAgent` kind.

```yaml
apiVersion: iofog.org/v3
kind: LocalAgent
metadata:
  name: local
spec:
  container:
    image: ghcr.io/eclipse-iofog/agent:3.7.0
```

To learn more about the `LocalAgent` kind, please see the [Quick Start](../getting-started/quick-start-local.html).

## AgentConfig

We can modify Agent behaviour dynamically via the `AgentConfig` kind.

```yaml
apiVersion: iofog.org/v3
kind: AgentConfig
metadata:
  name: agent-1 # ioFog Agent name
spec:
  # All fields are optional - Only the specified fields will be updated
  name: agent-1
  description: agent running on VM
  latitude: 46.204391
  longitude: 6.143158
  agentType: auto
  dockerUrl: unix:///var/run/docker.sock
  diskLimit: 50
  diskDirectory: /var/lib/iofog-agent/
  memoryLimit: 4096
  cpuLimit: 80
  logLimit: 10
  logDirectory: /var/log/iofog-agent/
  logFileCount: 10
  statusFrequency: 10
  changeFrequency: 10
  deviceScanFrequency: 60
  bluetoothEnabled: true
  watchdogEnabled: false
  abstractedHardwareEnabled: false
  upstreamRouters: ['default-router']
  networkRouter: ''
  host: <Agent_host>
  routerConfig:
    routerMode: edge
    messagingPort: 5672
    edgeRouterPort: 56721
    interRouterPort: 56722
  dockerPruningFrequency: 1
  logLevel: INFO
  availableDiskThreshold: 90
```

To learn more about the `AgentConfig` kind, please see [Agent Configuration](../agent-management/agent-configuration.html) and [Agent YAML Specification](reference-agent.html).

## CatalogItem

Microservice Catalogs can be created via the `CatalogItem` kind.

```yaml
apiVersion: iofog.org/v3
kind: CatalogItem
metadata:
  name: my-multiplatform-microservice
spec:
  id: 0
  description: Alpine Linux
  x86: amd64/alpine:latest
  arm: arm32v6/alpine:latest
  registry: remote
  configExample: '{"key": "value"}'
```

To learn more about the `CatalogItem` kind, please see [Catalog YAML Specification](reference-catalog.html).

## Application

A set of Microservices can be deployed via the `Application` kind.

```yaml
apiVersion: iofog.org/v3
kind: Application
metadata:
  name: health-care-wearable
  namespace: default
spec:
  microservices:
    - name: heart-rate-monitor
      agent:
        name: horse-1
      images:
        arm: edgeworx/healthcare-heart-rate:arm-v1
        x86: edgeworx/healthcare-heart-rate:x86-v1
      container:
        hostNetworkMode: false
        isPrivileged: false
        runAsUser: ''
        platform: ''
        runtime: ''
        cdiDevices: []
        ports: []
      config:
        test_mode: true
        data_label: Anonymous Person
        nested_object:
          key: 42
          deep_nested:
            foo: bar
    - name: heart-rate-viewer
      agent:
        name: horse-1
      images:
        arm: edgeworx/healthcare-heart-rate-ui:arm
        x86: edgeworx/healthcare-heart-rate-ui:x86
        registry: remote
      container:
        hostNetworkMode: false
        isPrivileged: false
        runAsUser: ''
        platform: ''
        runtime: ''
        cdiDevices: []
        ports:
          - external: 5000
            internal: 80
            publicMode: false
        env:
          - key: BASE_URL
            value: http://localhost:8080/data
      config:
        test: 54
```

To learn more about the `Application` kind, please see [Application YAML Specification](reference-application.html).

## Microservice

Individual Microservices can be deployed and configured via the `Microservice` kind.

```yaml
apiVersion: iofog.org/v3
kind: Microservice
metadata:
  name: func-msvc
spec:
  agent:
    name: func-test-0
  images:
    arm: edgeworx/healthcare-heart-rate:test-arm
    x86: edgeworx/healthcare-heart-rate:test
    registry: remote # public docker
  container:
    hostNetworkMode: false
    isPrivileged: false
    runAsUser: ''
    platform: ''
    runtime: ''
    cdiDevices: []
    volumes:
      - hostDestination: /tmp/microservice
        containerDestination: /tmp
        accessMode: rw
    ports:
      - internal: 443
        external: 5005
    env:
      - key: TEST
        value: 42
  application: func-app
  config:
    test_mode: true
    data_label: Anonymous_Person_2
```

To learn more about the `Microservice` kind, please see [Application YAML Specification](reference-application.html) (Microservice section).

## Volume

Directories can be pushed to Agent hosts so that Microservice volume requirements are fulfilled via the `Volume` kind.

```yaml
apiVersion: iofog.org/v3
kind: Volume
spec:
  name: secret
  source: /tmp/
  destination: /tmp/secrets/
  permissions: 666
  agents:
    - agent-1
    - agent-2
```

To learn more about the `Volume` kind, please see [Volume Management](../agent-management/volumes.html).

## Registry

Private container image registries for Microservices can be set up via the `Registry` kind.

```yaml
apiVersion: iofog.org/v3
kind: Registry
spec:
  url:
  Username: john
  Password: q1u45ic9kst563art
  email: user@domain.com
  requiresCert: true
  certificate: ''
```

To learn more about the `Registry` kind, please see [Registry and Catalog Management](../applications/microservice-registry-catalog.html).


### Role

A `Role` defines RBAC permissions (apiGroups, resources, verbs, and optionally resourceNames) for the Controller REST API. Roles are bound to users or groups via RoleBindings.

To learn more, see [Role YAML Specification](reference-roles.html) and [Security – Roles](../security/roles.html).

### RoleBinding

A `RoleBinding` binds a Role to one or more subjects (users or groups), granting them the permissions defined in the Role.

To learn more, see [RoleBinding YAML Specification](reference-role-binding.html) and [Security – Role Bindings](../security/role-bindings.html).

### NatsAccountRule

A `NatsAccountRule` defines the NATS account-level policy (limits, JetStream, imports/exports). Applications reference it via `spec.natsConfig.natsRule` to assign NATS account access.

To learn more, see [NatsAccountRule YAML Specification](reference-nats-account-rule.html) and [Security – NATS Account Rule](../security/nats-account-rule.html).

### NatsUserRule

A `NatsUserRule` defines the NATS user-level policy for a microservice. Microservices reference it via `natsConfig.natsRule` (within the application's account).

To learn more, see [NatsUserRule YAML Specification](reference-nats-user-rule.html) and [Security – NATS User Rule](../security/nats-user-rule.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-kinds.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
