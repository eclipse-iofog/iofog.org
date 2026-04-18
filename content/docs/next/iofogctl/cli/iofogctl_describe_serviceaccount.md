## iofogctl describe serviceaccount

Get detailed information about a ServiceAccount

### Synopsis

Get detailed information about a ServiceAccount. ServiceAccounts are application-scoped; use APPLICATION_NAME/SERVICE_ACCOUNT_NAME (e.g. myapp/my-sa).

```
iofogctl describe serviceaccount APPLICATION_NAME/SERVICE_ACCOUNT_NAME [flags]
```

### Examples

```
iofogctl describe serviceaccount myapp/my-sa
```

### Options

```
  -h, --help                 help for serviceaccount
  -o, --output-file string   YAML output file
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl describe](iofogctl_describe.html)	 - Get detailed information of an existing resources


