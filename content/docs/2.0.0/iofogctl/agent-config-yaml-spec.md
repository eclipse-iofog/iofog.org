# Iofogctl agent configuration YAML specification

`iofogctl` allows users to deploy ioFog resources that are specified in YAML files.

## Agent configuration

Agent configuration YAML files let you configure an ioFog Agent provisioned with your Controller.

An agent configuration can be retrieved using `iofogctl describe agent-config <AGENT_NAME>`

An agent configuration can be deployed using `iofogctl deploy -f agent-config.yaml`

```yaml
apiVersion: iofog.org/v1
kind: AgentConfig
metadata:
  name: agent-1 # ioFog Agent name
spec:
  # All fields are optional - Only the specified fields will be updated
  name: agent-1
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
  abstractedHardwareEnabled: false
  upstreamRouters: ['default-router']
  networkRouter: ''
  host: <Agent_host>
  routerConfig:
    routerMode: edge
    messagingPort: 5672
    edgeRouterPort: 56721
    interRouterPort: 56722
  dockerPruningFrequency: 1
  logLevel: INFO
  availableDiskThreshold: 90
```

| Field                     | Description                                                                                                                                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name                      | User-defined unique identifier of an agent within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                                                                                                                  |
| description               | Short description of the agent                                                                                                                                                                                                                                                                               |
| latitude                  | Latitude coordinate of the agent. The ioFog Agent will automatically try to detect its own latitude if it has access to the internet                                                                                                                                                                         |
| longitude                 | Longitude coordinate of the agent. The ioFog Agent will automatically try to detect its own longitude if it has access to the internet                                                                                                                                                                       |
| agentType                 | Architecture type of agent. It will be used to determine which image gets deployed. The accepted values are `auto`, `x86` and `arm`. `auto` will have the ioFog agent detect the architecture it is running on, and report it to the ioFog controller. It defaults to `auto` if it fails to parse the value. |
| dockerUrl                 | Docker engine socket                                                                                                                                                                                                                                                                                         |
| diskLimit                 | Limit, in GiB, of disk space that the software is allowed to use                                                                                                                                                                                                                                             |
| diskDirectory             | Set the directory to use for disk storage                                                                                                                                                                                                                                                                    |
| memoryLimit               | Set the limit, in MiB, of RAM memory that the software is allowed to use for messages                                                                                                                                                                                                                        |
| cpuLimit                  | Set the limit, in percentage, of CPU time that the software is allowed to use                                                                                                                                                                                                                                |
| logLimit                  | Set the limit, in GiB, of disk space that the log files can consume                                                                                                                                                                                                                                          |
| logDirectory              | Set the directory to use for log file storage                                                                                                                                                                                                                                                                |
| logFileCount              | Set the number of log files to evenly split the log storage limit                                                                                                                                                                                                                                            |
| statusFrequency           | Set the status update frequency                                                                                                                                                                                                                                                                              |
| changeFrequency           | Set the get changes frequency                                                                                                                                                                                                                                                                                |
| deviceScanFrequency       | Set the scan devices frequency                                                                                                                                                                                                                                                                               |
| bluetoothEnabled          | Boolean. Set on/off for the [bluetooth service](../microservice-catalog/using-system-microservices/rest-blue.html). If ON, this will install the restblue microservice                                                                                                                                       |
| watchdogEnabled           | Boolean. If enabled, watchdog will kill all docker containers running on the agent if they are not part of the microservices deployed by ioFog. If enabled, only docker containers started by the agent process will be allowed to run                                                                       |
| abstractedHardwareEnabled | Boolean. Set on/off the [HAL services](../microservice-catalog/using-system-microservices/hal.html). If ON, this will install the HAL microservice                                                                                                                                                           |
| upstreamRouters           | Set the upstream routers                                                                                                                                                                                                                                                                                     |
|                           |
| networkRouter             | Set the network router                                                                                                                                                                                                                                                                                       |
|                           |
| host                      | Set the host Ip used by iofogctl to deploy agent                                                                                                                                                                                                                                                             |
|                           |
| routerConfig              | Set the router configuration                                                                                                                                                                                                                                                                                 |
|                           |
| logLevel                  | Set the standard logging levels that can be used to control logging output                                                                                                                                                                                                                                   |
|                           |
| dockerPruningFrequency    | Set the docker pruning frequency in hours                                                                                                                                                                                                                                                                    |
| availableDiskThreshold    | Set the available disk threshold                                                                                                                                                                                                                                                                             |

<aside class="notifications note">
  <b>See anything wrong with the document? Help us improve it!</b>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/iofogctl/agent-config-yaml-spec.md"
    target="_blank">
    <p style="text-align:left">Edit on Github <img src="/images/icos/ico-github.svg" alt=""></p>
  </a>
</aside>
