# Application template YAML Specification

`iofogctl` allows users to manage a Controller's list of Application templates. To learn more about catalog items, please see [microservice catalog documentation](../applications/microservice-registry-catalog.html).

The catalog item has a very simple definition

```yaml
apiVersion: iofog.org/v2
kind: CatalogItem
metadata:
  name: my-multiplatform-microservice
spec:
  id: 0
  description: Alpine Linux
  x86: amd64/alpine:latest
  arm: arm32v6/alpine:latest
  registry: remote
  configExample: '{"key": "value"}'
```

| Field         | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| id            | Assigned by Controller, read only                                              |
| description   | Human readable description of the Catalog Item                                 |
| x86           | x86 Docker image                                                               |
| arm           | arm32 Docker image                                                             |
| registry      | Registry to use to fetch Docker images, options: {local, remote, registryID}   |
| configExample | Json object with key-value pairs indicating example microservice configuration |

Note that the `configExample` field is a yaml map specifying the key value pairs, but it is internally stored a stringified JSON object of these values, similarly to how configuration is sent to microservices.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/reference-iofogctl/reference-catalog.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
