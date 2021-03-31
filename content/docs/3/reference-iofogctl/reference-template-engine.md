# Template engine for ioFog YAML Specification

Variables, filter and template "queries" can now be used as values for any field in your deployment YAMLs (And therefore, any value of the JSON body of most PUT/POST/PATCH Controller REST API requests).

Those variables allow you to reference the same document, or any resource preexisting on your Controller, adding a lot of flexibility in your deployments.

The values are interpolated (replaced) when the request is made to Controller. The variable value is a `snapshot` of the referenced value when the request is made. Any subsequent modification of the underlying value will NOT be repercussed.

The engine in the background is [liquidjs](https://liquidjs.com/index.html), to see all the capabilities about filters and tags, see the documentation.

## Quick capabilities overview

- Defining a variable: `{{variable-name}}`
- Using a filter: `{{"agent-name" | findAgent}}`
- Assigning a value: `{% assign agent = "agent-name" | findAgent %}`
- Example: Getting the host value of the agent named `zebra-1`: `{% assign agent = "zebra-1" | findAgent %}{{ agent.host }}`

## ioFog filters and values

### Filters

| Name             | Description                                                   | Usage                                                                           | Returns                                                                          |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| findAgent        | Lookup an existing ioFog Agent, by name                       | "`agent-name`" \| findAgent                                                     | An ioFog Agent, as defined by Controller API                                     |
| findApplication  | Lookup an existing ioFog Application, by name                 | "`app-name`" \| findApplication                                                 | An ioFog Applicaiton, as defined by Controller REST API                          |
| findEdgeResource | Lookup an existing ioFog Edge Resource, by name (and version) | "`resName`" \| findEdgeResource OR "`resName`" \| findEdgeResource: "`version`" | An Edge Resource, or a list of Edge Resources, as defined by Controller REST API |

### Values

- `self`: self is a reserved keyword, it references the current request body.

## Usage example:

```yaml
---
apiVersion: iofog.org/v2
kind: Application # What are we deploying
metadata:
  name: edai-smartbuilding-rules-engine # Application name

# Specifications of the application
spec:
  # List of microservices composing your application
  microservices:
    - name: rulesengine
      agent:
        name: agent-aismall01
        config: {}
      images:
        x86: nodered/node-red:latest
        arm: nodered/node-red:latest
        registry: remote
      config: {}
      container:
        rootHostAccess: false
        volumes: []
        ports:
          - internal: 1881
            external: 1882
        env:
          - key: selfname
            value: '{{ self.name | upcase }}' # setting the application name to the microservice in uppercase
          - key: sharedToken
            value: 'sekrittoken' # setting secret token once
          - key: http_proxy
            value: 'http://myproxy.fr:8080/' # setting corporate proxy once
          - key: https_proxy
            value: '{{ self.microservices | where: "name", "rulesengine" | first | map: "env" | first | where: "key" , "http_proxy" | first | map: "value" | first }}' # get the https proxy from rulesengine ms and env http_proxy
    - name: ms2
      agent:
        name: agent-aismall01
        config: {}
      images:
        x86: XXX/img1
        arm: XXX/img2
        registry: remote
      config: {}
      container:
        rootHostAccess: false
        volumes: []
        ports:
          - internal: 1883
            external: 1884
        env:
          - key: selfname
            value: '{{ self.name | upcase }}' # setting the application name to the microservice in uppercase
          - key: sharedToken
            value: '{{ self.microservices | where: "name", "rulesengine" | first | map: "env" | first | where: "key", "sharedToken" | first | map: "value" | first }}' # get the sharedToken from rulesengine ms and env sharedToken
          - key: http_proxy
            value: '{{ self.microservices | where: "name", "rulesengine" | first | map: "env" | first | where: "key" , "http_proxy" | first | map: "value" | first }}' # get the http proxy from rulesengine ms and env http_proxy
          - key: https_proxy
            value: '{{ self.microservices | where: "name", "rulesengine" | first | map: "env" | first | where: "key" , "http_proxy" | first | map: "value" | first }}' # get the https proxy from rulesengine ms and env http_proxy
          - key: rulesengineHOST
            value: '{%  assign curmsvc= self.microservices | where: "name", "msvc-1" | first %}{{ curmsvc | findAgent: agents | map: "host" }}' # get the host where a microservice is running via agent
          - key: rulesenginePORT
            value: '{{ self.microservices | where: "name", "rulesengine" | first | map: "ports" | first | map: "external" | first }}'
          - key: redisHost # get host and port of a mciroservice
            value: '{% assign redisApp = "redis-app" | findApplication %}{% assign redismsvc = redisApp.microservices | where: "name", "redistest" | first %}{{ redismsvc | findAgent: agents | map: "host"}}:{{ redismsvc | map: "ports" | first | first |map: "external" | first }}'
          - key: edgeResLiveness # Get edge resource endpoint for a specific version
            value: '{{ "com.orange.smart-door" | findEdgeResource: "0.0.1" | map: "interface" | map: "endpoints" | first  | where: "name", "liveness" | first | map: "url" }}'
          - key: edgeResVersion # Get edge resource endpoint
            value: '{{ "com.orange.smart-door" | findEdgeResource            | map: "interface" | map: "endpoints" | first  | where: "name", "version" | first | map: "url" }}'
```

with controller API the same configuration looks like:

```json
{
  "name": "edai-smartbuilding-rules-engine",
  "isSystem": false,
  "description": "Description",
  "isActivated": true,
  "microservices": [
    {
      "name": "rulesengine",
      "config": "string",
      "images": [
        {
          "containerImage": "nodered/node-red:latest",
          "fogTypeId": 1
        },
        {
          "containerImage": "nodered/node-red:latest",
          "fogTypeId": 2
        }
      ],
      "registryId": 1,
      "application": "edai-smartbuilding-rules-engine",
      "iofogUuid": "node-id",
      "rootHostAccess": true,
      "logSize": 0,
      "volumeMappings": [],
      "ports": [
        {
          "internal": 1881,
          "external": 1882
        }
      ],
      "routes": [],
      "env": [
        {
          "key": "selfname",
          "value": "{{ self.name | upcase }}"
        },
        {
          "key": "sharedToken",
          "value": "sekrittoken"
        },
        {
          "key": "http_proxy",
          "value": "http://myproxy:8080/"
        },
        {
          "key": "https_proxy",
          "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
        }
      ],
      "cmd": []
    },
    {
      "name": "ms2",
      "config": "string",
      "images": [
        {
          "containerImage": " XXX/img1",
          "fogTypeId": 1
        },
        {
          "containerImage": " XXX/img2",
          "fogTypeId": 2
        }
      ],
      "registryId": 1,
      "application": "edai-smartbuilding-rules-engine",
      "iofogUuid": "node-id",
      "rootHostAccess": true,
      "logSize": 0,
      "volumeMappings": [],
      "ports": [
        {
          "internal": 1883,
          "external": 1884
        }
      ],
      "routes": [],
      "env": [
        {
          "key": "selfname",
          "value": "{{ self.name | upcase }}"
        },
        {
          "key": "sharedToken",
          "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\", \"sharedToken\" | first | map: \"value\" | first }}"
        },
        {
          "key": "http_proxy",
          "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
        },
        {
          "key": "https_proxy",
          "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"env\" | first | where: \"key\" , \"http_proxy\" | first | map: \"value\" | first }}"
        },
        {
          "key": "rulesengineHOST",
          "value": "{%  assign curmsvc= self.microservices | where: \"name\", \"msvc-1\" | first %}{{ curmsvc | findAgent: agents | map: \"host\" }}"
        },
        {
          "key": "rulesenginePORT",
          "value": "{{ self.microservices | where: \"name\", \"rulesengine\" | first | map: \"ports\" | first | map: \"external\" | first }}"
        },
        {
          "key": "redisHost",
          "value": "{% assign redisApp = \"redis-app\" | findApplication %}{% assign redismsvc = redisApp.microservices | where: \"name\", \"redistest\" | first %}{{ redismsvc | findAgent: agents | map: \"host\"}}:{{ redismsvc | map: \"ports\" | first | first |map: \"external\" | first }}"
        },
        {
          "key": "edgeResLiveness",
          "value": "{{ \"com.orange.smart-door\" | findEdgeResource: \"0.0.1\" | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"liveness\" | first | map: \"url\" }}"
        },
        {
          "key": "edgeResVersion",
          "value": "{{ \"com.orange.smart-door\" | findEdgeResource            | map: \"interface\" | map: \"endpoints\" | first  | where: \"name\", \"version\" | first | map: \"url\" }}"
        }
      ],
      "cmd": []
    }
  ]
}
```

## Caveats

- Variables defined in an Application Template will only be evaluated when the template is used to deploy an actual Application
- The algoritmic operator of `liquidjs` or variable assignment have the scope on the processing string.

```yaml
---
....
          - key: testaffect
            value: "{% assign ms =self.microservices | where: \"name\", \"rulesengine\" | first %}{{ ms.env | where: \"key\" , \"http_proxy\" | first }}"
....
```

- Make sure to define the template parametric expressions as `string`, otherwise the YAML parser will interpret them as Object, and you will encounter multiple type of errors

Incorrect:

```yaml
---
name: { { my-variable } } # This will error, as name are expected to be strings, and the yaml parser will interpret this as an object
```

Correct:

```yaml
---
name: '{{my-variable}}' # This will behave as expected
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/reference-iofogctl/reference-template-engine.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
