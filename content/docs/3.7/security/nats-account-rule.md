

# NATS Account Rule

A **NATS Account Rule** is an authorization policy that applies to a **NATS account**. It defines connection and resource limits, JetStream limits, and which subjects the account can publish to or subscribe to (via allow/deny lists). The Controller uses these rules when generating NATS account configuration and JWTs so that microservices with [NATS access](../applications/introduction.html) get the correct permissions.

For the YAML spec and a short example, see [NatsAccountRule YAML Specification](../yaml-references/reference-nats-account-rule.html).

## Relation to Applications and microservices

**Application level:** An [Application](../yaml-references/reference-application.html) can set `spec.natsConfig.natsAccess: true` and `spec.natsConfig.natsRule` to the **name of this NATs Account Rule**. That assigns the application (and its NATs traffic) to this account's policy.

**Microservice level:** Each [Microservice](../yaml-references/reference-application.html) sets `natsConfig.natsRule` to a **NATs User Rule** name. The Controller issues credentials for that user within the account. So: Application → Account Rule (account policy); Microservice → [NATs User Rule](nats-user-rule.html) (user permissions within that account).

## Main fields

| Field | Description |
| ----- | ----------- |
| `name` | Unique name for the rule (1–255 characters). |
| `description` | Optional description. |
| `infoUrl` | Optional URL for documentation. |

## Connection and message limits

| Field | Description |
| ----- | ----------- |
| `maxConnections` | Max connections (-1 = unlimited). |
| `maxLeafNodeConnections` | Max leaf node connections (-1 = unlimited). |
| `maxData` | Max data (bytes, -1 = unlimited). |
| `maxExports` | Max exports (-1 = unlimited). |
| `maxImports` | Max imports (-1 = unlimited). |
| `maxMsgPayload` | Max message payload size (-1 = unlimited). |
| `maxSubscriptions` | Max subscriptions (-1 = unlimited). |
| `exportsAllowWildcards` | Whether exports allow wildcards. |
| `disallowBearer` | If true, disallow bearer tokens. |

## Response permissions

| Field | Description |
| ----- | ----------- |
| `responsePermissions.maxMsgs` | Max response messages. |
| `responsePermissions.expires` | Expiration (e.g. seconds). |
| `respMax` | Response max. |
| `respTtl` | Response TTL. |

## Imports and exports

- **imports**: Array of stream or service imports (subject, type `stream` or `service`, account, token, etc.).
- **exports**: Array of stream or service exports (subject, type, description, `token_req`, `response_type`: Singleton/Stream/Chunked, etc.).

These define which streams or services this account can import from or export to other accounts.

## JetStream limits

| Field | Description |
| ----- | ----------- |
| `memStorage` | JetStream memory storage limit in bytes (-1 = unlimited). |
| `diskStorage` | JetStream disk storage limit in bytes (-1 = unlimited). |
| `streams` | Max streams (-1 = unlimited). |
| `consumer` | Max consumers (-1 = unlimited). |
| `maxAckPending` | Max ack pending (-1 = unlimited). |
| `memMaxStreamBytes` | Max memory stream size in bytes (-1 = unlimited). |
| `diskMaxStreamBytes` | Max disk stream size in bytes (-1 = unlimited). |
| `maxBytesRequired` | Whether max bytes are required. |
| `tieredLimits` | Optional tiered limit overrides. |

## Publish and subscribe allow/deny

| Field | Description |
| ----- | ----------- |
| `pubAllow` | List of subject patterns the account is allowed to publish to. |
| `pubDeny` | List of subject patterns the account is denied from publishing to. |
| `subAllow` | List of subject patterns the account is allowed to subscribe to. |
| `subDeny` | List of subject patterns the account is denied from subscribing to. |

## Predefined account rules

The Controller ships with two predefined NATs Account Rules: **default-account** and **default-system-account**. You cannot edit or delete them.

- **default-account:** Used for Applications when no rule is specified. Application NATs traffic uses this account policy.
- **default-system-account:** Used for system-level NATs. For Agents with `spec.natsConfig.natsMode: server`, the NATs server uses the global system account `SYS`. For Agents with `spec.natsConfig.natsMode: leaf`, the NATs leaf uses the leaf-level system account `sys-leaf-<agent-name>` by default.

```yaml
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: default-account
spec:
  description: Default application account rule
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  maxAckPending: -1
  memMaxStreamBytes: -1
  diskMaxStreamBytes: -1

```

```yaml
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: default-system-account
spec:
  description: Default system account rule
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  exports:
    - name: account-monitoring-streams
      subject: $SYS.ACCOUNT.*.>
      type: stream
      account_token_position: 3
      description: Account specific monitoring stream
      info_url: https://docs.nats.io/nats-server/configuration/sys_accounts
    - name: account-monitoring-services
      subject: $SYS.REQ.ACCOUNT.*.*
      type: service
      response_type: Stream
      account_token_position: 4
      description: >-
        Request account specific monitoring services for: SUBSZ, CONNZ, LEAFZ,
        JSZ and INFO
      info_url: https://docs.nats.io/nats-server/configuration/sys_accounts

```


## Example (NatsAccountRule YAML)

```yaml
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: test-export
spec:
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  maxAckPending: -1
  memMaxStreamBytes: -1
  diskMaxStreamBytes: -1
  exports:
    - name: orders-stream
      subject: foo.>
      type: stream
      description: Orders event stream
```

Use this rule name in an Application's `spec.natsConfig.natsRule` (e.g. `natsRule: test-export`) to give that application's microservices access under this account policy.

```yaml
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: test-import
spec:
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  maxAckPending: -1
  memMaxStreamBytes: -1
  diskMaxStreamBytes: -1
  imports:
    - name: import-stream
      subject: export.>
      type: stream
      account: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
      local_subject: import.>
```

Use this rule name in an Application's `spec.natsConfig.natsRule` (e.g. `natsRule: test-import`) to give that application's microservices access under this account policy. A microservice in this application's NATs account (identified by the account public key `ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX`) can import the remote subject `export.>` as the local subject `import.>`.

The Controller uses these rules when provisioning NATs accounts and when generating credentials for microservices that have `natsAccess` enabled. See [NATs User Rule](nats-user-rule.html) and [NATs JWT Authentication](nats-jwt-authentication.html) for the full flow.


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/security/nats-account-rule.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
