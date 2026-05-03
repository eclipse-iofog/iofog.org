## iofogctl disconnect

Disconnect from an ioFog cluster

### Synopsis

Disconnect from an ioFog cluster.

This will remove all client-side information for this Namespace. The Namespace will itself be deleted.
Use the connect command to reconnect after a disconnect.
If you would like to uninstall the Control Plane and/or Agents, use the delete command instead.

```
iofogctl disconnect [flags]
```

### Examples

```
iofogctl disconnect -n NAMESPACE
```

### Options

```
  -h, --help   help for disconnect
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 


