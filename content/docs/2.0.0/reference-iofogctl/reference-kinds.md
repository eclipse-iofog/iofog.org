# Kinds of Resources

# Common Header YAML Specification

The most important commands of `iofogctl` consume YAML files as input. A YAML file consists of one or more resources. Every resource contains a header section and a spec section. The header section contains fields common to all resources defined within the spec section.

```yaml
apiVersion: iofog.org/v2
kind: RemoteControlPlane
metadata:
  name: buffalo
  namespace: default # Optional, defaults to value specified by iofogctl namespace flag
spec:
```

| Field              | Description                                                                                                                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| apiVersion         | ioFog YAML schema version. Currently `iofog.org/v2`                                                                                                                                     |
| kind               | String representing what type of resource we want to deploy. The available values are `ControlPlane`, `Controller`, `Agent`, `AgentConfig`, `Application`, `Microservice` and `Volume`. |
| metadata           | Object containing metadata about the resource                                                                                                                                           |
| metadata.name      | User defined, unique identifier of the resource in its namespace.                                                                                                                       |
| metadata.namespace | Optional. Will force iofogctl to work in this specific namespace (If specified, it overwrites the `-n` CLI option)                                                                      |
| spec               | Object containing the deployment specifications, different for each resource                                                                                                            |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/reference-iofogctl/reference-kinds.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
