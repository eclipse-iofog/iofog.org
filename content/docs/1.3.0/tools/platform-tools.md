# Platform Tools

In this guide we will go through the ioFog platform supporting tools.

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt="">Platform Tools Still In Alpha!</h3>
  <p>The Platform Tools provided for managing ioFog infrastructure are still in early development stages. Tread lightly.</p>
</aside>

## Overview

The [ioFog platform repository](https://github.com/eclipse-iofog/platform) is a one-stop shop for setting up and testing ioFog on a variety of infrastructures.

By the end of this guide we will have a set infrastructure necessary for deployment of Edge Compute Networks (ECNs) including machines for ioFog Agents.

We use [Terraform](https://www.terraform.io/) to deploy all infrastructure and iofogctl to configure remote edge nodes to install agent software on. The infrastructure uses

The project spins up an infrastructure stack which consists of:

- Virtual Private Cloud (VPC) on GPC
- Google Kubernetes Engine on GPC
- Edge nodes (x86 and arm64) on Packet (optional)

After the infrastructure setup, iofog Edge Compute Network (ECN) is deployed on the GKE cluster using [iofogctl](./iofogctl/usage.html).

## Prerequisites

In order to setup the infrastructure and then install ECN and Agents, we will need the following tools:

- [Terraform](https://www.terraform.io/) (version 0.12.\*, [installation instructions](https://learn.hashicorp.com/terraform/getting-started/install.html))
- GCloud SDK ([quickstart guide](https://cloud.google.com/sdk/docs/quickstarts))
- Kubectl ([installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/))
* [iofogctl](https://github.com/eclipse-iofog/iofogctl) ([installation instructions](../getting-started/quick-start.html))

We don't have to install these tools manually now. Later in the process, we will use a script to download those dependencies and initialise terraform variable file.

### Google Cloud Platform Setup

In this section, we will retrieve a service account for GCP that will be later used to spin up infrastructure.

First, we need to setup gcloud with our project. We can either establish a service account or use a personal account with GCP. In both cases, the minimal set of IAM roles required is:

- Compute Admin
- Kubernetes Engine Admin
- Service Account User

To login with a service account and setup our project, first download the service account key file from GCP, then run the authenticate gcloud with the service account. Further details on how to setup a service account are available in the [GCP documentation](https://cloud.google.com/video-intelligence/docs/common/auth#set_up_a_service_account).

You can test authenticate gcloud with the newly created service account.

```bash
gcloud auth activate-service-account --key-file=service-account-key.json
```

If you no longer have the service account key file, it is possible to [generate another key using gcloud](https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/create) or using the GCP console.

### Packet Setup (Optional)

The platform tools also supports deployment of agent nodes on [packet](https://www.packet.com/). This step is entirely optional and is it possible to provide our own machines for ioFog Agents instead.

In this section we will retrieve a Packet API Token that will be later used for spinning up machines for ioFog Agents.

We will need Packet token to setup packet provider on terraform. First we have to [upload out ssh key](https://support.packet.com/kb/articles/ssh-access) that will be used by automation to add to newly created instances.

Next, retrieve a Packet [auth token](https://support.packet.com/kb/articles/api-integrations) and project ID from Packet website and save it for later.

## Platform Repository Usage

Let's get started with the platform tools now.

### Download Platform Tools

Clone the [ioFog platform repository](https://github.com/eclipse-iofog/platform) repository.

```bash
git clone git@github.com:eclipse-iofog/platform.git
cd platform
```

### Bootstrap Platform Tools

We can then run bootstrap to install all the required tools. It is possible to skip the installation step if we opt to instead provide the tools ourselves, please consult `./bootsrap.sh --help` for details.

Here we use the GCP service account key we have previously obtained in [Google Cloud Platform Setup](#google-cloud-platform-setup) section.

```bash
./bootstrap.sh --gcloud-service-account service-account-key.json
```

It is also possible to authenticate using a personal GCP account by running `./bootstrap.sh` only, but this is not recommended.


### Modify Configuration File

Edit the file `./my_vars.tfvars`. There are three main sections in the file: general variables, agents list and packet variables. Let's start by modifying the following general variables:

| Variables              | Description                                                  |
| -----------------------|:------------------------------------------------------------:|
| `google_application_credentials`           | *Path to [gcloud service account json key](https://cloud.google.com/iam/docs/creating-managing-service-account-keys)*                         |
| `project_id`           | *id of your google platform project*                         |
| `environment`          | *unique name for your environment*                           |
| `gcp_region`           | *region to spin up the resources*                            |
| `controller_image`     | *docker image link for controller setup*                     |
| `connector_image`      | *docker image link for connector setup*                      |
| `scheduler_image`      | *docker image link for scheduler setup*                      |
| `operator_image`       | *docker image link for operator setup*                       |
| `kubelet_image`        | *docker image link for kubelet setup*                        |
| `controller_ip`        | *list of edge ips, comma separated to install agent on*      |
| `iofogUser_name`       | *name for registration with controller*                      |
| `iofogUser_surname`    | *surname for registration with controller*                   |
| `iofogUser_email`      | *email to use to register with controller*                   |
| `iofogUser_password`   | *password(length >=8) for user registeration with controller*|
| `iofogctl_namespace`   | *namespace to be used with iofogctl commands*                |
| `agent_list`           | *list of agents to be deployed*                              |

Next, if we want to bring any existing agents, we need to fill in the agent list. The variable `agent_list` contains a list of remote hardware.

To do so we require the following information (per remote resource):

```
agent_list = [
 {
     name = "<AGENT_NAME>",
     user = "<AGENT_USER>",
     host = "<AGENT_IP>",
     port = "<SSH_PORT>",
     keyfile = "<PRIVATE_SSH_KEY>"
 },
]
```

| Variables | Description |
| --- | --- |
| `name` | Name used to register the agent with the controller |
| `user` | User name for ssh connection into the resource |
| `host` | host for ssh connection into the resource |
| `port` | port for ssh connection into the resource |
| `keyfile` | Absolute path to the private key used to ssh into the resource |

Last, if we want to spin up any Packet nodes, we need to fill in the Packet related variables.

The platform tools will look for the `packet_auth_token` variable. If it is defined, it will try to spin up Packet nodes according to the other variables. If it is empty or commented, not Packet nodes will be provided.

| Variables              | Description                                                  |
| -----------------------|:------------------------------------------------------------:|
| `packet_auth_token`    | *packet [auth token](https://support.packet.com/kb/articles/api-integrations)*                 |
| `packet_project_id`    | *packet project id to spin agents on packet*                 |
| `operating_system`     | *operating system for edge nodes on packet*                  |
| `packet_facility`      | *facilities to use to drop agents*                           |
| `count_x86`            | *number of x86(make sure your project plan allow)*           |
| `plan_x86`             | *server plan for device on x86 available on facility chosen* |
| `count_arm`            | *number of arm agents to spin up*                            |
| `plan_arm`             | *server plan for device on arm available on facility chosen* |
| `ssh_key`              | *path to ssh key to be used for accessing packet edge nodes* |

### Deploy and Destroy Infrastructure

To deploy your ioFog stack, run `./deploy.sh`

To destroy your ioFog stack, run `./destroy.sh`

## Interact with newly deployed infrastructure

Once the infrastructure is successfully deployed, we should be able to interact with the Kubernetes cluster. Terraform automatically setup our [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for us. Should we need to retrieve kubeconfig for our new cluster anytime in the future, we can use `gcloud container clusters get-credentials environment --region gcp_region`, where `environment` and `gcp_region` refer to previously described variables.

Try running `kubectl get no` to list all nodes available to the cluster. These will also includes our edge Agents as nodes.
