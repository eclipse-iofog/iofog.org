# Edge Resources

## Backdrop

The Edge is where the virtual meets the physical. Most if not all Edge applications are built to interact in some way with entities or resources that exist in the physical world. A megatrend of [Digital Twins](https://digitaltransformationtrends.com/2019/09/15/what-are-digital-twins/) has been gaining momentum over the last decade. Nearly all applications that we see at the Edge are interacting with some type of external entity (sensor, camera, 3D printer, fuel pump, etc) either collecting data, or effecting some action, or both.

While on the surface, ioFog Agent has been mainly focused on enabling the execution of containerized applications at the Edge, inherent in its design in the notion of the Hardware Abstraction Layer (HAL). HAL is a uniform way for hardware to be “lifted up” from the host OS into the container layer for easy access to for developer. An obvious example of this is RESTBlue, but we also support Serial and GPIO REST interfaces. The goal of HAL has always been to allow any Edge hardware to be defined/described and lifted into the container layer.

To make ioFog a more fully featured platform we are interested in bringing the physical into the ioFog abstraction model. This document is a lightweight design and discussion around how that can be done.

## How does it work?

Using `iofogctl` (or directly Controller REST API), you can define `Edge Resources` and `attach` those resources to 1..N ioFog Agents.

An Edge resource is meant to be a Digital Twin of a piece of hardware (or software) that is available to your Microservices running on your ioFog Agents.

Microservices can query their ioFog Agent, using the [ioFog SDKs](../developing-microservices/sdk.html) (or directly using the Agent local API) to retrieve the list of Edge Resources currently attached to their ioFog Agent.

## What is an Edge Resource composed of?

Edge Resources are meant to be a definition of the communication interface that your Microservices can use to execute certain actions against the specified resource.

The model has been built to be extensible, but currently only HTTP, HTTPS, WS, and WSS are suported as protocols. We welcome any contributing PR if you would like to improve [ioFog Controller](https://github.com/eclipse-iofog/Controller).

Edge Resources are uniquely identified by a composite of their `name` and their `version`.

## Creating an Edge Resource

We can use `iofogctl` to create our own Edge Resources. The YAML spec reference can be found [here](../reference-iofogctl/reference-edge-resources.html).

```bash
echo "---
apiVersion: iofog.org/v2
kind: EdgeResource
metadata:
  name: smart-door
  namespace: orange
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
      url: /destroy
  display:
    name: Smart Door
    icon: accessible-forward
    color: rgb(90, 200, 250)
" > /tmp/my-edge-resource.yaml
iofogctl deploy -f /tmp/my-edge-resource.yaml
```

## Listing / Describing Edge Resources

We can use `iofogctl` to list our Edge resources

```bash
$> iofogctl get edge-resources

EDGE RESOURCE   PROTOCOL    VERSIONS
smart-door      https       v1.0.0
```

Or, if we need more details:

```bash
$> iofogctl describe edge-resource smart-door v1.0.0

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
  orchestrationTags:
  - smart
  - door
  custom: {}
```

## Attaching / Detaching Edge Resources

We can use `iofogctl` to attach or detach Edge resources from ioFog Agents

```bash
$> iofogctl attach edge-resource smart-door v1.0.0 my-agent-name
✔ Successfully attached EdgeResource smart-door/v1.0.0 to Agent my-agent-name
```

```bash
$> iofogctl detach edge-resource smart-door v1.0.0 my-agent-name
✔ Successfully detached smart-door/v1.0.0
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/agent-management/edge-resources.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
