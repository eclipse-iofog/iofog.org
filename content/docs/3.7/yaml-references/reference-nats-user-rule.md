
# NatsUserRule YAML Specification

The `NatsUserRule` kind defines the **NATS user-level policy** for a microservice (or external client): connection limits, allowed connection types, and publish/subscribe allow/deny. Microservices reference it via `natsConfig.natsRule` in the Application or Microservice YAML. The application's [NatsAccountRule](reference-nats-account-rule.html) supplies the account; the NatsUserRule supplies the user permissions within that account.

## Example

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: default-user
spec:
  description: Default microservice user rule
  maxSubscriptions: -1
  maxPayload: -1
  maxData: -1
  bearerToken: false
  allowedConnectionTypes:
    - STANDARD
    - WEBSOCKET
  pubAllow:
    - orders.>
  subAllow:
    - events.>
```

## Main fields

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name. Use this in Microservice `natsConfig.natsRule`. |
| `spec.description` | Optional description. |
| `spec.maxSubscriptions`, `spec.maxPayload`, `spec.maxData` | Limits (-1 = unlimited). |
| `spec.bearerToken` | Whether bearer token auth is allowed. |
| `spec.allowedConnectionTypes` | e.g. `STANDARD`, `WEBSOCKET`, `LEAFNODE`, `MQTT`. |
| `spec.pubAllow`, `spec.pubDeny`, `spec.subAllow`, `spec.subDeny` | Subject allow/deny lists. |
| `spec.src` | Optional list of allowed client IPs/CIDRs. |

Deploy with `iofogctl deploy -f nats-user-rule.yaml`. For predefined rules, all fields, and credential flow, see [Security – NATS User Rule](../security/nats-user-rule.html) and [NATS JWT Authentication](../security/nats-jwt-authentication.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-nats-user-rule.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
