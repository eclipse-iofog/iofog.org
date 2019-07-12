# Helm Guide - How to Install ioFog Using Helm

In this tutorial we will go through deployment of ioFog stack into existing Kubernetes cluster.

## Prerequisites

First, we need working kubernetes cluster. To setup a cluster on Google Kubernetes Engine (GKE), follow the tutorial [Creating a cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster). Alternative managed cluster providers will work as well, so will custom installations of Kubernetes, e.g. using Minikube.

The core ioFog stack installed by Helm does not require any Agents to be setup. Agents are edge nodes where microservices are deployed. In order to leverage all ioFog capabilities, we will need to setup Agents. These can simply be small compute instances from GCP, AWS, Packet, or any other provider.

All ioFog needs from these Agents is SSH access in order to provision them.

IoFog also provides [tools for infrastructure setup](https://github.com/eclipse-iofog/platform) to setup Kubernetes cluster and Agents. Please see [Platform tutorial](../platform/platform-tutorial.html) for more details.

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

We can create service account for Tiller and bind cluster-admin role.

```bash
kubectl create serviceaccount --namespace kube-system tiller-svacc
kubectl create clusterrolebinding tiller-crb --clusterrole=cluster-admin --serviceaccount=kube-system:tiller-svacc
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">GKE IAM Roles Needed</h3>
  <p>In order to create the cluster role binding on GKE, we need to have `cluster.admin` permission.</p>
```bash
gcloud projects add-iam-policy-binding $PROJECT --member=user:person@company.com --role=roles/container.admin
```
</aside>

## Initialize Helm And Install Tiller

Now is the time to use our service account to initialize Helm.

```bash
helm init --service-account tiller-svacc --wait
```

Note that for AKE, we will also need to specify node selectors for Tiller.

```bash
helm init --service-account tiller-svacc --node-selectors "beta.kubernetes.io/os"="linux" --wait
```

## Install ioFog Stack

Add this Helm repository and install the ioFog stack and Kubernetes services

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

To check if the custom resource exists, run

```bash
kubectl get crd iofogs.k8s.iofog.org
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Custom Resource Definitions in Helm</h3>
  <p>Helm's support for Custom Resource Definition (CRD) is a bit reckless. Upon installation of Helm release, the CRDs will be disowned by the release and orphaned. Deleting the release will not get rid of the CRDs. This makes sense, since the definitions are scoped for the whole cluster.</p>
</aside>

## Testing ioFog Stack With Agent

This is a short guide how to run [ioFog smoke tests](https://github.com/eclipse-iofog/test-runner) on our ioFog installation. These tests require one ioFog Agent to be provisioned as well as SSH access to the Agent.

### Credentials For ioFog Agent Tests

In order to test the ioFog stack, we will need access to a single ioFog Agent.

Now is the time to register the agent with the rest of the ioFog stack. For this purpose, we use [iofogctl](https://github.com/eclipse-iofog/iofogctl). Please follow the instruction on how to use `iofogctl` to deploy a new Agent in the [iofogctl tutorial](../iofogctl/iofogctl.html#deploy-agent-on-the-iofog-stack).

Note that this Agent is external to the Kubernetes cluster, but its credentials need to be stored as a secret in the cluster.

We need to create such secret manually, in the same namespace the Helm chart was deployed. This secret only needs to be created or updated when we want to use a different agent for testing purposes. It is not required in any way if we don't need to test the ioFog stack. Here, `1.2.3.4` is the external IP that iofogctl can access, and `/home/username/.ssh/agent-key` is the key that needs to be authorized on the agent.

Note that the arguments for the secret are the same as the credentials we provided for agent deployment.

```bash
kubectl -n iofog create secret generic agent --from-file=privateKey=/home/username/.ssh/agent-key --from-literal=URI=username@1.2.3.4
```

The credentials are used by the test runner. We can test them by running `ssh -i /home/username/.ssh/agent-key username@34.66.151.77`. It is also possible to check the secret:

```bash
kubectl -n iofog get secret agent-credentials -o yaml
```

When the secret and the agent are available, we need to upgrade our Helm release to reference this secret.

```bash
helm upgrade iofog --namespace iofog --set createCustomResource=false --set test.credentials=agent-credentials iofog/iofog
```

### Run Tests

Then run the tests using Helm.

```bash
helm test iofog
```

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt="">SSH Route Bug GKE</h3>
  <p>Running Helm commands will fail after an agent has been deployed in any ioFog stack on the cluster. See [#known-issues](Known Issues) for more details. </p>
</aside>

## Uninstall ioFog Stack

To uninstall ioFog stack, simply delete the Helm release, where the release name refers to `--name` arguments used during installation.

```bash
helm delete --purge iofog
```

Note that due to Helm's handing of custom resource definitions, all such definitions are orphaned when a release is created and thus need to be deleted manually.

```bash
kubectl delete crd iofogs.k8s.iofog.org
```

## Known Issues

When deploying agent for testing purposes, it is possible to encounter a SSH bug in GKE. This disables Helm completely due to its inability to communicate with Tiller.

```console
$ helm list
Error: forwarding ports: error upgrading connection: error dialing backend: No SSH tunnels currently open. Were the targets able to accept an ssh-key for user "gke-0e29ce169876a2a9afc0"?
```

There is currently no known workaround.
