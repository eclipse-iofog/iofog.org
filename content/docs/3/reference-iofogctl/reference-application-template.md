# Application Template YAML Specification

In order to simplify the management and deployment of distributed applications, `iofogctl` provides the `ApplicationTemplate` kind.

Application Templates allow users to specify an Application once and deploy it many times with different variables. Application Templates do this by allowing users to create Template Variables which can be modified every time an Application is deployed.

To deploy Applications from a Template, first an Application Template must be deployed through `iofogctl deploy -f template.yaml`. An Application Template YAML spec contains an Application spec with Templated Variables.

```yaml
apiVersion: iofog.org/v2
kind: ApplicationTemplate
metadata:
  name: my-template
spec:
    name: my-template
    description: My app template
    variables:
    - key: agent-name # Templated variable pertaining to value in spec.application.microservices[0].agent.name below
      description: Name of Agent to deploy Microservices to
      defaultValue: zebra-1
    application: # Typical Application kind spec (fields omitted for simplicity)
      routes:
      ...
      microservices:
      - name: heart-rate-viewer
        agent:
          name: "{{agent-name}}" # Templated Variable (quotation marks are required)
        ...
      ...
```

| Field                  | Description                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| name                   | User-defined unique identifier of an Application Template. Must start and end with lowercase alphanumeric character. Can include '-' character. |
| description            | Additional detail of the Application Template that user wishes to specify.                                                                      |
| variables              | List of Template Variables to be expected in spec.application.                                                                                  |
| variables.defaultValue | Value the Templated Variable should take if an Application is deployed without providing a value.                                               |
| variables.description  | Additional detail of the Template Variable that user wishes to specify.                                                                         |

## Templated Application YAML Specification

Once an Application Template has been created, the following Application YAML can be used to deploy an Application from the Template with the requisite variables specified:

```yaml
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: my-app
spec:
  template:
    name: my-template
    variables:
      - key: agent-name
        value: zebra-2
```

| Field                | Description                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------- |
| metadata.name        | Name of the Application.                                                                 |
| spec.name            | Name of the Application Template used to create the Application.                         |
| spec.variables       | List of Template Variables to be expected in spec.application.                           |
| spec.variables.key   | Name of the Templated Variable expected in Application spec of the Application Template. |
| spec.variables.value | Value the Templated Variable should take for this Application deployment.                |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/reference-iofogctl/reference-application.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
