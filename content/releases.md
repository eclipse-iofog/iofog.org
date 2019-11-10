## 1.3.0 Release Candidate

[Get Started with release 1.3.0 Release Candidate](/docs/1.3.0/getting-started/core-concepts.html)

1.3.0 brings new quality of life improvements as well as a set of backend changes that extend and unify ioFog's capabilities.

### What's New?

- Improved **stability** of all major components
- Improved **quality of life** of **iofogctl** and **Helm** with respect to **platform deployment**
- Improved support for **microservice** deployment using **iofogctl**
- Unification of **ioFog Kubernetes** procedures by expanding capabilities of the **Operator** for use with both **iofogctl** and **Helm**
- Changes to **iofogctl's YAML specification** in order to, amongst other things, conform with the Kubernetes-style *Object Metadata* and *Specification* structures. See [here](docs/1.3.0/iofogctl/translating.html) for instructions on how to convert from 1.2.x to 1.3.x YAML.
- Support for **Highly Available** ioFog platform deployments has been added in anticipation of **ioFog Enterprise Edition**
- Ability to **view realtime deployment status of Microservices through iofogctl** due to improvements to both ioFog Controller and Agent.
- Updates to the **iofog-go-sdk** to provide an **HTTP client for ioFog Controller's REST API**.

### Changelogs

- [Controller](https://github.com/eclipse-iofog/Controller/blob/v1.3.0-rc3/CHANGELOG-1.3.md)
- [Agent](https://github.com/eclipse-iofog/Agent/blob/v1.3.0-rc1/CHANGELOG-1.3.md)
- [Operator](https://github.com/eclipse-iofog/iofog-operator/blob/v1.3.0-rc1/CHANGELOG-1.3.md)
- [Kubelet](https://github.com/eclipse-iofog/iofog-kubelet/blob/v1.3.0-rc2/CHANGELOG-1.3.md)
- [iofogctl](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0-rc1/CHANGELOG-1.3.md)
- [Helm](https://github.com/eclipse-iofog/helm/blob/v1.3.0-rc1/CHANGELOG.md)
- [ioFog Golang SDK](https://github.com/eclipse-iofog/iofog-go-sdk/blob/v1.3.0-rc1/CHANGELOG-1.3.md)
- [Demo Project](https://github.com/eclipse-iofog/demo/blob/v1.3.0-rc1/CHANGELOG-1.3.md)

## 1.2.0 - "Kubernetes For The Edge"

[Get Started with release 1.2.0](/docs/1.2.0/getting-started/core-concepts.html)

This release brings a set of features for seamless integration of Kubernetes and Edge Computing. The release
comes with a new command line interface for Edge Compute Network management called _iofogctl_ and other supplementary
tools, such as _platform tools_ for cluster and infrastructure management.

### What's New?

- **Kubernetes integration!** First release of ioFog supporting Kubernetes integration, and first releases of [iofog-kubelet](https://github.com/eclipse-iofog/iofog-kubelet/releases/tag/v1.2.0) and [iofog-operator](https://github.com/eclipse-iofog/iofog-operator/releases/tag/v1.2.0) microservices
- **[Iofogctl](https://github.com/eclipse-iofog/iofogctl/releases/tag/v1.2.0)** command line interface for management of Edge Compute Networks (see [iofogctl tutorial](/docs/1.2.0/tools/iofogctl.html)) running on both Linux and Mac
- **[Helm chart](https://github.com/eclipse-iofog/helm/releases/tag/v1.2.0)** for easy installation of ioFog Edge Compute Network to existing Kubernetes cluster (see [helm tutorial](/docs/1.2.0/getting-started/how-to-helm.html))
- **[Platform tools](https://github.com/eclipse-iofog/platform/tree/1.2.0)** for easy infrastructure and Kubernetes cluster setup on Google Cloud Platform and Packet (see [platform tutorial](/docs/1.2.0/tools/platform-tools.html))
- Many bugfixes in the ioFog engine: [controller](https://github.com/eclipse-iofog/Controller/releases/tag/v1.2.0), [connector](https://github.com/eclipse-iofog/Connector/releases/tag/v1.2.0) and [agent](https://github.com/eclipse-iofog/Agent/releases/tag/v1.2.0)

### Changelogs

##### Agent (v1.2.0)

- Send Agent's external IP to Controller
- Bugfix: Selecting the network interface that has Controller connectivity
- Bugfix: Use local docker images when offline

##### Connector (v1.2.0)

- Limit port range to 50 ports in default configuration file

##### Controller (v1.2.0)

- Return Agent's external IP for Kubelet
- Add uptime to status endpoint
- Bugfix: Requests not failing if with additional properties

##### Kubelet (v1.2.0)

- Initial release!

##### Iofogctl (v1.2.0)

- Initial release!

##### Helm Chart (v1.2.0)

- Initial release!

##### Platform Tools (v1.2.0)

- Initial release!

### Known Issues

- Smart Camera Docker Container sometimes hangs after start ups.
- ioFog Agent local API for receiving ioMessages from microservices will crap out after about 700 messages
- Controller rejects requests that have unknown properties
- Agent gives internal IP to Controller instead of public IP when on GCP
- Agent not using local images when no internet connection
- "iofog-agent info" hangs when multiple network adapters and no internet connection
- Agent won't start when no internet connection
- Agent will not start docker containers when Internet connection is not available
- iofog-agent info command hangs and never returns information when Internet connection not available
- ioFog Agent will not start when GPS mode is "auto" and Internet connection is not available
- SQLite error on controller endpoint /api/v3/signup
- Demo scripts in develop branch fail on macos with getopt error.
- VideoProcessing doesn't succesfully load cameraSource
- Master branch of demo repo tests fail sometimes on Pipelines
- ARM TCP Docker issue causing images to not spawn
- Route creation using iofog-controller cli failed, then succeeded with no change to the cli command
- Update Controller npm dependencies
- Update nodejs-sdk npm dependencies
- Concurrent Requests to Provision an Agent on Controller API fail
- New Connector has no authentication enabled
- Need to change "publicMode": true to "publicMode": false in example for microservice "JSON ADD File Schema"
- Filesystem security: SecurityManager is not running after restarting iofog-agent
- GPS Agent Tracking : when user change gps coordinates manually, the changes are not shown on the map
- Controller: add default log folder for Windows
- Agent tracking: data from agent is not delivered to Kibana
- Controller: set all NPM dependencies versions to stable number
- API: Issues with /update/delete system microservices
- Controller Installation: Check if sqlite3 binary exists

## 1.1.0

[Get Started with release 1.1.0](/docs/1.1.0/getting-started/core-concepts.html)

#### Agent (v1.1.0)

##### Features Added

- Added support for setting and passing through environment variables in docker containers at runtime
- Added support for overriding container CMD directives at runtime
- Agent Docker images now build from iofog-docker-images for stability

##### Bug Fixes

- Fix for deleting local images when registry was set to local
- Fix for when multiple Agents would removes other Agent's microservices on the same node
- Fixed for Private registries authentication
- Stop running microservices when iofog-agent package gets uninstalled

#### Controller (v1.1.1)

##### Features Added

- Added support for setting and passing through environment variables in docker containers at runtime (see iofog-controller CLI)
- Added support for overriding container CMD directives at runtime (see iofog-controller CLI)
- Added capability to return a microservice's public url when a public port is set
- New metrics being tracked:
  - Total CPU usage
  - Available disk
  - Available memory
- Controller Docker images now build from iofog-docker-images for stability

##### Bug Fixes

- Update microservice did always get picked up by Agent
- High CPU usage when Controller was running for couple of weeks
- Fixed log rotation (should work infinitely now)
- Fixed regression where Ports public directive was not honored

#### Connector (v1.1.0)

##### Features Added

- Connector Docker images now build from iofog-docker-images for stability

##### Bug Fixes

- Improved and now return correct HTTP status codes when API call fails

#### Demo

##### Features

- Huge refactoring and consolidation of Demo repo
- Rather than distinct environments, Demo now builds from a single docker-compose environment which is then augmented/decorated
- Updated and refactored docker-compose configurations to support V3 api spec
- Optimized Dockerfiles
- Improved overall user experience, logging and demo output
- Re-worked tutorial workflow to simplify user experience
- All Docker images now build from iofog-base-images for stability
- Added support for integration testing using TestHarness during CI execution

##### Bug Fixes

- Fixed Agent docker depending on unstable location of Java

## 1.0.0

Our very first release.

[Get Started with release 1.0.0](/docs/1.0.0/getting-started/core-concepts.html)

- Everything of course!
