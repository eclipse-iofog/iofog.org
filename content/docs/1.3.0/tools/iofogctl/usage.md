# ioFog Unified Command Line Interface

`iofogctl` is a CLI tool for installation, configuration, and operation of ioFog Edge Compute Networks (ECNs).

It can be used to remotely manage multiple different clusters from a single host. It is built for an ioFog user and a DevOps engineer who may want to manage ioFog clusters.

This section will explain key aspects of `iofogctl's` design and functionality for the purposes of understanding the CLI in greater detail.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Have you tried the Quick Start Guide first?</h3>
  <p>The <a href=../../getting-started/quick-start.html>Quick Start Guide</a> is the best place to get going with iofogctl. It will show you how to install iofogctl and get your first Edge Compute Network up. This section will make alot more sense if you have done that first!</p>
</aside>

## Getting Familiar

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

You can also find all available commands, and a detailled documentation of their usage on [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0/docs/md/iofogctl.md).

Some commands have sub-commands. For example, the `deploy` command has sub-commands `controller`, `agent`, and `connector`. You can use the `--help` flag on every command, including sub-commands, to learn more. Go ahead and try some of the following:

```bash
iofogctl deploy --help
iofoctl create --help
iofogctl connect --help
iofogctl deploy controller --help
iofogctl get --help
```

## Working with Namespaces

All actions performed with `iofogctl` are scoped to a single namespace. The default namespace ('default') is used if the user does not specify a namespace explicitly in the command. Note that namespaces in `iofogctl` map to a Kubernetes namespace when `iofogctl` is used for a Kubernetes deployment of ioFog.

Try creating, listing, and deleting namespaces now with the following commands.

```bash
iofogctl create namespace zoo-1
iofogctl get namespaces
iofogctl delete namespace zoo-1
```

Next, we will use the default namespace while exploring `iofogctl` functionality.

## Deploying New Edge Compute Networks

`iofogctl` allows you to deploy entire Edge Compute Networks ('ECN') from a single command.

```bash
iofogctl deploy -f ecn.yaml
```

`iofogctl` also allows you to deploy indvidiual components of an ECN from various subcommands.

```bash
iofogctl deploy controlplane -f controlplane.yaml
iofogctl deploy controller -f controller.yaml
iofogctl deploy connector -f connector.yaml
iofogctl deploy agent -f agent.yaml
iofogctl deploy application -f application.yaml
```

Specifications of the ioFog stack YAML types can be found [here](../iofogctl/stack-yaml-spec.html)
Specifications of the ioFog application YAML types can be found [here](../iofogctl/application-yaml-spec.html)

## Connect to an Existing Edge Compute Network

Instead of deploying our own ECN, we can connect to an existing one.

```bash
iofogctl connect alpaca-1 --controller 30.40.50.1 --email user@domain.com --pass h9g84q
```

Or for Kubernetes Controllers:

```bash
iofogctl connect alpaca-2 --kube-config ~/.kube/config --email user@domain.com --pass h9g84q
```

Note that we must specify an empty or non-existent namespace when we use the connect command. This is because each cluster should be in its own namespace.

## View Edge Compute Network Details

Once we are connected to a live ECN, we can go ahead and do some introspection.

Try to display individual resources or all resources within a namespace with the get command:

```bash
iofogctl get controllers
iofogctl get connectors
iofogctl get agents
iofogctl get applications
iofogctl get microservices
iofogctl get all
```

To get more detailed information, we can use the describe command:

```bash
iofogctl describe controlplane
iofogctl describe controller alpaca-1
iofogctl describe connector meerkat-2
iofogctl describe agent kiwi-1
iofogctl describe application health-care-app
iofogctl describe microservice health-care-ui
```

## Disconnect From Edge Compute Network

When we are finished working with the cluster, we can disconnect from it and release the corresponding namespace from `iofogctl`.

```bash
iofogctl disconnect
```

## Delete Components of Edge Compute Networks

We can delete resources that we have deployed to free up any associated infrastructure. Deleting resources like Control Planes, Controllers, Connectors, and Agents will cause any corresponding daemons to be terminated on the remote hosts.

```bash
iofogctl delete controller alpaca-1
iofogctl delete connector meerkat-2
iofogctl delete agent kiwi-1
iofogctl delete application health-care-app
iofogctl delete microservice health-case-ui
```

To undo a deletion, we can simply re-run the corresponding deploy command for the deleted resource.

If we want to wipe an entire ECN, we can run:

```bash
iofogctl delete all
```

or, if we also want to delete the namespace, we can run:

```bash
iofogctl delete namespace zoo-1 --force
```
