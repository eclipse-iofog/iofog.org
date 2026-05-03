
# Service YAML Specification

A Service in Eclipse ioFog enables you to expose microservices, agents, Kubernetes services, or external endpoints through the Router's TCP bridge mechanism. Services create TCP connectors on Router instances, allowing microservices to reach these endpoints via a service mesh.

## Service Definition

```yaml
---
apiVersion: iofog.org/v3
kind: Service
metadata:
  name: test-service
  tags:
   - test
   - 'service.beta.kubernetes.io/aws-load-balancer-scheme: internal'
spec:
  type: microservice  # agent, external, k8s 
  resource: 4f783572-c5fc-4e84-85cd-a21cde5ab5ec 
  targetPort: 1880
  defaultBridge: default-router
  # k8sType: LoadBalancer
  # servicePort: 1880
```

## Field Specifications

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name for the service |
| `metadata.tags` | Service tags used for service distribution within the cluster and Kubernetes service annotations |
| `spec.type` | Type of endpoint that the Router instance creates a TCP connector for. Valid values: `microservice`, `agent`, `k8s`, or `external` |
| `spec.resource` | Resource identifier based on the service type:<br/>- For `microservice`: appName/microserviceName or microservice UUID<br/>- For `agent`: agentName or agent UUID<br/>- For `k8s`: Kubernetes FQDN<br/>- For `external`: URL endpoint |
| `spec.targetPort` | Target port of the resource to connect to |
| `spec.defaultBridge` | Name of the Router instance where the service bridge will be created (e.g., `default-router`) |
| `spec.k8sType` | (Optional) Kubernetes service type when ControlPlane is Kubernetes. Valid values: `LoadBalancer`, `ClusterIP`, etc. |
| `spec.servicePort` | (Optional) Kubernetes service port when ControlPlane is Kubernetes |

## Viewing Services

Once you deploy a service, you can check the `Bridge Port` assigned to the service, which is the TCP listener port on the Router.

```bash
iofogctl get services
NAMESPACE
default

SERVICE		TYPE		RESOURCE				TARGET PORT	BRIDGE PORT	STATUS		
test      	microservice	4f783572-c5fc-4e84-85cd-a21cde5ab5ec	1883		10024		ready		
```

## Service Distribution

Services are distributed to Agents based on tags. In the above example, the created service has the `test` tag. Any Agent with the `'service.iofog.org/tag: test'` annotation will have the proper Router TCP listener configuration, allowing microservices running on that host to reach this service via `service.local:$bridgePort`.

### Example: Agent Configuration with Service Tag

```yaml
apiVersion: iofog.org/v3
kind: AgentConfig
metadata:
  name: edge-1
  tags:
    - 'service.iofog.org/tag: test'
spec:
...
```

### Example: Agent with Service Tag

```yaml
apiVersion: iofog.org/v3
kind: Agent
metadata:
  name: edge-1
  tags:
    - 'service.iofog.org/tag: test'
spec:
...
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-service.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
