## iofogctl delete all

Delete all resources within a namespace

### Synopsis

Delete all resources within a namespace.

Tears down all components of an Edge Compute Network.

If you don't want to tear down the deployments but would like to free up the Namespace, use the disconnect command instead.

```
iofogctl delete all [flags]
```

### Examples

```
iofogctl delete all -n NAMESPACE
```

### Options

```
      --detached   Specify command is to run against detached resources
      --force      Force deletion of Agents
  -h, --help       help for all
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl delete](iofogctl_delete.html)	 - Delete an existing ioFog resource


