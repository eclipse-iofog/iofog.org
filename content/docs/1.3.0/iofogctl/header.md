# Common Header YAML Specification

The most important commands of `iofogctl` consume YAML files as input. A YAML file consists of one or more resources. Every resource contains a header section and a spec section. The header section contains fields common to all resources defined within the spec section.

```yaml
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: buffalo
  namespace: default # Optional, defaults to value specified by iofogctl namespace flag
spec:
...
```

| Field              | Description                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API Version        | ioFog YAML schema version. Currently `iofog.org/v1`                                                                                                                             |
| Kind               | String representing what type of resource we want to deploy. The available values are `ControlPlane`, `Controller`, `Connector`, `Agent`, `AgentConfig`, `Application` and `Microservice`. |
| Metadata           | Object containing metadata about the resource                                                                                                                                              |
| Metadata.Name      | User defined, unique identifier of the resource in its namespace.                                                                                                                            |
| Metadata.Namespace | Optional. Will force iofogctl to work in this specific namespace (If specified, it overwrites the `-n` CLI option)                                                                         |
| Spec               | Object containing the deployment specifications, different for each resource                                                                                                               |
