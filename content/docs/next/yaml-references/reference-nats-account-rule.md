
# NatsAccountRule YAML Specification

The `NatsAccountRule` kind defines the **NATS account-level policy**: connection and JetStream limits, imports/exports, and publish/subscribe allow/deny. Applications reference it via `spec.natsConfig.natsRule` to assign NATS account access. Microservices then use [NatsUserRule](reference-nats-user-rule.html) names for user-level permissions within that account.

## Example

```yaml
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: test-export
spec:
  description: Orders account
  maxConnections: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  exports:
    - name: orders-stream
      subject: foo.>
      type: stream
      description: Orders event stream
```

## Main fields

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name. Use this in Application `spec.natsConfig.natsRule`. |
| `spec.description` | Optional description. |
| `spec.maxConnections`, `spec.maxSubscriptions` | Limits (-1 = unlimited). |
| `spec.exports`, `spec.imports` | Stream or service exports/imports for multi-account NATS. |
| `spec.memStorage`, `spec.diskStorage`, `spec.streams`, `spec.consumer` | JetStream limits. |
| `spec.pubAllow`, `spec.pubDeny`, `spec.subAllow`, `spec.subDeny` | Subject allow/deny lists. |

Deploy with `iofogctl deploy -f nats-account-rule.yaml`. For all fields, predefined rules, and REST API, see [Security – NATS Account Rule](../security/nats-account-rule.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-nats-account-rule.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
