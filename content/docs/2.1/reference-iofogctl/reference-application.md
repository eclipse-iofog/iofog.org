# Application YAML Specification

`iofogctl` allows users to deploy sets of Microservices to Edge Compute Networks ('ECNs'). The various components of Microservices are specified within YAML files for `iofogctl` to consume.

An application is a set of Microservices working together to achieve one specific purpose.

An application is defined by a YAML file. This file is passed as a parameter to the deploy command: `iofogctl deploy -f <path-to-yaml>`

An application YAML file definition can be retrieved with the describe command: `iofogctl describe application <NAME> [-o <path-to-yaml>]`

Don't panic if this seems like a lot to digest, the [microservice yaml definition](#microservices) is explained in more details further down.
The main take away is that an application is defined by: a `name`, a set of `microservices` and a set of `routes`.

## Deploying an application

```yaml
apiVersion: iofog.org/v2
kind: Application # What are we deploying
metadata:
  name: health-care-wearable # Application name
  namespace: default # (Optional) iofogctl namespace to use

# Specifications of the application
spec:
  # List of microservices composing your application
  microservices:
    #  # It uses the microservice YAML schema described below
    - name: heart-rate-monitor
      agent:
        name: horse-1
      images:
        arm: edgeworx/healthcare-heart-rate:arm-v1
        x86: edgeworx/healthcare-heart-rate:x86-v1
        # registry: remote
      container:
        rootHostAccess: false
        ports: []
      config:
        test_mode: true
        data_label: Anonymous Person
        nested_object:
          key: 42
          deep_nested:
            foo: bar
    # Simple JSON viewer for the heart rate output
    - name: heart-rate-viewer
      agent:
        name: horse-1
      images:
        arm: edgeworx/healthcare-heart-rate-ui:arm
        x86: edgeworx/healthcare-heart-rate-ui:x86
        registry: remote
      container:
        rootHostAccess: false
        ports:
          - internal: 80
            external: 5000
            public: 5001
            protocol: tcp
        env:
          - key: BASE_URL
            value: http://localhost:8080/data
      config:
        test: 54
  routes:
    # Use this section to configure route between microservices
    # Use microservice name
    - name: monitor-to-viewer
      from: heart-rate-monitor
      to: heart-rate-viewer
```

| Field         | Description                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | User-defined unique identifier of an Application within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                           |
| microservices | List of Microservices. See Microservice section for more details.                                                                                                                                                           |
| routes        | List of ioFog Routes. `From` and `To` use microservice name as identifiers. The microservices specified must be part of the application. When deploying an application, prefer this method to the microservice route field. |

### Microservices

Microservices configuration and set up are defined using YAML files.

Those YAML definitions can be used inside an application YAML file, or by themselves when deploying a microservice to an existing application: `iofogctl deploy microservice -f <path-to-microservice.yaml>`

A microservice YAML definition file can be retrieved using the describe command: `iofogctl describe microservice <NAME> [-o microservice.yaml]`

```yaml
apiVersion: iofog.org/v2
kind: Microservice # What are we deploying
metadata:
  name: heart-rate-monitor # Microservice name
  namespace: default # (Optional) iofogctl namespace to use

# Specifications of the microservice
spec:
  # Agent on which to deploy the microservice
  agent:
    # Agent name
    name: zebra-1
    # Optional agent configuration
    config:
      # All fields are optional
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
      host: horse-1
      routerConfig:
        routerMode: edge
        messagingPort: 5672
        edgeRouterPort: 56721
        interRouterPort: 56722
      dockerPruningFrequency: 1
      logLevel: INFO
      availableDiskThreshold: 90

  # Information about the container images to be used
  images:
    x86: edgeworx/healthcare-heart-rate:x86-v1 # Image to be used on x86 type agents
    arm: edgeworx/healthcare-heart-rate:arm-v1 # Image to be used on arm type agents
    registry: remote # Either 'remote' or 'local' or the registry ID - Remote will pull the image from Dockerhub, local will use the local cache of the agent
    # Optional catalog item id (See Catalog items in the advanced section)
    catalogId: 0 # 0 is equivalent to not providing the field

  # Microservice container configuration
  container:
    # Requires root host access on the agent ?
    rootHostAccess: false
    # Microservice container volume mapping list on the agent
    volumes:
      # This will create a volume mapping between the agent '/tmp/msvc' volume and the microservice container volume '/data'
      - hostDestination: /tmp/msvc
        containerDestination: /data
        accessMode: 'rw' # ReadWrite access to the mounted volume
        type: 'bind' # Accepts 'bind' or 'volume'. Default is 'bind'

    # Microservice container environment variable list on the agent
    env:
      # This will create an environment variable inside the microservice container with the key 'BASE_URL' and the value 'http://localhost:8080/data'
      - key: BASE_URL
        value: http://localhost:8080/data
    # Microservice container port mapping list on the agent
    ports:
      # This will create a mapping between the port 80 of the microservice container and the port 5000 of the agent
      - internal: 80
        external: 5000
        public: 5001 # This will create a HTTP proxy tunnel between the port 5001 on the default router, and the port 5000 on the Agent
        host: default-router # Target for the public port (use Agent name, defaults to `default-router`)
        protocol: http # Protocol for the proxy tunnel (Either tcp or http, defaults to http)
    commands:
      # This will result in the container being started as `docker run <image> <options> dbhost localhost:27017`
      - 'dbhost'
      - 'localhost:27017'

  # Microservice configuration
  config:
    # Arbitrary key, value YAML object
    data_label: test_mode=false_cross_agent_microservice_routing_aug_27
    test_mode: true

  # Mandatory application name inside which to deploy the microservice
  application: Healthcare Wearable

  # Optional. Boolean instructing agent to rebuild the microservice container
  rebuild: false
```

| Field                    | Description                                                                                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                     | User-defined unique identifier of an Microservice within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                   |
| agent                    | Object describing the name and the required configuration of the ioFog agent the microservice is to be deployed on. All configuration fields are optional only the specified values will be updated. |
| images                   | Description of the images to be used by the container running the microservice.                                                                                                                      |
| images.x86               | Image to be used on x86 ioFog Agents.                                                                                                                                                                |
| images.arm               | Image to be used on ARM ioFog Agents.                                                                                                                                                                |
| images.registry          | Either `local`, `remote`, or `registryID`. Remote will pull the image from Dockerhub, local will use the local cache of the ioFog Agent. RegistryID will use the specified registry.                 |
| images.catalogId         | Catalog item ID to be used in lieu and place of the images and the registry. (see [catalog items](../microservices/microservice-registry-catalog.html))                                              |
| config                   | User-defined arbitrary object to be passed to the microservice runtime as its configuration                                                                                                          |
| container.rootHostAccess | Set to true if the container needs to be able to access the host. This will also set the network of the container to `host`                                                                          |
| container.ports          | List of port mapping to be provided to the container running the microservice (See [public ports](../microservices/microservice-exposing.html) for a more detailed explanation of public ports)      |
| container.volumes        | List of volume mapping to be provided to the container running the microservice                                                                                                                      |
| container.env            | List of environment variables to be provided to the container running the microservice                                                                                                               |
| container.commands       | List of arguments passed as CMD to the container runtime                                                                                                                                             |
| application              | Unique identifier of the Application the microservice is part of                                                                                                                                     |
| rebuild                  | Boolean instructing the ioFog Agent to rebuild the microservice container after update. Use this flag if you updated the content of the docker image but didn't change the image name and/or tag.    |

## Using a template

```yaml
apiVersion: iofog.org/v2
kind: Application # What are we deploying
metadata:
  name: health-care-wearable # Application name
  namespace: default # (Optional) iofogctl namespace to use

# Specifications of the application
spec:
  template:
    name: template-name # Name of the template to use
    variables:
      - key: variable-name
        value: variable-value # Any of string, number or boolean
```

| Field                   | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| template.name           | Name of the [Application template](../reference-application-template.html) to use |
| template.variables      | Array of variables specifications                                                 |
| template.variables.key  | Variable key                                                                      |
| template.variables.name | Variable value                                                                    |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/reference-iofogctl/reference-application.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
