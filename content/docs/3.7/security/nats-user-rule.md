

# NATS User Rule

A **NATS User Rule** is an authorization policy that applies to a **NATS user** (e.g. a microservice). It defines connection limits, allowed connection types, source restrictions, and which subjects the user can publish to or subscribe to. When a [Microservice](../yaml-references/reference-application.html) has NATS access enabled via `natsConfig.natsAccess: true` and `natsConfig.natsRule` set to this rule's name, the Controller uses this rule to generate the user's NATS credentials (e.g. JWT or creds file).

For the YAML spec and a short example, see [NatsUserRule YAML Specification](../yaml-references/reference-nats-user-rule.html).

## Relation to Applications and microservices

The **Application** sets `spec.natsConfig.natsRule` to a **NATs Account Rule** name (the account). Each **Microservice** sets `natsConfig.natsRule` to a **NATs User Rule** name (the user within that account):

```yaml
apiVersion: iofog.org/v3
kind: Application
metadata:
  name: foo
spec:
  natsConfig:
    natsAccess: true
    natsRule: test-export   # NATs Account Rule name
  microservices:
    - name: bar-1
      ...
      natsConfig:
        natsAccess: true
        natsRule: default-user   # NATs User Rule name
```

```yaml
apiVersion: iofog.org/v3
kind: Microservice
metadata:
  name: box-2
spec:
  agent:
    name: agent-2
  images:
  ...
  container:
  ...
  natsConfig:
    natsAccess: true
    natsRule: default-user
  config: {}
  application: foo

```

When you deploy an application with `spec.natsConfig.natsAccess: true`, the Controller automatically generates Account JWTs and puts them into JWT bundle ConfigMaps for NATs instances running on Agents. By default, NATs instances in `server` mode receive all Account JWTs; NATs instances in `leaf` mode receive only the JWTs for the application microservices they are running.

The Controller provisions NATs credentials for each microservice using the referenced **NATs User Rule**; the account is determined by the application's [NATs Account Rule](nats-account-rule.html). Together, Account Rules and User Rules make it easy to deploy microservices with NATs access without manually managing JWTs.

## Main fields

| Field | Description |
| ----- | ----------- |
| `name` | Unique name for the rule (1–255 characters). This is the name you use in `natsConfig.natsRule`. |
| `description` | Optional description. |

## Limits

| Field | Description |
| ----- | ----------- |
| `maxSubscriptions` | Max subscriptions (-1 = unlimited). |
| `maxPayload` | Max payload size (-1 = unlimited). |
| `maxData` | Max data (-1 = unlimited). |

## Connection behaviour

| Field | Description |
| ----- | ----------- |
| `bearerToken` | Whether bearer token auth is allowed. |
| `proxyRequired` | Whether connection via proxy is required. |
| `allowedConnectionTypes` | Allowed connection types: `STANDARD`, `WEBSOCKET`, `LEAFNODE`, `LEAFNODE_WS`, `MQTT`, `MQTT_WS`, `IN_PROCESS`. |

## Source and time restrictions

| Field | Description |
| ----- | ----------- |
| `src` | List of allowed client connection source IPs or CIDRs. |
| `times` | Optional list of `{ start, end }` time windows when connections are allowed. |
| `timesLocation` | Timezone for time windows. |

## Response and publish/subscribe

| Field | Description |
| ----- | ----------- |
| `respMax` | Response max (≥ 0). |
| `respTtl` | Response TTL (≥ 0). |
| `pubAllow` | Subject patterns the user is allowed to publish to. |
| `pubDeny` | Subject patterns the user is denied from publishing to. |
| `subAllow` | Subject patterns the user is allowed to subscribe to. |
| `subDeny` | Subject patterns the user is denied from subscribing to. |
| `tags` | Optional list of tags. |

## Predefined user rules

The Controller ships with three predefined NATs **User** Rules: **default-user**, **default-leaf-user**, and **default-mqtt-user**. You cannot edit or delete them.

- **default-user:** Used for microservices or external users when no rule is specified.
- **default-leaf-user:** Used for NATs instances in `leaf` mode that connect remotely to NATs servers by default.
- **default-mqtt-user:** Used for microservices or external users connecting via MQTT to NATs instances. MQTT users do not receive a creds file; they authenticate to the NATs MQTT port using the user JWT.


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
```

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: default-leaf-user
spec:
  description: Default leaf node user rule for remote connection from leaf to server
  maxSubscriptions: -1
  maxPayload: -1
  maxData: -1
  bearerToken: false
  allowedConnectionTypes:
    - LEAFNODE
    - WEBSOCKET
```

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: default-mqtt-user
spec:
  description: Default MQTT bearer user rule
  maxSubscriptions: -1
  maxPayload: -1
  maxData: -1
  bearerToken: true
  allowedConnectionTypes:
    - MQTT
    - STANDARD
```

## Example (NatsUserRule YAML)

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: test-mqtt-user
spec:
  description: Test MQTT bearer user rule
  maxSubscriptions: -1
  maxPayload: -1
  maxData: -1
  bearerToken: true
  allowedConnectionTypes:
    - MQTT
    - STANDARD
  pubAllow:
    - foo.>
    - bar.>
  pubDeny:
    - barz.>
  subAllow:
    - fooz.>
  subDeny:
    - barz.>

```

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: test-user-rule
spec:
  description: User-level permissions for orders microservices.
  maxSubscriptions: 1000
  maxPayload: 262144
  maxData: -1
  bearerToken: false
  allowedConnectionTypes:
    - STANDARD
    - WEBSOCKET
  pubAllow:
    - orders.commands.>
  pubDeny:
    - private.admin.>
  subAllow:
    - orders.events.>
    - shared.events.>
  subDeny:
    - internal.audit.>
```

```yaml
apiVersion: iofog.org/v3
kind: NatsUserRule
metadata:
  name: test-user
spec:
  description: Test microservice user rule
  maxSubscriptions: -1
  maxPayload: -1
  maxData: -1
  bearerToken: false
  allowedConnectionTypes:
    - STANDARD
    - WEBSOCKET
    - LEAFNODE
    - MQTT
```

Create a NATs User Rule with the desired permissions and limits, then reference it in your Microservice spec with `natsConfig.natsRule`. See [NATs JWT Authentication](nats-jwt-authentication.html) for how the Controller issues credentials.


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/security/nats-user-rule.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
