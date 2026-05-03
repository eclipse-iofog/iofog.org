

# Control Plane YAML Specification

`iofogctl` allows users to deploy Edge Compute Networks (ECNs). The resources that make up an ECN—Controller, Router, and NATS—are defined in YAML. This page covers three control plane kinds: **KubernetesControlPlane** (for Kubernetes clusters), **ControlPlane** (for remote hosts), and **LocalControlPlane** (for local Docker). When NATS is enabled, the control plane runs NATS server(s); applications and microservices use [NATS Account Rules](../security/nats-account-rule.html) and [NATS User Rules](../security/nats-user-rule.html) for access. For TLS and certificates, see [Certificates for Router and NATS](../security/certificates-manager.html).

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> iofogctl and ECN version compatibility</h3>
    <p><strong>iofogctl v3.7.0 is not compatible with older ECN versions.</strong> It cannot be used to manage legacy ECNs. To fully operate an older ECN, use the matching legacy iofogctl version. If you want to manage the environment with iofogctl v3.7.0, redeploy the ECN using the v3.7.0 control plane and resources.</p>
</aside>

## Kubernetes Control Plane

The **KubernetesControlPlane** kind deploys the Controller, Router, and  NATS on a Kubernetes cluster. The operator manages the lifecycle; you configure replicas, images, services, ingresses, and optional vault and database.

```yaml
---
apiVersion: iofog.org/v3
kind: KubernetesControlPlane
metadata:
  name: pot
  namespace: default
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    # password: password in the case you are not providing password for user, iofogctl will ask for password interactively
  config: .kube/config
  replicas:
    controller: 1
    nats: 2   # optional; NATS server replicas when NATS is enabled
  # # if controller replicas is greater than 1, you must configure the external database for the ControlPlane   
  # database:
  #   provider: # mysql or postgres 
  #   user: 
  #   host:
  #   port: 
  #   password: 
  #   databaseName: 
  #   # ssl: true
  #   # ca: # set the base64 encoded string for the CA certificate
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: external
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  events:  # enable/disable or configure controller audit events
    auditEnabled: true   # true / false
    retentionDays: 14    # how many days should controller saved events records
    cleanupInterval: 86400  # controller internal event cleanup job interval in seconds.
    captureIpAddress: true  # should controller also track IP addresses on events  
  images:
   # pullSecret:  # set the K8S pull secret name
    operator: ghcr.io/eclipse-iofog/operator:3.7.2
    controller: ghcr.io/eclipse-iofog/controller:3.7.3
    router: ghcr.io/eclipse-iofog/router:3.7.0
    nats: ghcr.io/eclipse-iofog/nats:2.12.4   # used when NATs is enabled
  # NATs: enable and optionally configure JetStream
  services:
    controller:
      type:  LoadBalancer # LoadBalancer / ClusterIP / Node Port .. If it is Cluster IP ingress for Controller need to be defined
      externalTrafficPolicy: Cluster
      # annotations: # if type is LoadBalancer user can define annotations in order to map which IP pool they would like to assign for the service
      #   #service.beta.kubernetes.io/azure-load-balancer-internal: "true"
    router:
      type: LoadBalancer
      externalTrafficPolicy: Cluster
      # annotations: # if type is LoadBalancer user can define annotations in order to map which IP pool they would like to assign for the service
      #   #service.beta.kubernetes.io/azure-load-balancer-internal: "true"
    nats:
      type: LoadBalancer  # or LoadBalancer when using external NATS clients
      externalTrafficPolicy: Cluster
      # annotations: {}
    natsServer:
      type: LoadBalancer  # or LoadBalancer when using external NATS clients
      externalTrafficPolicy: Cluster
      # annotations: {}
  nats:  # optional; when present and enabled, NATS is deployed with JetStream
    enabled: true  # set to false to disable NATS
    jetStream:
      storageSize: "10Gi"   # PVC size for JetStream file store
      memoryStoreSize: "1Gi"   # JetStream memory store size
      # storageClassName: ""   # optional Kubernetes storage class
  # vault:  # optional; when set, operator creates a Secret from provider config and injects VAULT_* env vars into the controller
  #   enabled: true
  #   provider: openbao  # hashicorp, openbao, vault, aws, aws-secrets-manager, azure, azure-key-vault, google, google-secret-manager
  #   basePath: "pot/local-test/secrets"  # $namespace is replaced with the ControlPlane namespace
  #   # Provide only the block for your selected provider. Operator creates Secret "controller-vault-credentials" from these values.
  #   hashicorp:
  #     address: "http://192.168.139.3:8200"
  #     token: "s.JCqRS37hu1VOy7PX3QRVdSY2"   # Vault token (sensitive; consider External Secrets to populate the CR)
  #     mount: "kv"
    # aws:
    #   region: "us-east-1"
    #   accessKeyId: ""
    #   accessKey: ""
    # azure:
    #   url: "https://your-vault.vault.azure.net"
    #   tenantId: ""
    #   clientId: ""
    #   clientSecret: ""
    # google:
    #   projectId: ""
    #   credentials: ""  # path to service account key or JSON content
  controller:
    ecnViewerUrl: # set url for ECN Viewer UI for Controller REST API endpoint 
    https:  # set to true to enable HTTPS for Controller REST API endpoint
    secretName:  # set the K8S secret name for the Controller REST API endpoint
    logLevel: # set the log level for the Controller REST API endpoint
  ingresses:
    controller:
      annotations: # K8S ingress annotations
        # cert-manager.io/cluster-issuer: letsencrypt-nginx
        # nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
        # nginx.ingress.kubernetes.io/backend-protocol: "https"
      ingressClassName: # set the K8S ingress class name
      host: # set the host for the Controller endpoints
      secretName: # set the K8S secret name for the Controller endpoints
    router:
      address: # set the address for the Router endpoints PS: this will not create an Ingress on Kubernetes, it is just for the configuring default router addresse of the ControlPlane
      messagePort: # set the message port for the Router endpoints
      interiorPort: # set the interior port for the Router endpoints
      edgePort: # set the edge port for the Router endpoints
  #   nats:  # required when using ingress for NATS (address = hostname)
  #     address: 
  #     serverPort: 4222
  #     clusterPort: 6222
  #     leafPort: 7422
  #     mqttPort: 8883
  #     httpPort: 8222

```

| Field           | Description                                                                                                                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iofogUser       | Credentials registered against ioFog Controller REST API.                                                                                                                                                                               |
| config          | Path to the Kubernetes configuration file that iofogctl uses to install the Controller service to the Kubernetes cluster. (Note: The namespace used with iofogctl will be the Kubernetes namespace where your components are deployed.)     |
| replicas.controller        | Defines the number of controller replicas to be deployed.                                                                                                                                                                               |
| replicas.nats   | Optional. Number of NATS server replicas when NATS is enabled.                                                                                                                                                                          |
| nats            | Optional. Enable NATS and configure JetStream: `enabled`, `jetStream.storageSize`, `jetStream.memoryStoreSize`, optional `jetStream.storageClassName`.                                                                                                                                               |
| vault           | Optional. Vault integration (HashiCorp, OpenBao, AWS, Azure, Google). When set, the operator creates a Secret and injects `VAULT_*` env vars into the Controller. See commented example in YAML.                                                                                                     |
| database        | Configuration for the database. Required when controller replicas > 1. Includes provider, user, host, port, password, database name, ssl, ca.                                                                                                                                                         |
| auth            | Authentication configuration for Keycloak: url, realm, realmKey, ssl, controllerClient, controllerSecret, viewerClient.                                                                                                                                                                            |
| images          | Image references for operator, controller, router, NATS. Use `images.nats` when NATS is enabled. Optional `pullSecret` for private registries.                                                                                                                                                       |
| services        | Service type (`LoadBalancer` or `ClusterIP`), optional `externalTrafficPolicy`, and annotations for controller, router, and (when NATS is enabled) `nats` and `natsServer`.                                                                                                                          |
| controller      | Controller-specific settings: `ecnViewerUrl`, `https`, `secretName`, `logLevel`. See [Controller Configuration](../reference-controller/configuration.html) for full config options.                                                                                                                     |
| ingresses       | Ingress configuration for Controller, Router, and (optionally) NATS. Used to set hostnames and ports for external access.                                                                                                                                                                             |
| ingresses.controller | Annotations, ingressClassName, host, secretName for the Controller REST API.                                                                                                                                                                                                                       |
| ingresses.router | Address and ports (messagePort, interiorPort, edgePort) for the Router. Does not create a Kubernetes Ingress; configures the Control Plane's default Router address.                                                                                                                                |
| ingresses.nats  | Optional. When NATS is enabled: address (hostname), serverPort (default 4222), clusterPort, leafPort, mqttPort, httpPort.                                                                                                                                                                              |

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Router and NATS ingress</h3>
  <p>Ingress settings for Router and NATS configure the Control Plane's advertised addresses and ports; they do not necessarily create Kubernetes Ingress resources depending on your setup.</p>
</aside>

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Router and NATS TLS</h3>
  <p>By default, Router and NATS instances are deployed with TLS. If you do not provide your own CA, the operator creates self-signed certificates. To use your own CA, create Kubernetes secrets `iofog-site-ca` and `default-router-local-ca` in the Control Plane namespace. See [Certificates for Router and NATS](../security/certificates-manager.html).</p>
</aside>

## Remote Control Plane

The **ControlPlane** kind deploys the Controller (and optionally Router, NATS, and a System Agent) on one or more remote hosts. iofogctl uses SSH to install and configure each Controller. You can enable NATS with `nats.enabled: true` and optionally set `airgap: true` for air-gapped installs.

```yaml
---
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: remote
spec:
  # endpoint:  # in the case you would like to set controller behind load balancer, you can set the endpoint here
  # nats:
  #   enabled: true   # enable NATS for this control plane
  # airgap: true      # optional; for air-gapped deployment
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    # password: password in the case you are not providing password for user, iofogctl will ask for password interactively
  controllers:
  - name: remote-1
    host: 10.0.128.192
    ssh:
      user: foo
      keyFile: ~/.ssh/id_rsa
      port: 22
    # scripts: # in the case you would like to use your own scripts, you can set the scripts here for installation of Controller
    #   dir: /tmp/my-scripts
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
    # ecnViewerPort:
    # ecnViewerUrl:
    # logLevel:
    # https:
    #   enabled: true
    #   caCert: # set the base64 encoded string for the CA certificate
    #   tlsCert: # set the base64 encoded string for the TLS certificate
    #   tlsKey: # set the base64 encoded string for the TLS key
    # siteCA:
    #   tlsCert: # set the base64 encoded string for the TLS certificate for Router Site CA if not provided, Controller will create self-signed certificate for Router Site CA
    #   tlsKey: # set the base64 encoded string for the TLS key for Router Site CA if not provided, Controller will create self-signed certificate for Router Site CA
    # localCA:
    #   tlsCert: # set the base64 encoded string for the TLS certificate for Router Local CA if not provided, Controller will create self-signed certificate for Router Local CA
    #   tlsKey: # set the base64 encoded string for the TLS key for Router Local CA if not provided, Controller will create self-signed certificate for Router Local CA
    systemAgent: # systemAgent configuration that runs alongside with Controller on the same host
      # package: # you can set the package for Agent installation if you would like to deploy Agent as a deb or rpm package you can set the version, if you would like to deploy Agent as a container you can set the image
      #   # version: 3.7.0# set the version for Agent package
      #   container:
      #     image: ghcr.io/eclipse-iofog/agent:3.7.0
      # scripts: # in the case you would like to use your own scripts, you can set the scripts here for installation of Agent
      #   dir: /tmp/my-scripts # set the directory for the scripts for installation of Agent
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
      # config: #configuration for System Agent
      #   agentType: x86
      #   deploymentType: container
      #   containerEngine: docker
      #   networkInterface: enX0
      #   dockerUrl: unix:///var/run/docker.sock
      #   diskLimit: 10
      #   diskDirectory: /var/lib/iofog-agent/
      #   memoryLimit: 4096
      #   cpuLimit: 80
      #   logLimit: 10
      #   logDirectory: /var/log/iofog-agent/
      #   logFileCount: 10
      #   statusFrequency: 10
      #   changeFrequency: 10
      #   deviceScanFrequency: 60
      #   bluetoothEnabled: false
      #   watchdogEnabled: false
      #   gpsMode: manual
      #   gpsScanFrequency: 60
      #   gpsDevice: ''
      #   edgeGuardFrequency: 0
      #   abstractedHardwareEnabled: false
      #   logLevel: INFO
      #   dockerPruningFrequency: 0
      #   availableDiskThreshold: 20
      #   timeZone: Etc/UTC
  - name: remote-2
    host: 10.0.128.192
    ssh:
      user: foo
      keyFile: ~/.ssh/id_rsa
      port: 22
    # ecnViewerPort:
    ecnViewerUrl: # set the URL for the ECN Viewer UI for Controller REST API endpoint
    # logLevel:
    # https:
    #   enabled: true
    #   caCert: base64 encoded string
    #   tlsCert: base64 encoded string
    #   tlsKey: base64 encoded string
    # siteCA:
    #   tlsCert: base64 encoded string
    #   tlsKey: base64 encoded string
    # localCA:
    #   tlsCert: base64 encoded string
    #   tlsKey: base64 encoded string
    systemAgent:
      package:
        container:
          image: ghcr.io/eclipse-iofog/agent:3.7.0
      # scripts:
      #   dir: <path-to-scripts-dir>
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
  # package: # you can set the container image for Controller installation
  #   container:
  #     image: emirhandurmus/controller:3.7.1
  # systemMicroservices:
  #   router:
  #     x86: ghcr.io/eclipse-iofog/router:3.7.0
  #     arm: ghcr.io/eclipse-iofog/router:3.7.0
  #   nats:   # when nats.enabled is true
  #     x86: ghcr.io/eclipse-iofog/nats:2.12.4
  #     arm: ghcr.io/eclipse-iofog/nats:2.12.4
  # database: # if you would like to use an external database or have multiple controllers for the ControlPlane, you can set the database here
  #     provider: postgres/mysql  
  #     user: 
  #     host: 
  #     port: 5432
  #     password: 
  #     databaseName: 
  #     ssl: true/false 
  #     ca: base64 encoded string
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: external
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  nats:
    enabled: true
  events:  # enable/disable or configure controller audit events
    auditEnabled: true   # true / false
    retentionDays: 14    # how many days should controller saved events records
    cleanupInterval: 86400  # controller internal event cleanup job interval in seconds.
    captureIpAddress: true  # should controller also track IP addresses on events
  # vault:  # optional; when set, operator creates a Secret from provider config and injects VAULT_* env vars into the controller
  #   enabled: true
  #   provider: openbao  # hashicorp, openbao, vault, aws, aws-secrets-manager, azure, azure-key-vault, google, google-secret-manager
  #   basePath: "pot/local-test/secrets"  # $namespace is replaced with the ControlPlane namespace
  #   # Provide only the block for your selected provider. Operator creates Secret "controller-vault-credentials" from these values.
  #   hashicorp:
  #     address: "http://192.168.139.3:8200"
  #     token: "s.JCqRS37hu1VOy7PX3QRVdSY2"   # Vault token (sensitive; consider External Secrets to populate the CR)
  #     mount: "kv"
    # aws:
    #   region: "us-east-1"
    #   accessKeyId: ""
    #   accessKey: ""
    # azure:
    #   url: "https://your-vault.vault.azure.net"
    #   tenantId: ""
    #   clientId: ""
    #   clientSecret: ""
    # google:
    #   projectId: ""
    #   credentials: ""  # path to service account key or JSON content


```

| Field                  | Description                                                                                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| iofogUser              | Credentials registered against ioFog Controller REST API.                                                                                                                |
| controllers            | List of Controller instances.                                                                                                                                            |
| controller.name        | User-defined unique identifier of Controller instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| controller.host        | Hostname of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.user    | Username of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| controller.ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Controller service.                                                                    |
| controller.ssh.port     | Port to use with SSH. Optional (default: 22).                                                                                                                                 |
| controller.systemAgent | Optional. System Agent that runs alongside the Controller on the same host. Package (version or container image) and scripts for install/uninstall.                         |
| package.container.image | Optional. Controller container image when deploying to remote hosts. Defaults to a standard image if not set.                                                                |
| systemMicroservices.router | Optional. Custom Router images (x86, arm) for remote deployment.                                                                                                            |
| systemMicroservices.nats   | Optional. NATS server images (x86, arm) when `nats.enabled` is true.                                                                                                       |
| nats.enabled    | Optional. Set to true to enable NATS for this control plane. When true, NATS is deployed alongside each Controller.                                                        |
| vault           | Optional. Vault integration for Controller secrets (HashiCorp, OpenBao, AWS, Azure, Google). See commented YAML for provider-specific blocks.                             |
| events          | Optional. Controller audit events: auditEnabled, retentionDays, cleanupInterval, captureIpAddress.                                                                         |
| database        | Optional. External database when running multiple Controllers. Provider (postgres/mysql), user, host, port, password, databaseName, ssl, ca.                               |
| auth            | Authentication configuration for Keycloak: url, realm, realmKey, ssl, controllerClient, controllerSecret, viewerClient.                                                 |

## Local Control Plane

The **LocalControlPlane** kind deploys the Controller (and optionally NATS) as a local Docker container. Use it for quick starts and development. Set `nats.enabled: true` to enable NATS.

```yaml
apiVersion: iofog.org/v3
kind: LocalControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  # nats:
  #   enabled: true   # optional; enable NATs for this local control plane
  iofogUser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: g9hr823rhuoi
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: external
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  nats:
    enabled: true
  events:  # enable/disable or configure controller audit events
    auditEnabled: true   # true / false
    retentionDays: 14    # how many days should controller saved events records
    cleanupInterval: 86400  # controller internal event cleanup job interval in seconds.
    captureIpAddress: true  # should controller also track IP addresses on events 
  controller:
    container:
      image: ghcr.io/eclipse-iofog/controller:3.7.3
```

| Field            | Description                                               |
| ---------------- | --------------------------------------------------------- |
| iofogUser        | Credentials registered against ioFog Controller REST API. |
| nats.enabled     | Optional. Set to true to enable NATS for this local control plane. |
| events           | Optional. Controller audit events (auditEnabled, retentionDays, cleanupInterval, captureIpAddress). |
| controller       | Controller specification. |
| controller.container.image | Docker image for the Controller (e.g. ghcr.io/eclipse-iofog/controller:3.7.3). |
| auth             | Authentication configuration for Keycloak: url, realm, realmKey, ssl, controllerClient, controllerSecret, viewerClient. |       

## Remote Controller

We can expand a Remote Control Plane by deploying a new Controller.

```yaml
apiVersion: iofog.org/v3
kind: Controller
metadata:
  name: alpaca
  namespace: default
spec:
  host: 30.40.50.5
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa
    port: 22
```

| Field       | Description                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| name        | User-defined unique identifier of Controller instance within an iofogctl namespace. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| host        | Hostname of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| ssh.user    | Username of remote host that iofogctl must SSH into to install Controller service.                                                                                       |
| ssh.keyFile | Path to private SSH key that iofogctl must use to SSH into remote host to install Controller service.                                                                    |
| ssh.port    | Port to use with SSH. Optional (default: 22)                                                                                                                             |

## Edge Compute Network

You can define an entire ECN in one YAML file by listing multiple resources separated by `---`. The example below shows a Control Plane with two Controllers and two Agents; add NATS, Router, or other kinds as needed.

```yaml
---
apiVersion: iofog.org/v3
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default
spec:
  iofogUser:
    name: John
    surname: Doe
    email: user@example.com
    password: mysecretpw
  auth:
    url: https://example.com/
    realm: realm-name
    realmKey: realm-key
    ssl: external
    controllerClient: iofog-controller
    controllerSecret:
    viewerClient: ecn-viewer
  controllers:
    - name: alpaca-1
      host: 30.40.50.3
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
    - name: alpaca-2
      host: 30.40.50.4
      ssh:
        user: john
        keyFile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: hippo-1
  namespace: default
spec:
  host: 30.40.50.6
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: hippo-2
  namespace: default
spec:
  host: 30.40.50.7
  ssh:
    user: john
    keyFile: ~/.ssh/id_rsa
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-control-plane.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
