# Platform Tools

In this guide we will go through the ioFog platform supporting tools. By the end of this guide we will have a set infrastructure necessary for deployment of Edge Compute Networks (ECNs) including machines for ioFog Agents. This guide is tied to [ioFog platform repository](https://github.com/eclipse-iofog/platform).

We use [Terraform](https://www.terraform.io/) to deploy all infrastructure and iofogctl to configure remote edge nodes to install agent software on. The infrastructure uses

The platform project spins up an infrastructure stack which consists of:

- Virtual Private Cloud (VPC) on GPC
- Google Kubernetes Engine on GPC
- Edge nodes (x86 and arm64) on Packet (optional)

After the infrastructure setup, we can deploy Edge Compute Network (ECN) on the GKE cluster using [iofogctl](./iofogctl/usage.html).

## Prerequisites

In order to setup the infrastructure and then install ECN and Agents, we will need the following tools:

- [Terraform](https://www.terraform.io/) (version 0.12.\*, [installation instructions](https://learn.hashicorp.com/terraform/getting-started/install.html))
- GCloud SDK ([quickstart guide](https://cloud.google.com/sdk/docs/quickstarts))
- Kubectl ([installation instructions](https://kubernetes.io/docs/tasks/tools/install-kubectl/))

To then install a complete EdgeCompute Network (ECN), we will also need `iofogctl`:

- [iofogctl](https://github.com/eclipse-iofog/iofogctl) ([installation instructions](../getting-started/quick-start.html))

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

We will need Packet token to setup packet provider on terraform. First we have to [upload our ssh key](https://support.packet.com/kb/articles/ssh-access) that will be used by automation to add to newly created instances.

Next, retrieve a Packet [auth token](https://support.packet.com/kb/articles/api-integrations) and project ID from Packet website and save it for later.

## Platform Repository Usage

Let's get started with the platform tools now by cloning the [ioFog platform repository](https://github.com/eclipse-iofog/platform) repository.

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

First create a copy of the variables template file.

```bash
cp infrastructure/gcp/template.tfvars user.tfvars
```

Now we have to edit the `user.tfvars` file according to our credentials and desired infrastructure. There are three main sections in the file: general variables, agents list and packet variables. Let's start by modifying the following general variables:

| Variables                        | Description                                                                                           |
| -------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `google_application_credentials` | Path to the service account key file from [Google Cloud Platform Setup](#google-cloud-platform-setup) |
| `gcp_service_account`            | Name of the GCP service account                                                                       |
| `project_id`                     | GCP project ID                                                                                        |
| `environment`                    | Name of the infrastructure (to identify the resources on GCP and Packet)                              |
| `gcp_region`                     | Region if GCP infrastructure                                                                          |
| `packet_auth_token`              | Packet API key from [Packet Setup (Optional)](#packet-setup-optional) (Optional)                      |
| `packet_project_id`              | Packet project ID (Optional)                                                                          |
| `packet_operating_system`        | Packet operating system of all agents (Optional)                                                      |
| `packet_facility`                | Packet regions (called facilities) (Optional)                                                         |
| `packet_count_x86`               | Packet number of x86 instances (Optional)                                                             |
| `packet_plan_x86`                | Packet plan of x86 instances (Optional)                                                               |
| `packet_count_arm`               | Packet number of arm instances (Optional)                                                             |
| `packet_plan_arm`                | Packet plan of arm instances (Optional)                                                               |

### Deploy and Destroy Infrastructure

To deploy the new infrastructure, run:

```bash
./deploy.sh user.tfvars
```

### Interact With Newly Deployed Infrastructure

Once the infrastructure is successfully deployed, we should be able to interact with the Kubernetes cluster. Terraform automatically setup our [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) for us. To use the newly created Kubernetes cluster, we need to define `KUBECONFIG` environment variable to point to a kubeconfig file created by Terraform. The kubeconfig file is always in `infrastructure/gcp/<environment>.kubeconfig`, where `<environemnt>` corresponds to the settings passed in our `user.tfvars` file.

```bash
export KUBECONFIG="$PWD/infrastructure/gcp/<environment>.kubeconfig"
```

Should we need to retrieve kubeconfig for our new cluster anytime in the future or from another machine, we can use `gcloud container clusters get-credentials environment --region gcp_region`, where `environment` and `gcp_region` refer to previously described variables.

Try running `kubectl get no` to list all nodes available to the cluster. These will also includes our edge Agents as nodes.

### Deploy Edge Compute Network

Now that the infrastructure is up, we can deploy our first ECN on the infrastructure. We are going to use `iofogctl` for this purpose.

We start by editing the generated `ecn.yaml` file according to [iofogctl specification](../tools/iofogctl/stack-yaml-spec.md). Most important are `kubeconfig` and `keyfile` parameters. The `kubeconfig` variable is the same as in [Interact With Newly Deployed Infrastructure](#interact-with-newly-deployed-infrastructure). `keyfile` refers to a private SSH key to access the given agent. For Packet agents, these must be uploaded to Packet according to [Packet Setup (Optional)](#packet-setup-optional). This is also where we can add additional agents (outside of the new infrastructure).

```yaml
controlplane:
  iofoguser:
    name: John
    surname: Doe
    email: john.doe@edgeworx.io
    password: '#Bugs4Fun'
  controllers:
    - name: ctrl
      kubeconfig: kubeconfig
      replicas: 1
      servicetype: LoadBalancer
connectors:
  - name: connector
    kubeconfig: kubeconfig
    replicas: 1
agents:
  - name: agent1
    user: root
    host: 139.178.90.1
    keyfile: ~/.ssh/id_ecdsa
```

Once we are happy with the file, we can deploy the ECN:

```bash
iofogctl -n platform-ecn deploy -f ecn.yaml
```

### Destroy Infrastructure

To destroy the infrastructure (and all deployed ECNs), run:

```bash
./destroy.sh user.tfvars
```

Make sure the `tfvars` file is the same for both deploy and destroy invocations.
