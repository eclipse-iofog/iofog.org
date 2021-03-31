<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Not interested in using Kubernetes?</h3>
  <p>There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Remote Control Plane on a Kubernetes cluster. Go to <a href="remote-control-plane.html">Remote - Deploy Control Plane</a> to deploy the Control Plane on a Linux host instead. Keep in mind that in such case, it will be necessary to prepare the host for Controller as well.</p>
  <p>Also, this guide will use Helm to deploy the Control Plane on the cluster. To use iofogctl instead, go to <a href="kubernetes-iofogctl.html"> Kubernetes - Deploy Control Plane Using iofogctl</a>.</p>
</aside>

# Kubernetes - Deploy Control Plane Using Helm

In this tutorial, we will install the ioFog Kubernetes Control Plane using Helm.

The Helm Chart installs a set of Custom Resources and an Operator onto the cluster. It then creates a Custom Resource Definition which describes an ioFog Control Plane to be deployed on the cluster. The Operator consumes this CRD and creates deployments for the Controller, Port Manager, and Router, as well as associated services.

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

To list all available version of ioFog Helm chart, including development versions, run:

```bash
helm search repo -l --devel iofog/iofog
```

Install the Chart while specifying user credentials and a target namespace. If we are not using the default namespace, we can use `--create-namespace` from Helm v3.2 onwards. Otherwise the namespace must already exist on the cluster. Note that not specifying the version default to latest stable version of ioFog chart, therefore for ioFog releases that have not officially released a stable chart yet, so we need to specify the `--version` here manually. To install version `3.0.0` for example, use the following:

```bash
helm install my-ecn \
 --namespace my-ns --create-namespace \
 --version 3.0.0 \
 --set user.email=user@domain.com \
 --set user.password=any123password345 \
 iofog/iofog
```

The `my-ecn` refers to the Helm release name as shown below.

To list all Helm releases, we can simply run `helm list`. The result should look like this:

```plain
NAME     REVISION  UPDATED                   STATUS    CHART             APP VERSION  NAMESPACE
my-ecn   1         Tue Oct  1 21:34:42 2019  DEPLOYED  iofog-3.0.0       3.0.0        my-ns
```

The following is a complete list of all user configurable properties for the ioFog Helm chart. All of the properties are optional and have defaults. Use `--set property.name=value` in `helm install` to parametrize Helm release. We recommend not changing the image variables, as these are predefined for each ioFog version, and mixing these across versions is not supported.

| Property            | Default value                  | Description                                                                   |
| ------------------- | ------------------------------ | ----------------------------------------------------------------------------- |
| user.firstName      | First                          | First name of initial user in Controller                                      |
| user.surname        | Second                         | Surname of initial user in Controller                                         |
| user.email          | user@domain.com                | Email (login) of initial user in Controller                                   |
| user.password       | H23fkidf9hoibf2nlk             | Password of initial user in Controller                                        |
| images.controller   | iofog/controller:<version>     | [Controller Docker image](https://hub.docker.com/r/iofog/controller/tags)     |
| images.operator     | iofog/iofog-operator:<version> | [Operator Docker image](https://hub.docker.com/r/iofog/iofog-operator/tags)   |
| images.portManager  | iofog/port-manager:<version>   | [Port Manager Docker image](https://hub.docker.com/r/iofog/port-manager/tags) |
| images.proxy        | iofog/proxy:<version>          | [Proxy Docker image](https://hub.docker.com/r/iofog/proxy/tags)               |
| replicas.operator   | 1                              | Number of replicas of Operator pods                                           |
| replicas.controller | 1                              | Number of replicas of Controller pods                                         |

### Connection to Installed ioFog

Once the installation is complete, you will be able to connect to the ioFog Controller on K8s using [iofogctl](../iofogctl/introduction.html). Make sure the `--namespace` here matches the one used during `helm install` step, so `iofogctl` can find the correct ECN using your kubeconfig file.

```bash
iofogctl --namespace my-ns connect --kube ~/.kube/config --email user@domain.com --pass H23fkidf9hoibf2nlk
```

## Uninstall ioFog Stack

To uninstall ioFog stack, simply delete the Helm release.

```bash
helm --namespace my-ns delete my-ecn
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Having our Control Plane up and running, we can now go to <a href="setup-your-agents.html">Setup Agents</a> guide to deploy our Agents and finalize the ECN deployment.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/platform-deployment/kubernetes-helm.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
