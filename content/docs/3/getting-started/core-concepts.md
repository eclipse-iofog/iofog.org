# Core Concepts

Imagine a world where you can choose self-contained pieces of code (called microservices) and make them run anywhere you want at the push of a button. Where you can remotely control the code that is running on twenty iPhones in workers' pockets, thirty servers running in a factory building, and ten computers running in the trucks that ship your products. And you can do it all with the same technology. Where you move the processing close to where the data is generated, and where you can finally separate streams of information from the end applications that use them. This world will be brought to life by **Edge Computing** (also known as Fog Computing) with ioFog.

## Edge Computing

Edge computing extends cloud computing to the edge of an enterprise's network to perform computation, storage, and networking services locally. Operated directly on (or near) edge devices instead of relying exclusively on data centers. We call this an **Edge Compute Network** or ECN. This provides resiliency, fault tolerance, security, and low-latency connections between edge devices, providing the scaling properties necessary for large deployments, such as with Internet of Things (IoT).

The term Edge Computing is sometimes known as Fog Computing or simply fogging. Cisco Systems, ARM Holdings, Dell, Intel, Microsoft, and Princeton University, founded the [OpenFog Consortium](https://www.openfogconsortium.org/), to promote interests and development in fog computing.

## Use Cases of Edge Computing

An example use case for edge computing would be a smart electrical grid. These days electrical grids are dynamic, responding to increased electrical consumption by lowering production when it is not needed. To achieve ideal efficiency, a smart grid would rely on real-time data of both production and consumption of electricity.

Edge computing provides the means to achieve this at such a large scale. Instead of every household meter sending usage data to a centralized data center for processing, the devices would collaborate, performing neighborhood processing and aggregation locally, sending only results to the cloud.

Consumer IoT devices similarly benefit from edge computing. For example, with the evolution of autonomous cars and V2V (Vehicle-to-vehicle) devices. Edge computing will allow these vehicles to communicate instantaneously on roads and crossing busy intersections with the promise of safer and faster transportation.

The manufacturing and industrial sectors also take advantage of edge computing, sometimes dubbed the IIoT (Industrial Internet of Things).

## Microservices

Microservices are a specialization of a [service-oriented architecture (SOA)](https://wikipedia.org/wiki/Service-oriented_architecture), flexible, independently deployable software.

Microservices are an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery and deployment of large, complex applications by naturally dividing it into smaller pieces. This is in contrast to the more traditional approach of a monolithic architecture.

Popularized by companies like Amazon, Netflix, and Twitter, the philosophy has now become mainstream and adopted by countless organizations.

## Introducing ioFog

ioFog is an edge computing platform for deploying, running, and networking distributed microservices at the edge.

ioFog aims to make developing edge software just like developing for the cloud. Distributed Internet of Things (IoT) applications let you put your code at the edge, bring legacy devices into the IoT, and keep data anywhere you want.

An Edge Compute Network (ECN) running ioFog is made up of one or more devices, referred to as **nodes**. Each node runs a daemon service called an **Agent**. Each node's Agent is a daemon that is responsible for one or more **microservices** running on that particular node. These microservices are deployed using Linux kernel containers (LXC). Most people use Docker, for its ease, stability, and vibrant community.

Since your Edge Compute Network is likely distributed—composed of many different devices across networks, each with potentially differing microservices—a piece of software called the **Controller** is used for orchestration of the different Agents.

Because the Controller daemon keeps track of all your Agents automatically, even across complicated network configurations, you can use it to maintain the entire fleet. Small Edge Compute Networks will only need a single Controller, which can be run on any device, including one that also happens to run the Agent too, as long as it has a stable hostname or static IP address and is reachable by all the Agents.

If your microservices need to communicate with other nodes in your network, ioFog includes an optional daemon called the **Skupper AMQP Dispatch routers**.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Ready for more?</h3>
  <p>If you want to know more about all the ioFog components and learn how ioFog Edge Compute Network work, head to <a href="architecture.html">Architecture overview</a>.</p>
  <p>If instead you want to get started right away, you can check out the <a href="quick-start-local.html">Quick Start guide</a> to deploy ioFog locally on your computer, or go through production deployment in <a href="../platform-deployment/introduction.html">Remote deployment</a> or <a href="../platform-deployment/kubernetes-prepare-cluster.html">Kubernetes deployment</a>.</p>
  <p>You can also head to our tutorial for developers to <a href="../tutorial/introduction.html">Learn how to use ioFog and build microservices</a></p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/getting-started/core-concepts.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
