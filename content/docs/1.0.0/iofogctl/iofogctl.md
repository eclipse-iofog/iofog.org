# ioFog Unified Command Line Interface

In this tutorial, we will go through basic functionality of `iofogctl`. This tutorial will get us up and running with iofogctl and show how to deploy and operate a live cluster.

`iofogctl` is a CLI tool for installation, configuration, and operation of ioFog Edge Compute Networks (ECNs).

It can be used to remotely manage multiple different clusters from a single host. It is built for an ioFog user and a DevOps engineering wanting to manage ioFog clusters.

## Prerequisites

The following must be installed and configured before performing bootstrap:

- Go 1.12.1+ ([installation instructions](https://golang.org/doc/install))

In order to use iofogctl for non-local deployments, we will need to provide your own infrastructure. This means we will need to provision a Kubernetes cluster and a set of edge nodes yourself.

IoFog also provides [tools for infrastructure setup](https://github.com/eclipse-iofog/platform) to setup Kubernetes cluster and Agents. Please see [Platform tutorial](../platform/platform-tutorial.html)

## Install iofogctl

Mac users can use [Homebrew](https://brew.sh/):

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl
```

Linux users can use deb or rpm packages instead:

```bash
curl -s https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=1.0.0
```

```bash
curl -s https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-1.0.0-1.x86_64
```

For developers and user aiming for latest features, `iofogctl` can be installed in the usual Go fashion directly from its Gihub repository.

```bash
go get -u github.com/eclipse-iofog/iofogctl/cmd/iofogctl
```

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt="">Go get not recommented for casual users</h3>
  <p>Downloading iofogctl using `go get ...` will download the latest version of `iofogctl`. This may not be the same as released, well-tested version.</p>
</aside>

To verify if `iofogctl` has been installed successfully, run `iofogctl version` to check if the binary is up to date. The version number should be greater than, or equal to, 1.0.0.

## Quick Start

To list all available commands, just run `iofogctl` without any arguments. The available commands should look something like this:

```console
$ iofogctl
     _       ____                 __  __
    (_)___  / __/___  ____  _____/ /_/ /
   / / __ \/ /_/ __ \/ __ `/ ___/ __/ /
  / / /_/ / __/ /_/ / /_/ / /__/ /_/ /
 /_/\____/_/  \____/\__, /\___/\__/_/
                   /____/


Welcome to the cool new iofogctl Cli!

Use `iofogctl version` to display the current version.


Usage:
  iofogctl [flags]
  iofogctl [command]

Available Commands:
  connect     Connect to an existing ioFog cluster
  create      Create a resource
  delete      Delete an existing ioFog resource
  deploy      Deploy ioFog platform or components on existing infrastructure
  describe    Get detailed information of existing resources
  disconnect  Disconnect from an ioFog cluster
  get         Get information of existing resources
  help        Help about any command
  legacy      Execute commands using legacy CLI
  logs        Get log contents of deployed resource
  version     Get CLI application version

Flags:
      --config string      CLI configuration file (default is ~/.iofog.yaml)
  -h, --help               help for iofogctl
  -n, --namespace string   Namespace to execute respective command within (default "default")

Use "iofogctl [command] --help" for more information about a command.

```

## Work With Namespaces

All actions performed with iofogctl are scoped to a single namespace. The default namespace ('default') is used if the user does not specify a namespace explicitly in the command. Note that namespaces in `iofogctl` do no have to correspond with namespaces in Kubernetes cluster

Try creating, listing, and deleting namespaces now with the following commands:

```bash
iofogctl create namespace mynamespace
iofogctl get namespaces
iofogctl delete namespace mynamespace
```

Next we will use the default namespace to create new ioFog resources in.

## Deploy ioFog Stack

If we don't have an existing ioFog stack to connect to, we can use iofogctl to install and provision a new one.

IoFog Controller is the central part of each ioFog stack. `iofogctl` connects to a Controller in order to manage ioFog stack.

We can deploy the ioFog stack to a pre-existing Kubernetes cluster with the following command. Make sure to specify the location of our [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) correctly.

```bash
iofogctl deploy controller my-ctrl --kube-config ~/.kube/conf
```

Under the hood, `iofogctl` will also deploy ioFog Connector and Kubernetes services, which are another essential part of the ioFog stack

We can now check that the Controller was deployed successfully.

```console
$ iofogctl get all

CONTROLLER	STATUS		AGE		UPTIME
my-ctrl		online		-		1s

AGENT		STATUS		AGE		UPTIME

MICROSERVICE	STATUS		AGE

```

It is also possible to query for all Kubernetes resources installed. The namespace `iofogctl` uses is always `iofog`, so we can run `kubectl get all -n iofog` to see all the resources installed on our cluster.

## Connect Existing ioFog Stack With iofogctl

Instead of deploying our own iofogctl stack, we can just connect to another Controller, for example one deployed by Helm. See [helm tutorial](../kubernetes/how-to-helm.html) for in depth dive into Helm.

```bash
iofogctl connect my-ctrl \
  -o $(kubectl -n iofog get svc controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}:{.spec.ports[0].port}') \
  -e user@domain.com  -p '#Bugs4Fun'
```

It is also possible to use a kubeconfig file instead of specifying the Controller endpoint manually.

```bash
iofogctl connect my-ctrl --kube-config ~/.kube/conf --email EMAIL --pass PASSWORD
```

## Deploy Agent On The ioFog Stack

We can now deploy Agents to a namespace that has a working Controller connected. Here, `my-first-agent` is the agent name, `1.2.3.4` is the external IP that iofogctl can access, and `/home/username/.ssh/agent-key` is the key that needs to be authorized on the agent.

The node that will be hosting our Agent needs to be accessible via SSH, as it is the only way `iofogctl` can deploy the software and provision and register the Agent on that node.

```bash
iofogctl deploy agent my-first-agent --user username --host 1.2.3.4 --key-file /home/username/.ssh/agent-key
```

We can now check that the Agent was deployed successfully.

```console
$ iofogctl get all

CONTROLLER	    STATUS		AGE		UPTIME
ctrl		    online		-		1s

AGENT		    STATUS		AGE		UPTIME
my-first-agent	RUNNING		18070d23h	0s

MICROSERVICE	STATUS		AGE
```

### Deploy Agent Using YAML File

We can use a YAML file to specify Controllers and Agents to deploy in lieu of the separate commands detailed above.

Run `iofogctl deploy --help` to view an example of a valid YAML file. When the YAML file is ready, run the deploy command and specify your yaml filename.

```bash
iofogctl deploy -f platform.yaml
```

## View ioFog Cluster Details

Now that we are connected to a live ioFog cluster, we can go ahead and do some introspection.

Try to display individual resources or all resources within a namespaces with the get command:

```bash
iofogctl get controllers
iofogctl get agents
iofogctl get all
```

To get more detailed information, we can use the describe command:

```bash
iofogctl describe controller my-ctrl
iofogctl describe agent my-first-agent
```
