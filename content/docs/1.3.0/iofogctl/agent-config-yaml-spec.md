# Iofogctl agent configuration YAML specification

`iofogctl` allows users to deploy ioFog resources that are specified in YAML files.

## Header

All YAML documents are structured to be [Kubernetes](https://kubernetes.io/) compliants.

[More information](../iofogctl/header.html)

## Agent configuration

Agent configuration YAML files let you configure an ioFog Agent provisioned with your Controller.

An agent configuration can be retrieved using `iofogctl describe agent <AGENT_NAME>`

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
  agentType: 0
  dockerURL: unix:///var/run/docker.sock
  diskLimit: 50
  diskDirectory: /var/lib/iofog-agent/
  memoryLimit: 4096
  CPULimit: 80
  logLimit: 10
  logDirectory: /var/log/iofog-agent/
  logFileCount: 10
  statusFrequency: 10
  changeFrequency: 10
  deviceScanFrequency: 60
  bluetoothEnabled: true
  watchdogEnabled: false
  abstractedHardwareEnabled: false
```

| Field                       | Description                                                                                                                                                                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name                        | User-defined unique identifier of an agent within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                                            |
| Description                 | Short description of the agent                                                                                                                                                                                                         |
| Latitude                    | Latitude coordinate of the agent. The ioFog Agent will automatically try to detect its own latitude if it has access to the internet                                                                                                   |
| Longitude                   | Longitude coordinate of the agent. The ioFog Agent will automatically try to detect its own longitude if it has access to the internet                                                                                                 |
| Agent type                  | Architecture type of agent. It will be used to determine which image gets deployed. `0` for `autodetect`, `1` for `x86` and `2` for `ARM`                                                                                              |
| Docker URL                  | Docker engine socket                                                                                                                                                                                                                   |
| Disk limit                  | Limit, in GiB, of disk space that the software is allowed to use                                                                                                                                                                       |
| Disk directory              | Set the directory to use for disk storage                                                                                                                                                                                              |
| Memory limit                | Set the limit, in MiB, of RAM memory that the software is allowed to use for messages                                                                                                                                                  |
| CPU limit                   | Set the limit, in percentage, of CPU time that the software is allowed to use                                                                                                                                                          |
| Log limit                   | Set the limit, in GiB, of disk space that the log files can consume                                                                                                                                                                    |
| Log directory               | Set the directory to use for log file storage                                                                                                                                                                                          |
| Log file count              | Set the number of log files to evenly split the log storage limit                                                                                                                                                                      |
| Status frequency            | Set the status update frequency                                                                                                                                                                                                        |
| Change frequency            | Set the get changes frequency                                                                                                                                                                                                          |
| Device scan frequency       | Set the scan devices frequency                                                                                                                                                                                                         |
| Bluetooth enabled           | Boolean. Set on/off for the [bluetooth service](../microservice-catalog/using-system-microservices/rest-blue.html). If ON, this will install the restblue microservice                                                                 |
| Watchdog enabled            | Boolean. If enabled, watchdog will kill all docker containers running on the agent if they are not part of the microservices deployed by ioFog. If enabled, only docker containers started by the agent process will be allowed to run |
| Abstracted hardware enabled | Boolean. Set on/off the [HAL services](../microservice-catalog/using-system-microservices/hal.html). If ON, this will install the HAL microservice                                                                                     |
