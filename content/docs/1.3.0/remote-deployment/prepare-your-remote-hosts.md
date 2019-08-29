# Prepare Your Remote Hosts

An ioFog Edge Compute Network ('ECN') is composed of a set of ioFog Controllers, Connectors, and Agents. A typical ECN will have each instance of the various components deployed on a different remote host.

ECN's are deployed using `iofogctl`. The following steps will ensure that your remote hosts are ready to have `iofogctl` deploy ECN components onto them remotely.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Need help creating some VMs to work with?</h3>
  <p>In this guide we assume your remote hosts already exist. If you need help setting up some VMs, try out our <a href=../tools/platform-tools.html>Platform Tools</a>.</p>
</aside>

## Add your SSH RSA Public Key to the Remote Host

`iofogctl` will SSH into your remote hosts using an RSA SSH key-pair you specify. 

Add the public key of the key-pair that you intend to use with `iofogctl` to the remote host you intend to deploy ECN components onto. For example, you could run a command like this from the host you intend to use `iofogctl` from:

```bash
ssh-copy-id -i ~/.ssh/id_rsa.pub <username>@<hostname>
```

## Add the Remote Host's User to Sudo Group

`iofogctl` will need to run certain commands as sudo. In order to do this without using the root user, you must add the user you intend to use on the remote host to the sudo group. Run this command on the remote host:

```bash
usermod -aG sudo $USER
```

## Allow Sudoers to Sudo without Password

In order to prevent interruptions during `iofogctl` SSH sessions, we need to ensure that the sudoers in the remote host can run commands without having to enter a password. 

We can achieve this by editing the sudoers file by first running `su visudo` on the remote host. This will open up the sudoers file for editing. Make sure this line is present in the file `%sudo ALL=(ALL) NOPASSWD:ALL`.

[Continue To Next Step: Prepare your Network](prepare-your-network.html).