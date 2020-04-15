# Download And Install iofogctl

## Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@2.0
```

## Install iofogctl on Windows

The Windows binary can be downloaded from https://storage.googleapis.com/iofogctl/win/2.0/iofogctl.exe.

### Prepare Windows

In order to use `iofogctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://download.docker.com/win/stable/Docker%20Desktop%20Installer.exe)
- Enable Hyper-V in Powershell `Install-WindowsFeature -Name Hyper-V -IncludeManagementTools -Restart`
- Ensure that docker is running with [Linux containers mode](https://docs.docker.com/docker-for-windows/#switch-between-windows-and-linux-containers)

## Install iofogctl on Linux

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=2.0.0-beta4
```

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-2.0.0_beta4-1.x86_64
```

## Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/iofogctl/download.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
