# Download And Install iofogctl

## Install iofogctl on Mac

#### Homebrew

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@3.0
```

## Install iofogctl on Windows

The Windows binary can be downloaded from https://storage.googleapis.com/iofogctl/win/3.0/iofogctl.exe.

### Prepare Windows

In order to use `iofogctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)
- Enable Hyper-V in Powershell `Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart`
- Ensure that docker is running with [Linux containers mode](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers)

## Install iofogctl on Linux

#### Binary

```bash
curl -LO https://storage.googleapis.com/iofogctl/linux/3.0/iofogctl
sudo install -o root -g root -m 0755 iofogctl /usr/local/bin/iofogctl
rm ./iofogctl
```

#### Debian

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=3.0.0-alpha1
```

#### RPM

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-3.0.0-alpha1-1.x86_64
```

## Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Next steps?</h3>
  <ul>
    <li><a href="./getting-familiar.html">Getting familiar with iofogctl.</a></li>
    <li><a href="../reference-iofogctl/reference-kinds.html">iofogctl reference.</a></li>
  <ul>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/iofogctl/download.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
