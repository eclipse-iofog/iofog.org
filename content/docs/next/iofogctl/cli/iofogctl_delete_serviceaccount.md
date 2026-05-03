## iofogctl delete serviceaccount

Delete a ServiceAccount

### Synopsis

Delete a ServiceAccount from the Controller. ServiceAccounts are application-scoped; use APPLICATION_NAME/SERVICE_ACCOUNT_NAME (e.g. myapp/my-sa).

```
iofogctl delete serviceaccount APPLICATION_NAME/SERVICE_ACCOUNT_NAME [flags]
```

### Examples

```
iofogctl delete serviceaccount myapp/my-sa
```

### Options

```
  -h, --help   help for serviceaccount
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl delete](iofogctl_delete.html)	 - Delete an existing ioFog resource


