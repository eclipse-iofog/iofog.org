<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Do you know the core concepts of ioFog?</h3>
  <p>If you haven't done so, you should first go and read <a href="core-concepts.html">Core Concepts</a> in order to understand what ioFog is and what is its purpose.</p>
</aside>

# Architecture

The ioFog architecture consists of several basic building blocks. We are going to introduce all of these one by one and show what capabilities they bring into the system, and how they are commonly deployed. Instances of these ioFog components form a logical component called Edge Compute Network (ECN). We will gradually build up the definition of ioFog ECN from a bare bone ECN to a more robust, even heterogeneous ECN.

If you are interested in deeper dive into any of these components, and figuring out how to use them, there are links to documentation and their repositories in all the relevant sections.

## Controller

The ioFog Controller is the heart of each Edge Compute Network. The Controller orchestrates all Agents, Microservices, Routers, users, and much more.

Controller can run on any compatible hardware that is network accessible by all of your edge nodes running an Agent. Usually that means either having a static IP address or DNS records. A common solution is to run your Controller on a cloud provider like [Amazon Web Services](https://aws.amazon.com/) or [Google Cloud Platform](https://cloud.google.com/), but it's also possible to run the Controller directly on one of your edge nodes or other local hardware, both as a native daemon or containerized.

It is also possible to have a Controller hidden behind HTTP Ingress service, since the Controller is fully functional using its REST API only.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about ioFog Controller?</h3>
  <p>If you want to learn advanced features, how to configure the Controller or how to directly use it, go to <a href="../reference-controller/overview.html">Controller reference documentation</a>.</p>
  <p>To deploy and use the Controller via iofogctl, go to <a href="../platform-deployment/introduction.html">platform deployment documentation</a>.</p>
  <p>Feel free to also explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/Controller">eclipse-iofog/Controller github repository</a>.</p>
</aside>

## Agent

The ioFog Agent is the worker ant of an Edge Compute Network. Each Agents allows for running microservices, mounting volumes, managing resources, etc. An ioFog Agent reports directly the a Controller, hence why the Controller has to be accessible from the outside, but not the other way.

Each Agent manages microservice as Docker containers and is responsible for managing their lifespan and managing Docker images of these containers.

Agents would be typically deployed on the edge as native daemons. Multiple architectures and platforms are supported to ioFog Agents, with the possibility of the ioFog community implementing their own agents according to the Controller to Agent REST API.

While the Agent daemon itself has a CLI, after setting things up a majority of your management tasks will instead be done indirectly using the [Controller](#controller), which controls the Agent on your behalf, remotely. This allows you to deploy and maintain microservices without needing to SSH directly onto every edge node device. In fact, you will never need to SSH into your agents yourself.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about ioFog Agent?</h3>
  <p>If you want to learn advanced features, how to configure the Agent or how to directly use it, go to <a href="../reference-agent/overview.html">Agent reference documentation</a>.</p>
  <p>To deploy and use the Agent via iofogctl, go to <a href="../agent-management/introduction.html">Agent management documentation</a>.</p>
  <p>Feel free to also explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/Agent">eclipse-iofog/Agent github repository</a>.</p>
</aside>

## Microservices

The last absolutely essential components in edge computing are microservices. They are essentially small applications running as Docker containers on ioFog Agents. Many of these microservices can run on a single Agent. This is very similar to how you would run microservices in Kubernetes, except in ioFog you have a very granular control of microservice deployment to selected Agents.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about microservices?</h3>
  <p>If you want to know more about managing microservices in ioFog, head to <a href="../microservices/applications.html">Microservice management</a>.</p>
  <p>You can also head to our tutorial for developers to <a href="../tutorial/introduction.html">Learn how to use ioFog and build microservices</a></p>
</aside>

## Edge Compute Network - Bare Bones

We are now able to have a very basic version of ioFog ECN. All we need is to deploy a Controller and an Agent, where the Agent must be able to access the Controller.

<figure>
  <img src="/images/docs/iofog-architecture-ecn.png" alt="">
  <figcaption>Simple Edge Compute Network (ECN) deployed with one Controller and Agent.</figcaption>
</figure>

In this simple ECN, we have one self hosted ioFog Controller, and one ioFog Agent deployed on an edge device. The Agent is running two microservices. These microservices are exported to their end users using the Agent, and therefore in this scenario, the Agent has to be accessible to the end users.

A simple ECN like this would not be very useful, so now we are going to introduce additional components that allows us to enable microservice communication between each other and better exposure of these microservices without direct access to the Agent.

## Router

The ioFog Router is an essential component that enables microservices to communicate with each other (sending ioMessages) and public port tunneling to these microservices.

Each Controller and each Agent would have their own Router instance by default. Controller would have what is called an Interior Dispatch Router and each Agent would have their own instance of Edge Dispatch Router. These Edge Routers are by default connected to the Interior Router.

For advanced users, it is possible to configure the topology manually, such as sharing Edge Routers between Agents, or hosting Interior routers on Agents instead of Controller. It is also possible to have a direct Agent communication using these Edge Routers on the same network, or accessible from other Agents. All these advanced features are out of the scope of this document, and most of these will be available in subsequent minor ioFog releases.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about Router?</h3>
  <p>If you want to learn advanced features, how to configure the Router or how to setup custom topologies, go to <a href="../reference-router/overview.html">Router reference documentation</a>.</p>
  <p>Feel free to also explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/router">eclipse-iofog/Router github repository</a>.</p>
</aside>

## Proxy

The Proxy microservice is an internal component on ioFog routing network. Its purpose is to translate HTTP requests to AMQP (communication protocol of Routers) where necessary.

When exposing a microservice, one Proxy will be created on the router, where the service is to be accessed from outside, and another proxy will be created on the router to which a target microservice is connected.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about Proxy?</h3>
  <p>As an internal part of the ioFog stack, proxy is not a separately manageable component. However, feel free to also explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/skupper-proxy">skupper-proxy github repository</a>.</p>
</aside>

## Edge Compute Network - Routers and Exposed Ports

Having introduced the Router and Proxy, we can now extend our ECN from the previous example with microservice communication and microservice public port exposure.

<figure>
  <img src="/images/docs/iofog-architecture-ecn-router.png" alt="">
  <figcaption>Edge Compute Network showing default Router layout and communication pattern between microservices deployed on two different Agents.</figcaption>
</figure>

In this example, we have two Agents, each running one microservice. Each Agent, by default, has its own Edge Router, which is connected to the Interior Router co-hosted with the Controller.

All communication between routers is using AMQP protocol, and where necessary, gets translated to HTTP using the Proxy microservices co-located with their respective routers.

Next, we are going to transition to the Kubernetes world and show how ECNs look when part of them are deployed on Kubernetes.

## Operator

This is the ioFog Operator for Kubernetes, which takes care of managing Kubernetes Custom Resources. In ioFog, we support Custom Resource Definitions for a control plane and for applications.

When deploying ioFog on Kubernetes using iofogctl or Helm, the ioFog Operator would be the first things deployed in the namespace. When a new control plane Custom Resource is then created, ioFog Operator picks up on that and deploys an ECN in the same Kubernetes namespace.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about ioFog Operator?</h3>
   <p>As an internal part of the ioFog stack, the Operator is not a separately manageable component. However, feel free to explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/iofog-operator">eclipse-iofog/iofog-operator github repository</a>.</p>
</aside>

## Kubelet

The ioFog Kubelet is a Virtual Kubelet that provides a bridge between ioFog Agent management and kubernetes nodes. Only once instance of Kubelet is needed to service all ioFog Agents.

In the current ioFog architecture, not much functionality is provided by the Kubelet, but it does expose ioFog Agent to Kubernetes for view-only purposes.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about ioFog Kubelet?</h3>
   <p>As an internal part of the ioFog stack, the Kubelet is not a separately manageable component. However, feel free to explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/iofog-kubelet">eclipse-iofog/iofog-kubelet github repository</a>.</p>
</aside>

## Port Manager

The last major component of ioFog on Kubernetes. The Port Manager is responsible for deploying Proxies on the cluster as necessary for exposing microservices on external public ports. It does so by exposing these ports as a Kubernetes service with a global Load Balancer and opening appropriate ports.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about ioFog Port Manager?</h3>
   <p>As an internal part of the ioFog stack, the Port Manager is not a separately manageable component. However, feel free to explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/port-manager">eclipse-iofog/port-manager github repository</a>.</p>
</aside>

## Edge Compute Network - On Kubernetes

The last example we are going to show is ioFog ECN deployed on Kubernetes. In fact, only the control plane is deployed on Kubernetes, while Agents are still hosted outside of the cluster - on the edge.

Note that there is currently no way in ioFog to schedule microservices on the Kubernetes cluster itself, i.e. the cluster nodes acting as ioFog agents.

<figure>
  <img src="/images/docs/iofog-architecture-k8s.png" alt="">
  <figcaption>Edge Compute Network with the control plane deployed exclusively on Kubernetes.</figcaption>
</figure>

And that should be it for the basic ioFog architecture. There are of course more ways ioFog can be deployed in production environments, however these are power user features and the available options are documented in the rest of the documentation.

## iofogctl

So far we have assumed that control over ioFog is only handled using Controller's REST API and both Controller's and Agent's CLI. In reality, most users will use exclusively `iofogctl`, a multi platform CLI tool designed to manage ECNs and Agent deployments.

Iofogctl works by interacting directly with Controller using REST API, with Agents over SSH, or with Kubernetes clusters using `kubeconfig` access configuration, similarly to how `kubectl` handles connections to Kubernetes clusters.

<figure>
  <img src="/images/docs/iofog-architecture-iofogctl.png" alt="">
  <figcaption>Iofogctl interacts with hosts via SSH or with Kubernetes to install ioFog components, and then directly with Controller to manage ECNs.</figcaption>
</figure>

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Want to know more about iofogctl?</h3>
  You will be working with iofogctl for majority of the documentation. To go through the basic introduction to the tool, see <a href="../iofogctl/introduction.html">basic iofogctl documentation</a>.
  <p>If you want to check detailed reference of all iofogctl features, go to <a href="../reference-iofogctl/reference-kinds.html">iofogctl reference documentation</a>.</p>
  <p>Feel free to also explore and potentially contribute at the <a href="https://github.com/eclipse-iofog/iofogctl">eclipse-iofog/iofogctl github repository</a>.</p>
</aside>

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Where to go from here?</h3>
  <p>If you want to get started right away, you can check out the <a href="quick-start-local.html">Quick Start Locally guide</a> to deploy ioFog locally on your computer, or the <a href="quick-start-minikube.html">Quick Start With Minikube guide</a>, or go through production deployment in <a href="../platform-deployment/introduction.html">Platform deployment</a> for both remote and Kubernetes deployments.</p>
  <p>You can also head to our tutorial for developers to <a href="../tutorial/introduction.html">Learn how to use ioFog and build microservices</a></p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/getting-started/architecture.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
