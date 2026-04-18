## iofogctl connect

Connect to an existing Control Plane

### Synopsis

Connect to an existing Control Plane.

This command must be executed within an empty or non-existent Namespace.
All resources provisioned with the corresponding Control Plane will become visible under the Namespace.
Visit iofog.org to view all YAML specifications usable with this command.

```
iofogctl connect [flags]
```

### Examples

```
iofogctl connect -f controlplane.yaml

iofogctl connect --email EMAIL --pass PASSWORD --kube     FILE 
                 --email EMAIL --pass PASSWORD --ecn-addr ENDPOINT --name NAME

iofogctl connect --generate
```

### Options

```
      --b64               Indicate whether input password (--pass) is base64 encoded or not
      --ecn-addr string   URL of Edge Compute Network to connect to
      --email string      ioFog user email address
  -f, --file string       YAML file containing specifications for ioFog resources to deploy
      --force             Overwrite existing Namespace
      --generate          Generate a connection string that can be used to connect to this ECN
  -h, --help              help for connect
      --kube string       Kubernetes config file. Typically ~/.kube/config
      --name string       Name you would like to assign to Controller
      --pass string       ioFog user password
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 


