## iofogctl legacy

Execute commands using legacy CLI

### Synopsis

Execute commands using legacy Controller and Agent CLI.

Legacy commands require SSH access to the corresponding Agent or Controller.

Use the configure command to add SSH details to Agents and Controllers if necessary.

```
iofogctl legacy resource NAME COMMAND ARGS... [flags]
```

### Examples

```
iofogctl legacy controller NAME COMMAND
iofogctl legacy agent      NAME COMMAND
```

### Options

```
      --detached   Specify command is to run against detached resources
  -h, --help       help for legacy
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 


