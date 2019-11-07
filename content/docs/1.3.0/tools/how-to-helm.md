# Helm Guide - How to Install ioFog Using Helm

In this tutorial, we will go through a deployment of ioFog stack into an existing Kubernetes cluster. The ioFog stack consists of basic services (Controller, Connector) and supplementary Kubernetes ioFog components (Operator, Kubelet). This is the foundation for establishing a complete Edge Compute Network (ECN) with Agents and microservices. See [Core Concepts](../getting-started/core-concepts.html) for more details on ioFog components.

IoFog Helm chart allows users to easily deploy the ioFog stack onto exiting Kubernetes cluster.

## Prerequisites

First, we need a working Kubernetes cluster. We can simply set up a cluster on the Google Kubernetes Engine (GKE) by following the [Creating a cluster tutorial](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster). Using any other managed cluster providers works as well, so do custom installations of Kubernetes, e.g. Minikube.

IoFog also provides [tools for infrastructure setup](https://github.com/eclipse-iofog/platform) to setup a Kubernetes cluster in case we don't have one available. Please see [Platform Tools](./platform-tools.html) for more details.

The tutorial requires installation of `Helm` and `kubectl` executing the deployment.

- [Helm installation instructions](https://helm.sh/docs/using_helm/#installing-helm)
- [kubectl installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

From now on, we assume we have a running Kubernetes cluster. We can verify that our kubernetes cluster is working by running `kubectl cluster-info`. The output of a working cluster will look like this:

```console
$ kubectl cluster-info
Kubernetes master is running at https://1.2.3.4
GLBCDefaultBackend is running at https://1.2.3.4/api/v1/namespaces/kube-system/services/default-http-backend:http/proxy
Heapster is running at https://1.2.3.4/api/v1/namespaces/kube-system/services/heapster/proxy
KubeDNS is running at https://1.2.3.4/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
kubernetes-dashboard is running at https://1.2.3.4/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy
Metrics-server is running at https://1.2.3.4/api/v1/namespaces/kube-system/services/https:metrics-server:/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

## Create Service Account for Tiller

Now that our cluster is up and running, we have to prepare the cluster for Helm installation.

On RBAC enabled Kubernetes clusters (e.g. GKE, AKE), it is necessary to create a service account for Tiller before initializing helm itself. See [helm init instructions](https://helm.sh/docs/using_helm/#tiller-and-role-based-access-control) for more details.

In order to create the cluster role binding on GKE, we need to have `roles/container.admin` permission. If our account doesn't have the role, it can be added using the following command or in the GCP Console.

```bash
gcloud projects add-iam-policy-binding $GCP_PROJECT --member=user:person@company.com --role=roles/container.admin
```

Then we can create service account for Tiller and bind cluster-admin role.

```bash
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller \
    --clusterrole=cluster-admin \
    --serviceaccount=kube-system:tiller
```

## Initialize Helm And Install Tiller

Now is the time to use our service account to initialize Helm.

```bash
helm init --service-account tiller --wait
```

Note that on Azure Kubernetes Service (AKS), we will also need to specify node selectors for Tiller.

```bash
helm init --service-account tiller --node-selectors "beta.kubernetes.io/os"="linux" --wait
```

## Install ioFog Stack

Add this Helm repository to our Helm repository index and install the ioFog stack and Kubernetes services

```bash
helm repo add iofog https://eclipse-iofog.github.io/helm
```

We can list all available versions of the ioFog Helm chart using `helm search -l iofog/iofog`.

To install a specific version of ioFog, use `--version <desired-version>` parameter to `helm install`

_Keep in mind if there already is any existing ioFog stack on the cluster, a set of Custom Resource Definitions has probably already been created. In such case, you will need to disable deploying these CRDs as described in [Multiple Edge Compute Networks](#multiple-edge-compute-networks)._

The final `helm install` command to install ioFog with CRDs then looks like this:

```bash
helm install \
    --set controlPlane.user.email=user@domain.com \
    --set controlPlane.user.password=any123password345 \
    --version 1.3.0-rc1 \
    --namespace my-ecn \
    --name my-ecn \
    iofog/iofog
```

The `--name my-ecn` refers to the Helm release name as shown below, while the `--namespace my-ecn` refers to the namespace taken by the Helm release in the target Kubernetes cluster.

To list all Helm releases (including deployed ioFog stacks), we can simply run `helm list`. The result should look like this:

```plain
NAME      	REVISION	UPDATED                 	STATUS  	CHART          	    APP VERSION	NAMESPACE
my-ecn     	1       	Tue Oct  1 21:34:42 2019	DEPLOYED	iofog-1.3.0-rc1	1.3.0-rc1 	my-ecn
```

The following is a complete list of all user configurable properties for the ioFog Helm chart. All of the properties are optional and have defaults. Use `--set property.name=value` in `helm install` to parametrize Helm release.

| Property                                | Default value                   | Description                                                                                   |
| --------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------- |
| createCustomResources                   | true                            | See [Multiple Edge Compute Networks](#multiple-edge-compute-networks)                         |
| controlPlane.user.firstName             | First                           | First name of initial user in Controller                                                      |
| controlPlane.user.surname               | Second                          | Surname of initial user in Controller                                                         |
| controlPlane.user.email                 | user@domain.com                 | Email (login) of initial user in Controller                                                   |
| controlPlane.user.password              | H23fkidf9hoibf2nlk              | Password of initial user in Controller                                                        |
| controlPlane.database.provider          |                                 | Not supported in ioFog Community Edition                                                      |
| controlPlane.database.host              |                                 | Not supported in ioFog Community Edition                                                      |
| controlPlane.database.port              | 0                               | Not supported in ioFog Community Edition                                                      |
| controlPlane.database.password          |                                 | Not supported in ioFog Community Edition                                                      |
| controlPlane.database.dbName            |                                 | Not supported in ioFog Community Edition                                                      |
| controlPlane.controller.replicas        | 1                               | Number of replicas of Controller pods                                                         |
| controlPlane.controller.image           | iofog/controller:1.3.0-rc1     | [Controller Docker image](https://hub.docker.com/r/iofog/controller/tags)                     |
| controlPlane.controller.imagePullPolicy | Always                          | Controller Docker image [pull policy](https://kubernetes.io/docs/concepts/containers/images/) |
| controlPlane.kubeletImage               | iofog/iofog-kubelet:1.3.0-rc1  | [Kubelet Docker image](https://hub.docker.com/r/iofog/iofog-kubelet/tags)                     |
| controlPlane.loadBalancerIP             |                                 | Pre-allocated static IP address for Controller                                                |
| controlPlane.serviceType                | LoadBalancer                    | Service type for Controller (one of `LoadBalancer`, `NodePort` or `ClusterIP`)                |
| connectors.image                        | iofog/connector:1.3.0-rc1      | [Connector Docker image](https://hub.docker.com/r/iofog/connector/tags)                       |
| connectors.serviceType                  | LoadBalancer                    | Service type for Connector (one of `LoadBalancer`, `NodePort` or `ClusterIP`)                 |
| connectors.instanceNames                | `["first","second"]`            | Array of Connector instance names                                                             |
| operator.replicas                       | 1                               | Number of replicas of Operator pods                                                           |
| operator.image                          | iofog/iofog-operator:1.3.0-rc1 | [OperatorDocker image](https://hub.docker.com/r/iofog/iofog-operator/tags)                    |
| operator.imagePullPolicy                | Always                          | Operator Docker image [pull policy](https://kubernetes.io/docs/concepts/containers/images/)   |

### Connection to Installed ioFog

Once the installation is complete, you will be able to connect to the ioFog Controller on K8s using [iofogctl](./iofogctl/usage.html).

```bash
iofogctl connect k8s-ctrl --kube-config ~/.kube/config --email user@domain.com --pass any123password345
```

Once you are connected, you can use `iofogctl` to deploy edge Agents. Then, you can use `kubectl` or `iofogctl` to deploy microservices to your edge Agents. See [Setup Your Agents](../remote-deployment/setup-your-agents.html) and [Introduction to iofogctl](./iofogctl/usage.html) for more details.

### Multiple Edge Compute Networks

If we want to have multiple instances of ioFog on the same Kubernetes cluster, it is necessary to tell Helm not to install custom resource definitions. This can be done by overriding the `createCustomResources` (default: `true`) variable.

```bash
helm install \
    --set createCustomResources=false \
    --set controlPlane.user.email=user@domain.com \
    --set controlPlane.user.password=any123password345 \
    --version 1.3.0-rc1 \
    --namespace second-ecn \
    --name second-ecn \
    iofog/iofog
```

Only use this option when the ioFog custom resource exists, either from another Helm installation or manual installation using [iofogctl](https://github.com/eclipse-iofog/iofogctl).

To check if the custom resources exist, run `kubectl get crd | grep iofog`. If the resources exist, we must use `createCustomResources=false` so that Helm does not try to create them again.

## Uninstall ioFog Stack

To uninstall ioFog stack, simply delete the Helm release, where the release name refers to `--name` arguments used during installation.

```bash
helm delete --purge my-ecn
```

Note that due to Helm's handing of custom resource definitions, all such definitions are orphaned when a release is created and thus need to be deleted manually.

```bash
kubectl get crds | grep iofog | awk '{print $1}' | xargs kubectl delete crds
```
