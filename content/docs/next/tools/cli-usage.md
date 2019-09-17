# iofogctl CLI Usage

```sh
iofog-controller <command> <action> <options>
```

## Commands

|                       |                                                 |
| --------------------- | ----------------------------------------------- |
| [create](#create)     | Create an ioFog resource.                       |
| [delete](#delete)     | Delete existing ioFog resources.                |
| [deploy](#deploy)     | Deploy ioFog stack on existing infrastructure.  |
| [describe](#describe) | Get detailed information of existing resources. |
| [get](#get)           | Get information of existing resources.          |
| [help](#help)         | Help about any command.                         |
| [legacy](#legacy)     | Execute commands using legacy CLI.              |
| [logs](#logs)         | Get log contents of deployed resource.          |

```bash
Flags:
    --config string      CLI configuration file (default is ~/.iofog/config.yaml)
    -h, --help               help for iofogctl
    -n, --namespace string   Namespace to execute respective command within (default "default")
    -q, --quiet              Toggle for displaying verbose output
    -v, --verbose            Toggle for displaying verbose output of API client

Use "iofogctl [command] --help" for more information about a command.
```

## create

```bash
iofogctl create [command]
```

Some resources (e.g. namespaces) are relevant to iofogctl alone. Other resources are created on the ioFog cluster itself.

Usage:
iofogctl create [command]

Available Commands:

```bash
namespace   Create a Namespace
```

Flags:
-h, --help help for create

## delete

Delete an existing ioFog resource.

Deleting Agents or Controllers will result in the respective deployments being torn down.

Usage:

```bash
  iofogctl delete [command]
```

Available Commands:

```bash
agent       Delete an Agent
all         Delete all resources within a namespace
application Delete an application
controller  Delete a Controller
namespace   Delete a Namespace
```

Flags:
-h, --help help for delete

## deploy

A YAML resource definition file can be use in lieu of the subcommands to deploy Controllers, Agents, Applications and Microservices.

The YAML resource definition file should look like this (two Controllers specified for example only):

```yaml
controllers:
  - name: k8s # Controller name
    kubeconfig: ~/.kube/conf # Will deploy a controller in a kubernetes cluster
  - name: vanilla
    user: serge # SSH user
    host: 35.239.157.151 # SSH Host - Will deploy a controller as a standalone binary
    keyfile: ~/.ssh/id_rsa # SSH private key
agents:
  - name: agent1 # Agent name
    user: serge # SSH User
    host: 35.239.157.151 # SSH host
    keyfile: ~/.ssh/id_rsa # SSH private key
  - name: agent2
    user: serge
    host: 35.232.114.32
    keyfile: ~/.ssh/id_rsa
applications: [] # See iofogctl deploy application for an application yaml schema
microservices: [] # See iofogctl deploy microservices
```

Usage:

```bash
  iofogctl deploy [flags]
  iofogctl deploy [command]
```

Examples:

```bash
iofogctl deploy -f [file.yml]
ifogoctl deploy [command]
```

Available Commands:

```bash
agent        Bootstrap and provision an edge host
application  Deploy ioFog application on existing infrastructure
controller   Deploy a Controller
microservice Deploy a Microservice
```

## describe

Get detailed information of existing resources.

Resources such as Agents require a working Controller in the namespace in order to be described.

Usage:

```bash
iofogctl describe resource NAME [flags]
```

Examples:

```bash
iofogctl describe controller NAME
iofogctl describe agent NAME
iofogctl describe microservice NAME
```

Valid resources are: controller, agent, microservice, application

Flags:

```bash
  -h, --help                 help for describe
  -o, --output-file string   YAML output file
```

## get

Get information of existing resources.

Resources like Agents will require a working Controller in the namespace to display all information.

Usage:
iofogctl get RESOURCE [flags]

Examples:

```bash
iofogctl get all
iofogctl get namespaces
iofogctl get controllers
```

Valid resources are: all, namespaces, controllers, agents, applications, microservices

```bash
Flags:
  -h, --help   help for get
```

## help

Help provides help for any command in the application.
Simply type iofogctl help [path to command] for full details

e.g.

```bash
iofogctl help [command]
```

## legacy

Execute commands using legacy CLI

Usage:
iofogctl legacy resource RESOURCE COMMAND ARGS... [flags]

Examples:

```bash
iofogctl get all
iofogctl legacy controller NAME iofog
iofogctl legacy connector NAME status
iofogctl legacy agent NAME status
```

To find Legacy CLI usage please see:

[Agent Legacy CLI](https://iofog.org/docs/1.3.0/agents/cli-usage.md)

[Controller Legacy CLI](https://iofog.org/docs/1.3.0/controllers/cli-usage.md)

[Connector Legacy CLI](https://iofog.org/docs/1.3.0/connectors/cli-usage.md)

## logs

Get log contents of deployed resource

Usage:

```bash
  iofogctl logs RESOURCE NAME [flags]
```

Examples:

```bash
iofogctl logs controller NAME
iofogctl logs agent NAME
```

Flags:

```bash
  -h, --help   help for logs
```
