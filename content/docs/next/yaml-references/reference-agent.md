
# Agent YAML Specification

Agents are components of an ECN which run on edge nodes. They communicate with Controllers to allow your edge nodes to host Microservices.

```yaml
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: meerkat
  namespace: default
spec:
  host: 30.40.50.6
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa
    port: 22
  package:
    # version: 3.7.0# provide Agent package version if you would like to deploy Agent as a deb or rpm package
    container: 
      image: ghcr.io/eclipse-iofog/agent:3.7.0 # provide image in the case you would like to deploy Agent as a container
  config:
    description: agent running on VM
    latitude: 46.204391
    longitude: 6.143158
    agentType: auto
    dockerUrl: unix:///var/run/docker.sock
    diskLimit: 50
    diskDirectory: /var/lib/iofog-agent/
    memoryLimit: 4096
    cpuLimit: 80
    logLimit: 10
    logDirectory: /var/log/iofog-agent/
    logFileCount: 10
    statusFrequency: 10
    changeFrequency: 10
    deviceScanFrequency: 60
    bluetoothEnabled: true
    watchdogEnabled: false
    gpsMode: auto
    gpsScanFrequency: 60
    gpsDevice: ''
    edgeGuardFrequency: 0
    abstractedHardwareEnabled: false
    upstreamRouters: ['default-router']
    networkRouter: ''
    routerConfig:
      routerMode: edge
      messagingPort: 5671
      edgeRouterPort: 45671
      interRouterPort: 55671
    upstreasmNatsServer:
      - default-nats-hub
    natsConfig:
      natsMode: leaf
      natsServerPort: 4222
      natsLeafPort: 7422
      natsMqttPort: 8883
      natsHttpPort: 8222
      jsStorageSize: 10g
      jsMemoryStoreSize: 1g
    dockerPruningFrequency: 0
    logLevel: INFO
    availableDiskThreshold: 90
  scripts:
    dir: /tmp/my-scripts
    deps:
      entrypoint: install_deps.sh
    install:
      entrypoint: install_iofog.sh
      args:
        - 3.7.0
    uninstall:
      entrypoint: uninstall_iofog.sh
```

#### Required Fields

The following fields are necessary for every Agent YAML specification.

| Field       | Description                                                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name        | User-defined unique identifier of Agent instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| host        | Hostname of remote host that iofogctl must SSH into to install Agent service.                                                                                       |
| ssh.user    | Username of remote host that iofogctl must SSH into to install Agent service.                                                                                       |
| ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Agent service.                                                                    |
| ssh.port    | Port to use with SSH. Optional (default: 22).                                                                                                                       |
| package.version    | Agent package version if you would like to deploy Agent as a deb or rpm package.                                                                                                                      |
| package.container.image    | Agent image in the case you would like to deploy Agent as a container                                                                                                                    |

#### Installation Plugin Fields

Agents can be specified to require user-defined installation scripts to be executed instead of the default `iofogctl` installation procedures.

Custom installation scripts are specified through the optional `scripts` field in the Agent YAML.

| Field         | Description                                                                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dir           | Source directory containing all scripts to be used in Agent installation and uninstallation procedures. All files in this directory are copied to `/etc/iofog/agent/` on the Agent host. |
| deps          | Details pertaining to the script in `scripts.dir` which serves as the entrypoint to installing pre-requisites of ioFog Agent.                                                            |
| install       | Details pertaining to the script in `scripts.dir` which serves as the entrypoint to installing ioFog Agent.                                                                              |
| uninstall     | Details pertaining to the script in `scripts.dir` which serves as the entrypoint to uninstalling ioFog Agent.                                                                            |
| \*.entrypoint | Name of the script in `scripts.dir` which serves as the entrypoint to a procedure run on the Agent host.                                                                                 |
| .\*.args      | List of arguments to be provided to the entrypoint when invoked on the Agent host.                                                                                                       |

#### Configuration Fields

The following fields can be specified to modify Agent behaviour.

Note that these values can be overidden after Agent deployment through the `AgentConfig` kind specified [here](#agent-configuration-yaml-specification).

Configuration details are specified through the optional `config` field in the Agent YAML.

| Field                        | Description                                                                                                                                                                                                                                                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                         | User-defined unique identifier of an agent within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                                                                                                                  |
| description                  | Short description of the agent                                                                                                                                                                                                                                                                               |
| latitude                     | Latitude coordinate of the agent. The ioFog Agent will automatically try to detect its own latitude if it has access to the internet                                                                                                                                                                         |
| longitude                    | Longitude coordinate of the agent. The ioFog Agent will automatically try to detect its own longitude if it has access to the internet                                                                                                                                                                       |
| agentType                    | Architecture type of agent. It will be used to determine which image gets deployed. The accepted values are `auto`, `x86` and `arm`. `auto` will have the ioFog agent detect the architecture it is running on, and report it to the ioFog controller. It defaults to `auto` if it fails to parse the value. |
| dockerUrl                    | Docker engine socket                                                                                                                                                                                                                                                                                         |
| diskLimit                    | Limit, in GiB, of disk space that the software is allowed to use                                                                                                                                                                                                                                             |
| diskDirectory                | Set the directory to use for disk storage                                                                                                                                                                                                                                                                    |
| memoryLimit                  | Set the limit, in MiB, of RAM memory that the software is allowed to use for messages                                                                                                                                                                                                                        |
| cpuLimit                     | Set the limit, in percentage, of CPU time that the software is allowed to use                                                                                                                                                                                                                                |
| logLimit                     | Set the limit, in GiB, of disk space that the log files can consume                                                                                                                                                                                                                                          |
| logDirectory                 | Set the directory to use for log file storage                                                                                                                                                                                                                                                                |
| logFileCount                 | Set the number of log files to evenly split the log storage limit                                                                                                                                                                                                                                            |
| statusFrequency              | Set the status update frequency in seconds                                                                                                                                                                                                                                                                   |
| changeFrequency              | Set the get changes frequency in seconds                                                                                                                                                                                                                                                                     |
| deviceScanFrequency          | Set the scan devices frequency in seconds                                                                                                                                                                                                                                                                    |
| bluetoothEnabled             | Boolean. Set on/off for the [bluetooth service](../reference-microservices-catalog/rest-blue.html). If ON, this will install the restblue microservice                                                                                                                                                       |
| watchdogEnabled              | Boolean. If enabled, watchdog will kill all docker containers running on the agent if they are not part of the microservices deployed by ioFog. If enabled, only docker containers started by the agent process will be allowed to run                                                                       |
| abstractedHardwareEnabled    | Boolean. Set on/off the [HAL services](../reference-microservices-catalog/hal.html). If ON, this will install the HAL microservice                                                                                                                                                                           |
| upstreamRouters              | Set the upstream routers (using Agent names or `default-router`)                                                                                                                                                                                                                                             |
| networkRouter                | Set the network router (using Agent names or `default-router`)                                                                                                                                                                                                                                               |
| host                         | Hostname used for router communication and public ports. Default: host provided at deploy time.                                                                                                                                                                                                              |
| routerConfig                 | Set the router configuration                                                                                                                                                                                                                                                                                 |
| routerConfig.routerMode      | Set the router mode. Available values are `edge`, `interior` and `none`. Default: `edge`                                                                                                                                                                                                                     |
| routerConfig.messagingPort   | Set the router messaging port. Default: 5671                                                                                                                                                                                                                                                                 |
| routerConfig.edgeRouterPort  | Set the router edge router port. Only valid if routerMode is `interior`. Default: 45671                                                                                                                                                                                                                      |
| routerConfig.interRouterPort | Set the router interior router port. Only valid if routerMode is `interior`. Default: 55671  
| upstreamNatsServers          | Set the upstream nats server when natsMode is leaf (using Agent names or `default-nats-hub`)                                                                                                                                                                                                               |
| natsConfig                   | Optional. NATS server configuration when the Agent runs a local NATS instance ( leaf , server, none).                                                                                                                                              |
| natsConfig.natsMode          | NATS mode. Use `server` to run a NATS server on this Agent.                                                                                                                                                                                                                                                  |
| natsConfig.natsServerPort    | NATS client listen port. Default typically 4222.                                                                                                                                                                                                                                                             |
| natsConfig.natsLeafPort      | NATS leaf node listen port.                                                                                                                                                                                                                                                                                  |
| natsConfig.natsClusterPort   | NATS cluster routing port.                                                                                                                                                                                                                                                                                   |
| natsConfig.natsMqttPort      | NATS MQTT listen port (if MQTT is enabled).                                                                                                                                                                                                                                                                   |
| natsConfig.natsHttpPort      | NATS HTTP monitor port.                                                                                                                                                                                                                                                                                      |
| natsConfig.jsStorageSize     | JetStream file storage size (e.g. `10Gi`).                                                                                                                                                                                                                                                                   |
| natsConfig.jsMemoryStoreSize | JetStream memory store size (e.g. `1Gi`).                                                                                                                                                                                                                                                                     |
| logLevel                     | Set the standard logging levels that can be used to control logging output                                                                                                                                                                                                                                   |
| dockerPruningFrequency       | Set the docker pruning frequency in hours                                                                                                                                                                                                                                                                    |
| availableDiskThreshold       | Set the available disk threshold
| edgeGuardFrequency | Set the Edge Guard scaning frequency in seconds
| gpsMode | Set the gps mode. Available values are `auto`, `manual` , `dynamic` and `off` 
| gpsDevice | Set the gps device if mode is dynamic and your edge hardware has gps module like `/dev/ttyUSB2` 
| gpsScanFrequency | Set the gps scan frequency in seconds                                                                                                                                                                                                                                                                         |

## EdgeGuard

`EdgeGuard` serves as a critical security and monitoring component for edge devices running ioFog Agents.

The primary function of EdgeGuard is to collecting comprehensive hardware details and generates an irreversible hardware signature unique to the edge device.

In the event of a detected hardware signature change, EdgeGuard immediately deprovisions the ioFog Agent from the Edge Compute Network (ECN) cluster. This action ensures that unauthorized changes or tampering with edge devices are swiftly addressed, maintaining the integrity and security of the ECN.

EdgeGuard is particularly valuable for edge devices deployed outside traditional datacenters, where the risk of unauthorized access is significantly higher. By detecting potential security breaches and wiping all microservices running on the compromised ioFog Agent, EdgeGuard helps organizations adhere to strict security policies and minimize exposure to potential threats

# Agent Configuration YAML Specification

Agent Configuration YAML files let you configure an ioFog Agent provisioned with your Controller. You can use Agent Configuration to modify the behaviour of an Agent after it is deployed.

An Agent Configuration can be retrieved using `iofogctl describe agent-config <AGENT_NAME>`

An Agent Configuration can be deployed using `iofogctl deploy -f agent-config.yaml`

```yaml
apiVersion: iofog.org/v3
kind: AgentConfig
metadata:
  name: agent-1 # ioFog Agent name
spec:
  # All fields are optional - Only the specified fields will be updated
  description: agent running on VM
  latitude: 46.204391
  longitude: 6.143158
  agentType: auto
  dockerUrl: unix:///var/run/docker.sock
  diskLimit: 50
  diskDirectory: /var/lib/iofog-agent/
  memoryLimit: 4096
  cpuLimit: 80
  logLimit: 10
  logDirectory: /var/log/iofog-agent/
  logFileCount: 10
  statusFrequency: 10
  changeFrequency: 10
  deviceScanFrequency: 60
  bluetoothEnabled: true
  watchdogEnabled: false
  gpsMode: auto
  gpsScanFrequency: 60
  gpsDevice: ''
  edgeGuardFrequency: 0
  abstractedHardwareEnabled: false
  upstreamRouters: ['default-router']
  networkRouter: ''
  routerConfig:
    routerMode: edge
    messagingPort: 5671
    edgeRouterPort: 45671
    interRouterPort: 55671
    natsConfig:
      natsMode: server
      natsServerPort: 4222
      natsLeafPort: 7422
      natsClusterPort: 6222
      natsMqttPort: 8883
      natsHttpPort: 8222
      jsStorageSize: 10g
      jsMemoryStoreSize: 1g
  dockerPruningFrequency: 0
  logLevel: INFO
  availableDiskThreshold: 90
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-agent.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
