## iofogctl completion bash

Generate the autocompletion script for bash

### Synopsis

Generate the autocompletion script for the bash shell.

This script depends on the 'bash-completion' package.
If it is not installed already, you can install it via your OS's package manager.

To load completions in your current shell session:

	source <(iofogctl completion bash)

To load completions for every new session, execute once:

#### Linux:

	iofogctl completion bash > /etc/bash_completion.d/iofogctl

#### macOS:

	iofogctl completion bash > $(brew --prefix)/etc/bash_completion.d/iofogctl

You will need to start a new shell for this setup to take effect.


```
iofogctl completion bash
```

### Options

```
  -h, --help              help for bash
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


