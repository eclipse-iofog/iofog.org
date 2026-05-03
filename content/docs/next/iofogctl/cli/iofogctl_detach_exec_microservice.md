## iofogctl detach exec microservice

Detach an Exec Session to a Microservice

### Synopsis

Detach an Exec Session to an existing Microservice.

```
iofogctl detach exec microservice NAME [flags]
```

### Examples

```
iofogctl detach exec microservice AppName/MicroserviceName
```

### Options

```
  -h, --help   help for microservice
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl detach exec](iofogctl_detach_exec.html)	 - Detach an Exec Session to a resource


