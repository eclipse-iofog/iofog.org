# Helm Guide

In this tutorial, we will install the ioFog Kubernetes Control Plane using Helm.

The Helm Chart installs a set of Custom Resources and an Operator onto the cluster. It then creates a Custom Resource Definition which describes an ioFog Control Plane to be deployed on the cluster. The Operator consumes this CRD and creates deployments for the Controller, Port Manager, and Kubelet, as well as associated services.

## Prerequisites

First, we need a working Kubernetes cluster. We can simply set up a cluster on the Google Kubernetes Engine (GKE) by following the [Creating a cluster tutorial](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster). Using any other managed cluster providers works as well, so do custom installations of Kubernetes, e.g. Minikube.

IoFog also provides [tools for infrastructure setup](https://github.com/eclipse-iofog/platform) to setup a Kubernetes cluster in case we don't have one available. Please see [Platform Tools](./platform-tools.html) for more details.

The tutorial requires installation of `Helm v3+` and `kubectl` executing the deployment.

- [Helm installation instructions](https://helm.sh/docs/using_helm/#installing-helm)
- [kubectl installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

From now on, we assume we have a running Kubernetes cluster.

## Install Helm Chart

Add the ioFog Helm repository to our local index:

```plain
helm repo add iofog https://eclipse-iofog.github.io/helm
```

Install the Chart while specifying user credentials and a target namespace. If you are not using the default namespace, make sure the namespace already exists on the cluster.

```plain
helm install my-ecn \
    --version 2.0.0-beta \
    --set controlPlane.user.email=user@domain.com \
    --set controlPlane.user.password=any123password345 \
    --namespace default \
    iofog/iofog
```

The `my-ecn` refers to the Helm release name as shown below.

To list all Helm releases, we can simply run `helm list`. The result should look like this:

```plain
NAME      	REVISION	UPDATED                 	STATUS  	CHART          	    APP VERSION	  NAMESPACE
my-ecn     	1       	Tue Oct  1 21:34:42 2019	DEPLOYED	iofog-2.0.0-beta	2.0.0-beta 	  default
```

The following is a complete list of all user configurable properties for the ioFog Helm chart. All of the properties are optional and have defaults. Use `--set property.name=value` in `helm install` to parametrize Helm release.

| Property                                | Default value                   | Description                                                                                   |
| --------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| createCustomResources                   | true                            | See [Multiple Edge Compute Networks](#multiple-edge-compute-networks)                         |
| controlPlane.user.firstName             | First                           | First name of initial user in Controller                                                      |
| controlPlane.user.surname               | Second                          | Surname of initial user in Controller                                                         |
| controlPlane.user.email                 | user@domain.com                 | Email (login) of initial user in Controller                                                   |
| controlPlane.user.password              | H23fkidf9hoibf2nlk              | Password of initial user in Controller                                                        |
| controlPlane.controller.replicas        | 1                               | Number of replicas of Controller pods                                                         |
| controlPlane.controller.image           | iofog/controller:2.0.0-beta     | [Controller Docker image](https://hub.docker.com/r/iofog/controller/tags)                     |
| controlPlane.controller.imagePullPolicy | Always                          | Controller Docker image [pull policy](https://kubernetes.io/docs/concepts/containers/images/) |
| controlPlane.kubeletImage               | iofog/iofog-kubelet:2.0.0-beta  | [Kubelet Docker image](https://hub.docker.com/r/iofog/iofog-kubelet/tags)                     |
| controlPlane.portManager                | iofog/port-manager:2.0.0-beta   | [Port Manager Docker image](https://hub.docker.com/r/iofog/port-manager/tags)                 |
| controlPlane.proxy                      | iofog/proxy:2.0.0-beta          | [Proxy Docker image](https://hub.docker.com/r/iofog/proxy/tags)                               |
| controlPlane.router                     | iofog/router:2.0.0-beta         | [Router Docker image](https://hub.docker.com/r/iofog/router/tags)                             |
| controlPlane.loadBalancerIp             |                                 | Pre-allocated static IP address for Controller                                                |
| controlPlane.serviceType                | LoadBalancer                    | Service type for Controller (one of `LoadBalancer`, `NodePort` or `ClusterIP`)                |
| operator.replicas                       | 1                               | Number of replicas of Operator pods                                                           |
| operator.image                          | iofog/iofog-operator:2.0.0-beta | [Operator Docker image](https://hub.docker.com/r/iofog/iofog-operator/tags)                   |
| operator.imagePullPolicy                | Always                          | Operator Docker image [pull policy](https://kubernetes.io/docs/concepts/containers/images/)   |

### Connection to Installed ioFog

Once the installation is complete, you will be able to connect to the ioFog Controller on K8s using [iofogctl](../iofogctl/introduction.html).

```bash
iofogctl connect --kube ~/.kube/config --email user@domain.com --pass any123password345 -n default
```

Once you are connected, you can use `iofogctl` to deploy edge Agents. Then, you can use `kubectl` or `iofogctl` to deploy microservices to your edge Agents. See [Setup Your Agents](content/docs/2.0.0/platform-deployment/setup-your-agents.html) and [Introduction to iofogctl](../iofogctl/introduction.html) for more details.

## Uninstall ioFog Stack

To uninstall ioFog stack, simply delete the Helm release.

```bash
helm delete my-ecn
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/platform-deployment/kubernetes-helm.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
