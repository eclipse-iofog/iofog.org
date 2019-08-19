# Quick Start

In this guide we will:
* Install the prerequisites and tools required to create and manage ECN's ('Edge Compute Networks')
* Create an ECN on a local machine to demonstrate the processes and components involved in an ECN
* Deploy a set of Microservices on our local ECN

## Prerequisites

`iofogctl` is a CLI tool and a one-stop-shop for all your ioFog needs.

All you need to run `iofogctl` is a Linux or MacOS host.

#### Install iofogctl on Mac

Mac users can use Homebrew:

```bash
brew tap eclipse-iofog/iofogctl
brew install iofogctl
```

#### Install iofogctl on Linux

The Debian package can be installed like so:

```bash
https://packagecloud.io/install/repositories/iofog/iofogctl/script.deb.sh | sudo bash
sudo apt install iofogctl
```

And similarly, the RPM package can be installed like so:

```bash
https://packagecloud.io/install/repositories/iofog/iofogctl/script.rpm.sh | sudo bash
sudo apt install iofogctl
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
controlplane:
  iofoguser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
  controllers:
  - name: LocalController
    host: localhost

connectors:
- name: LocalConnector
  host: localhost

agents:
 - name: LocalAgent
   host: localhost" > /tmp/quick-start.yaml
iofogctl deploy -f /tmp/quick-start.yaml
```

After the deployment has successfully completed, we can verify the resources we specified in the YAML file are running on our local machine.

```bash
iofogctl get all
```

## Deploy Microservices

Now that our local ECN is up, lets put it to use. The following commands will deploy a demonstration application on your ECN:

```bash
echo '---
applications:
  - name: "HealthcareWearableExample"
    microservices:
    - name: "heart-rate-monitor"
      agent:
        name: LocalAgent
        config:
          bluetoothEnabled: true # this will install the iofog/restblue microservice
          abstractedHardwareEnabled: false
      images: # Microservice docker images
        arm: "edgeworx/healthcare-heart-rate:arm-v1"
        x86: "edgeworx/healthcare-heart-rate:x86-v1"
      roothostaccess: false
      ports: []
      config:
        test_mode: true
        data_label: "Anonymous Person"
    - name: "heart-rate-viewer"
      agent:
        name: LocalAgent
      images:
        arm: "edgeworx/healthcare-heart-rate-ui:arm"
        x86: "edgeworx/healthcare-heart-rate-ui:x86"
      roothostaccess: false
      ports:
        - external: 5000
          internal: 80
      volumes:
        - hostdestination: /tmp/msvc
          containerdestination: /tmp
          accessmode: rw # access mode
      env:
        - key: "BASE_URL"
          value: "http://localhost:8080/data"
    routes:
    - from: "heart-rate-monitor"
      to: "heart-rate-viewer"' > /tmp/quick-start-app.yaml
iofogctl deploy -f /tmp/quick-start-app.yaml
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

You can also try deploying other Microservices on the local ECN. You can find instructions on writing your own Microservice [here](../writing-microservices/overview.html).
