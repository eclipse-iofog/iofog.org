## Release 1.2.0 - "Kubernetes For The Edge"

[Get Started with release 1.2.0](/docs/1.1.0/getting-started/core-concepts.html)

Large ioFog release brings a set of features for seamless integration of Kubernetes and Edge Computing. The release
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

##### Connector (v1.2.0)

##### Controller (v1.2.0)

##### Iofogctl (v1.2.0)

##### Helm Chart (v1.2.0)

##### Platform Tools (v1.2.0)

##### Test Runner (v1.2.0)

##### Quickstart + Tutorial (v1.2.0)

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

## Release 1.1.0 - "Training Wheels"

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

## Release 1.0.0

Our very first release.

[Get Started with release 1.0.0](/docs/1.0.0/getting-started/core-concepts.html)

- Everything of course!
