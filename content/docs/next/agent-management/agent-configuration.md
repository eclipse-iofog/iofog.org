
# Agent Configuration

  

`iofogctl` provides an `AgentConfig` resource for dynamic management of Agents.

  

`AgentConfig` is usually deployed after an `Agent` in order to modify its behavior. Note that the `Agent` kind also contains configuration details in the same way that `AgentConfig` does which means that you can specify custom configuration of Agents at deploy-time.

  

An Agent Configuration can be retrieved using `iofogctl describe agent-config <AGENT_NAME>`.

  

An Agent Configuration can be deployed using `iofogctl deploy -f agent-config.yaml`. The following is a sample of `AgentConfig` YAML content:

  

```yaml

apiVersion: iofog.org/v3
kind: AgentConfig
metadata:
  name: edge-1
  tags: []
spec:
\# All fields are optional - Only the specified fields will be updated
  name: edge-1
  host: 10.0.34.53
  description: agent running on VM
  latitude: 46.204391
  longitude: 6.143158
  agentType: x86
  networkInterface: dynamic
  dockerUrl: unix:///var/run/docker.sock
  containerEngine: docker
  deploymentType: native
  diskLimit: 10
  diskDirectory: /var/lib/iofog-agent/
  memoryLimit: 4096
  cpuLimit: 80
  logLimit: 10
  logDirectory: /var/log/iofog-agent/
  logFileCount: 10
  statusFrequency: 10
  changeFrequency: 10
  deviceScanFrequency: 60
  bluetoothEnabled: false
  watchdogEnabled: false
  gpsMode: manual
  gpsScanFrequency: 60
  gpsDevice: ''
  edgeGuardFrequency: 0
  abstractedHardwareEnabled: false
  upstreamRouters:
    - default-router
  routerConfig:
    routerMode: edge
    messagingPort: 5671
    edgeRouterPort: 45671
    interRouterPort: 55671
  upstreamNatsServers:
  - default-nats-hub
  natsConfig:
    natsMode: leaf
    natsServerPort: 4222
    natsLeafPort: 7422
    natsMqttPort: 8883
    natsHttpPort: 8222
    jsStorageSize: 10g
    jsMemoryStoreSize: 1g
  logLevel: INFO
  dockerPruningFrequency: 0
  availableDiskThreshold: 20
  timeZone: Etc/UTC

```


<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Comprehensive AgentConfig reference</h3>
  <p>A complete reference of AgentConfig kind is available in the relevant section in <a  href="../yaml-references/reference-agent.html">iofogctl reference</a> documentation.</p>

  <p>Details as to what the Agent configuration files look like on Agent hosts can be found on the <a href="../reference-agent/configuration.html">Agent Reference - Configuration</a> page.</p>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/agent-management/agent-configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>