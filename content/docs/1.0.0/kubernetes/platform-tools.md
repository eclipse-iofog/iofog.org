# Platform Tools

In this guide we will go through the ioFog platform supporting tools.

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt="">Platform Tools Still In Alpha!</h3>
  <p>The Platform Tools provided for managing ioFog infrastructure are still in early development stages. Tread lightly.</p>
</aside>

The [ioFog platform repository](https://github.com/eclipse-iofog/platform) is a one-stop shop for setting up and testing ioFog on a variety of infrastructures.

By the end of this guide we will have a set of microservices deployed on an ioFog cluster that is deployed on our choice of infrastructure.

## Overview

We use [Terraform](https://www.terraform.io/) to deploy all infrastructure and iofogctl to configure remote edge nodes to install agent software on. The infrastructure uses

The project spins up an infrastructure stack which consists of:

- Virtual Private Cloud (VPC) on GPC
- Google Kubernetes Engine on GPC
- Edge nodes (x86 and arm64) on Packet (optional)

After the infrastructure setup, iofog Edge Compute Network (ECN) is deployed on the GKE cluster using the iofogctl.

Once the ioFog ECN is deployed, if the user chose to setup edge nodes, ansible is used to configure these edge nodes created by packet and iofogctl will deploy Agent software. Iofog Agent software is then configured and registered with the iofog Controller in the ECN.

## Prerequisites

In order to setup the infrastructure and the ioFog ECN and Agents, we will need the following tools:

- [Terraform](https://www.terraform.io/) (version 0.11.\*, [installation instructions](https://learn.hashicorp.com/terraform/getting-started/install.html))
- [Ansible](https://www.ansible.com/) ([installation instructions](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html))
- GCloud ([quickstart guide](https://cloud.google.com/sdk/docs/quickstarts))
- Kubectl ([installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/))
- [iofogctl](../iofogctl/iofogctl.html)

First, clone the [ioFog platform repository](https://github.com/eclipse-iofog/platform) repository.

```bash
git clone git@github.com:eclipse-iofog/platform.git
cd platform
```

We can then run bootstrap to install all the required tools. It is possible to skip the bootstrap step if we opt to instead provide the tools ourselves.

```bash
./bootstrap.sh
```

Next, we need to setup gcloud with our project. We can either establish a service account or use a personal account with GCP. In both cases, the minimal set of IAM roles required is:

- Compute Admin
- Kubernetes Engine Admin
- Service Account User

To login with a service account and setup our project, first download the service account key file from GCP, then run the following:

```bash
gcloud auth activate-service-account --key-file=service-account-key.json
gcloud config set project iofog-project
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Login to GCP</h3>
  <p>
Note that is it also possible to login with a personal account using `gcloud auth login`, however this is not recommented, since further setup steps require a service account.
  </p>
</aside>

In order to use Terraform with GCP and Packet, we need to inject our credentials into Terraform. The only way do so is using environment variables. We will need packet account token for packet provide and the service account key file from previous step.

```bash
export PACKET_AUTH_TOKEN=...
export GOOGLE_APPLICATION_CREDENTIALS=service-account-key.json
```

With all this setup done, we are ready to move to the next step - using Terraform to spin up the infrastructure.

## Setup Infrastructure

The platform repository includes several pre-configured environments. For our purposes, we will use a custom, configurable environment. This configuration does not have a Terraform backend, will use local backend to store terraform state files.

Let's start by initializing our local Terraform backend.

```bash
cd infrastructure/environments_gke/user
terraform init
```

As we mentioned, the `user` environment is configurable. Let's explore the variables file `vars.tfvars`. The following table shows all available variables for the infrastructure setup. Variables in _bold_ need to be customized in order to proceed.

| Variables             | Description                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| _project_id_          | id of your google platform project                                     |
| _environment_         | unique name for your environment                                       |
| _gcp_region_          | region to spin up the resources                                        |
| _gcp_service_account_ | service account name to deploy GKE (same account as in previous steps) |
| controller_ip         | bring your own static IP for Controller                                |
| controller_image      | docker image link for controller setup                                 |
| connector_image       | docker image link for connector setup                                  |
| operator_image        | docker image link for operator setup                                   |
| _packet_project_id_   | packet project id                                                      |
| kubelet_image         | docker image link for kubelet setup                                    |
| operating_system      | operating system for edge nodes on packet                              |
| packet_facility       | facilities to use to drop agents                                       |
| count_x86             | number of x86(make sure your project plan allow)                       |
| plan_x86              | server plan for device on x86 available on facility chosen             |
| count_arm             | number of arm sgents to spin up                                        |
| plan_arm              | server plan for device on arm available on facility chosen             |
| _ssh_key_             | path to ssh key to be used for accessing edge nodes                    |
| iofogUser_name        | name for registration with controller                                  |
| iofogUser_surname     | surname for registration with controller                               |
| iofogUser_email       | email to use to register with controller                               |
| iofogUser_password    | password(length >=8) for user registeration with controller            |

Once we are happy with our settings, it is time to check whether the Terraform setup is valid and to review all resources that will be created.

```bash
terraform plan -var-file="vars.tfvars"
```

Last, we create the infrastructure according to the plan

```bash
terraform apply -var-file="vars.tfvars" -auto-approve
```

## Interact with newly deployed infrastructure

Once the infrastructure is successfully deployed, we should be able to interact with the Kubernetes cluster. Terraform automatically setup our [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for us. Should we need to retrieve kubeconfig for our new cluster anytime in the future, we can use `gcloud container clusters get-credentials environment --region gcp_region`, where `environment` and `gcp_region` refer to previously described variables.

Try running `kubectl get no` to list all nodes available to the cluster. These will also includes our edge Agents as nodes.

## Destroy Infrastructure

Destroying all of the infrastructure is as simple as destroying all Terraform resources. Assuming we used local Terraform state from the guide, in order to destroy the infrastructure, we must run:

```bash
cd infrastructure/environments_gke/user # or wherever the tfstate is
terraform destroy -var-file=vars.tfvars -auto-approve
```

If we would like to instead delete just a single resource, we could for example do:

```bash
terraform destroy -var-file=vars.tfvars -auto-approve -target=null_resource.iofog
```

To print all the resources and their configuration, we can use `terraform output` or browse through the relevant code in infrastructure/environments_gke and infrastructure/modules.
