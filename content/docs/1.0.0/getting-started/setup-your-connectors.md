# Setup Your Connectors (optional)

If the microservices running on your nodes need to communicate with other microservices in your network, ioFog includes an _*optional*_ daemon called a **Connector**. The Connector assists in providing automatic discovery and NAT traversal, brokering direct peer-to-peer (P2P) communication when possible.

### Minimum Requirements

- Processor: x86-64 or ARM Dual Core or better
- RAM: 1 GB minimum
- Hard Disk: 5 GB minimum
- Linux kernel v3.10+ (Ubuntu, CentOS, Raspbian, etc)
- Java Runtime v8.0.0 or higher

## Setup

### Install Java v8.0.0+

You can find official Java SE Runtime downloads on [Oracle's website](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) or alternatively install the [OpenJDK Runtime](http://openjdk.java.net/install/).

You can also use apt-get:

```sh
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

### Install Connector Daemon

#### Ubuntu/Debian

```sh
curl -s https://packagecloud.io/install/repositories/iofog/iofog-connector/script.deb.sh | sudo bash
sudo apt-get install iofog-connector
```

#### CentOS/Red Hat/Fedora

```sh
curl -s https://packagecloud.io/install/repositories/iofog/iofog-connector/script.rpm.sh | sudo bash
sudo yum install iofog-connector
```

## Add Configuration

The Connector looks for a JSON configuration file that needs to be created at `/etc/iofog-connector/iofog-connector.conf`.

This JSON configuration file has four required fields: `"ports"`, `"exclude"`, `"broker"`, and `"address"`.

| Field       | Description                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `"ports"`   | An array of allowed port ranges on the Connector's machine that it can use in ioFog Agent intercommunication.              |
| `"exclude"` | An array of port ranges on the Connector's machine that you want excluded from the ranges provided in the `"ports"` field. |
| `"broker"`  | TODO                                                                                                                       |
| `"address"` | TODO                                                                                                                       |

Here's an example:

```sh
# This is only an example. Make sure to change
# these values for your unique configuration.

sudo echo '{
  "ports": [
    "6000-6001",
    "7000-7002",
    "30000-39999",
    "40000-49999"
  ],
  "exclude": [
    "7001"
  ],
  "broker": 12345,
  "address": "127.0.0.1"
 }' > /etc/iofog-connector/iofog-connector.conf
```

## Dev Mode

The Connector has a Dev Mode that allows you to get up and running more quickly without needing to deal with SSL certificates.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Dev Mode must be enabled on all Controllers, Connectors, and Agents</h3>
  <p>When you enable Dev Mode on your Connector, make sure all of your Agents and Controllers are also in Dev Mode, otherwise they will not be able to communicate.</p>
  <p>When you're ready for production, make sure you disable Dev Mode on all of them as well, and have valid SSL certificates installed.</p>
</aside>

To enable Dev Mode on the Connector you'll need to first edit your configuration file `/etc/iofog-connector/iofog-connector.conf`, adding the property `"dev": true`.

##### Example /etc/iofog-connector/iofog-connector.conf

```git
{
  // etc...
  "address": "127.0.0.1",
+ "dev": true
 }
```

If your Connector is already registered with your Controller, you'll need to update it to use Dev Mode as well:

```sh
iofog-controller connector update --public-ip <connector_ip> --dev-mode-on
```

Otherwise, when you do register it with the Controller, make sure you include the `--dev-mode-on` flag.

With these enabled, the Connector will send and receive communications using `http://`, not `https://`, bypassing any need for SSL certificates.

## SSL Certificates

When not running in developer mode, the Connector requires a valid SSL certificate and key.

Ideally certificates would be signed by a Certificate Authority, but because that would require a public domain name, self-signed certificates are accepted as well.

By convention the Connector expects your SSL certificate and key to be named `server-cert.per` and `server-key.per` respectively and placed in the `/etc/iofog-connector` directory.

If you are using a self-signed certificate for your Connector, you'll need to make sure that you have enabled that feature from the Controller, wherever it is running:

```sh
# NOTE: this is the *Controller* not your Connector!

iofog-controller config connector add \
  --name "my-connector" \
  --domain "example.com" \
  --self-signed-on \
  --cert "$(< path/to/ssl.cert)"

# If you are using Dev Mode, you need to also include --dev-mode-on
```

The `--cert "$(< path/to/ssl.cert)"` argument is used to provide a copy of our self-signed certificate.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Use the same certificate for Controllers, Connectors, and Agents</h3>
  <p>If you use self-signed certificates your Controllers, Connectors, and Agents likely need to be configured to use the same certificate/key pair so their communication is trusted.</p>
</aside>

## Start the Connector

Now that our Connector is setup, let's go ahead and start it up using the Linux [service](https://linux.die.net/man/8/service) command.

```sh
sudo service iofog-connector start
```

If you need to stop or restart it, you can use `stop`

```sh
sudo service iofog-connector stop
```

## Add To Your Controller

The last step is to register your Connector with your Controlller. This will require providing a domain and and static IP address to reach your Connector as arguments to the Controller's `connector add` command:

```sh
iofog-controller connector add \
  --name <connector_name> \
  --domain <connector_domain_name> \
  --public-ip <connector_ip> \
```

## Conclusion

We now have a running Connector! If you haven't already, you'll want to next setup your ioFog [node Agents](setup-your-agents.html), and [your Controller](setup-your-controllers.html).

You can also [learn more about Connectors](../connectors/overview.html) or change additional [configuration options](../connectors/cli-usage.html).
