# Kinds of Resources

## Common Header YAML Specification

The most important commands of `iofogctl` consume YAML files as input. A YAML file consists of one or more resources. Every resource contains a header section and a spec section. The header section contains fields common to all resources defined within the spec section.

```yaml
apiVersion: iofog.org/v2
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default # Optional, defaults to value specified by iofogctl namespace flag
spec:
```

| Field              | Description                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiVersion         | ioFog YAML schema version. Currently `iofog.org/v2`                                                                                                                                                                                                                             |
| kind               | String representing what type of resource we want to deploy. The available values are `ControlPlane`, `KubernetesControlPlane`, `LocalControlPlane`, `Controller`, `Agent`, `LocalAgent`, `AgentConfig`, `Registry`, `CatalogItem`, `Application`, `Microservice` and `Volume`. |
| metadata           | Object containing metadata about the resource                                                                                                                                                                                                                                   |
| metadata.name      | User defined, unique identifier of the resource in its namespace.                                                                                                                                                                                                               |
| metadata.namespace | Optional. Will force iofogctl to work in this specific namespace                                                                                                                                                                                                                |
| spec               | Object containing the deployment specifications, different for each resource                                                                                                                                                                                                    |

## ControlPlane

The Control Plane component specifies all the resources required to deploy the ioFog Control Plane on a set of remote hosts.

```yaml
apiVersion: iofog.org/v2
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

To learn more about ControlPlane, please see [Iofogctl Platform YAML Specification](../reference-iofogctl/reference-control-plane.html#remote-control-plane).

## KubernetesControlPlane

The Kubernetes Control Plane specifies all the resources required to deploy the ioFog Control Plane on a Kubernetes cluster.

```yaml
apiVersion: iofog.org/v2
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

To learn more about KubernetesControlPlane, please see [Iofogctl Platform YAML Specification](../reference-iofogctl/reference-control-plane.html#kubernetes-control-plane).

## LocalControlPlane

The Local Control Plane component specifies all the resources required to deploy the ioFog Control Plane locally as a docker container

```yaml
apiVersion: iofog.org/v2
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
      image: iofog/controller:2.0.0
```

To learn more about LocalControlPlane, please see [Iofogctl Platform YAML Specification](../reference-iofogctl/reference-control-plane.html#local-control-plane).

## Controller

We can expand a Remote Control Plane by deploying a new Controller.

```yaml
apiVersion: iofog.org/v2
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

To learn more about Controller, please see [Iofogctl Platform YAML Specification](../reference-iofogctl/reference-control-plane.html#remote-controller).

## Agent

We can expand any Control Plane by deploying new Agents. They communicate with Controllers and manages your edge nodes to host Microservices.

```yaml
apiVersion: iofog.org/v2
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

To learn more about Agent, please see [Iofogctl Platform YAML Specification](../reference-iofogctl/reference-control-plane.html#remote-agent).

## LocalAgent

We can deploy a local Agent.

```yaml
apiVersion: iofog.org/v2
kind: LocalAgent
metadata:
  name: local
spec:
  container:
    image: iofog/agent:2.0.2
```

## AgentConfig

We can deploy or update the Agent Configuration.

```yaml
apiVersion: iofog.org/v2
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

To learn more about AgentConfig, please see [Iofogctl agent configuration YAML specification](../reference-iofogctl/reference-agent.html).

## CatalogItem

The catalog item has a very simple definition

```yaml
apiVersion: iofog.org/v2
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

To learn more about CatalogItem, please see [Iofogctl Catalog Item YAML specification](../reference-iofogctl/reference-catalog.html).

## Application

An application is a set of Microservices working together to achieve one specific purpose.

```yaml
apiVersion: iofog.org/v2
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
        rootHostAccess: false
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
        rootHostAccess: false
        ports:
          - external: 5000
            internal: 80
            publicMode: false
        env:
          - key: BASE_URL
            value: http://localhost:8080/data
      config:
        test: 54
  routes:
    - name: monitor-to-viewer
      from: heart-rate-monitor
      to: heart-rate-viewer
```

To learn more about Application, please see [Iofogctl Application YAML specification](../reference-iofogctl/reference-application.html).

## Microservice

Microservices configuration and set up are defined using YAML files.

```yaml
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: func-msvc
spec:
  agent:
    name: func-test-0
    config:
      memoryLimit: 8192
  images:
    arm: edgeworx/healthcare-heart-rate:test-arm
    x86: edgeworx/healthcare-heart-rate:test
    registry: remote # public docker
  container:
    rootHostAccess: false
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

To learn more about Microservice, please see [Iofogctl Application YAML specification](../reference-iofogctl/reference-application.html#microservices).

## Volume

We can deploy Volume.

```yaml
apiVersion: iofog.org/v2
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

To learn more about Volume, please see [Volume Management](../agent-management/volumes.html).

## Registry

We can deploy Registry.

```yaml
apiVersion: iofog.org/v2
kind: Registry
spec:
  url:
  Username: john
  Password: q1u45ic9kst563art
  email: user@domain.com
  requiresCert: true
  certificate: ''
```

To learn more about Registry, please see [Registry and Catalog Management](../microservices/microservice-registry-catalog.html).

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/reference-iofogctl/reference-kinds.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
