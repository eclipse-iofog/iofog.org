# Iofogctl YAML Specification

`iofogctl` allows users to deploy ioFog resources that are specified in YAML files.

## Controller

A Controller can be specified when using `iofogctl deploy -f controllers.yaml`

For Controllers on remote hosts:

```YAML
controllers:
- name: Controller-1
  user: serge
  host: 30.40.50.5
  keyfile: ~/.ssh/id_rsa
  iofoguser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
```

For Controllers on Kubernetes clusters:

```YAML
controllers:
- name: Controller-1
  kubeconfig: ~/.kube/config
  iofoguser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
```

## Agent

An Agent can be specified when using `iofogctl deploy -f agents.yaml`

```YAML
agents:
- name: Agent-1
  user: serge
  host: 30.40.50.7
  keyfile: ~/.ssh/id_rsa
```