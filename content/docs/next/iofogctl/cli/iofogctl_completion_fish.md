## iofogctl completion fish

Generate the autocompletion script for fish

### Synopsis

Generate the autocompletion script for the fish shell.

To load completions in your current shell session:

	iofogctl completion fish | source

To load completions for every new session, execute once:

	iofogctl completion fish > ~/.config/fish/completions/iofogctl.fish

You will need to start a new shell for this setup to take effect.


```
iofogctl completion fish [flags]
```

### Options

```
  -h, --help              help for fish
      --no-descriptions   disable completion descriptions
```

### Options inherited from parent commands

```
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl
```

### SEE ALSO

* [iofogctl completion](iofogctl_completion.html)	 - Generate the autocompletion script for the specified shell


