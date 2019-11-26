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
  connect       Connect to an existing ioFog cluster
  create        Create a resource
  delete        Delete an existing ioFog resource
  deploy        Deploy ioFog platform or components on existing infrastructure
  describe      Get detailed information of existing resources
  disconnect    Disconnect from an ioFog cluster
  get           Get information of existing resources
  help          Help about any command
  legacy        Execute commands using legacy CLI
  logs          Get log contents of deployed resource
  update        Update an existing ioFog resource
  version       Get CLI application version

Flags:
      --config string      CLI configuration file (default is ~/.iofog/config.yaml)
  -h, --help               help for iofogctl
      --http-verbose       Toggle for displaying verbose output of API client
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl

Use "iofogctl [command] --help" for more information about a command.

```

You can also find all available commands, and a detailled documentation of their usage on [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0/docs/md/iofogctl.md).

You can use the `--help` flag on every command to learn more. Go ahead and try some of the following:

```bash
iofogctl deploy --help
iofogctl create --help
iofogctl connect --help
iofogctl get --help
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

## Deploying New Edge Compute Networks

`iofogctl` allows you to deploy an entire ECN from a single command and YAML file.

```bash
iofogctl deploy -f ecn.yaml
```

`iofogctl` also allows you to deploy indvidiual components of an ECN using the same command but different YAML files.

```bash
iofogctl deploy -f controlplane.yaml
iofogctl deploy -f controller.yaml
iofogctl deploy -f connector.yaml
iofogctl deploy -f agent.yaml
iofogctl deploy -f application.yaml
```

`iofogctl` deploy commands are designed to be idempotent. Feel free to spam these commands as much as you like - the end result will always be the same. If anything goes wrong with your deployment, run the relevant deploy commands again and you should be good to go.

Specifications of the ioFog platform YAML types can be found [here](../iofogctl/platform-yaml-spec.html).
Specifications of the ioFog application YAML types can be found [here](../iofogctl/application-yaml-spec.html)

## Connect to an Existing Edge Compute Network

Instead of deploying our own ECN, we can connect to an existing one.

Note that we must always specify an empty or non-existent namespace when we use the connect command. This is because each cluster should be in its own namespace. Don't forget that not specifying the namespace means iofogctl will use the `default` namespace.

```bash
echo "---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  controllers:
  - name: alpaca-1
    host: 30.40.50.1" > /tmp/remote-controlplane.yaml
```

After editing the email, password, and host fields, we can go ahead and connect.

```bash
iofogctl connect -f /tmp/remote-controlplane.yaml
```

Or for Kubernetes Control Planes, we can use `kubeConfig` to connect. Keep in mind that the `iofogctl --namespace` flag must match the Kubernetes namespace where the Controller is deployed, otherwise `iofogctl` will be unable to find the deployment.

```bash
echo "---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  controllers:
  - name: alpaca-1
    kube:
      config: ~/.kube/config" > /tmp/k8s-controlplane.yaml
```

After editing the email, password, and kube config fields, we can go ahead and connect.

```bash
iofogctl connect -f /tmp/k8s-controlplane.yaml
```

We can use the above approach to connect to a large ECN with many agents described in a single YAML file. The benefit of this is that we can provide SSH details to Controllers, Connectors, and Agents deployed on remote hosts while we connect.

We can also connect to an ECN without providing a YAML file (and without configuring SSH details automatically).

For Vanilla Controllers we can run the following command and connect via the Controller endpoint.

```bash
iofogctl connect --endpoint 40.50.60.70 --name albatros --email user@domain.com --pass h9g84q
```

For Kubernetes Controllers we can run the same command but provide the Kubernetes config file instead of a Controller endpoint.

```bash
iofogctl connect --kube ~/.kube/config --name albatros --email user@domain.com --pass h9g84q
```

After using these commands, we can manually add SSH details where necessary using the `configure` command. The `configure` command lets us configure a single component or a group of components or all components at once.

```bash
iofogctl configure controller NAME --host HOST --user USER --key KEYFILE --port PORTNUM
iofogctl configure connector NAME --host HOST --user USER --key KEYFILE --port PORTNUM
iofogctl configure controller NAME --kube KUBECONFIG
iofogctl configure connector NAME --kube KUBECONFIG
iofogctl configure agent NAME --user USER --key KEYFILE --port PORTNUM

iofogctl configure all --user USER --key KEYFILE --port PORTNUM
iofogctl configure controllers --host HOST NAME --user USER --key KEYFILE --port PORTNUM
iofogctl configure connectors --host HOST --user USER --key KEYFILE --port PORTNUM
iofogctl configure agents --user USER --key KEYFILE --port PORTNUM
```

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

## Check the log output of components

Note: You will need ssh access to any remote resources to use this feature.

To check the log output of any resource, use `logs` e.g.

```bash
iofogctl logs controller NAME
iofogctl logs agent NAME
iofogctl logs microservice NAME
```

This will return either the log file from the machine, or the docker logs output of the running microservice.

## Using Legacy Commands

To use legacy commands from iofogctl, preface any legacy command you want with:

```bash
iofogctl legacy <component> <component-name> command -n <namespace of component>
```

e.g.

```bash
iofogctl legacy agent iofog-agent config -n default
```

where I want to get the output of the config command from my agent, named iofog-agent

To determine what legacy commands you wish to use, please see the legacy cli documentation for each component at the following links:

[Agent](../agents/cli-usage.html)

[Connector](../connectors/cli-usage.html)

[Controller](../controllers/cli-usage.html)
