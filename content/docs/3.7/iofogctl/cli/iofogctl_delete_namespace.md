## iofogctl delete namespace

Delete a Namespace

### Synopsis

Delete a Namespace.

The Namespace must be empty.

If you would like to delete all resources in the Namespace, use the --force flag.

```
iofogctl delete namespace NAME [flags]
```

### Examples

```
iofogctl delete namespace NAME
```

### Options

```
      --force   Force deletion of all resources within the Namespace
  -h, --help    help for namespace
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl delete](iofogctl_delete.html)	 - Delete an existing ioFog resource


