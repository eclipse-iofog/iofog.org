# Writing Microservices

Microservices are a specialization of a [service-oriented architecture (SOA)](https://wikipedia.org/wiki/Service-oriented_architecture), flexible, independently deployable software.

Microservices are an architectural style that structures an application as a collection of loosely coupled services, which implement business capabilities. The microservice architecture enables the continuous delivery and deployment of large, complex applications by naturally dividing it into smaller pieces. This is in contrast to the more traditional approach of a monolithic architecture.

Popularized by companies like Amazon, Netflix, and Twitter, the philosophy has now become mainstream and adopted by countless organizations.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> A word on monoliths</h3>
  <p>Not every project need to adhere to a strict no-monolith policy. In fact, monoliths are still popular for good reason!</p>
  <p>So while you're encouraged to build and deploy these services as interchangeable pieces that together achieve your goals—true microservices—you absolutely are welcome to instead build a single monolithic service that contains all of your necessary business logic, if that better aligns to your needs or preferences.</p>
</aside>

## Microservices on ioFog

Microservices on ioFog run inside a Docker container, following the [same best practices](https://docs.docker.com/develop/dev-best-practices/).

Your microservices can do anything a Docker container can do, from interacting with the physical hardware to hosting a web server. That means most off-the-shelf frameworks and libraries in your favorite language work too!

But because most Edge Compute Networks contain multiple, sometimes even hundreds or thousands, of nodes running in a distributed fashion, ioFog provides an SDK library you can use to ease the burden of communicating between them. The SDK also provides the ability to receive dynamic configuration in your microservice so you don't have to bake them into your containers.

[View Available SDKs](sdk.html)

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Want to run through a tutorial?</h3>
  <p>If you'd like to learn more about creating and managing microservices on ioFog, <a href="../tutorial/introduction.html">check out our Tutorial</a></p>
</aside>

## Dynamic Configuration

Using [the SDK](sdk.html) microservices can receive any arbitrary custom configuration JSON remotely, from the Controller. This allows you to change configuration of your microservices at runtime through the Controller, but also prevents you from needing to bake secrets and other keys into your microservice.

Updating a microservice's configuration can then be done using `iofogctl`:

```yaml
# Get the microservice's YAML description file if you don't have it yet:
# $ iofogctl describe microservice MICROSERVICE_NAME -o my-microservice.yaml

# Edit the YAML file
apiVersion: iofog.org/v2
kind: Microservice
metadata:
  name: my-microservice
spec:
  agent: ...
  application: my-application
  config:
    myCustomValue: true
    someSecretKey: private-value
  ports: []
```

Then you can redeploy your microservice to update its yaml configuration file:

```console
$ iofogctl deploy -f my-microservice.yaml
```

## Packaging and Publishing

Microservices on ioFog are packaged as Linux container images, usually using Docker.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Ready for more?</h3>
  <p>If you're new to containers and Docker, you'll want to check out their official <a href="https://docs.docker.com/get-started/">Getting Started guide</a> which walks you through the different pieces of putting together a Docker container image.</p>
</aside>

The high-level process of creating a new microservice is:

- Create a project directory
- Create a `Dockerfile` with your desired configuration
- Write the microservice app code itself
- Build the image with [`docker build`](https://docs.docker.com/engine/reference/commandline/build/)
- Deploy your image to a Docker registry (e.g. Docker Hub or from the ioFog local cache)
- (Optional) Add the registered image to your Controller's catalog
- Deploy the microservice using iofogctl

It is detailed in our [tutorial](../tutorial/introduction.html)

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/developing-microservices/overview.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
