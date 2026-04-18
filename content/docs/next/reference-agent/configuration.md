
# Agent Configurations

Configs are located at `/etc/iofog-agent/`. 

#### config.yaml

```yaml

currentProfile: default  # default | development | production

profiles:
  default:
    privateKey: ""
    routerUuid: ""
    controllerUrl: "http://localhost:54421/api/v3/"
    iofogUuid: ""
    secureMode: "off"
    devMode: "off"
    controllerCert: "/etc/iofog-agent/cert.crt"
    arch: "auto"
    networkInterface: "dynamic"
    dockerUrl: "unix:///var/run/docker.sock"
    diskConsumptionLimit: "10"
    diskDirectory: "/var/lib/iofog-agent/"
    memoryConsumptionLimit: "4096"
    processorConsumptionLimit: "80.0"
    logDiskConsumptionLimit: "10.0"
    logDiskDirectory: "/var/log/iofog-agent/"
    logFileCount: "10"
    logLevel: "INFO"
    statusUpdateFreq: "30"
    getChangesFreq: "60"
    postDiagnosticsFreq: "10"
    scanDevicesFreq: "60"
    gps: "auto"
    gpsCoordinates: "0,0"
    gpsDevice: ""
    gpsScanFreq: "60"
    isolatedDockerContainer: "off"
    edgeGuardFreq: "0"
    dockerPruningFreq: "0"
    availableDiskThreshold: "20"
    upgradeScanFrequency: "24"
    timeZone: ""
    namespace: "default"
    hwSignature: ""

  development:
    privateKey: ""
    routerUuid: ""
    controllerUrl: "http://localhost:51121/api/v3/"
    iofogUuid: ""
    secureMode: "off"
    devMode: "on"
    controllerCert: "/etc/iofog-agent/cert.crt"
    arch: "auto"
    networkInterface: "dynamic"
    dockerUrl: "unix:///var/run/docker.sock"
    diskConsumptionLimit: "10"
    diskDirectory: "/var/lib/iofog-agent/"
    memoryConsumptionLimit: "4096"
    processorConsumptionLimit: "80.0"
    logDiskConsumptionLimit: "10.0"
    logDiskDirectory: "/var/log/iofog-agent/"
    logFileCount: "10"
    logLevel: "INFO"
    statusUpdateFreq: "30"
    getChangesFreq: "60"
    postDiagnosticsFreq: "10"
    scanDevicesFreq: "60"
    gps: "auto"
    gpsCoordinates: "0,0"
    gpsDevice: ""
    gpsScanFreq: "60"
    isolatedDockerContainer: "off"
    edgeGuardFreq: "0"
    dockerPruningFreq: "0"
    availableDiskThreshold: "20"
    upgradeScanFrequency: "24"
    timeZone: ""
    namespace: "default"
    hwSignature: ""

  production:
    privateKey: ""
    routerUuid: ""
    controllerUrl: "http://localhost:54421/api/v3/"
    iofogUuid: ""
    secureMode: "on"
    devMode: "off"
    controllerCert: "/etc/iofog-agent/cert.crt"
    arch: "auto"
    networkInterface: "dynamic"
    dockerUrl: "unix:///var/run/docker.sock"
    diskConsumptionLimit: "10"
    diskDirectory: "/var/lib/iofog-agent/"
    memoryConsumptionLimit: "4096"
    processorConsumptionLimit: "80.0"
    logDiskConsumptionLimit: "10.0"
    logDiskDirectory: "/var/log/iofog-agent/"
    logFileCount: "10"
    logLevel: "INFO"
    statusUpdateFreq: "30"
    getChangesFreq: "60"
    postDiagnosticsFreq: "10"
    scanDevicesFreq: "60"
    gps: "auto"
    gpsCoordinates: "0,0"
    gpsDevice: ""
    gpsScanFreq: "60"
    isolatedDockerContainer: "off"
    edgeGuardFreq: "0"
    dockerPruningFreq: "0"
    availableDiskThreshold: "20"
    upgradeScanFrequency: "24"
    timeZone: ""
    namespace: "default"
    hwSignature: ""


```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/reference-agent/configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
