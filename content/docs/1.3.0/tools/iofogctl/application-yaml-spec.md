# Iofogctl application yaml Specification

`iofogctl` allows users to deploy applications and microservices on ioFog resources using yaml files.

For a complete documentation of all available `iofogctl` commands, please see [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0/docs/md/iofogctl.md)

## Application

An application is a set of microservices working together to achieve one specific purpose (I.E: One microservice collecting and formatting data, another one displaying the data in a user friendly way)

An application is defined by a yaml file. This file is passed as a parameter to the deploy command: `iofogctl deploy application -f <path-to-yaml>`

An application yaml file definition can be retrieved with the describe command: `iofogctl describe application <NAME> [-o <path-to-yaml>]`

Don't panic if this seems like a lot to ingest, the [microservice yaml definition](#microservices) is explained in more details further down.
The main take away is that an application is defined by: a `name`, a set of `microservices` and a set of `routes`.

```yaml
# Name of your application
name: Healthcare Wearable

# List of microservices composing your application
microservices:
  # It uses the microservice yaml schema described below
  - name: heart-rate-monitor
    agent:
      name: zebra-1
      config:
        bluetoothenabled: true
        abstractedhardwareenabled: false
    images:
      x86: edgeworx/healthcare-heart-rate:x86-v1
      arm: edgeworx/healthcare-heart-rate:arm-v1
    config:
      data_label: Anonymous Person
      test_mode: true
    roothostaccess: false
    ports: []
    volumes: []
    env: []
  - name: heart-rate-viewer
    agent:
      name: zebra-2
    images:
      x86: edgeworx/healthcare-heart-rate-ui:x86
      arm: edgeworx/healthcare-heart-rate-ui:arm
    config: {}
    roothostaccess: false
    ports:
      - internal: 80
        external: 5000
    volumes: []
    env:
      - key: BASE_URL
        value: http://localhost:8080/data

# List of route for ioMessages between two microservices inside the same application
routes:
  - from: heart-rate-monitor
    to: heart-rate-viewer
```

| Field         | Description                                                                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name          | User-defined unique identifier of an Application within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                           |
| Microservices | List of Microservices. See Microservice section for more details.                                                                                                                                                           |
| Routes        | List of ioFog Routes. `From` and `To` use microservice name as identifiers. The microservices specified must be part of the application. When deploying an application, prefer this method to the microservice route field. |

## Microservices

Microservices configuration and set up are defined using yaml files.

Those yaml definitions can be used inside an application yaml file, or by themselves when deploying a microservice to an existing application: `iofogctl deploy microservice -f <path-to-microservice.yaml>`

A microservice yaml definition file can be retrieved using the describe command: `iofogctl describe microservice <NAME> [-o microservice.yaml]`

```yaml
# Microservice name
name: heart-rate-monitor

# Agent on which to deploy the microservice
agent:
  # Agent name
  name: zebra-1
  # Optional agent configuration
  config:
    # All fields are optional
    dockerurl: unix:///var/run/docker.sock
    disklimit: 50
    diskdirectory: /var/lib/iofog-agent/
    memorylimit: 4096
    cpulimit: 80
    loglimit: 10
    logdirectory: /var/log/iofog-agent/
    logfilecount: 10
    statusfrequency: 10
    changefrequency: 10
    devicescanfrequency: 60
    bluetoothenabled: true
    watchdogenabled: false
    abstractedhardwareenabled: false

# Information about the container images to be used
images:
  x86: edgeworx/healthcare-heart-rate:x86-v1 # Image to be used on x86 type agents
  arm: edgeworx/healthcare-heart-rate:arm-v1 # Image to be used on arm type agents
  registry: remote # Either 'remote' or 'local' or the registry ID - Remote will pull the image from Dockerhub, local will use the local cache of the agent
  # Optional catalog item id (See Catalog items in the advanced section)
  catalogid: 0 # 0 is equivalent to not providing the field

# Microservice configuration
config:
  # Arbitrary key, value yaml object
  data_label: test_mode=false_cross_agent_microservice_routing_aug_27
  test_mode: true

# Does the microservice container requires root host access on the agent
roothostaccess: false

# Microservice container port mapping list on the agent
ports:
  # This will create a mapping between the port 80 of the microservice container and the port 5000 of the agent
  - internal: 80
    external: 5000

# Microservice container volume mapping list on the agent
volumes:
  # This will create a volume mapping between the agent '/tmp/msvc' volume and the microservice container volume '/data'
  - hostdestination: '/tmp/msvc'
    containerdestination: '/data'
    accessmode: 'rw' # ReadWrite access to the mounted volume

# Microservice container environment variable list on the agent
env:
  # This will create an environment variable inside the microservice container with the key 'BASE_URL' and the value 'http://localhost:8080/data'
  - key: BASE_URL
    value: http://localhost:8080/data

# List of microservice names to which a route needs to be created
routes:
  - heart-rate-viewer # This will create a route from 'heart-rate-monitor' to 'heart-rate-viewer'
# When deploying application, the application level 'routes' field is preferred to this field

# Mandatory application name inside which to deploy the microservice
application: Healthcare Wearable
```

| Field            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Name             | User-defined unique identifier of an Microservice within an ioFog Controller. Must start and end with lowercase alphanumeric character. Can include '-' character.                                                                                                                                                                                                                                                                                                      |
| Agent            | Object describing the name and the required configuration of the ioFog agent the microservice is to be deployed on. All configuration fields are optional only the specified values will be updated.                                                                                                                                                                                                                                                                    |
| Images           | Description of the images to be used by the container running the microservice. `x86` is the image to be used on x86 ioFog Agents. `arm` is the image to be used on ARM ioFog Agents. `Registry` is either `local`, `remote`, or `registryID`. Remote will pull the image from Dockerhub, local will use the local cache of the ioFog Agent. RegistryID will use the specified registry. A catalog ID can be provided in lieu and place of the images and the registry. |
| Config           | User-defined arbitrary object to be passed to the microservice runtime as its configuration                                                                                                                                                                                                                                                                                                                                                                             |
| Root host access | Does the container running the microservice requires root access to the host                                                                                                                                                                                                                                                                                                                                                                                            |
| Ports            | List of port mapping to be provided to the container running the microservice                                                                                                                                                                                                                                                                                                                                                                                           |
| Volumes          | List of volume mapping to be provided to the container running the microservice                                                                                                                                                                                                                                                                                                                                                                                         |
| Env              | List of environment variables to be provided to the container running the microservice                                                                                                                                                                                                                                                                                                                                                                                  |
| Routes           | List of ioFog Routes destination. Use microservice name as identifiers. The microservice specified must be part of the application. Only use this field when updating a microservice in isolation.                                                                                                                                                                                                                                                                      |
| Application      | Unique identifier of the Application the microservice is part of                                                                                                                                                                                                                                                                                                                                                                                                        |
