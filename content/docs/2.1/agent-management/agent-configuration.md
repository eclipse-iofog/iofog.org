# Agent Configuration

`iofogctl` provides an `AgentConfig` resource for the management of Agent configuration.

An agent configuration can be retrieved using `iofogctl describe agent-config <AGENT_NAME>`.

An agent configuration can be deployed using `iofogctl deploy -f agent-config.yaml`. The following is a sample of `AgentConfig` yaml content:

```yaml
apiVersion: iofog.org/v2
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
  bluetoothEnabled: true
  watchdogEnabled: false
  abstractedHardwareEnabled: false
  upstreamRouters: ['default-router']
  networkRouter: ''
  host: 34.44.56.64
  routerConfig:
    routerMode: edge
    messagingPort: 5672
    edgeRouterPort: 56721
    interRouterPort: 56722
  dockerPruningFrequency: 1
  logLevel: INFO
  availableDiskThreshold: 90
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Comprehensive AgentConfig reference</h3>
  <p>A complete reference of AgentConfig kind is available in the relevant section in <a href=../reference-iofogctl/reference-agent.html>iofogctl reference</a> documentation.</p>
  
  <p>Details as to what the Agent configuration files look like on Agent hosts can be found on the <a href="../reference-agent/configuration.html">Agent Reference - Configuration</a> page.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/agent-management/agent-configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
