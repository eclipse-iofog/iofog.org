# Iofogctl ioFog stack yaml Specification

`iofogctl` allows users to deploy ioFog resources that are specified in yaml files.

For a complete documentation of all available `iofogctl` commands, please see [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0/docs/md/iofogctl.md)

## Control Plane

A Control Plane can be specified when using `iofogctl deploy controlplane -f controlplane.yaml`

```yaml
iofoguser:
  name: Foo
  surname: Bar
  email: user@domain.com
  password: g9hr823rhuoi

# Only required for HA
database:
  user: admin
  password: agh9d8u32orij
  host: 50.50.40.2
  port: 5432

# Only required for HA w/o K8s
loadbalancer:
  host: 60.20.30.5
  port: 51121

controllers:
  - name: Vanilla-Controller
    user: foo
    host: 30.40.50.3
    keyfile: ~/.ssh/id_rsa
  - name: Kubernetes-Controller
    replicas: 2
    keyfile: ~/.ssh/id_rsa
```

| Field         | Description                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IofogUser     | Credentials registered against ioFog Controller REST API.                                                                                                                                     |
| Database      | External database details and credentials. ioFog Controller uses this database to hold state. Only Postgres currently supported. If not specified, Controller will use local SQLite instance. |
| Load Balancer | Details of external load balancer that can be used to access multiple Controller instances in HA configuration.                                                                               |
| Controllers   | List of Controller instances. See Controller section for more details.                                                                                                                        |

## Controller

A Controller can be specified when using `iofogctl deploy controller -f controller.yaml`

```yaml
name: Controller-A

# Only required for non-K8s deployment
user: foo
host: 30.40.50.5
keyfile: ~/.ssh/id_rsa

# Only required for K8s deployment
kubeconfig: ~/.kube/config
replicas: 1 # Optional, defaults to 1
kubecontrollerip: 34.23.14.6 # Optional, static IP for LoadBalancer service
```

| Field       | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| Name        | User-defined unique identifier of Controller instance within an iofogctl namespace.                           |
| User        | Username of remote host that iofogctl must SSH into to install Controller service.                            |
| Host        | Hostname of remote host that iofogctl must SSH into to install Controller service.                            |
| Key File    | Path to private RSA SSH key that iofogctl must use to SSH into remote host to install Controller service.     |
| Kube Config | Path to Kubernetes configuration file that iofogctl uses to install Controller service to Kubernetes cluster. |
| Replicas    | Number of Controller Pods to deploy on Kubernetes cluster.                                                    |

## Connector

A Connector can be specified when using `iofogctl deploy connector -f connector.yaml`

```yaml
name: Connector-A

# Only required for non-K8s deployment
user: foo
host: 30.40.50.5
keyfile: ~/.ssh/id_rsa

# Only required for K8s deployment
kubeconfig: ~/.kube/config
replicas: 1 # Optional, defaults to 1
```

| Field       | Description                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Name        | User-defined unique identifier of Connector instance within an iofogctl namespace.                           |
| User        | Username of remote host that iofogctl must SSH into to install Connector service.                            |
| Host        | Hostname of remote host that iofogctl must SSH into to install Connector service.                            |
| Key File    | Path to private RSA SSH key that iofogctl must use to SSH into remote host to install Connector service.     |
| Kube Config | Path to Kubernetes configuration file that iofogctl uses to install Connector service to Kubernetes cluster. |
| Replicas    | Number of Connector Pods to deploy on Kubernetes cluster.                                                    |

## Agent

An Agent can be specified when using `iofogctl deploy agent -f agent.yaml`

```yaml
name: Agent-A
user: foo
host: 30.40.50.6
keyfile: ~/.ssh/id_rsa
```

| Field | Description                                                                    |
| ----- | ------------------------------------------------------------------------------ |
| Name  | User-defined unique identifier of Agent instance within an iofogctl namespace. |
| User  | Username of remote host that iofogctl must SSH into to install Agent service.  |
| Host  | Hostname of remote host that iofogctl must SSH into to install Agent service.  |

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
    - name: Controller-A
      user: serge
      host: 30.40.50.3
      keyfile: ~/.ssh/id_rsa
    - name: Controller-B
      user: serge
      host: 30.40.50.4
      keyfile: ~/.ssh/id_rsa

connectors:
  - name: Connector-A
    user: serge
    host: 30.40.50.5
    keyfile: ~/.ssh/id_rsa

agents:
  - name: Agent-A
    user: serge
    host: 30.40.50.6
    keyfile: ~/.ssh/id_rsa
  - name: Agent-B
    user: serge
    host: 30.40.50.7
    keyfile: ~/.ssh/id_rsa
```
