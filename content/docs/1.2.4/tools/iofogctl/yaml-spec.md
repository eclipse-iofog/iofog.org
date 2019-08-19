# Iofogctl YAML Specification

`iofogctl` allows users to deploy ioFog resources that are specified in YAML files.

## Control Plane

A Control Plane can be specified when using `iofogctl deploy controlplane -f controlplane.yaml`

```YAML
iofoguser:
  name: Serge
  surname: Radinovich
  email: serge@edgeworx.io
  password: mysecretpw
controllers:
- name: Controller-1
  user: serge
  host: 30.40.50.3
  keyfile: ~/.ssh/id_rsa
- name: Controller-2
  user: serge
  host: 30.40.50.4
  keyfile: ~/.ssh/id_rsa
```

## Controller

A Controller can be specified when using `iofogctl deploy controller -f controller.yaml`

For Controllers on remote hosts:

```YAML
name: Controller-1
user: serge
host: 30.40.50.5
keyfile: ~/.ssh/id_rsa
```

For Controllers on Kubernetes clusters:

```YAML
name: Controller-1
kubeconfig: ~/.kube/config
```

## Connector

A Connector can be specified when using `iofogctl deploy connector -f connector.yaml`

For Connectors on remote hosts:

```YAML
name: Connector-1
user: serge
host: 30.40.50.6
keyfile: ~/.ssh/id_rsa
```

For Connectors on Kubernetes clusters:

```YAML
name: Connector-1
kubeconfig: ~/.kube/config
```

## Agent

An Agent can be specified when using `iofogctl deploy agent -f agent.yaml`

```YAML
name: Agent-1
user: serge
host: 30.40.50.7
keyfile: ~/.ssh/id_rsa
```

## Edge Compute Network

An entire Edge Compute Network ('ECN') can be specified when using `iofogctl deploy -f ecn.yaml`.

```YAML
controlplane:
  iofoguser:
    name: Serge
    surname: Radinovich
    email: serge@edgeworx.io
    password: mysecretpw
  controllers:
  - name: Controller-1
    user: serge
    host: 30.40.50.3
    keyfile: ~/.ssh/id_rsa
  - name: Controller-2
    user: serge
    host: 30.40.50.4
    keyfile: ~/.ssh/id_rsa

connectors:
- name: Connector-1
  user: serge
  host: 30.40.50.5
  keyfile: ~/.ssh/id_rsa

agents:
 - name: Agent-1
   user: serge
   host: 30.40.50.6
   keyfile: ~/.ssh/id_rsa
 - name: Agent-2
   user: serge
   host: 30.40.50.7
   keyfile: ~/.ssh/id_rsa
```