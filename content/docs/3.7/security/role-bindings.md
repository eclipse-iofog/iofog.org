

# Role Bindings

A **Role Binding** links a [Role](roles.html) to one or more **subjects** (users or groups). It defines *who* gets the permissions defined in the Role. Without a Role Binding, a Role has no effect.

For the YAML spec and a short example, see [RoleBinding YAML Specification](../yaml-references/reference-role-binding.html).

## Role Binding structure

| Field | Description |
| ----- | ----------- |
| `name` | Unique name for the Role Binding. |
| `apiVersion` | API version (e.g. `iofog.org/v3`). |
| `kind` | Must be `RoleBinding`. |
| `roleRef` | Reference to the Role to bind. Required. |
| `subjects` | Array of subjects (users or groups) that receive the Role's permissions. Required. |

## roleRef

`roleRef` identifies the Role that this binding grants:

| Field | Required | Description |
| ----- | -------- | ----------- |
| `kind` | Yes | Kind of the referenced resource (e.g. `Role`). |
| `name` | Yes | Name of the Role. |
| `apiGroup` | No | API group of the Role. |

## subjects

Each subject in `subjects` identifies a user or group that receives the Role's permissions:

| Field | Required | Description |
| ----- | -------- | ----------- |
| `kind` | Yes | Either `User` or `Group`. |
| `name` | Yes | Name of the user (Keycloak username) or group (Keycloak `controller` oidc client role). |
| `apiGroup` | No | API group; can be omitted for core subjects. |

## Example

```yaml
apiVersion: iofog.org/v3
kind: RoleBinding
metadata:
  name: developers-binding
roleRef:
  kind: Role
  name: developer-role
  apiGroup: iofog.org/v3
subjects:
  - kind: User
    name: alice
  - kind: Group
    name: developers
```

This binding grants the Role `developer-role` to the user `alice` and to all members of the group `developers`.


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/security/role-bindings.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
