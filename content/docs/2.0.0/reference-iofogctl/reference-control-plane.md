# Control Plane YAML Specification

`iofogctl` allows users to deploy Edge Compute Networks ('ECNs'). The various resources which constitute an ECN are specified within YAML files for iofogctl to consume.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Trying to use iofogctl 2.0 with an older ECN?</h3>
  <p>You can connect to an older ECN with iofogctl 2.0 for view-only purposes. If you would like full control over the ECN with iofogctl 2.0, you should delete the ECN with your older iofogctl and then redeploy with iofogctl 2.0.</p>
</aside>

## Kubernetes Control Plane

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

| Field     | Description                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| iofogUser | Credentials registered against ioFog Controller REST API.                                                     |
| config    | Path to Kubernetes configuration file that iofogctl uses to install Controller service to Kubernetes cluster. |

## Remote Control Plane

The Remote Control Plane component specifies all the resources required to deploy the ioFog Control Plane on a set of remote hosts.

```yaml
apiVersion: iofog.org/v2
kind: RemoteControlPlane
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

| Field                  | Description                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iofogUser              | Credentials registered against ioFog Controller REST API.                                                                                                                |
| controllers            | List of Controller instances.                                                                                                                                            |
| controller.name        | User-defined unique identifier of Controller instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| controller.host        | Hostname of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.user    | Username of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Controller service.                                                                    |
| controller.ssh.port    | Port to use with SSH. Optional (default: 22).                                                                                                                            |

## Local Control Plane

The Local Control Plane component specifies all the resources required to deploy the ioFog Control Plane as a local docker container.

```yaml
apiVersion: iofog.org/v2
kind: LocalControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  controller:
    container:
      image: iofog/controller:2.0.0-beta
```

| Field            | Description                                               |
| ---------------- | --------------------------------------------------------- |
| iofogUser        | Credentials registered against ioFog Controller REST API. |
| controller       | Controller specification.                                 |
| controller.image | Docker image to use as the Controller.                    |

## Remote Controller

We can expand a Remote Control Plane by deploying a new Controller.

```yaml
apiVersion: iofog.org/v2
kind: RemoteController
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

| Field       | Description                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | User-defined unique identifier of Controller instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| host        | Hostname of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| ssh.user    | Username of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Controller service.                                                                    |
| ssh.port    | Port to use with SSH. Optional (default: 22)                                                                                                                             |

## Remote Agent

Agents are components of an ECN which run on edge nodes. They communicate with Controllers to allow your edge nodes to host Microservices.

```yaml
apiVersion: iofog.org/v2
kind: RemoteAgent
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

| Field       | Description                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | User-defined unique identifier of Agent instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| host        | Hostname of remote host that iofogctl must SSH into to install Agent service.                                                                                       |
| ssh.user    | Username of remote host that iofogctl must SSH into to install Agent service.                                                                                       |
| ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Agent service.                                                                    |
| ssh.port    | Port to use with SSH. Optional (default: 22).                                                                                                                       |

## Edge Compute Network

An entire ECN can be specified within a single YAML file.

Multiple resources can be incorporated into a single YAML file using `---` as a separator.

```yaml
---
apiVersion: iofog.org/v2
kind: RemoteControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: John
    surname: Doe
    email: user@example.com
    password: mysecretpw
  controllers:
    - name: alpaca-1
      host: 30.40.50.3
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
    - name: alpaca-2
      host: 30.40.50.4
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v2
kind: RemoteAgent
metadata:
  name: hippo-1
  namespace: default
spec:
  host: 30.40.50.6
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v2
kind: RemoteAgent
metadata:
  name: hippo-2
  namespace: default
spec:
  host: 30.40.50.7
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/reference-iofogctl/reference-control-plane.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
