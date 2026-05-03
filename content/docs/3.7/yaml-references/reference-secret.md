

# Secret YAML Specification

`iofogctl` allows users to deploy and manage secrets.

The secret has a very simple definition

```yaml
apiVersion: iofog.org/v3
kind: Secret
metadata:
  name: test-secret
spec:
  type: Opaque
data:
  username: foo  
  password: bar
```

```yaml
apiVersion: iofog.org/v3
kind: Secret
metadata:
  name: test-secret
spec:
  type: tls
data:
  tls.crt: # base64 encoded string  
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| spec.type          | Type of secret Opaque or tls                                      |
| data     | Secret data with key value pairs. If type is tls values must be base64 encoded string                                              |


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-secret.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
