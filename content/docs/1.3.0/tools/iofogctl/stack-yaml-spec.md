# Iofogctl ioFog stack yaml Specification

`iofogctl` allows users to deploy ioFog resources that are specified in yaml files.

### Note for those upgrading from a previous version

We have updated the yml spec significantly, and while these are small changes in practice, your current yml files will fail to deploy on 1.3.0

To translate your yml files to the new spec, please see these [quick changes](./translating.html)

## Control Plane

A Control Plane can be specified when using `iofogctl deploy controlplane -f controlplane.yaml` or as a part of a complete [ECN](#edge-compute-network) specification. The Control Plane is an overarching component containing specifications for [Controllers](#controller) and ioFog default user.

```yaml
iofoguser:
  name: Foo
  surname: Bar
  email: user@domain.com
  password: g9hr823rhuoi

controllers:
  - name: vanilla
    user: foo
    host: 30.40.50.3
    keyfile: ~/.ssh/id_rsa
  - name: kubernetes
    replicas: 2
    keyfile: ~/.ssh/id_rsa
```

| Field       | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| IofogUser   | Credentials registered against ioFog Controller REST API.              |
| Controllers | List of Controller instances. See Controller section for more details. |

## Controller

A Controller can be specified when using `iofogctl deploy controller -f controller.yaml` or as a part of [Control Plane](#control-plane) specification or as a part of a complete [ECN](#edge-compute-network) specification.

```yaml
name: alpaca

# Only required for non-K8s deployment
user: foo
host: 30.40.50.5
keyfile: ~/.ssh/id_rsa

# Only required for K8s deployment
kubeconfig: ~/.kube/config
kubecontrollerip: 34.23.14.6 # Optional
replicas: 1 # Optional, defaults to 1
servicetype: LoadBalancer # Optional, defaults to "LoadBalancer"
```

| Field              | Description                                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name               | User-defined unique identifier of Controller instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| User               | Username of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| Host               | Hostname of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| Key File           | Path to private RSA SSH key that iofogctl must use to SSH into remote host to install Controller service.                                                                |
| Kube Config        | Path to Kubernetes configuration file that iofogctl uses to install Controller service to Kubernetes cluster.                                                            |
| Kube Controller IP | Pre-existing static IP address for Kuberneretes Load Balancer service to use.                                                                                            |
| Replicas           | Number of Controller Pods to deploy on Kubernetes cluster.                                                                                                               |
| LoadBalancer       | Kubernetes service type for Controller (one of `LoadBalancer`, `NodePort` or `ClusterIP`)                                                                                |

## Connector

A Connector can be specified when using `iofogctl deploy connector -f connector.yaml` or as a part of a complete [ECN](#edge-compute-network) specification.

```yaml
name: tiger

# Only required for non-K8s deployment
user: foo
host: 30.40.50.5
keyfile: ~/.ssh/id_rsa

# Only required for K8s deployment
kubeconfig: ~/.kube/config
replicas: 1 # Optional, defaults to 1
```

| Field       | Description                                                                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name        | User-defined unique identifier of Connector instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| User        | Username of remote host that iofogctl must SSH into to install Connector service.                                                                                       |
| Host        | Hostname of remote host that iofogctl must SSH into to install Connector service.                                                                                       |
| Key File    | Path to private RSA SSH key that iofogctl must use to SSH into remote host to install Connector service.                                                                |
| Kube Config | Path to Kubernetes configuration file that iofogctl uses to install Connector service to Kubernetes cluster.                                                            |
| Replicas    | Number of Connector Pods to deploy on Kubernetes cluster.                                                                                                               |

Note that at the moment Connector does not support specifying `ServiceType` the same way as Controller does.

## Agent

An Agent can be specified when using `iofogctl deploy agent -f agent.yaml` or as a part of a complete [ECN](#edge-compute-network) specification.

```yaml
name: meerkat
user: foo
host: 30.40.50.6
keyfile: ~/.ssh/id_rsa
```

| Field | Description                                                                                                                                                         |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name  | User-defined unique identifier of Agent instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| User  | Username of remote host that iofogctl must SSH into to install Agent service.                                                                                       |
| Host  | Hostname of remote host that iofogctl must SSH into to install Agent service.                                                                                       |

## Edge Compute Network

An entire Edge Compute Network ('ECN') can be specified when using `iofogctl deploy -f ecn.yaml`.

```yaml
controlplane:
  iofoguser:
    name: Serge
    surname: Radinovich
    email: serge@edgeworx.io
    password: mysecretpw
  controllers:
    - name: alpaca-1
      user: serge
      host: 30.40.50.3
      keyfile: ~/.ssh/id_rsa
    - name: alpaca-2
      user: serge
      host: 30.40.50.4
      keyfile: ~/.ssh/id_rsa

connectors:
  - name: zebra
    user: serge
    host: 30.40.50.5
    keyfile: ~/.ssh/id_rsa

agents:
  - name: hippo-1
    user: serge
    host: 30.40.50.6
    keyfile: ~/.ssh/id_rsa
  - name: hippo-2
    user: serge
    host: 30.40.50.7
    keyfile: ~/.ssh/id_rsa
```

You can also use this approach to deploy a subset of the ECN by omitting any of the Control Plane, Connectors, or Agents sections.
