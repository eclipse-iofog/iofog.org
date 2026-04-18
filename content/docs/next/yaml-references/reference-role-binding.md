

# RoleBinding YAML Specification

The `RoleBinding` kind binds a [Role](reference-roles.html) to one or more **subjects** (users or groups). It defines who receives the permissions in the Role. Without a RoleBinding, a Role has no effect.

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

## Fields

| Field | Description |
| ----- | ----------- |
| `metadata.name` | Unique name for the RoleBinding. |
| `roleRef` | Reference to the Role to bind. Required. |
| `roleRef.kind` | Kind of the referenced resource (e.g. `Role`). |
| `roleRef.name` | Name of the Role. |
| `roleRef.apiGroup` | API group of the Role (e.g. `iofog.org/v3`). |
| `subjects` | Array of subjects that receive the Role's permissions. |
| `subjects[].kind` | Either `User` or `Group`. |
| `subjects[].name` | Keycloak username or group (controller client role). |
| `subjects[].apiGroup` | Optional API group. |

Deploy with `iofogctl deploy -f role-binding.yaml`. For Keycloak integration and REST API, see [Security – Role Bindings](../security/role-bindings.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-role-binding.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
