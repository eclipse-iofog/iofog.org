## iofogctl configure

Configure iofogctl or ioFog resources

### Synopsis

Configure iofogctl or ioFog resources

If you would like to replace the host value of Remote Controllers or Agents, you should delete and redeploy those resources.

```
iofogctl configure RESOURCE NAME [flags]
```

### Examples

```
iofogctl configure current-namespace NAME

iofogctl configure controller  NAME --user USER --key KEYFILE --port PORTNUM
                   controllers
                   agent
                   agents

iofogctl configure controlplane --kube FILE
```

### Options

```
      --detached      Specify command is to run against detached resources
  -h, --help          help for configure
      --key string    Path to private SSH key
      --kube string   Path to Kubernetes configuration file
      --port int      Port number that iofogctl uses to SSH into remote hosts
      --user string   Username of remote host
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 


