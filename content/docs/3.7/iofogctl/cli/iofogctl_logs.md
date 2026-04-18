## iofogctl logs

Get log contents of deployed resource

### Synopsis

Get log contents of deployed resource

```
iofogctl logs RESOURCE NAME [flags]
```

### Examples

```
iofogctl logs controller   NAME
              agent        NAME
              microservice AppName/MsvcName
```

### Options

```
      --follow         Follow log output (default true)
  -h, --help           help for logs
      --since string   Start time in ISO 8601 format (e.g., 2024-01-01T00:00:00Z)
      --tail int       Number of lines to tail (range: 1-10000) (default 100)
      --until string   End time in ISO 8601 format (e.g., 2024-01-02T00:00:00Z)
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl](iofogctl.html)	 - 


