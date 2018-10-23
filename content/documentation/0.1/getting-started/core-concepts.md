---
title: "Core Concepts"
category: "Getting Started"
type: "documentation"
version: "0.1"
---

# Core Concepts
Imagine a world where you can choose self-contained pieces of code (called microservices) and make them run anywhere you want at the push of a button. Where you can remotely control the code that is running on twenty iPhones in workers' pockets, thirty servers running in a factory building, and ten computers running in the trucks that ship your products. And you can do it all with the same technology. Where you move the processing close to where the data is happening, and where you can finally separate streams of information from the end applications that use them. This world will be brought to life by ioFog.

## Fog Computing
Fog computing extends cloud computing to the edge of an enterprise's network—which we call an Edge Compute Network or ECN—performing computation, storage, and other networking services locally, directly on (or near) edge devices, instead of relying exclusively on data centers. This provides resiliency, fault tolerance, and low-latency connections between edge devices, providing the scaling properties necessary for large deployments, such as with Internet of Things (IoT).

The term Fog Computing, coined by Professor Salvatore J. Stolfo, is sometimes known as Edge Computing or simply fogging. Cisco Systems, ARM Holdings, Dell, Intel, Microsoft, and Princeton University, founded the [OpenFog Consortium](https://www.openfogconsortium.org/), to promote interests and development in fog computing.

## Use Cases of Fog Computing
An example use case for fog computing would be a smart electrical grid. These days electrical grids are dynamic, responding to increased electrical consumption by lowering production when it is not needed. To achieve ideal efficiency, a smart grid would rely on real-time data of both production and consumption of electricity.

Fog computing provides the means to achieve this at such a large scale. Instead of every household meter sending usage data to a centralized data center for processing, the devices would collaborate, performing neighborhood processing and aggregation locally, sending the results to the cloud.

Consumer IoT devices similarly benefit from fog computing. For example, with the evolution of autonomous cars and V2V (Vehicle-to-vehicle) devices. Fog computing will allow these vehicles to communicate instantaneously on roads and crossing busy intersections with the promise of safer and faster transportation.

The manufacturing and industrial sectors also take advantage of fog computing, sometimes dubbed the IIoT (Industrial Internet of Things).

## Microservices
Microservices are a specialization of a [service-oriented architecture (SOA)](https://wikipedia.org/wiki/Service-oriented_architecture), flexible, independently deployable software.

Microservices are an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery and deployment of large, complex applications by naturally dividing it into smaller pieces. This is in contrast to the more traditional approach of a monolithic architecture.

Popularized by companies like Amazon, Netflix, and Twitter, the philosophy has now become mainstream and adopted by countless organizations.

## Introducing ioFog
ioFog is a fog computing platform for deploying, running, and networking distributed microservices near the edge.

ioFog aims to make developing IoT edge software operate like developing for the cloud. Distributed Internet of Things (IoT) applications let you put your code at the edge, bring legacy devices into the IoT, and keep data anywhere you want.

Some of the goals of ioFog include:

- Never go down
- Respond immediately to the Controller
- Operate flawlessly when offline
- Report status frequently and reliably
- Execute instructions with no understanding of the bigger picture
- Provide a high-performance message bus and local API
- Enforce the configured resource consumption constraints strictly
- Allow the most flexible and powerful processing element model possible
- Be able to instantiate processing elements from any available source
- Be able to communicate with any reachable fog controller
- Allow processing elements to implement security and connectivity as they would natively
- Ensure that complying with the local API is the only requirement placed on a processing element
- Only shutdown or restart processing elements when requested or when absolutely necessary
- Run only processing elements with verified source and integrity
- Never allow a message to reach unauthorized processing elements
- Only allow messages of the proper registered type to reach processing elements
- Guarantee message source and order

## Brief Architecture Overview
An Edge Compute Network (ECN) running ioFog is made up of one or more devices, referred to as **nodes**. Each node runs a daemon service called an **Agent**. Each node's Agent handles the starting, stopping, and management of the one or more **microservices** running on that particular node. These microservices are deployed using Docker containers.

Since your Edge Compute Network is likely distributed—composed of many different devices across networks, each with potentially differing microservices—another piece of software called the **Controller** is used for orchestration of the different Agents.

Because the Controller daemon keeps track of all your Agents automatically, even across complicated network configurations, you can use it to maintain the entire fleet. Small Edge Compute Networks will only need a single Controller, which can be run on any device, including one that also happens to run the Agent too, as long as it has a stable hostname or static IP address and is reachable by all the Agents.

If your microservices need to communicate with other nodes in your network, ioFog includes an optional daemon called the **Connector**. The Connector assists in providing automatic discovery and NAT traversal, brokering direct peer-to-peer (P2P) communication when possible.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-node.svg" alt=""> Ready for more?</h3>
  <p>If you're ready to get started you can begin <a href="setup-your-agents">Setting Up Your Agents</a> or check out the <a href="quick-start">Quick Start guide</a></p>
  <p>You can also dive deeper into <a href="agents-overview">Agents</a>, <a href="controllers-overview">Controllers</a>, <a href="connectors-overview">Connectors</a>, or go even more low-level and learn <a href="architecture">how ioFog works</a> under the hood.</p>
</aside>