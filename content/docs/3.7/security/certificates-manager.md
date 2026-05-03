
# Built-in Certificate Manager

The Eclipse ioFog Controller includes a built-in **X.509 certificate manager** for creating and managing TLS certificates and certificate authorities (CAs).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Certificate resources</h3>
  <p>You can use the ioFog [Certificate](../yaml-references/reference-certificate.html) and **CertificateAuthority** YAML resources to create and manage certificates. See the [Certificate & CA YAML Specification](../yaml-references/reference-certificate.html) for the full field reference.</p>
</aside>

**Example: CA from an existing secret and a certificate signed by it.** Define a Secret with your CA/key material, then a CertificateAuthority that references it, then a Certificate that uses that CA:

```yaml
---
apiVersion: iofog.org/v3
kind: Secret
metadata:
  name: test-authority
spec:
  type: tls
data:
  tls.crt: # base64 encoded string 
  tls.key: # base64 encoded string
  ca.crt: # base64 encoded string

---
apiVersion: iofog.org/v3
kind: CertificateAuthority
metadata:
  name: test-authority
spec:
  type: direct
  secretName: test-authority

---
apiVersion: iofog.org/v3
kind: Certificate
metadata:
  name: test-certificate
spec:
  subject: "test-server-cert"
  hosts: "x.x.x.x"
  expiration: 36
  ca:
    type: direct
    secretName: test-authority
```

**Example: Self-signed CA and a certificate.** Create a CertificateAuthority with `type: self-signed`, then a Certificate that references it via `ca.secretName`:

```yaml
---
apiVersion: iofog.org/v3
kind: CertificateAuthority
metadata:
  name: self-ca
spec:
  subject: self-ca
  type: self-signed
  expiration: 36

---
apiVersion: iofog.org/v3
kind: Certificate
metadata:
  name: test-server
spec:
  subject: "test-server"
  hosts: "x.x.x.x"
  expiration: 36
  ca:
    type: direct
    secretName: test-ca

```

When you create a certificate, the Controller automatically creates a TLS-type **Secret**. You can reference this secret in a **VolumeMount** and attach that VolumeMount to a **Microservice**. The Agent is notified when volumes change, pulls the volume content locally, and mounts it into the microservice container.

```yaml
---
apiVersion: iofog.org/v3
kind: VolumeMount
metadata:
  name: test-server-cert
spec:
  secretName: test-server

---
apiVersion: iofog.org/v3
kind: Microservice
metadata:
  name: foo
spec:
  agent:
    name: bar
  images:
    ...
  container:
    ...
    volumes:
      - hostDestination: test-server-cert
        containerDestination: /etc/cert/test
        accessMode: ro
        type: volumeMount

```


## Certificates for Router and NATs

Router and NATs instances in Eclipse ioFog are secured by default with **TLS**. For Router and NATs instances running on ioFog Agents, the Controller automatically generates TLS certificates and binds the corresponding VolumeMounts.

For a Kubernetes ControlPlane, the **Operator** generates server certificates for Router and NATs instances on the control plane. The Controller obtains CA certificates from Kubernetes Secrets and manages TLS for Router and NATs instances running on ioFog Agents.

For full control plane deployment options (including NATs and Router images and replicas), see the [Control Plane YAML Specification](../yaml-references/reference-control-plane.html), [Kubernetes Helm](../platform-deployment/kubernetes-helm.html), and [Kubernetes iofogctl](../platform-deployment/kubernetes-iofogctl.html).
