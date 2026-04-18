

# Application YAML Specification

`iofogctl` allows users to deploy sets of Microservices to Edge Compute Networks ('ECNs'). The various components of Microservices are specified within YAML files for `iofogctl` to consume.

An application is a set of Microservices working together to achieve one specific purpose.

An application is defined by a YAML file. This file is passed as a parameter to the deploy command: `iofogctl deploy -f <path-to-yaml>`

An application YAML file definition can be retrieved with the describe command: `iofogctl describe application <NAME> [-o <path-to-yaml>]`

Don't panic if this seems like a lot to digest, the [microservice yaml definition](#microservices) is explained in more details further down.
The main take away is that an application is defined by: a `name`, a set of `microservices` and a set of `routes`.

## Deploying an application

```yaml
apiVersion: iofog.org/v3
kind: Application # What are we deploying
metadata:
  name: health-care-wearable # Application name
  namespace: default # (Optional) iofogctl namespace to use

# Specifications of the application
spec:
  natsConfig:
    natsAccess: true
    natsRule: default-account
  # List of microservices composing your application
  microservices:
    #  # It uses the microservice YAML schema described below
    - name: heart-rate-monitor
      agent:
        name: horse-1
      images:
        arm: arm-image:latest
        x86: x86-image:latest
        # registry: remote
      natsConfig:
        natsAccess: true
        natsRule: default-user
      container:
        hostNetworkMode: false
        isPrivileged: false
        runAsUser: ''
        platform: ''
        runtime: ''
        cdiDevices: []
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
        arm: arm-image:latest
        x86: x86-image:latest
        registry: remote
      natsConfig:
        natsAccess: false
      container:
        hostNetworkMode: false
        isPrivileged: false
        runAsUser: ''
        platform: ''
        runtime: ''
        cdiDevices: []
        ports:
          - internal: 80
            external: 5000
            protocol: tcp
        extraHosts: [] 
        env:
          - key: BASE_URL
            value: http://localhost:8080/data
      config:
        test: 54
```

| Field         | Description                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name          | User-defined unique identifier of an Application within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                           |
| microservices | List of Microservices. See Microservice section for more details.                                                                                                                                                           |

#### NATs access (natsConfig)

At **application** level you can enable NATs and bind the application to a NATs account:

- **`spec.natsConfig.natsAccess`** — Set to `true` to enable NATs for the application.
- **`spec.natsConfig.natsRule`** — Name of a [NATs Account Rule](../security/nats-account-rule.html) that defines the account policy (limits, imports/exports, JetStream).

At **microservice** level, each microservice that needs NATs credentials specifies:

- **`natsConfig.natsAccess`** — Set to `true` to enable NATs for that microservice.
- **`natsConfig.natsRule`** — Name of a [NATs User Rule](../security/nats-user-rule.html) that defines the user's permissions within the application's account.

Example: Application uses `natsRule: test-export` (Account Rule); a microservice uses `natsRule: default-user` (User Rule). The Controller provisions credentials accordingly. See [NATs JWT Authentication](../security/nats-jwt-authentication.html) for how credentials are issued.

### Microservices

Microservices configuration and set up are defined using YAML files.

Those YAML definitions can be used inside an application YAML file, or by themselves when deploying a microservice to an existing application: `iofogctl deploy microservice -f <path-to-microservice.yaml>`

A microservice YAML definition file can be retrieved using the describe command: `iofogctl describe microservice <NAME> [-o microservice.yaml]`

```yaml
apiVersion: iofog.org/v3
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

  # Microservice NATs accces configuration
  natsConfig:
    natsAccess: true
    natsRule: default-user
  
  # Microservice container configuration
  container:
    # container annotations
    annotations: {}
    # Requires host network mode on the agent ?
    hostNetworkMode: false
    # Require privileged access
    isPrivileged: false
    # ipc mode and pid namespace configuration
    ipcMode: ''
    pidMode: ''
    # Specify which user you would like to run contianer
    runAsUser: ''
    # The platform for the container image
    platform: ''
    # Which runtime you would like to run container
    runtime: ''
    # Map CDI devices to your container runtime
    cdiDevices: []
    # Microservice container volume mapping list on the agent
    volumes:
      # This will create a volume mapping between the agent '/tmp/msvc' volume and the microservice container volume '/data'
      - hostDestination: /tmp/msvc
        containerDestination: /data
        accessMode: 'rw' # ReadWrite access to the mounted volume
        type: 'bind' # Accepts 'bind' , 'volume' or `volumeMount`. Default is 'bind'
    # Define extra host for your container
    extraHosts: [] 
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
    commands:
      # This will result in the container being started as `docker run <image> <options> dbhost localhost:27017`
      - 'dbhost'
      - 'localhost:27017'
    # CPUs in which to allow execution (0-3, 0,1)  
    cpuSetCpus: ''
    # Memory Limit
    memoryLimit: 4096
    # Check container health
    healthCheck:
      test:
        - CMD-SHELL
        - curl -f http://localhost:8083/healthz | grep -q 'Healthy' || exit 1
      interval: 30
      timeout: 10
      startPeriod: 60
      retries: 3
  # int value that gives agent and order which container needs to start first 0 to 100. Default is 50.  
  schedule: 50
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
| images.catalogId         | Catalog item ID to be used in lieu and place of the images and the registry. (see [catalog items](../applications/microservice-registry-catalog.html))  
| natsConfig.natsAccess | boolean. when `true` Controller generates NATs user creds and mount it to the Microservice if Applicaiton natsAccess is enabled |
| natsConfig.natsRule | NATs Rule definition for the Microservice                                           |
| config                   | User-defined arbitrary object to be passed to the microservice runtime as its configuration                                                                                                          |
| container.annotations | Add an annotation to the container (passed through to the OCI runtime)
| container.hostNetworkMode | Set to true to set the network of the container to `host` 
| container.isPrivileged | Set to true if the container needs to be able to access the host.`                                                                            |
| container.ipcMode      | IPC mode to use |
| container.pidMode      | PID namespace to use |
| container.runAsUSer      | Set which user you would like to run your microservice |
| container.platform       | Define platform option for your container iamge |
| container.runtime        | Define which runtime you would like to run your container |
| container.cdiDevices     | Map CDI devices to your microservice runtime |
| container.ports          | List of port mapping to be provided to the container running the microservice       |
| container.volumes        | List of volume mapping to be provided to the container running the microservice                                                                                                                      |
| container.extraHosts     | Define extra host for your containers. Like passing `--add-host` argument while running container.|
| container.env            | List of environment variables to be provided to the container running the microservice                                                                                                               |
| container.commands       | List of arguments passed as CMD to the container runtime 
| container.cpuSetCpus | CPUs in which to allow execution (0-3, 0,1)
| container.memoryLimit | Memory Limit
| container.healthCheck | Check container health
| schedule |                  Int value that gives agent and order which container needs to start first 0 to 100. Default is 50.                                                                                                                          |                                                                                                                                           |
| application              | Unique identifier of the Application the microservice is part of                                                                                                                                     |
| rebuild                  | Boolean instructing the ioFog Agent to rebuild the microservice container after update. Use this flag if you updated the content of the docker image but didn't change the image name and/or tag.    |


#### Auto Attach VolumeMounts

You can automatically attach existing VolumeMounts via `tpye: volumeMount` `hostDestination: "volume-mount-name"` prefix on `Microservice` volume mapping definition. `Controller` will check if the `agent` that is going to run microservice has already linked with the `VolumeMount`. If not `Controller` automatically linked `VolumeMount` with the `agent`, so that your microservices can you use it. 

```yaml
        volumes:
          - hostDestination: test-vm-from-configmap
            containerDestination: /home/foo
            accessMode: 'ro'
            type: volumeMount
          - hostDestination: test-vm-from-secret
            containerDestination: /home/foo
            accessMode: 'ro'
            type: volumeMount

```

#### Extra Hosts

By default ioFog `Agent` pass it's timezone configuration as a `TZ` env variable for each microservice in order to let developers easily configure their microservices on different timezone and locations.

On the other hand, ioFog `Agent` also automatically define `iofog` ExtraHost with `Agent` IP address for each microservice if they are not configured with `hostNetworkMode` enabled. Which helps microservices to talk with Àgent` Local-API.

Also, ioFog `Agent`  automatically define `service.local` ExtraHost with `Router` IP address which runs on same agent with microservice if they are not configured with `hostNetworkMode` enabled. Which helps microservices to talk with `Network Services` attached to the local Router network.

You can also define additional Extra Hosts for your microservices with `extraHosts` options. You can just define some literal IP address as a extraHost or you can also define a query and let `Controller` to define IP adress according to your query.

```yaml
...
    volumes: [] 
    extraHosts:
      - name: literalHost 
        address: "192.168.0.120" # Directly assign an IP address
      - name: agentHost
        address: "${Agents.foo}"  # Assigns the IP adress of the Agent with name `foo`
      - name: appHostLocal
        address: "${Apps.foo.bar.local}" #Assigns the IP adress of the microservice named `bar` inside  the application named `foo` that runs on same agent host with microservice
    env:

...
```

## Using a template

```yaml
apiVersion: iofog.org/v3
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
| template.name           | Name of the [Application template](./reference-application-template.html) to use |
| template.variables      | Array of variables specifications                                                 |
| template.variables.key  | Variable key                                                                      |
| template.variables.name | Variable value                                                                    |


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-application.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
