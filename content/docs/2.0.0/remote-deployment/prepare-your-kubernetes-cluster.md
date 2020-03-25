# Prepare Your Kubernetes Cluster

Some components of an Edge Compute Network ('ECN') can be deployed on Kubernetes. These component include Controllers. `iofogctl` will also install ioFog Operator and Kubelet to assist in the Kubernetes-deploy Control Plane.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Not interested in using Kubernetes?</h3>
  <p>If you don't want to bother with Kubernetes, you can skip this step and go straight to <a href=prepare-your-network.html>preparing your network</a>.</p>
</aside

## Kube Config

If you are familiar with `kubectl`, you will know that it relies on a configuration file typically found in `~/.kube/config` which contains credentials for it to connect to the Kubernetes API Server.

`iofogctl` similarly relies on this configuration file. We need to make sure it is present on the host that we intend to use `iofogctl` from. The file can be saved anywhere on the host but it is recommended to keep it in `~/.kube/config` because all of this guide's examples assume it to be there.

## RBAC

In order for `iofogctl` to do its thing with our Kubernetes cluster, we will have to make sure we have the right [RBAC permissions](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

The way we add these permissions will depend on our respective Kubernetes provider. Ultimately, we need the User Account associated with our `~/.kube/config` configuration file to have permission to use all verbs against the following resources:

- roles
- clusterroles
- rolebindings
- clusterrolebindings
- services
- deployments
- statefulsets
- pods
- namespaces

If in doubt, we can use the default cluster role `cluster-admin`.

## Using Google Kubernetes Engine

When using GKE to host our Kubernetes cluster, we need to ensure the [gcloud](https://cloud.google.com/sdk/gcloud/) CLI tool is installed. Once installed, we can connect to our cluster and get the requisite `~/.kube/config` file by running:

```bash
gcloud container clusters get-credentials <NAME> --region <REGION>
```

[Continue To Next Step: Prepare your Network](prepare-your-network.html).
