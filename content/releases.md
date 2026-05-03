## ioFog v3.7.0

- [NATS messaging](/docs/3.7/security/nats-jwt-authentication.html) is now available as default pub/sub, request/reply, KV store and JetStream messaging inside **ioFog** clusters; use [NATS Account Rules](/docs/3.7/security/nats-account-rule.html) at application level and [NATS User Rules](/docs/3.7/security/nats-user-rule.html) at microservice level-the Controller provisions credentials automatically with no manual JWT handling.
- [Access Control](/docs/3.7/security/roles.html) is now available with fine-grained [Roles](/docs/3.7/security/roles.html) and [Role Bindings](/docs/3.7/security/role-bindings.html) for the Controller REST and WS APIs, plus [NATS Account Rule](/docs/3.7/security/nats-account-rule.html) and [NATS User Rule](/docs/3.7/security/nats-user-rule.html) for NATS access.
- [Security](/docs/3.7/security/introduction.html) is now documented in a dedicated section: [NATS JWT Authentication](/docs/3.7/security/nats-jwt-authentication.html) and [Certificates Manager](/docs/3.7/security/certificates-manager.html) for Microservices. For Routers and NATs instances TLS by default, with support for custom CAs and volume-mounted certs.
- Legacy ioFog Messagebus is deprecated.
- Controller supports external KMS system for Secrets and ConfigMaps(spec.usevault: true) store. HashiCorp Vault, OpenBao, AWS Secret Manager, Azure Key Vault, Google Secret Manager.
- [VolumeMount](/docs/3.7/yaml-references/reference-volumemount.html) is now available with **type**-based volume mapping and reference by name.
- [Logging via WebSocket](/docs/3.7/applications/microservice-logs.html) is now available for streaming Agent and microservice logs in ECN-Viewer and iofogctl; see [Agent Logs](/docs/3.7/reference-agent/agent-logs.html) for details.
- [Airgap deployment](/docs/3.7/platform-deployment/airgap-deployment.html) is now documented with a dedicated guide for control plane and Agent images offline, [OfflineImage](/docs/3.7/yaml-references/reference-offlineimage.html) for microservices, and iofogctl flags (`--no-cache`, `--transfer-pool`).
- [Service](/docs/3.7/yaml-references/reference-service.html) is now available for exposing microservices, agents, Kubernetes services, or external endpoints through Router's TCP bridge mechanism.
- [Secret Management](/docs/3.7/yaml-references/reference-secret.html) is now available for storing and managing sensitive data including Opaque and TLS secrets.
- [Certificate and CertificateAuthority](/docs/3.7/yaml-references/reference-certificate.html) management is now available for generating self-signed certificates or using existing certificates from ioFog cluster or Kubernetes secrets.
- [ConfigMap](/docs/3.7/yaml-references/reference-configmap.html) is now available for managing non-sensitive configuration data that can be mounted to microservices.
- [VolumeMount](/docs/3.7/yaml-references/reference-volumemount.html) is now available for attaching ConfigMaps or Secrets to Agents as volumes, enabling easy volume management for microservices.
- [OfflineImage](/docs/3.7/yaml-references/reference-offlineimage.html) is now available for deploying container images to edge nodes that cannot access the internet, enabling iofogctl to pull images locally and transfer them to remote hosts via SSH.
- [Debugging & Exec Sessions](#debugging-and-exec-sessions) deliver role-aware remote terminals for Agents, microservices, and system microservices—powered by iofogctl and ECN Viewer.
- [ECN Viewer](/docs/3.7/ECN-Viewer/ecn-viewer.html) now mirrors nearly every iofogctl operation, enabling full-cluster workload management, remote exec, resource editing, and deployments directly from the browser.
- [Events and Auditing](/docs/3.7/ECN-Viewer/ecn-viewer.html#6-events-and-audit-trail) provides comprehensive tracking and auditing of all Controller API endpoint calls for compliance and troubleshooting.


## ioFog v3.0.0

- [Template parametric expressions](./docs/3/reference-iofogctl/reference-template-engine.html) now available!
- [Application template](./docs/3/reference-iofogctl/reference-application-template.html), build your own App Store!
- [Edge resources](./docs/3/agent-management/edge-resources.html), let your microservices know what their Agent is capable of!
- [Agent install plugins](./docs/3/platform-deployment/setup-your-agents.html#customize-agent-installation) let you install Agent on your favourite Linux distro!

### Changelogs

- [Controller](https://github.com/eclipse-iofog/Controller/blob/release/2.1/CHANGELOG.md)
- [Agent](https://github.com/eclipse-iofog/Agent/blob/release/2.1/CHANGELOG.md)
- [iofogctl](https://github.com/eclipse-iofog/iofogctl/blob/release/2.1/CHANGELOG.md)
- [ioFog Golang SDK](https://github.com/eclipse-iofog/iofog-go-sdk/blob/release/2.1/CHANGELOG.md)

## ioFog v2.0.0

[Get Started with ioFog v2](/docs/2/getting-started/core-concepts.html)

Major ioFog release 2 brings new ioFog Edge Compute Network (ECN) model, with legacy Connector being replaced by much more robust Apache Qpid Dispatch Router and Red Hat's project Skupper Proxy.

Many other features have been added to the ioFog Engine, such as better Docker image pruning, registry management and volume management in ioFog Agents. You can also expose public ports for individual microservices. Additional changes relate to iofogctl quality of life improvements, Agent attach and detach functionality and microservice moving.

### What's New?

- [ioFog Connector](https://github.com/eclipse-iofog/Connector) removed from the ECN architecture and replaced with [ioFog Router](https://github.com/eclipse-iofog/router), [Skupper Proxy](https://github.com/eclipse-iofog/skupper-proxy) and [ioFog Port Manager](https://github.com/eclipse-iofog/port-manager), see [Architecture Concepts](/docs/2/getting-started/architecture.html) article for details
- Improved [registry and catalog items management](/docs/2/microservices/microservice-registry-catalog.html) in ioFog Controller
- [Exposing public ports](/docs/2/microservices/microservice-exposing.html) for deployed microservices
- [Docker image pruning](/docs/2/agent-management/docker-image-pruning.html) feature for ioFog Agent
- [Attach and detach](/docs/2/agent-management/attach-detach.html) ioFog Agents between ECNs
- [Volume management](/docs/2/agent-management/volumes.html) for mounting volume on ioFog Agent in a microservice
- [Moving and renaming microservices](/docs/2/microservices/microservice-move-rename.html) support in iofogctl
- [Current namespace](/docs/2/iofogctl/getting-familiar.html#working-with-namespaces) configuration in iofogctl
- [Platform tools repository](https://github.com/eclipse-iofog/platform) is no longer supported, please follow our guide on how to [Prepare your or managed Kubernetes cluster](/docs/2/platform-deployment/kubernetes-prepare-cluster.html)

### Changelogs

- [Controller](https://github.com/eclipse-iofog/Controller/blob/release/2.0/CHANGELOG.md)
- [Agent](https://github.com/eclipse-iofog/Agent/blob/release/2.0/CHANGELOG.md)
- [Operator](https://github.com/eclipse-iofog/iofog-operator/blob/release/2.0/CHANGELOG.md)
- [Port Manager](https://github.com/eclipse-iofog/port-manager/blob/release/2.0/CHANGELOG.md)
- [iofogctl](https://github.com/eclipse-iofog/iofogctl/blob/release/2.0/CHANGELOG.md)
- [Helm](https://github.com/eclipse-iofog/helm/blob/release/2.0/CHANGELOG.md)
- [ioFog Golang SDK](https://github.com/eclipse-iofog/iofog-go-sdk/blob/release/2.0/CHANGELOG.md)

## ioFog v1.3.0

[Get Started with release 1.3.0](/docs/1.3.0/getting-started/core-concepts.html)

1.3.0 brings new quality of life improvements as well as a set of backend changes that extend and unify ioFog's capabilities.

### What's New?

- Improved **stability** of all major components
- Improved **quality of life** of **iofogctl** and **Helm** with respect to **platform deployment**
- Improved support for **microservice** deployment using **iofogctl**
- Unification of **ioFog Kubernetes** procedures by expanding capabilities of the **Operator** for use with both **iofogctl** and **Helm**
- Changes to **iofogctl's YAML specification** in order to, amongst other things, conform with the Kubernetes-style _Object Metadata_ and _Specification_ structures. See [here](docs/1.3.0/iofogctl/translating.html) for instructions on how to convert from 1.2.x to 1.3.x YAML.
- Added **plugin system to Controller** for **database clients** in order to support **highly available** Control Plane deployments
- Ability to **view realtime deployment status of Microservices through iofogctl** due to improvements to both ioFog Controller and Agent.
- Updates to the **iofog-go-sdk** to provide an **HTTP client for ioFog Controller's REST API**.

### Changelogs

- [Controller](https://github.com/eclipse-iofog/Controller/blob/v1.3.1/CHANGELOG-1.3.md)
- [Agent](https://github.com/eclipse-iofog/Agent/blob/v1.3.0/CHANGELOG-1.3.md)
- [Operator](https://github.com/eclipse-iofog/iofog-operator/blob/v1.3.0/CHANGELOG-1.3.md)
- [Kubelet](https://github.com/eclipse-iofog/iofog-kubelet/blob/v1.3.0/CHANGELOG-1.3.md)
- [iofogctl](https://github.com/eclipse-iofog/iofogctl/blob/release/1.3.0/CHANGELOG-1.3.md)
- [Helm](https://github.com/eclipse-iofog/helm/blob/v1.3.0/CHANGELOG.md)
- [ioFog Golang SDK](https://github.com/eclipse-iofog/iofog-go-sdk/blob/v1.3.0/CHANGELOG-1.3.md)
- [Demo Project](https://github.com/eclipse-iofog/demo/blob/v1.3.0/CHANGELOG-1.3.md)

## ioFog v1.2.0 - "Kubernetes For The Edge"

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

## ioFog v1.1.0

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

## ioFog v1.0.0

Our very first release.

[Get Started with release 1.0.0](/docs/1.0.0/getting-started/core-concepts.html)

- Everything of course!
