

# ConfigMap YAML Specification

`iofogctl` allows users to deploy and manage configMaps.

The configMap has a very simple definition

```yaml
apiVersion: iofog.org/v3
kind: ConfigMap
metadata:
  name: test-configMap
spec:
  immutable: false
data:
  key1: value1  
  key2: value2
```

```yaml
apiVersion: iofog.org/v3
kind: ConfigMap
metadata:
  name: test-nats-configmap
spec:
  immutable: true
data:
  accounts.conf: |
    accounts: {
      USERS: {
        users: [
          {user: test, password: test}
        ],
        jetstream: enabled
      }
    }
  nats-server.conf: |
    port: 4222
    server_name: test-leaf
    jetstream {
      store_dir="./store_leaf"	
        domain: test
    }
    leafnodes {
        remotes = [
            {
                urls: ["nats://test:test@example.online:7422"]
                account: "USERS"
                tls: {
                    ca_file: "/etc/nats/certs/leafnodes/ca.crt"
                    cert_file: "/etc/nats/certs/leafnodes/tls.crt"
                    key_file: "/etc/nats/certs/leafnodes/tls.key"
                    verify: true
                    handshake_first: true
                }
            },
        ]
    }
    mqtt {
      port: 1884 
    }
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| spec.immutable          | Is configMap immutable? true or false                                   |
| spec.useVault | Optional. When true, ConfigMap values can be resolved from a vault backend instead of static data. |
| data     | ConfigMap data with key value pairs (or vault references when useVault is enabled).                                           |

## Vault integration

ConfigMap supports **vault integration** so that sensitive or dynamic values can be pulled from an external secrets store instead of storing them literally in the spec. When `useVault` (or the equivalent option) is enabled, the Controller can resolve ConfigMap keys from supported backends, including:

- **HashiCorp Vault**
- **OpenBao**
- **AWS Secrets Manager**
- **Google Secret Manager**
- **Azure Key Vault**

Configuration for vault connection (endpoint, auth, path) is typically provided via Controller configuration or environment variables. Refer to the Controller documentation for the exact vault-related settings.


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-configmap.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
