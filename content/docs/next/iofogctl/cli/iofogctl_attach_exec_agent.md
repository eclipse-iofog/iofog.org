## iofogctl attach exec agent

Attach an Exec Session to an Agent

### Synopsis

Attach an Exec Session to an existing Agent.

```
iofogctl attach exec agent NAME [DEBUG_IMAGE] [flags]
```

### Examples

```
iofogctl attach exec agent AgentName DebugImage
```

### Options

```
  -h, --help   help for agent
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl attach exec](iofogctl_attach_exec.html)	 - Attach an Exec Session to a resource


