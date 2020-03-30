# Controllers

Since your Edge Compute Network is likely distributed—composed of many different devices across networks, each with potentially differing microservices—a piece of software called the **Controller** is used for orchestration of the different [Agents](content/docs/2.0.0/reference-agent/overview.html).

Because the Controller daemon keeps track of all your Agents, even across complicated network configurations, you can use it to maintain the entire fleet, remotely. Small Edge Compute Networks will only need a single Controller, however, running multiple Controllers is also supported for increased resiliency.

The Controller can run on any compatible hardware that is network accessible by all of your edge nodes running an Agent. Usually that means either having a static IP address or DNS records. A common solution is to run your Controller on a cloud provider like [Amazon Web Services](https://aws.amazon.com/) or [Google Cloud Platform](https://cloud.google.com/), but it's also possible to run the Controller directly on one of your edge nodes or other local hardware.

Once your Edge Compute Network running ioFog is up and running, you'll use your Controller as the primary interface to maintaining your microservices and the nodes they run on.

For full usage details see the [Controller CLI Usage](cli-usage.html) page.

<aside class="notifications note">
  <b>See anything wrong with the document? Help us improve it!</b>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/controllers/overview.md"
    target="_blank">
    <p style="text-align:left">Edit on Github <img src="/images/icos/ico-github.svg" alt=""></p>
  </a>
</aside>
