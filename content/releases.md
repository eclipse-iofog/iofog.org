### v1.1.0

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

### v1.0.0

Our very first release.

[Get Started](/docs/1.0.0/getting-started/core-concepts.html)

- Everything of course!
