# Quick Start

In this guide we will:

- Install the prerequisites and tools required to create and manage ECN's ('Edge Compute Networks')
- Create an ECN on a local machine to demonstrate the processes and components involved in an ECN

## Prerequisites

- `Docker 1.10+`: Open platform for developing, shipping, and running applications. ([installation instructions](https://docs.docker.com/install/))
- `iofogctl 1.2.0+`: CLI tool and a one-stop-shop for all your ioFog needs. ([installation instructions](https://github.com/eclipse-iofog/iofogctl/tree/v1.2.5#install))

#### Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl@1.2.5
```

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt-get install iofogctl=1.2.5
```

And similarly, the RPM package can be installed like so:

```bash
curl https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo yum install iofogctl-1.2.5-1.x86_64
```

#### Verify iofogctl Installation

Run `iofogctl version` to verify you have successfully installed the CLI.

## Deploy ioFog Locally

You can use `iofogctl deploy` to install and provision ioFog software. Now we will deploy ioFog locally by specifying localhost in the `host` fields of our yaml file.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about iofogctl?</h3>
  <p>We aren't going into detail about iofogctl here because we want to show you how simple it can be to get going with ioFog. Please make sure to check out the full iofogctl documentation <a href="../tools/iofogctl/usage.html">here</a>.</p>
</aside>

Go ahead an paste the following commands into your terminal:

```bash
echo "---
controllers:
  - name: LocalController
    host: localhost
    iofoguser:
      name: Quick
      surname: Start
      email: user@domain.com
      password: q1u45ic9kst563art

agents:
 - name: LocalAgent
   host: localhost" > /tmp/quick-start.yaml
iofogctl deploy -f /tmp/quick-start.yaml
```

After the deployment has successfully completed, we can verify the resources we specified in the YAML file are running on our local machine.

```bash
iofogctl get all
```

## View the Edge Compute Network

To have a quick look at the local ECN, we can run:

```bash
iofogctl get all
```

## Teardown

To remove our ECN and any microservices deployed on it, we can run the following command:

```bash
iofogctl delete all
```

## Next Steps

Now that you have seen what ioFog is about, you can create a real ECN with remote hosts. Instructions are found [here](../remote-deployment/prepare-your-remote-hosts.html).

You can also try deploying Microservices on the local ECN. You can follow the tutorial found [here](../tutorial/introduction.html).
