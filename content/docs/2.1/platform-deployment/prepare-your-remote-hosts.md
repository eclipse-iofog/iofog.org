# Prepare Remote Hosts

An ioFog Edge Compute Network ('ECN') is composed of an ioFog Controller and a set of ioFog Agents. A typical ECN will have each instance of the various components deployed on a different remote host.

ECN's are deployed using `iofogctl`. The following steps will ensure that our remote hosts are ready to have `iofogctl` deploy ECN components onto them remotely.

## Add SSH RSA Public Key to the Remote Host

`iofogctl` will SSH into our remote hosts using an RSA SSH key-pair we specify.

We add the public key of the key-pair that we intend to use with `iofogctl` to the remote host to deploy ECN components onto. For example, we could run a command like this:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub <username>@<controller-or-agent-hostname>
```

We do this for Controller host (only when we intend to deploy Controller directly, i.e. not to Kubernetes cluster) and all the agents. Node this is the key we will later use to deploy Controller and Agent using `iofogctl`, please keep track of it.

## Add the Remote Host's User to Sudo Group

`iofogctl` will need to run certain commands as sudo. In order to do this without using the root user, we must add the user we intend to use on the remote host to the sudo group. Run this command on all the remote host:

```bash
usermod -aG sudo $USER
```

## Allow Sudoers to Sudo without Password

In order to prevent `iofogctl` from failing its SSH sessions, we need to ensure that the sudoers in the remote host can run commands without having to enter a password. Note that `iofogctl` is unable to prompt the user for passwords.

We can achieve this by editing the sudoers file by first running `su visudo` on the remote host. This will open up the sudoers file for editing. Make sure this line is present in the file `%sudo ALL=(ALL) NOPASSWD:ALL`.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Now we are ready to deploy the Controller! If we want to deploy it directly on a remote host, go to <a href="./remote-control-plane.html">Remote - Deploy Control Plane</a>.</p>
  
  <p>Otherwise, to deploy on Kubernetes cluster, go to <a href="./kubernetes-prepare-cluster.html">Kubernetes - Prepare A Cluster</a>, which is a series of steps needed to deploy ioFog on Kubernetes clusters.</p>
  
  <p>Both of these path eventually join when deploying Agents in <a href="setup-your-agents.html">Setup Agents</a> guide. But note that at this point, we cannot deploy Agents yet, because the have no Control Plane.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/platform-deployment/prepare-your-remote-hosts.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
