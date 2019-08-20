# Helm Guide - How to Install ioFog Using Helm

In this tutorial, we will go through the deployment of the ioFog stack into an existing Kubernetes cluster.

## Prerequisites

First, we need a working Kubernetes cluster. To set up a cluster on the Google Kubernetes Engine (GKE), follow the [Creating a cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster) tutorial. Using alternative managed cluster providers will work as well as custom installations of Kubernetes, e.g. Minikube.

The core ioFog stack installed by Helm does not require any Agents to be set up. Agents are edge nodes where microservices are deployed. In order to leverage all ioFog capabilities, we will need to set up Agents. These can simply be small compute instances from Google Cloud Platform (GCP), Amazon Web Services (AWS), Packet, or any other provider.

In order to provision these Agents, ioFog needs SSH access.

IoFog also provides [tools for infrastructure setup](https://github.com/eclipse-iofog/platform) to setup Kubernetes cluster and Agents. Please see [Platform tutorial](./platform-tools.html) for more details.

The tutorial requires installation of `Helm` and `kubectl` executing the deployment.

- [Helm installation instructions](https://helm.sh/docs/using_helm/#installing-helm)
- [kubectl installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

From now on, we assume we have a running Kubernetes cluster and Agent nodes. We can verify that our kubernetes cluster is working by running `kubectl cluster-info`. The output of a working cluster will look like this:

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
kubectl create serviceaccount --namespace kube-system tiller-svacc
kubectl create clusterrolebinding tiller-crb --clusterrole=cluster-admin --serviceaccount=kube-system:tiller-svacc
```

In order to create the cluster role binding on GKE, we need to have `cluster.admin` permission.

```bash
gcloud projects add-iam-policy-binding $PROJECT --member=user:person@company.com --role=roles/container.admin
```
</aside>

## Initialize Helm And Install Tiller

Now is the time to use our service account to initialize Helm.

```bash
helm init --service-account tiller-svacc --wait
```

Note that on Azure Kubernetes Service (AKS), we will also need to specify node selectors for Tiller.

```bash
helm init --service-account tiller-svacc --node-selectors "beta.kubernetes.io/os"="linux" --wait
```

## Install ioFog Stack

Add this Helm repository to our Helm repository index and install the ioFog stack and Kubernetes services

```bash
helm repo add iofog https://eclipse-iofog.github.io/helm
helm install --name iofog --namespace iofog iofog/iofog
```

### Multiple Instances of ioFog Stack

If we want to have multiple instances of ioFog on the same Kubernetes cluster, it is necessary to tell Helm not to install custom resource definitions. This can be done by overriding the `createCustomResource` (default: `true`) variable.

```bash
helm install --name iofog --namespace iofog --set createCustomResource=false iofog/iofog
```

Only use this option when the ioFog custom resource exists, either from another Helm installation or manual installation using [iofogctl](https://github.com/eclipse-iofog/iofogctl).

To check if the custom resource exists, run `kubectl get crd iofogs.k8s.iofog.org`. If the resource exists, we must use `createCustomResource=false` so that Helm does not try to create it again.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Custom Resource Definitions in Helm</h3>
  <p>Managing CRDs with Helm requires a bit of work. Upon installation of Helm release, the CRDs will be disowned by the release and orphaned. Deleting the release will not get rid of the CRDs. This makes sense, since the definitions are scoped for the whole cluster.</p>
</aside>

## Run Tests

We can run a simple test suite on our newly deployed ioFog stack using helm:

```bash
helm test iofog
```

To see a detailed output from the tests, we can check test-runner logs using `kubectl -n iofog logs test-runner`. In case we do not expect the need to inspect the logs, using `helm test --cleanup iofog` will remove all test pods after running the tests.

## Uninstall ioFog Stack

To uninstall ioFog stack, simply delete the Helm release, where the release name refers to `--name` arguments used during installation.

```bash
helm delete --purge iofog
```

Note that due to Helm's handing of custom resource definitions, all such definitions are orphaned when a release is created and thus need to be deleted manually.

```bash
kubectl delete crd iofogs.k8s.iofog.org
```
