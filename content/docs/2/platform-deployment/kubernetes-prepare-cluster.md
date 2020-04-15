<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Not interested in using Kubernetes?</h3>
  <p>There are two flavours of Control Plane deployments - Remote and Kubernetes. This guide will focus on deploying a Remote Control Plane on a Kubernetes cluster. Go to <a href="remote-control-plane.html">Remote - Deploy Control Plane</a> to deploy the Control Plane on a Linux host instead. Keep in mind that in such case, it will be necessary to prepare the host for Controller as well.</p>
</aside>

# Prepare your Kubernetes Cluster

Some components of an Edge Compute Network ('ECN') can be deployed on Kubernetes. These component include Controllers. `iofogctl` will also install ioFog Operator and Kubelet to assist in the Kubernetes-deploy Control Plane.

## Kube Config

If we are familiar with `kubectl`, we will know that it relies on a configuration file typically found in `~/.kube/config` which contains credentials for it to connect to the Kubernetes API Server.

`iofogctl` similarly relies on this configuration file. We need to make sure it is present on the host that we intend to use `iofogctl` from. The file can be saved anywhere on the host but it is recommended to keep it in `~/.kube/config` because all of this guide's examples assume it to be there.

## RBAC

In order for `iofogctl` or Helm to do its thing with our Kubernetes cluster, we will have to make sure we have the right [RBAC permissions](https://kubernetes.io/docs/reference/access-authn-authz/rbac/).

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

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Now that we have the cluster up, we need to deploy the Control Plane onto the cluster. There are two ways to do this, either using iofogctl, or Helm. To use iofogctl, go to <a href="kubernetes-iofogctl.html">Kubernetes - Deploy Control Plane Using iofogctl</a>, or to use Helm, go to <a href="kubernetes-helm.html"> Kubernetes - Deploy Control Plane Using Helm</a>.</p>
</aside>

<aside class="notifications note">
  <b>See anything wrong with the document? Help us improve it!</b>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/platform-deployment/kubernetes-prepare-cluster.md"
    target="_blank">
    <p style="text-align:left">Edit on Github <img src="/images/icos/ico-github.svg" alt=""></p>
  </a>
</aside>
