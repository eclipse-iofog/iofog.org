## iofogctl prune agent

Remove all dangling images from Agent

### Synopsis

Remove all the images which are not used by existing containers on the specified Agent

```
iofogctl prune agent NAME [flags]
```

### Examples

```
iofogctl prune agent NAME
```

### Options

```
      --detached   Specify command is to run against detached resources
  -h, --help       help for agent
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl prune](iofogctl_prune.html)	 - prune ioFog resources


