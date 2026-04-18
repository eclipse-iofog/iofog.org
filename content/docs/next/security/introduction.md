

# Introduction

ioFog establishes **trust** between the control plane and edge devices. This is essential for edge environments that operate outside traditional security perimeters.

Secure communication is a first-class capability in ioFog. Each edge node and workload operates with a **verified identity**, supported by built-in certificate management. ioFog provides a secure service mesh and distributed message bus by default, enabling reliable, encrypted communication between services across nodes and sites. Edge environments can remain isolated from a network perspective while still participating in a trusted, managed cluster.

## What's in this section

- **[Control plane TLS](#control-endpoints-tls-configuration)** – Securing Controller endpoints with TLS certificates
- **[Agent JWT authentication](#agent-jwt-authentication)** – How Agents authenticate to the Controller
- **[Certificates Manager](certificates-manager.html)** – x509 Certificate Management for Microservices and System Components
- **[Roles](roles.html)** and **[Role Bindings](role-bindings.html)** – Fine-grained RBAC for the Controller API
- **[NATs Account Rules](nats-account-rule.html)**  and **[NATs User Rules](nats-user-rule.html)** – Fine-grained Applications, Microservices, External Users level NATs Authorization Rules
- **[NATs JWT Authentication](nats-jwt-authentication.html)** – Secure messaging with NATs

## Control Endpoints TLS Configuration

When deploying a Remote or Kubernetes ControlPlane, you can introduce TLS certificates that the Controller uses to secure its endpoints.

### Kubernetes ControlPlane

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: pot-demo
type: kubernetes.io/tls
data:
  ca.crt: 
  tls.crt: 
  tls.key: 

```

```yaml
---
apiVersion: iofog.org/v3
kind: KubernetesControlPlane
metadata:
  name: pot
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: example@mail.com
    password:
  config: ~/.kube/config
  ...
  ...
  controller:
  #   pidBaseDir: ""
  #   ecnViewerPort: 0
    # ecnViewerUrl:
    https: true
    secretName: pot-demo
    logLevel: info
  # ingresses: 
    # controller:
      # annotations:
        # cert-manager.io/cluster-issuer: letsencrypt
        # nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
        # nginx.ingress.kubernetes.io/backend-protocol: "https"
      # ingressClassName: 
      # host: <host>
      # secretName: pot-demo

```

### Remote ControlPlane

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
    email: example@mail.com
    password:
  controllers:
  - name: remote-1
    host: 10.0.47.234
    ssh:
      user: ubuntu
      keyFile: ~/.ssh/id_rsa
    https:
      enabled: true
      caCert: #base64 encoded string
      tlsCert: #base64 encoded string
      tlsKey: #base64 encoded string
    ...
    ...
```


## Agent JWT Authentication

When provisioning is successful, the Controller generates an `ed25519` key-pair for the Agent: it returns the private key to the Agent and stores the public key for verifying Agent’s tokens. Each time the Agent calls Controller APIs, it generates a JWT token, signs it with its private key, and authenticates via JWT. The Controller tracks these JWT identifiers to prevent reuse of any token.
