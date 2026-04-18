## iofogctl nats users create

Create NATS user under an application account

```
iofogctl nats users create APP_NAME USER_NAME [flags]
```

### Options

```
      --expires-in int     Expiry in seconds
  -h, --help               help for create
      --nats-rule string   NATS user rule name
      --output string      Output format: yaml|json|wide (default "yaml")
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl nats users](iofogctl_nats_users.html)	 - NATS user operations


