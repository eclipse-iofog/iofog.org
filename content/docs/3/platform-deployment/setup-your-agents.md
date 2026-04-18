<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Make sure your remote hosts are ready for Agent installation via iofogctl!</h3>
  <p>Go to <a href="prepare-your-remote-hosts.html">Prepare your Remote Hosts</a> to find out how to prepare your Agent hosts for installation.</p>
</aside>

# Setup Agents

The actual 'edge' of our Edge Compute Network ('ECN') is composed of Agents. The other component (the Controllers) can be deployed anywhere, including cloud infrastructure, but Agents can only live on standalone hosts.

## Deploy Agents on Remote Hosts

Create a template of agent.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v2
kind: Agent
metadata:
  name: zebra-1
spec:
  host: 38.101.23.10
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa" > /tmp/agent.yaml
```

Make sure to edit the `host`, `ssh.user`, and `ssh.keyFile` fields to correspond with the remote host we are deploying to.

Once we have edited the fields to our liking, go ahead and run:

```bash
iofogctl deploy -f /tmp/agent.yaml
```

## Verify the Deployment

We can use the following commands to verify the Agent is up and running:

```bash
iofogctl get agents
```

```bash
iofogctl describe agent zebra-1
```

# Customize Agent Installation

`iofogctl` can install ioFog Agent on a number of Linux distributions out of the box. However, the list of supported distributions is finite; in order to allow the community to add support for any host environment, `iofogctl` provides the ability to run user-defined installation scripts for Agent and its dependancies.

`iofogctl` requires 3 scripts for this purpose: one for installing pre-requisites, one for installing ioFog Agent, and one for uninstalling ioFog Agent. Users can bundle any number of scripts but must provide scripts as entrypoints to the pre-requisite, installation, and unininstallation procedures if they wish to override them. Users can override any subset of the 3 procedures - they need not override all 3.

Here is an example of what a custom set of scripts might look like:

```bash
$ ls assets/agent
check_prereqs.sh
init.sh
install_deps.sh
install_docker.sh
install_iofog.sh
install_java.sh
uninstall_iofog.sh
```

And here is an example of what the corresponding Agent YAML spec would look like.

```yaml
apiVersion: iofog.org/v2
kind: Agent
metadata:
  name: meerkat-1
spec:
  host: 34.82.205.186
  ssh:
    user: bob
    keyFile: ~/.ssh/id_rsa
  scripts:
    dir: assets/agent
    deps:
      entrypoint: install_deps.sh
    install:
      entrypoint: install_iofog.sh
      args:
        - 3.0.0-alpha1
    uninstall:
      entrypoint: uninstall_iofog.sh
```

Upon Agent deployment, `iofogctl` will copy these scripts to `/etc/iofog/agent/`. It will then first invoke `install_deps.sh` as the entrypoint to the pre-requisites procedure. `install_deps.sh` will call `install_java.sh` and `install_docker.sh` directly. Finally, `iofogctl` will invoke `install_iofog.sh` as the Agent installation procedure.

Check out the [YAML specification](../reference-iofogctl/reference-agent.html#installation-plugin-fields) to get started. The default `iofogctl` scripts can be found [here](https://github.com/eclipse-iofog/iofogctl/tree/v3.0.0-alpha1/assets/agent). It is highly recommended you start developing your custom scripts from these.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Now we are ready to start deploying Microservices to our new ECN! We explored how to do this in the <a href="../getting-started/quick-start-local.html">Quick Start With Local Deployment</a> already. We can now try deploying the same microservice on our new ECN. To learn more about microservice management, get started at <a href="../applications/applications.html">Microservice Management - Distributed Applications</a>.</p>
  
  <p>To get going with our own Microservices, start by looking at the tutorial on creating our own Microservices at <a href="../tutorial/introduction.html">Tutorial - Our First Microservice</a>.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/platform-deployment/setup-your-agents.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
