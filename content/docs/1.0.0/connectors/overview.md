# Connectors

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Need to setup your Connector?</h3>
  <p>Instructions on how to install the Connector <a href="../getting-started/setup-your-connectors.html">can be found here</a>.</p>
</aside>

If your microservices need to communicate with other nodes in your network, ioFog includes an optional daemon called the **Connector**. The Connector assists in providing automatic discovery and NAT traversal, brokering direct peer-to-peer (P2P) communication when possible.

Similar to the [Controller](../controllers/overview.html), your Connector can run on any compatible hardware that is network accessible by all of your edge nodes running an Agent. Usually that means either having a static IP address or DNS records. A common solution is to run your Connector on a cloud provider like [Amazon Web Services](https://aws.amazon.com/) or [Google Cloud Platform](https://cloud.google.com/), but it's also possible to run the Connector directly on one of your edge nodes or other local hardware.

For full usage details see the [Agent CLI Usage](../agents/cli-usage.html) page.
