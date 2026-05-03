# What's New in ioFog v3.7?

- [NATS messaging](../security/nats-jwt-authentication.html) is now available as default pub/sub, request/reply, KV store and JetStream messaging inside **ioFog** clusters; use [NATS Account Rules](../security/nats-account-rule.html) at application level and [NATS User Rules](../security/nats-user-rule.html) at microservice level—the Controller provisions credentials automatically with no manual JWT handling.
- [Access Control](../security/roles.html) is now available with fine-grained [Roles](../security/roles.html) and [Role Bindings](../security/role-bindings.html) for the Controller REST and WS APIs, plus [NATS Account Rule](../security/nats-account-rule.html) and [NATS User Rule](../security/nats-user-rule.html) for NATS access.
- [Security](../security/introduction.html) is now documented in a dedicated section: [NATS JWT Authentication](../security/nats-jwt-authentication.html) and [Certificates Manager](../security/certificates-manager.html) for Microservices. For Routers and NATs instances TLS by default, with support for custom CAs and volume-mounted certs.
- Legacy ioFog Messagebus is deprecated.
- Controller supports external KMS system for Secrets and ConfigMaps(spec.usevault: true) store. HashiCorp Vault, OpenBao, AWS Secret Manager, Azure Key Vault, Google Secret Manager.
- [VolumeMount](../yaml-references/reference-volumemount.html) is now available with **type**-based volume mapping and reference by name.
- [Logging via WebSocket](../applications/microservice-logs.html) is now available for streaming Agent and microservice logs in ECN-Viewer and iofogctl; see [Agent Logs](../reference-agent/agent-logs.html) for details.
- [Airgap deployment](../platform-deployment/airgap-deployment.html) is now documented with a dedicated guide for control plane and Agent images offline, [OfflineImage](../yaml-references/reference-offlineimage.html) for microservices, and iofogctl flags (`--no-cache`, `--transfer-pool`).
- [Service](../yaml-references/reference-service.html) is now available for exposing microservices, agents, Kubernetes services, or external endpoints through Router's TCP bridge mechanism.
- [Secret Management](../yaml-references/reference-secret.html) is now available for storing and managing sensitive data including Opaque and TLS secrets.
- [Certificate and CertificateAuthority](../yaml-references/reference-certificate.html) management is now available for generating self-signed certificates or using existing certificates from ioFog cluster or Kubernetes secrets.
- [ConfigMap](../yaml-references/reference-configmap.html) is now available for managing non-sensitive configuration data that can be mounted to microservices.
- [VolumeMount](../yaml-references/reference-volumemount.html) is now available for attaching ConfigMaps or Secrets to Agents as volumes, enabling easy volume management for microservices.
- [OfflineImage](../yaml-references/reference-offlineimage.html) is now available for deploying container images to edge nodes that cannot access the internet, enabling iofogctl to pull images locally and transfer them to remote hosts via SSH.
- [Debugging & Exec Sessions](#debugging-and-exec-sessions) deliver role-aware remote terminals for Agents, microservices, and system microservices—powered by iofogctl and ECN Viewer.
- [ECN Viewer](../ECN-Viewer/ecn-viewer.html) now mirrors nearly every iofogctl operation, enabling full-cluster workload management, remote exec, resource editing, and deployments directly from the browser.
- [Events and Auditing](#events-and-auditing) provides comprehensive tracking and auditing of all Controller API endpoint calls for compliance and troubleshooting.

## Service

Services enable you to expose microservices, agents, Kubernetes services, or external endpoints through the Router's TCP bridge mechanism. Services create TCP connectors on Router instances, allowing microservices to reach these endpoints via a service mesh. Services are distributed to Agents based on tags, enabling flexible and scalable service discovery across your Edge Compute Network.

[Find out more!](../yaml-references/reference-service.html) and check out the [YAML specification](../yaml-references/reference-service.html)!

## Secret Management

Secrets provide a secure way to store and manage sensitive data such as passwords, API keys, and TLS certificates. ioFog supports Opaque secrets for general-purpose data storage and TLS secrets for certificate management. Secrets can be referenced by microservices and other resources, ensuring sensitive information is handled securely throughout your ECN.

[Find out more!](../yaml-references/reference-secret.html) and check out the [YAML specification](../yaml-references/reference-secret.html)!

## Certificate and CertificateAuthority

Certificate and CertificateAuthority resources enable comprehensive TLS certificate management for your Edge Compute Network. You can generate self-signed certificates, create Certificate Authorities, and sign certificates using existing CAs from your ioFog cluster or Kubernetes secrets. This feature simplifies SSL/TLS configuration across your edge infrastructure, ensuring secure communication between components.

[Find out more!](../yaml-references/reference-certificate.html) and check out the [YAML specification](../yaml-references/reference-certificate.html)!

## ConfigMap

ConfigMaps allow you to store and manage non-sensitive configuration data in key-value pairs. ConfigMaps can be used to store application configuration, environment variables, or configuration files. They support both mutable and immutable modes, providing flexibility for different use cases. ConfigMaps can be mounted to microservices as volumes or referenced directly in your deployment configurations.

[Find out more!](../yaml-references/reference-configmap.html) and check out the [YAML specification](../yaml-references/reference-configmap.html)!

## VolumeMount

VolumeMounts provide a convenient way to attach ConfigMaps or Secrets to Agents as volumes. Once attached, these volumes are available on the Agent and can be easily mounted to running microservices. This feature simplifies configuration and secret management by allowing you to create volumes from ConfigMaps or Secrets and attach them to multiple Agents, enabling consistent configuration across your edge infrastructure.

[Find out more!](../yaml-references/reference-volumemount.html) and check out the [YAML specification](../yaml-references/reference-volumemount.html)!

## OfflineImage

OfflineImage enables you to deploy container images to edge nodes that cannot access the internet for pulling images. This feature is essential for air-gapped or network-restricted edge deployments. iofogctl pulls the images on your local machine (where iofogctl is installed), transfers them to remote edge hosts via SSH, loads them into Docker on each host, and automatically creates catalog items with registry ID 2 (from_cache). This allows microservices to use these pre-loaded images without requiring internet access on the edge nodes.

[Find out more!](../yaml-references/reference-offlineimage.html) and check out the [YAML specification](../yaml-references/reference-offlineimage.html)!

## Debugging and Exec Sessions

Secure debugging is now available across the entire ECN:

- **iofogctl workflow**: attach a privileged debugger container and open an exec session without handling SSH keys.
- **RBAC-aware access**: SREs can exec into Agents, microservices, and system microservices; Developers are limited to microservices; Viewers cannot open exec sessions.
- **ECN Viewer parity**: click the terminal icon in any Agent, microservice, or system microservice slide-over to launch the same exec experience directly in the browser.

### iofogctl commands

Attach and exec into a microservice (application or system):

```bash
# Application microservice
iofogctl attach exec <app>/<microservice>
iofogctl exec <app>/<microservice>

# System microservice
iofogctl attach exec <sys-app>/<sys-microservice>
iofogctl exec <sys-app>/<sys-microservice>
```

Attach and exec into an Agent (with optional custom debugger image):

```bash
iofogctl attach exec agent <agent-name> [debuggerImage:tag]
iofogctl exec agent <agent-name>
```

If no image is provided, the cluster’s catalog debugger image is deployed automatically. Debugger containers run with the required `host`, `pid`, `ipc`, and `net` privileges, giving you SSH-like access without distributing key pairs.

## ECN Viewer: Full-Stack Management

The browser-based ECN Viewer now provides operational parity with iofogctl for day-2 workflows. You can deploy and manage applications, edit any resource YAML, configure registries and catalogs, open exec sessions into Agents or microservices, and call the Controller REST API without leaving the UI. Only the installation of Controllers and Agents still requires iofogctl.

[Find out more!](../ECN-Viewer/ecn-viewer.html)

## Events and Auditing

The Events endpoint provides comprehensive tracking and auditing of all Controller API calls. Administrators can filter events by type, endpoint, status, method, resource type, actor, and time range. Export event logs for compliance reporting or delete old events to manage storage. This feature is essential for enterprise deployments requiring audit trails and compliance with security policies.

[Find out more!](../ECN-Viewer/ecn-viewer.html#6-events-and-audit-trail)


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/getting-started/whats-new.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>

