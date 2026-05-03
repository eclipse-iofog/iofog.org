## iofogctl delete edge-resource

Delete an Edge Resource

### Synopsis

Delete an Edge Resource.

Only the specified version will be deleted.
Agents that this Edge Resource are attached to will be notified of the deletion.

```
iofogctl delete edge-resource NAME VERSION [flags]
```

### Examples

```
iofogctl delete edge-resource NAME VERSION
```

### Options

```
  -h, --help   help for edge-resource
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl delete](iofogctl_delete.html)	 - Delete an existing ioFog resource


