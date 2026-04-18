# Download And Install iofogctl

## Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl
```

## Install iofogctl on Windows

The Windows binary can be downloaded from [Eclipse ioFog Packages](https://github.com/eclipse-iofog/iofogctl/releases/download/v3.7.0/iofogctl.exe).

#### Prepare Windows

In order to use `iofogctl` to deploy an ECN locally on Windows we will need to configure Docker to run Linux containers:

- Install [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- Follow the guidelines for using WSL2 or Hyper-V backend [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)
- Ensure that docker is running with [docker desktop for windows](https://docs.docker.com/desktop/setup/install/windows-install)

## Install iofogctl on Linux

The Debian package can be installed like so:

```bash
wget -qO- https://iofog.datasance.com/iofog.gpg | sudo tee /etc/apt/trusted.gpg.d/iofog.gpg >/dev/null
echo "deb [arch=all signed-by=/etc/apt/trusted.gpg.d/iofog.gpg] https://iofog.datasance.com/deb stable main" | sudo tee /etc/apt/sources.list.d/iofog.list >/dev/null
sudo apt update
sudo apt install iofogctl -y

```

And similarly, the RPM package can be installed like so:

```bash
cd /etc/yum.repos.d ; curl https://iofog.datasance.com/iofog.repo -LO
sudo yum update
sudo yum install iofogctl
```

## Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.


<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Next steps?</h3>
    <ul>
      <li><a href="../getting-familiar.html">Getting familiar with iofogctl.</a></li>
      <li><a href="../yaml-references/reference-kinds.html">iofogctl reference.</a></li>
    </ul>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/iofogctl/download.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
