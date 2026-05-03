## iofogctl nats

Manage NATS resources

### Synopsis

Manage NATS-specific operations exposed by Controller APIs. Use get/describe/deploy/delete for CRUD-style NATS resources.

### Examples

```
iofogctl nats operator describe
iofogctl nats accounts ensure my-app --nats-rule default-account-rule
iofogctl nats users create my-app service-user
iofogctl nats users creds my-app service-user
```

### Options

```
  -h, --help   help for nats
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 
* [iofogctl nats accounts](iofogctl_nats_accounts.html)	 - NATS account operations
* [iofogctl nats operator](iofogctl_nats_operator.html)	 - NATS operator operations
* [iofogctl nats users](iofogctl_nats_users.html)	 - NATS user operations


