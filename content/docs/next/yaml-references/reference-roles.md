

# Role YAML Specification

The `Role` kind defines **fine-grained RBAC permissions** for the Controller REST API. Each rule specifies allowed **verbs** (e.g. `get`, `list`, `create`, `update`, `delete`) on **resources** (e.g. `microservices`, `applications`, `fogs`) and optional **resourceNames**. Roles are granted to users or groups via [RoleBinding](reference-role-binding.html).

## Example

```yaml
apiVersion: iofog.org/v3
kind: Role
metadata:
  name: developer-role
rules:
  - apiGroups: [""]
    resources: ["microservices", "applications", "fogs"]
    verbs: ["get", "list", "create", "update", "patch", "delete"]
  - apiGroups: [""]
    resources: ["services", "flows", "registries", "catalog"]
    verbs: ["get", "list", "create", "update", "patch", "delete"]
```

## Fields

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name for the Role. |
| `rules` | Array of RbacRule objects. |
| `rules[].apiGroups` | API groups (use `[""]` for core). |
| `rules[].resources` | Resource types (e.g. `microservices`, `applications`, `fogs`, `natsAccountRules`, `natsUserRules`). |
| `rules[].verbs` | Allowed actions: `get`, `list`, `create`, `update`, `patch`, `delete`. |
| `rules[].resourceNames` | Optional. Restrict the rule to specific resource names. |

Deploy with `iofogctl deploy -f role.yaml`. For the full RBAC resource catalog, default system roles, and REST API, see [Security – Roles](../security/roles.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-roles.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
