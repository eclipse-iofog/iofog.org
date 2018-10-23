---
title: "Microservices Overview"
category: "Writing Microservices"
type: "documentation"
version: "0.1"
---

# Writing Microservices
Microservices are a specialization of a [service-oriented architecture (SOA)](https://wikipedia.org/wiki/Service-oriented_architecture), flexible, independently deployable software.

Microservices are an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery and deployment of large, complex applications by naturally dividing it into smaller pieces. This is in contrast to the more traditional approach of a monolithic architecture.

Popularized by companies like Amazon, Netflix, and Twitter, the philosophy has now become mainstream and adopted by countless organizations.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-node.svg" alt=""> A word on monoliths</h3>
  <p>Not every project need to adhere to a strict no-monolith policy. In fact, monoliths are still popular for good reason!</p>
  <p>So while you're encouraged to build and deploy these services as interchangeable pieces that together achieve your goals—true microservices—you absolutely are welcome to instead build a single monolithic service that contains all of your necessary business logic, if that better aligns to your needs or preferences.</p>
</aside>

## Microservices on ioFog
Microservices on ioFog run inside a Docker container, following the [same best practices](https://docs.docker.com/develop/dev-best-practices/).

Your microservices can do anything a Docker container can do, from interacting with the physical hardware to hosting a web server. That means most off-the-shelf frameworks and libraries in your favorite language work too!

But because most Edge Compute Networks contain multiple, sometimes even hundreds or thousands, of nodes running in a distributed fashion, ioFog provides an SDK library you can use to ease the burden of communicating between them.

[View Available SDKs](sdk)
