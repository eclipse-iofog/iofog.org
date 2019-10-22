# YAML specification header

All yaml documents are structured to be [Kubernetes](https://kubernetes.io/) compliants.

The core structure is always as below:

```yaml
kind: ControlPlane # What resource are we deploying
metadata:
  name: buffalo # resource name
  namespace: default # (Optional) iofogctl namespace to use

# Specifications of the resource
spec: ...
```

| Field              | Description                                                                                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kind               | String representing what type of resource we want to deploy. The available values are `ControlPlane`, `Controller`, `Connector`, `Agent`, `AgentConfig`, `Application` and `Microservice`. |
| Metadata           | Object containing metadata about the resource                                                                                                                                              |
| Metadata.Name      | User defined, unique identifier of the resource in its context.                                                                                                                            |
| Metadata.Namespace | Optional. Will force iofogctl to work in this specific namespace (If specified, it overwrites the `-n` CLI option)                                                                         |
| Spec               | Object containing the deployment specifications, different for each resource                                                                                                               |
