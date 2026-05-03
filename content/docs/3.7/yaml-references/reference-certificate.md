

# Certificate and CertificateAuthority YAML Specification

`iofogctl` allows users to deploy and manage secrets.

The Certificate and CertificateAuthority has a very simple definition

Generate self-signed CA

```yaml
apiVersion: iofog.org/v3
kind: CertificateAuthority
metadata:
  name: test-ca
spec:
  subject: test-ca
  type: self-signed
  expiration: 36
```

Create CA from existing secret on ioFog cluster

```yaml
apiVersion: iofog.org/v3
kind: CertificateAuthority
metadata:
  name: test-ca
spec:
  type: direct
  secretName: test-ca
```

If you are on Kubernetes ControlPlane and would like to Create CA from existing Kubernetes secret inside the same namespace with Controller. 

```yaml
apiVersion: iofog.org/v3
kind: CertificateAuthority
metadata:
  name: test-ca
spec:
  type: k8s-secret
  secretName: test-ca
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| spec.type          | Type of CA self-signed, direct or k8s-secret                                     |
| spec.subject          | CA subject if type is self-signed                                  |
| spec.expiration          | CA expiration in months if type is self-signed                                   |
| spec.secretName          | The secretName that is going to import as CA if the type is direct or k8s-secret                                 |


Generate self-signed tls certificate
```yaml
apiVersion: iofog.org/v3
kind: Certificate
metadata:
  name: test-server
spec:
  subject: "test-server"
  hosts: "x.x.x.x"
  expiration: 36
  ca:
    type: self-signed
```

Generate tls certificate signed with CA certificate deployed in ioFog cluster
```yaml
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

If you are on Kubernetes ControlPlane and would like to generate tls certificate signed with CA certificate that already deployed as a Kubernetes Secret inside the same namespace with Controller
```yaml
apiVersion: iofog.org/v3
kind: Certificate
metadata:
  name: test-server
spec:
  subject: "test-server"
  hosts: "x.x.x.x"
  expiration: 36
  ca:
    type: k8s-secret
    secretName: test-ca
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| spec.subject          | Certificate subject                                  |
| spec.host          | Certificate hosts                                  |
| spec.expiration          | Certificate expiration in months                                  |
| spec.ca.type          | Type of CA that will sign new created certificate. self-signed, direct or k8s-secret                               |
| spec.ca.secretName          | Type CA certificate secretName if the spec.ca.type is direct or k8s-secret                               |


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-certificate.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
