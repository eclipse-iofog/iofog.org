
# OfflineImage YAML Specification

`iofogctl` allows users to deploy container images to edge nodes that cannot access the internet for pulling images. OfflineImage enables developers to pull images on their local machine with iofogctl installed, then transfer and load those images on remote edge hosts via SSH, automatically creating catalog items with registry ID 2 (from_cache).

## OfflineImage Definition

```yaml
---
apiVersion: iofog.org/v3
kind: OfflineImage
metadata:
  name: alpine-offline
spec:
  x86: alpine:latest
  arm: alpine:latest
  auth: 
    username: foo
    password: bar
  agent:
    - edge-1
    - edge-2
    - edge-3
```

## Field Specifications

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name for the offline image resource |
| `spec.x86` | Docker image tag for x86/amd64 architecture (e.g., `alpine:latest`) |
| `spec.arm` | Docker image tag for ARM architecture (e.g., `alpine:latest`) |
| `spec.auth` | (Optional) Authentication credentials for pulling images from private registries |
| `spec.auth.username` | Username for registry authentication |
| `spec.auth.password` | Password or authentication token for registry authentication |
| `spec.agent` | List of agent names where the image should be transferred and loaded |

## Deployment

Deploy an OfflineImage using iofogctl:

```bash
iofogctl deploy -f offline-image.yaml
```

### Command Flags

| Flag | Description |
| ---- | ----------- |
| `--no-cache` | Disable caching for OfflineImage images after download |
| `--transfer-pool int` | Maximum number of concurrent OfflineImage transfers (default: 2) |

### Example Usage

```bash
# Deploy with default settings (2 concurrent transfers, caching enabled)
iofogctl deploy -f offline-image.yaml

# Deploy without caching images after download
iofogctl deploy -f offline-image.yaml --no-cache

# Deploy with custom transfer pool size
iofogctl deploy -f offline-image.yaml --transfer-pool 4
```

## How It Works

1. **Image Pull**: iofogctl pulls the specified Container images (x86 and/or arm) on the developer's local machine from the configured registry.
2. **Image Transfer**: The pulled images are transferred to the specified edge agents via SSH using the agent's SSH configuration.
3. **Image Load**: The images are loaded into Docker/Podman on each remote edge host.
4. **Catalog Creation**: iofogctl automatically creates catalog items with registry ID 2 (from_cache) so the images can be used by microservices on those edge nodes.

This feature is essential for edge deployments in air-gapped or network-restricted environments where edge nodes cannot directly access container registries. For the full airgap workflow (control plane, Agents, and microservice images), see [Airgap Deployment](../platform-deployment/airgap-deployment.html).

## Use Cases

- **Air-gapped Edge Nodes**: Deploy images to edge nodes that are isolated from the internet
- **Network-Restricted Environments**: Transfer images to edge nodes behind firewalls or with limited network access
- **Offline Deployments**: Pre-load images on edge infrastructure before deployment
- **Bandwidth Optimization**: Transfer images once and reuse them across multiple microservices


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-offlineimage.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>

