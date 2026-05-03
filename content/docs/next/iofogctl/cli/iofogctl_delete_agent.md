## iofogctl delete agent

Delete an Agent

### Synopsis

Delete an Agent.

The Agent will be unprovisioned from the Controller within the namespace.

The Agent stack will be uninstalled from the host.

If you wish to not remove the Agent stack from the host, please use iofogctl detach agent

```
iofogctl delete agent NAME [flags]
```

### Examples

```
iofogctl delete agent NAME
```

### Options

```
      --detached   Specify command is to run against detached resources
      --force      Remove even if there are still Microservices running on the Agent
  -h, --help       help for agent
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl delete](iofogctl_delete.html)	 - Delete an existing ioFog resource


