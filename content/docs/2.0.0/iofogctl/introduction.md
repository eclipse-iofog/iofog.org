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



Welcome to the cool new iofogctl Cli!

Use `iofogctl version` to display the current version.


Usage:
  iofogctl [flags]
  iofogctl [command]

Available Commands:
  attach        Attach an existing ioFog resource to an ECN
  configure     Configure iofogctl or SSH details an existing resource
  connect       Connect to an existing ioFog cluster
  create        Create a resource
  delete        Delete an existing ioFog resource
  deploy        Deploy ioFog platform or components on existing infrastructure
  describe      Get detailed information of existing resources
  detach        Detach an existing ioFog resource from its ECN
  disconnect    Disconnect from an ioFog cluster
  get           Get information of existing resources
  help          Help about any command
  legacy        Execute commands using legacy CLI
  logs          Get log contents of deployed resource
  move          Move an existing resources inside the current ECN
  prune         prune ioFog resources
  rename        Rename the iofog resources that are currently deployed
  start         Starts a resource
  stop          Stops a resource
  version       Get CLI application version
  view          Open ECN Viewer

Flags:
      --detached           Use/Show detached resources
  -h, --help               help for iofogctl
      --http-verbose       Toggle for displaying verbose output of API client
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl

Use "iofogctl [command] --help" for more information about a command.

```

You can also find all available commands, and a detailled documentation of their usage on [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/develop/2.0.0-beta.release.md).

You can use the `--help` flag on every command to learn more. Go ahead and try some of the following:

```bash
iofogctl deploy --help
iofogctl create --help
iofogctl connect --help
iofogctl get --help
iofogctl attach --help
```

## Working with Namespaces

All actions performed with `iofogctl` are scoped to a single namespace. The default namespace ('default') is used if the user does not specify a namespace explicitly in the command. Note that namespaces in `iofogctl` map to a Kubernetes namespace when `iofogctl` is used to deploy an Edge Compute Network's ('ECN') Control Plane on Kubernetes.

Try creating, listing, and deleting namespaces now with the following commands.

```bash
iofogctl create namespace zoo-1
iofogctl get namespaces
iofogctl delete namespace zoo-1
```

Next, we will use the default namespace while exploring `iofogctl` functionality.

## View Edge Compute Network Details

Once we are connected to a live ECN, we can go ahead and do some introspection.

Try to display individual resources or all resources within a namespace with the get command:

```bash
iofogctl get controllers
iofogctl get agents
iofogctl get applications
iofogctl get microservices
iofogctl get all
```

To get more detailed information, we can use the describe command:

```bash
iofogctl describe controlplane
iofogctl describe controller alpaca-1
iofogctl describe agent kiwi-1
iofogctl describe application health-care-app
iofogctl describe microservice health-care-ui
```

## Check the log output of components

Note: You will need ssh access to any remote resources to use this feature.

To check the log output of any resource, use `logs` e.g.

```bash
iofogctl logs controller NAME
iofogctl logs agent NAME
iofogctl logs microservice NAME
```

This will return either the log file from the machine, or the docker logs output of the running microservice.

## Move microservices to another Agent

```bash
iofogctl move microservice NAME AGENT_NAME
iofogctl move microservice health-case-ui zebra-1
```

## Prune Docker on an Agent

We can now manually prune the docker images on our Agents, if our Agent is running out of diskspace.

```bash
iofogctl prune agent AGENT_NAME
```

## Detach / Attach an Agent

We can transfer an Agent from one ECN to another by detaching the agent and attaching it to another ECN.
Note: detaching an agent will delete its connection with the Controller, and all microservices will be shut down.

```bash
iofogctl detach agent AGENT_NAME
```

Switch to another ECN / namespace

```bash
iofogctl attach agent AGENT_NAME
```

To display all resources in dettached state with the get command

```bash
iofogctl get all --detached
```

If we have an Agent ready and running on a remote host, we can also attach it directly using host and ssh credentials:

```bash
iofogctl attach agent NAME --host HOST --host AGENT_HOST --user SSH_USER --port SSH_PORT --key SSH_PRIVATE_KEY_PATH
```

<aside class="notifications note">
  <b>See anything wrong with the document? Help us improve it!</b>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/iofogctl/introduction.md"
    target="_blank">
    <p style="text-align:left">Edit on Github <img src="/images/icos/ico-github.svg" alt=""></p>
  </a>
</aside>
