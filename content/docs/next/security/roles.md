

# Roles

Roles in Eclipse ioFog define **fine-grained permissions** for the Controller REST API. Each Role has a name and a list of **rules** that specify what actions (verbs) are allowed on which resources and API groups. Roles are used together with [Role Bindings](role-bindings.html) to grant permissions to users or groups.

For the YAML spec and a short example, see [Role YAML Specification](../yaml-references/reference-roles.html).

## Role structure

A Role has the following structure:

| Field | Description |
| ----- | ----------- |
| `metadata` | Object containing `name` (unique name for the Role). |
| `apiVersion` | API version (e.g. `iofog.org/v3`). |
| `kind` | Must be `Role`. |
| `rules` | Array of [RbacRule](#rbacrule) objects that define the permissions. |

## RbacRule

Each rule in a Role is a **RbacRule** that specifies:

| Field | Required | Description |
| ----- | -------- | ----------- |
| `apiGroups` | Yes | List of API groups this rule applies to (`[""]` for core). |
| `resources` | Yes | List of resource types (e.g. `["agents"]`, `["applications"]`, `["microservices"]`). |
| `verbs` | Yes | List of allowed actions: `get`, `list`, `create`, `update`, `patch`, `delete` |
| `resourceNames` | No | Optional list of specific resource names to restrict the rule to. If omitted, the rule applies to all resources of the given type. |

## RBAC resource catalog

The following catalog maps each Controller API route to the RBAC **resource** name and **verbs** required to call it. Use this when authoring Role rules: the `resources` in your rules must match these names (e.g. `microservices`, `fogs`, `applications`), and the `verbs` must include the action required by the route (e.g. `get`, `list`, `create`, `update`, `patch`, `delete`).

```yaml rbac-resource.yaml

# RBAC Route Resource Catalog
# Maps API routes to RBAC resources and verbs
# Used by RBAC middleware to determine required permissions

resources:
  # Microservices
  microservices:
    basePath: /api/v3/microservices
    routes:
      - path: /api/v3/microservices/
        methods:
          GET: [list]
      - path: /api/v3/microservices
        methods:
          POST: [create]
      - path: /api/v3/microservices/yaml
        methods:
          POST: [create]
      - path: /api/v3/microservices/:uuid
        methods:
          GET: [get]
          PATCH: [patch]
          PUT: [update]
          DELETE: [delete]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/rebuild
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/yaml/:uuid
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/config
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/port-mapping
        methods:
          GET: [get]
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/port-mapping/:internalPort
        methods:
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/volume-mapping
        methods:
          GET: [get]
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/volume-mapping/:id
        methods:
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/start
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/stop
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/image-snapshot
        methods:
          GET: [get]
          POST: [create]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/strace
        methods:
          GET: [get]
          PATCH: [patch]
          PUT: [update]
        resourceNameParam: uuid

  # System Microservices
  systemMicroservices:
    routes:
      - path: /api/v3/microservices/system
        methods:
          GET: [list]
      - path: /api/v3/microservices/system/:uuid
        methods:
          GET: [get]
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/rebuild
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/yaml/:uuid
        methods:
          PATCH: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/config
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/port-mapping
        methods:
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/port-mapping/:internalPort
        methods:
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/volume-mapping
        methods:
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/volume-mapping/:id
        methods:
          DELETE: [patch]
        resourceNameParam: uuid

  # Fogs (ioFog agents)
  fogs:
    basePath: /api/v3/iofog
    routes:
      - path: /api/v3/iofog-list
        methods:
          GET: [list]
      - path: /api/v3/iofog
        methods:
          POST: [create]
      - path: /api/v3/iofog/:uuid
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/provisioning-key
        methods:
          GET: [get]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/version/:versionCommand
        methods:
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/reboot
        methods:
          POST: [patch]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/hal/hw
        methods:
          GET: [get]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/hal/usb
        methods:
          GET: [get]
        resourceNameParam: uuid
      - path: /api/v3/iofog/:uuid/prune
        methods:
          POST: [patch]
        resourceNameParam: uuid

  # Exec Sessions
  execSessions:
    routes:
      - path: /api/v3/microservices/:uuid/exec
        methods:
          POST: [patch]
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/exec/:microserviceUuid
        methods:
          WS: [get]
        resourceNameParam: microserviceUuid

  # System Exec Sessions
  systemExecSessions:
    routes:
      - path: /api/v3/iofog/:uuid/exec
        methods:
          POST: [patch]
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/exec
        methods:
          POST: [patch]
          DELETE: [patch]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/exec/:microserviceUuid
        methods:
          WS: [get]
        resourceNameParam: microserviceUuid
  # Logs
  logs:
    routes:
      - path: /api/v3/microservices/:uuid/logs
        methods:
          WS: [get]
        resourceNameParam: uuid

  # System Logs
  systemLogs:
    routes:
      - path: /api/v3/iofog/:uuid/logs
        methods:
          WS: [get]
        resourceNameParam: uuid
      - path: /api/v3/microservices/system/:uuid/logs
        methods:
          WS: [get]
        resourceNameParam: uuid

  # Applications
  applications:
    basePath: /api/v3/application
    routes:
      - path: /api/v3/application
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/application/yaml
        methods:
          POST: [create]
      - path: /api/v3/application/:name
        methods:
          GET: [get]
          PATCH: [patch]
          PUT: [update]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/application/yaml/:name
        methods:
          PUT: [update]

  # System Applications
  systemApplications:
    routes:
      - path: /api/v3/application/system
        methods:
          GET: [list]
      - path: /api/v3/application/system/:name
        methods:
          GET: [get]
          DELETE: [delete]
        resourceNameParam: name

  # Cluster Controllers
  cluster:
    basePath: /api/v3/cluster
    routes:
      - path: /api/v3/cluster/controllers
        methods:
          GET: [list]
      - path: /api/v3/cluster/controllers/:uuid
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: uuid

  # Router
  router:
    basePath: /api/v3/router
    routes:
      - path: /api/v3/router
        methods:
          GET: [get]
          PUT: [update]

  # NATs (granular resources)
  natsOperator:
    basePath: /api/v3/nats
    routes:
      - path: /api/v3/nats/operator
        methods:
          GET: [get]
      - path: /api/v3/nats/operator/rotate
        methods:
          POST: [update]

  natsBootstrap:
    basePath: /api/v3/nats
    routes:
      - path: /api/v3/nats/bootstrap
        methods:
          GET: [get]

  natsHub:
    basePath: /api/v3/nats
    routes:
      - path: /api/v3/nats/hub
        methods:
          GET: [get]
          PUT: [update]

  natsAccounts:
    basePath: /api/v3/nats
    routes:
      - path: /api/v3/nats/accounts
        methods:
          GET: [list]
      - path: /api/v3/nats/accounts/:appName
        methods:
          GET: [get]
          POST: [create]
        resourceNameParam: appName

  natsUsers:
    basePath: /api/v3/nats
    routes:
      - path: /api/v3/nats/users
        methods:
          GET: [list]
      - path: /api/v3/nats/accounts/:appName/users
        methods:
          GET: [list]
          POST: [create]
        resourceNameParam: appName
      - path: /api/v3/nats/accounts/:appName/users/:userName
        methods:
          DELETE: [delete]
        resourceNameParam: appName
      - path: /api/v3/nats/accounts/:appName/users/:userName/creds
        methods:
          GET: [get]
        resourceNameParam: appName
      - path: /api/v3/nats/accounts/:appName/mqtt-bearer
        methods:
          POST: [create]
        resourceNameParam: appName
      - path: /api/v3/nats/accounts/:appName/mqtt-bearer/:userName
        methods:
          DELETE: [delete]
        resourceNameParam: appName

  natsAccountRules:
    basePath: /api/v3/nats/account-rules
    routes:
      - path: /api/v3/nats/account-rules
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/nats/account-rules/:ruleName
        methods:
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: ruleName
      - path: /api/v3/nats/account-rules/yaml
        methods:
          POST: [create]
      - path: /api/v3/nats/account-rules/yaml/:ruleName
        methods:
          PATCH: [patch]
        resourceNameParam: ruleName

  natsUserRules:
    basePath: /api/v3/nats/user-rules
    routes:
      - path: /api/v3/nats/user-rules
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/nats/user-rules/:ruleName
        methods:
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: ruleName
      - path: /api/v3/nats/user-rules/yaml
        methods:
          POST: [create]
      - path: /api/v3/nats/user-rules/yaml/:ruleName
        methods:
          PATCH: [patch]
        resourceNameParam: ruleName

  # Services
  services:
    basePath: /api/v3/services
    routes:
      - path: /api/v3/services
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/services/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/services/yaml
        methods:
          POST: [create]
      - path: /api/v3/services/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name

  # Flows
  flows:
    basePath: /api/v3/flow
    routes:
      - path: /api/v3/flow
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/flow/:id
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: id

  # Catalog
  catalog:
    basePath: /api/v3/catalog
    routes:
      - path: /api/v3/catalog/microservices
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/catalog/microservices/:id
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: id
      - path: /api/v3/catalog/microservices/:id/images
        methods:
          GET: [get]
          POST: [create]
          DELETE: [delete]
        resourceNameParam: id

  # Registries
  registries:
    basePath: /api/v3/registries
    routes:
      - path: /api/v3/registries
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/registries/:id
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: id

  # Secrets
  secrets:
    basePath: /api/v3/secrets
    routes:
      - path: /api/v3/secrets
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/secrets/yaml
        methods:
          POST: [create]
      - path: /api/v3/secrets/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/secrets/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name

  # ConfigMaps
  configMaps:
    basePath: /api/v3/configmaps
    routes:
      - path: /api/v3/configmaps
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/configmaps/yaml
        methods:
          POST: [create]
      - path: /api/v3/configmaps/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/configmaps/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name

  # Volume Mounts
  volumeMounts:
    basePath: /api/v3/volumeMounts
    routes:
      - path: /api/v3/volumeMounts
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/volumeMounts/yaml
        methods:
          POST: [create]
      - path: /api/v3/volumeMounts/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/volumeMounts/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name
      - path: /api/v3/volumeMounts/:name/link
        methods:
          GET: [get]
          POST: [patch]
          DELETE: [patch]
        resourceNameParam: name

  # Tunnels
  tunnels:
    basePath: /api/v3/iofog
    routes:
      - path: /api/v3/iofog/:id/tunnel
        methods:
          GET: [get]
          PATCH: [patch]
        resourceNameParam: id

  # Certificates
  certificates:
    basePath: /api/v3/certificates
    routes:
      - path: /api/v3/certificates/ca
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/certificates/ca/:name
        methods:
          GET: [get]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/certificates
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/certificates/expiring
        methods:
          GET: [list]
      - path: /api/v3/certificates/:name
        methods:
          GET: [get]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/certificates/:name/renew
        methods:
          POST: [patch]
        resourceNameParam: name
      - path: /api/v3/certificates/yaml
        methods:
          POST: [create]

  # Edge Resources
  edgeResources:
    basePath: /api/v3/edgeResource
    routes:
      - path: /api/v3/edgeResources
        methods:
          GET: [list]
      - path: /api/v3/edgeResource/:name/:version
        methods:
          GET: [get]
          PUT: [update]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/edgeResource/:name
        methods:
          GET: [get]
        resourceNameParam: name
      - path: /api/v3/edgeResource
        methods:
          POST: [create]
      - path: /api/v3/edgeResource/:name/:version/link
        methods:
          POST: [patch]
          DELETE: [patch]
        resourceNameParam: name

  # Application Templates
  applicationTemplates:
    basePath: /api/v3/applicationTemplate
    routes:
      - path: /api/v3/applicationTemplates
        methods:
          GET: [list]
      - path: /api/v3/applicationTemplate
        methods:
          POST: [create]
      - path: /api/v3/applicationTemplate/yaml
        methods:
          POST: [create]
      - path: /api/v3/applicationTemplate/:name
        methods:
          GET: [get]
          PATCH: [patch]
          PUT: [update]
          DELETE: [delete]
        resourceNameParam: name
      - path: /api/v3/applicationTemplate/yaml/:name
        methods:
          PUT: [update]
        resourceNameParam: name

  # Capabilities
  capabilities:
    basePath: /api/v3/capabilities
    routes:
      - path: /api/v3/capabilities/edgeResources
        methods:
          HEAD: [get]
      - path: /api/v3/capabilities/applicationTemplates
        methods:
          HEAD: [get]
      - path: /api/v3/capabilities/nats
        methods:
          HEAD: [get]

  # Events
  events:
    basePath: /api/v3/events
    routes:
      - path: /api/v3/events
        methods:
          GET: [list]
          DELETE: [delete]

  # Diagnostics
  diagnostics:
    basePath: /api/v3/microservices
    routes:
      - path: /api/v3/microservices/:uuid/image-snapshot
        methods:
          GET: [get]
          POST: [create]
        resourceNameParam: uuid
      - path: /api/v3/microservices/:uuid/strace
        methods:
          GET: [get]
          PATCH: [patch]
          PUT: [update]
        resourceNameParam: uuid

  # Agent endpoints (for agent-to-controller communication)
  agent:
    basePath: /api/v3/agent
    routes:
      - path: /api/v3/agent/provision
        methods:
          POST: [create]
      - path: /api/v3/agent/deprovision
        methods:
          POST: [delete]
      - path: /api/v3/agent/config
        methods:
          GET: [get]
          PATCH: [patch]
      - path: /api/v3/agent/config/gps
        methods:
          PATCH: [patch]
      - path: /api/v3/agent/config/changes
        methods:
          GET: [get]
          PATCH: [patch]
      - path: /api/v3/agent/status
        methods:
          PUT: [update]
      - path: /api/v3/agent/edgeResources
        methods:
          GET: [list]
      - path: /api/v3/agent/volumeMounts
        methods:
          GET: [list]
      - path: /api/v3/agent/microservices
        methods:
          GET: [list]
      - path: /api/v3/agent/microservices/:microserviceUuid
        methods:
          GET: [get]
        resourceNameParam: microserviceUuid
      - path: /api/v3/agent/registries
        methods:
          GET: [list]
      - path: /api/v3/agent/tunnel
        methods:
          GET: [get]
      - path: /api/v3/agent/strace
        methods:
          GET: [get]
          PUT: [update]
      - path: /api/v3/agent/version
        methods:
          GET: [get]
      - path: /api/v3/agent/hal/hw
        methods:
          PUT: [update]
      - path: /api/v3/agent/hal/usb
        methods:
          PUT: [update]
      - path: /api/v3/agent/delete-node
        methods:
          DELETE: [delete]
      - path: /api/v3/agent/image-snapshot
        methods:
          GET: [get]
          PUT: [update]
      - path: /api/v3/agent/cert
        methods:
          GET: [get]
      - path: /api/v3/agent/logs/sessions
        methods:
          GET: [list]
      - path: /api/v3/agent/exec/:microserviceUuid
        methods:
          WS: [get]
        resourceNameParam: microserviceUuid
      - path: /api/v3/agent/logs/microservice/:microserviceUuid/:sessionId
        methods:
          WS: [get]
        resourceNameParam: microserviceUuid
      - path: /api/v3/agent/logs/iofog/:iofogUuid/:sessionId
        methods:
          WS: [get]
        resourceNameParam: iofogUuid

  # User endpoints
  users:
    basePath: /api/v3/user
    routes:
      - path: /api/v3/user/login
        methods:
          POST: []
      - path: /api/v3/user/refresh
        methods:
          POST: []
      - path: /api/v3/user/profile
        methods:
          GET: [get]
      - path: /api/v3/user/logout
        methods:
          POST: []

  # Config management
  config:
    basePath: /api/v3/config
    routes:
      - path: /api/v3/config
        methods:
          GET: [list]
          PUT: [update]
      - path: /api/v3/config/:key
        methods:
          GET: [get]
        resourceNameParam: key

  # Controller status (public, no auth required)
  controller:
    basePath: /api/v3
    routes:
      - path: /api/v3/status
        methods:
          GET: []
      - path: /api/v3/fog-types/
        methods:
          GET: []

  # RBAC management endpoints
  roles:
    basePath: /api/v3/roles
    routes:
      - path: /api/v3/roles
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/roles/yaml
        methods:
          POST: [create]
      - path: /api/v3/roles/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name
      - path: /api/v3/roles/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name

  roleBindings:
    basePath: /api/v3/rolebindings
    routes:
      - path: /api/v3/rolebindings
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/rolebindings/yaml
        methods:
          POST: [create]
      - path: /api/v3/rolebindings/yaml/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name
      - path: /api/v3/rolebindings/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name

  serviceAccounts:
    basePath: /api/v3/serviceaccounts
    routes:
      - path: /api/v3/serviceaccounts
        methods:
          GET: [list]
          POST: [create]
      - path: /api/v3/serviceaccounts/yaml
        methods:
          POST: [create]
      - path: /api/v3/serviceaccounts/yaml/:appName/:name
        methods:
          PATCH: [patch]
        resourceNameParam: name
      - path: /api/v3/serviceaccounts/:appName/:name
        methods:
          GET: [get]
          PATCH: [patch]
          DELETE: [delete]
        resourceNameParam: name
```

### Default system roles

The Controller ships with four predefined roles: **admin**, **sre**, **developer**, and **viewer**. You cannot edit or delete these system roles. 

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: admin
rules:
  - apiGroups:
      - ''
    resources:
      - '*'
    verbs:
      - '*'
```

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: sre
rules:
  - apiGroups:
      - ''
    resources:
      - microservices
      - systemMicroservices
      - fogs
      - applications
      - systemApplications
      - applicationTemplates
      - services
      - router
      - natsAccounts
      - natsUsers
      - natsAccountRules
      - natsUserRules
      - flows
      - catalog
      - registries
      - secrets
      - configMaps
      - volumeMounts
      - tunnels
      - certificates
      - edgeResources
      - capabilities
      - diagnostics
      - serviceAccounts
      - events
      - users
      - config
      - controller
      - execSessions
      - systemExecSessions
      - logs
      - systemLogs
    verbs:
      - '*'
  - apiGroups:
      - ''
    resources:
      - roles
      - roleBindings
      - natsOperator
      - natsHub
    verbs:
      - get
      - list

```

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: developer
rules:
  - apiGroups:
      - ''
    resources:
      - microservices
      - applications
      - applicationTemplates
      - services
      - natsAccounts
      - natsUsers
      - natsAccountRules
      - natsUserRules
      - flows
      - catalog
      - registries
      - secrets
      - configMaps
      - volumeMounts
      - certificates
      - edgeResources
      - capabilities
      - diagnostics
      - serviceAccounts
      - controller
      - execSessions
      - logs
    verbs:
      - get
      - list
      - create
      - update
      - patch
      - delete
  - apiGroups:
      - ''
    resources:
      - fogs
      - router
      - tunnels
      - users
      - config
      - roles
      - roleBindings
      - systemMicroservices
      - systemApplications
      - natsOperator
      - natsHub
    verbs:
      - get
      - list

```

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: viewer
rules:
  - apiGroups:
      - ''
    resources:
      - microservices
      - fogs
      - applications
      - systemMicroservices
      - systemApplications
      - applicationTemplates
      - services
      - router
      - natsOperator
      - natsHub
      - natsAccounts
      - natsUsers
      - natsAccountRules
      - natsUserRules
      - flows
      - catalog
      - registries
      - secrets
      - configMaps
      - volumeMounts
      - certificates
      - edgeResources
      - capabilities
      - diagnostics
      - serviceAccounts
      - config
      - controller
      - roles
      - roleBindings
    verbs:
      - get
      - list

```

## Example

The following example defines a custom Role that grants full access to microservices, applications, agents (fogs), and related resources:

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: role-test
rules:
  - apiGroups: [""]
    resources: ["microservices", "applications", "fogs"]
    verbs: ["get", "list", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["routings", "services", "flows"]
    verbs: ["get", "list", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["registries", "catalog"]
    verbs: ["get", "list", "create", "update", "patch"]
  - apiGroups: [""]
    resources: ["secrets", "configmaps", "volumemounts"]
    verbs: ["get", "list", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["certificates"]
    verbs: ["get", "list", "create", "update", "patch"]
  - apiGroups: [""]
    resources: ["events", "diagnostics"]
    verbs: ["get", "list"]
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/security/roles.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
