# Prepare Network

Once we have a set of remote hosts (and/or a Kubernetes cluster) we need to make sure that we have appropriate firewall rules for the ioFog components that we will start deploying on those remote hosts.

The following is an exhaustive list of the ingress firewall rules required for any ioFog Edge Compute Network.

| Component  | Protocol/Port | Description                                                       |
| ---------- | ------------- | ----------------------------------------------------------------- |
| Controller | tcp:51121     | Controller API to be accessible from Agents and iofogctl.         |
| Controller | http:80       | ECN Viewer to be accessible by ECN admins or users.               |
| iofogctl   | tcp:22        | SSH access to install ioFog Controller and Agent on remote hosts. |

Please keep in mind that once we start [exposing microservices using public ports](../microservices/microservice-exposing.html) in our ECNs, there will be additional ports that we expect to be accessible from outside of the network.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Regardless of the type of deployment we need, next we have to <a href=prepare-your-remote-hosts.html>prepare remote hosts</a> for Controller and Agents (in case of remote deployment), or just for Agents (in case of Kubernetes deployment).</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/platform-deployment/kubernetes-prepare-network.html"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
