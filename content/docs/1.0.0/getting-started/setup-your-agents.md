# Setup Your Agents

An ioFog Agent is the microservice platform that runs on your individual edge hardware nodes. To set it up, you'll need to install the 'iofog-agent' daemon on each of these devices.

### Minimum Requirements

- Processor: x86-64 or ARM Dual Core or better
- RAM: 256 MB minimum
- Hard Disk: 100 MB minimum
- Linux kernel v3.10+ (Ubuntu, CentOS, Raspbian, etc)
- Java Runtime v8.0.0 or higher
- Docker v1.10 or higher

## Setup

#### Installation Script

You can install the Agent daemon and requirements (Java and Docker) with following command:

```sh
curl -sSf https://iofog.org/linux.sh | sh
```

or

#### Java v8.0.0+

You can find official Java SE Runtime downloads on [Oracle's website](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) or alternatively install the [OpenJDK Runtime](http://openjdk.java.net/install/).

You can also use apt-get:

```sh
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

#### Install Docker

You can install the latest version of Docker with following command:

```sh
curl -sSf https://get.docker.com/ | sh
```

or

Download Docker for [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/), [Debian](https://docs.docker.com/install/linux/docker-ce/debian/), [Fedora](https://docs.docker.com/install/linux/docker-ce/fedora/), or [CentOS](https://docs.docker.com/install/linux/docker-ce/centos/).

##### ARM CPU Docker Configuration

If your edge device has an ARM CPU, there is an additional configuration step for Docker required.

You need to edit (or add) either of these files:

The Docker daemon configuration file located at `/etc/docker/daemon.json` and place two entries in your `"hosts"`:

###### /etc/docker/daemon.json

```json
{
  "hosts": ["tcp://127.0.0.1:2375", "unix:///var/run/docker.sock"]
}
```

The Docker service configuration file located at `/etc/systemd/system/docker.service.d/overlay.conf` and add the following:

###### /etc/systemd/system/docker.service.d/overlay.conf

```sh
[Service]
ExecStart=
ExecStart=/usr/bin/dockerd --storage-driver overlay -H unix:///var/run/docker.sock -H tcp://127.0.0.1:2375
```

And run these commands:

```sh
sudo systemctl daemon-reload
sudo service docker restart
```

Once you've installed the Agent daemon, you need to change the network address that the Docker daemon can be found at:

```sh
# Run this once you've installed the iofog-agent daemon
iofog-agent config -c tcp://127.0.0.1:2375
```

### Install Agent Daemon

#### Ubuntu/Debian

```sh
curl -s https://packagecloud.io/install/repositories/iofog/iofog-agent/script.deb.sh | sudo bash
sudo apt-get install iofog-agent
```

#### CentOS/Red Hat/Fedora

```sh
curl -s https://packagecloud.io/install/repositories/iofog/iofog-agent/script.rpm.sh | sudo bash
sudo yum install iofog-agent
```

## Start the Agent

Now that our Agent is setup, let's go ahead and start it up using the Linux [service](https://linux.die.net/man/8/service) command.

```sh
sudo service iofog-agent start
```

If you need to stop or restart it, you can use `stop`

```sh
sudo service iofog-agent stop
```

## Dev Mode

The Agent has a Dev Mode that allows you to get up and running more quickly without needing to deal with SSL certificates.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Dev Mode must be enabled on all Controllers, Connectors, and Agents</h3>
  <p>When you enable Dev Mode on your Agent, make sure all of your Controllers and Connectors are also in Dev Mode, otherwise they will not be able to communicate.</p>
  <p>When you're ready for production, make sure you disable Dev Mode on all of them as well, and have valid SSL certificates installed.</p>
</aside>

To enter Dev Mode:

```sh
iofog-agent config -dev on
```

and then to disable Dev Mode:

```sh
iofog-agent config -dev off
```

With this enabled, the Agent will send and receive communications to the Controller and Connector using `http://`, not `https://`, bypassing any need for SSL certificates.

## SSL Certificates

When not running in developer mode, the Agent requires a valid SSL certificate.

Ideally certificates would be signed by a Certificate Authority, but because that would require a public domain name, self-signed certificates are accepted as well.

```sh
iofog-agent config -ac path/to/ssl.cert
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Use the same certificate for Controllers, Connectors, and Agents</h3>
  <p>If you use self-signed certificates your Controllers, Connectors, and Agents likely need to be configured to use the same certificate/key pair so their communication is trusted.</p>
</aside>

## Configure Controller

Agents are managed remotely by your Controller daemon, which needs to have already been setup and have a stable address (domain name or static IP).

Once you have it, you can configure your Agent to talk to that Controller:

```sh
# domain name
iofog-agent config -a example.com
# or IP address
iofog-agent config -a 127.0.0.1:9001
```

## Add Node to Controller

Your Controller manages all your ioFog nodes remotely by communicating with the [Agent](../agents/overview.html) running on them. Since we just setup an Agent on our new ioFog node we now need to add it to the Controller and get a provisioning key.

On the server running our Controller we'll use the `iofog-controller iofog add` command, providing a unique `name` for our node as well as the `fog-type`, which is number signifying the node's CPU architecture: `0` for automatic detection, `1` for x86 (and x64), and `2` for ARM. This command will return a unique node ID we'll use in our next step.

```sh
iofog-controller iofog add --name "my-fog-node" --fog-type 0 -u <user-id>
```

There are a number of other optional configuration options, such as CPU/memory/disk limits, enabling bluetooth, and others found in the [Controller CLI reference](../controllers/cli-usage.html).

Next, copy the node ID that was returned from calling `iofog-controller iofog add` above and use it to create a provisioning key:

```sh
iofog-controller iofog provisioning-key --iofog-uuid <iofog-uuid>
```

The key is only valid for **20 minutes** and can only be used once.

## Provision Your Node

The final step in setting up your Agents is provisioning. We'll need to use the provisioning key obtained from the previous step. Keep in mind that provisioning keys are one-time use only, and expire after 20 minutes.

On our edge node, pass the provisioning key as the argument to the `iofog-agent provision` command:

```sh
iofog-agent provision <provisioning_key>
```

## Conclusion

We now have a running Agent! If you haven't already, you'll want to finish setting up [your Controller](setup-your-controllers.html) and a [Connector](setup-your-connectors.html).

You can also [learn more about Agents](../agents/overview.html) or learn more about [writing microservices](../microservices/overview.html).
