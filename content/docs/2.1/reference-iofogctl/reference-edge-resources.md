# Edge Resources YAML Specification

`iofogctl` allows users to manage a Controller's list of Edge Resources. To learn more about Edge Resources, please see [here](../agent-management/edge-resources.html).

The Edge Resource is defined as follow:

```yaml
apiVersion: iofog.org/v2
kind: EdgeResource
metadata:
  name: smart-door
  namespace: default
spec:
  name: smart-door
  version: v1.0.0
  description: Very smart door
  interfaceProtocol: https
  interface:
    endpoints:
      - name: open
        method: PUT
        url: /open
      - name: close
        method: PUT
        url: /close
      - name: destroy
        method: DELETE
        url: /endOfTheWorld
  display:
    name: Smart Door
    icon: accessible-forward
    color: rgb(90, 200, 250)
  custom: {}
```

| Field             | Description                                                                                                                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name              | User defined name                                                                                                                                                     |
| version           | User defined version                                                                                                                                                  |
| description       | Human readable description of the Edge Resource                                                                                                                       |
| interfaceProtocol | Protocol the microservices must use to communicate with the resource. It also determines the schema of the `interface` key. Currently, one of: `http, https, ws, wss` |
| interface         | Specification of the available communication interface                                                                                                                |
| display           | Informations about how to display the attached Edge Resource in the ECN-Viewer                                                                                        |
| display.name      | Display label                                                                                                                                                         |
| display.icon      | Name of the [material icon](https://material.io/resources/icons/?style=baseline) to be used on the map (optionnal)                                                    |
| display.color     | Display color, rgb, rgba, and hex format supported                                                                                                                    |
| custom            | Free object containing anything else the microservice might need to know about the resource.                                                                          |

# HTTP, HTTPS, WS and WSS Interface specification

| Field                            | Description                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| endpoints                        | Array of endpoint definition                                        |
| endpoints.name                   | name of the endpoint                                                |
| endpoints.description            | description of the endpoint                                         |
| endpoints.method                 | One of `'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'` |
| endpoints.url                    | URL of the endpoint                                                 |
| endpoints.requestType            | mime-type of the request                                            |
| endpoints.responseType           | mime-type of the response                                           |
| endpoints.requestPayloadExample  | stringified request payload example                                 |
| endpoints.responsePayloadExample | stringified response payload example                                |

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/reference-iofogctl/reference-edge-resources.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
