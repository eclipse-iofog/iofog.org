# ioFog Unified Command Line Interface

In this tutorial, we'll go through the basic functionality of `iofogctl`. This tutorial will get us up and running with `iofogctl` and show how to deploy and operate a live cluster.

`iofogctl` is a CLI tool for installation, configuration, and operation of ioFog Edge Compute Networks (ECNs).

It can be used to remotely manage multiple different clusters from a single host. It is built for an ioFog user and a DevOps engineer who may want to manage ioFog clusters.

## Prerequisites

In order to use `iofogctl` to deploy ioFog components on remote environments, we'll need to provide our own infrastructure. This infrastructure will involve a set of remote hosts and, optionally, a Kubernetes cluster.

For Kubernetes clusters, all you need is a valid Kubernetes config file on the machine that `iofogctl` is running.

For remote hosts, please follow these [instructions](../../remote-deployment/prepare-your-remote-hosts.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Need help setting up infrastructure?</h3>
  <p>We provide some helpful <a href="../platform-tools.html">tools</a> for setting up your own remote hosts and Kubernetes cluster.</p>
</aside>

## Install iofogctl

Mac users can use [Homebrew](https://brew.sh/):

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@1.2
```

Linux users can use deb or rpm packages:

```bash
curl -s https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=1.2.5
```

```bash
curl -s https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-1.2.5-1.x86_64
```

For developers and users aiming for the latest features, `iofogctl` can be installed in the usual Go fashion directly from its GitHub repository.

```bash
go get -u github.com/eclipse-iofog/iofogctl/cmd/iofogctl
```

Let's verify if `iofogctl` has been installed successfully. Run `iofogctl version` to check if the binary is up to date.

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


Welcome to the cool new iofogctl CLI!

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

## Work with Namespaces

All actions performed with `iofogctl` are scoped to a single namespace. The default namespace ('default') is used if the user does not specify a namespace explicitly in the command. Note that namespaces in `iofogctl` do not have to correspond with namespaces in Kubernetes cluster.

Try creating, listing, and deleting namespaces now with the following commands.

```bash
iofogctl create namespace mynamespace
iofogctl get namespaces
iofogctl delete namespace mynamespace
```

Next, we will use the default namespace to create new ioFog resources in it.

## Deploying New Edge Compute Networks

`iofogctl` allows you to deploy entire Edge Compute Networks ('ECN') from a single command.

```bash
iofogctl deploy -f ecn.yaml
```

Specifications of the YAML types can be found [here](../iofogctl/yaml-spec.html)

## Connect to an Existing Edge Compute Network

Instead of deploying our own ECN, we can connect to an existing one.

```bash
iofogctl connect Controller-1 --controller <ip address> --email <email address> --pass <password>
```

Or for Kubernetes Controllers:

```bash
iofogctl connect Controller-1 --kube-config <~/.kube/config> --email <email address> --pass <password>
```

Note that we must specify an empty or non-existent namespace when we use the connect command. This is because each cluster should be in its own namespace.

## View Edge Compute Network Details

Now that we are connected to a live ioFog cluster, we can go ahead and do some introspection.

Try to display individual resources or all resources within a namespace with the get command:

```bash
iofogctl get controllers
iofogctl get agents
iofogctl get all
```

To get more detailed information, we can use the describe command:

```bash
iofogctl describe controller <Controller Name>
iofogctl describe agent <Agent Name>
```

## Disconnect From Edge Compute Network

When we are finished working with the cluster, we can disconnect from it and release the corresponding namespace from `iofogctl`.

```bash
iofogctl disconnect
```

## Delete Components of Edge Compute Networks

We can delete resources that we have deployed to free up any associated infrastructure. Deleting resources like Control Planes, Controllers, Connectors, and Agents will cause any corresponding daemons to be terminated on the remote hosts.

```bash
iofogctl delete controller <Name>
iofogctl delete agent <Name>
```

To undo a deletion, we can simply re-run the corresponding deploy command for the deleted resource.

If we want to wipe an entire ECN, we can run:

```bash
iofogctl delete all
```
