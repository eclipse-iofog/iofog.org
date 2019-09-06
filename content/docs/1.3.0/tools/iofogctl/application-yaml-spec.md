# Iofogctl application yaml Specification

`iofogctl` allows users to deploy applications and microservices on ioFog resources using yaml files.

For a complete documentation of all available `iofogctl` commands, please see [our github repository](https://github.com/eclipse-iofog/iofogctl/blob/v1.3.0/docs/md/iofogctl.md)

## Application

An appplication is a set of microservices working together to achieve one specific purpose (I.E: One microservice collecting and formatting data, another one displaying the data in a user friendly way)

An Application can be specified when using `iofogctl deploy application -f application.yaml`
An Application can be retrieved when using `iofogctl describe application <NAME> [-o application.yaml]`

```yaml
# Name of your application
name: Healthcare Wearable

# List of microservices composing your application
microservices:
  # It uses the microservice yaml schema described below
  - name: heart-rate-monitor
    agent:
      name: Agent-1
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
      name: Agent-2
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

## Microservices

A Microservice can be specified when using `iofogctl deploy microservice -f microservice.yaml`
A Microservice can be retrieved when using `iofogctl describe microservice <NAME> [-o microservice.yaml]`

```yaml
# Microservice name
name: heart-rate-monitor

# Agent on which to deploy the microservice
agent:
  # Agent name
  name: Agent-1
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
  # Optional catalog item id (See Catalog items in the advanced section)
  catalogid: 0 # 0 is equivalent to not providing the field
  x86: edgeworx/healthcare-heart-rate:x86-v1 # Image to be used on x86 type agents
  arm: edgeworx/healthcare-heart-rate:arm-v1 # Image to be used on arm type agents
  registry: remote # Either 'remote' or 'local' - Remote will pull the image from Dockerhub, local will use the local cache of the agent

# Microservice configuration
config:
  # Arbitratry key, value yaml object
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
# When deploying application, the application level 'routes' field is prefered to this field

# Mandatory application name inside which to deploy the microservice
application: Healthcare Wearable
```
