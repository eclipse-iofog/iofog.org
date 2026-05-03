

# Airgap Deployment

This page describes how to deploy and run Eclipse ioFog in **air-gapped** or **restricted networks** where Remote ControlPlane Controllers or Agents hosts cannot access the internet (or container registries) directly.

## Overview

`iofogctl` allows users to deploy container images to edge nodes that cannot access the internet for pulling images.

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Warning</h3>
  <p>For airgap installations `iofogctl` assumes that your remote hosts already have container engine.</p>
</aside>

## Remote ControlPlane

```yaml
---
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: remote
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: mail@example.com
    password:
  airgap: true   
  controllers:
  - name: remote-1
      host: 10.0.23.66
      ssh:
       user: admin
       keyFile: ~/.ssh/id_rsa
    # logLevel:
    # https:
    #   enabled: true
    #   caCert:
    #   tlsCert:
    #   tlsKey:
    # scripts:
    #   dir: /path-to-custom-scripts-dir
    #   deps:
    #     entrypoint: install_container_engine.sh
    #     args: []
    #   setEnv:
    #     entrypoint: set_env.sh
    #     args: []
    #   install:
    #     entrypoint: install_iofog.sh
    #     args:
    #       - ghcr.io/eclipse-iofog/controller:3.7.3
    #   uninstall:
    #     entrypoint: uninstall_iofog.sh
    systemAgent:
      # scripts:
      #   dir: /path-to-custom-scripts-dir
      #   deps:
      #     entrypoint: install_container_engine.sh
      #     args: []
      #   install:
      #     entrypoint: install_iofog.sh
      #     args:
      #       - ghcr.io/eclipse-iofog/agent:3.7.0
      #   uninstall:
      #     entrypoint: uninstall_iofog.sh
      #     args: []
      # config:
      #   deploymentType: container
      #   containerEngine: docker
      package:
        container:
          image: ghcr.io/eclipse-iofog/agent:3.7.0
      config:
        deploymentType: container
        containerEngine: docker
        agentType: x86
        host: 192.168.139.148
  nats:
    enabled: true
  systemMicroservices:
    router:
      x86: ghcr.io/eclipse-iofog/router:3.7.0
      arm: ghcr.io/eclipse-iofog/router:3.7.0
    nats:
      x86: ghcr.io/eclipse-iofog/nats:2.12.4
      arm: ghcr.io/eclipse-iofog/nats:2.12.4
  auth:
    url: 
    realm: 
    ssl: "none"
    realmKey:
    controllerClient: iofog-controller
    controllerSecret: ""
    viewerClient: ecn-viewer

```

You only need to set `spec.airgap: true`. `iofogctl` will download both Controller, Agent, Router, NATs, Debugger images and send them to the remote host over ssh and load the images on the remote host. 

You must set system agent spec.systemAgent.config.agentType and spec.systemAgent.config.containerEngine, so `iofogctl` would know which image it needs to pull and send to the remote host. 

You can check default airgap controller installation scripts [Default AirGap Controller Installation Scripts](https://github.com/eclipse-iofog/iofogctl/tree/main/assets/airgap-controller).

You can check default airgap system agent installation scripts [Default AirGap Agent Installation Scripts](https://github.com/eclipse-iofog/iofogctl/tree/main/assets/airgap-agent).

If you would like to customize installation scripts you can download and update them so `iofogctl`would you your custom installation scripts. 


## Remote Agents

```yaml
---
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: foo
spec:
  host: 192.168.139.148
  ssh:
    user: foo
    keyFile:  ~/.ssh/id_rsa
    port: 22
  airgap: true  
  package:
    container:
      image: ghcr.io/eclipse-iofog/agent:3.7.0
  config:
    deploymentType: container
    containerEngine: docker
    agentType: arm
  # scripts:
  #   dir: <path-to-script-dir>
  #   deps:
  #     entrypoint: install_deps.sh
  #   install:
  #     entrypoint: install_iofog.sh
  #     args:
  #       - ghcr.io/eclipse-iofog/agent:3.7.0
  #   uninstall:
  #     entrypoint: uninstall_iofog.sh

```
You only need to set `spec.airgap: true`. `iofogctl` will download both Agent, Router, NATs, Debugger images and send them to the remote host over ssh and load the images on the remote host. 

You must set system agent `spec.config.agentType` and `spec.config.containerEngine`, so `iofogctl` would know which image it needs to pull and send to the remote host. 

You can check default airgap system agent installation scripts [Default AirGap Agent Installation Scripts](https://github.com/eclipse-iofog/iofogctl/tree/main/assets/airgap-agent).

If you would like to customize installation scripts you can download and update them so `iofogctl`would you your custom installation scripts. 


## OfflineImage for microservices

[OfflineImage](../yaml-references/reference-offlineimage.html) is the main mechanism for getting container images onto Agents that cannot pull from the internet:

1. On a machine that has registry access (and iofogctl), define an OfflineImage YAML with the image tags and the list of Agent names.
2. Run `iofogctl deploy -f offline-image.yaml`. iofogctl pulls the images locally, transfers them to each Agent via SSH, and loads them into the container runtime on the Agent. Catalog items are created with registry `from_cache` so applications can reference these images.
3. Use flags such as `--no-cache` and `--transfer-pool` as needed (see [OfflineImage reference](../yaml-references/reference-offlineimage.html)).

This flow avoids any need for the Agent to reach a registry; all image data is pushed from the machine running iofogctl to the Agents over SSH.


For OfflineImage YAML and CLI flags, see [OfflineImage YAML Specification](../yaml-references/reference-offlineimage.html). For general deployment paths, see [Platform Deployment Introduction](introduction.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/airgap-deployment.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
