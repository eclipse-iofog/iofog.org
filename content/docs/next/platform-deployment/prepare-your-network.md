# Prepare Network

Once we have a set of remote hosts (and/or a Kubernetes cluster) we need to make sure that we have appropriate firewall rules for the ioFog components that we will start deploying on those remote hosts.

The following is an exhaustive list of the ingress firewall rules required for any ioFog Edge Compute Network.

| Component  | Protocol/Port | Description                                                       |
| ---------- | ------------- | ----------------------------------------------------------------- |
| Controller | tcp:51121     | Controller API to be accessible from Agents and iofogctl.         |
| Controller | http:80       | ECN Viewer to be accessible by ECN admins or users.               |
| Router | tcp:5671      | Router Messaging Port           |
| Router | tcp:45671       | Router Edge Router Connection Port.               |
| Router | tcp:55671       | Inter Router Connection Port.               |
| *NATs | tcp:4222      | NATs Server Port               |
| NATs | tcp:7422       | NATs Leaf Port              |
| NATs | tcp:6222       | NATs Cluster Port              |
| NATs | tcp:8883       | NATs MQTT Port           |
| *NATs | http:8222       | NATs Monitoring Port               |
| Agent-Controller   | tcp:22        | iofogctl SSH access to install **ioFog** Controller and Agent on remote hosts. |

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Warning</h3>
  <p>By default all Router ports and NATs Cluster, Leaf, MQTT ports are tls protected. NATs Server and Monitoring ports are for internal connections. Therefore it is highly recommended that do not open those ports to the public for Remote Agents and Remote Controllers, for Kubernetes ControlPlane YAML set  `nats-server` service type as Cluster IP, or assign internal IP via annotations even if type is LoadBalancer.</p>
</aside>

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt=""> Where to go from here?</h3>
    <p>Regardless of the type of deployment we need, next we have to <a href="../platform-deployment/prepare-your-remote-hosts.html">prepare remote hosts</a> for Controller and Agents (in case of remote deployment), or just for Agents (in case of Kubernetes deployment).</p>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/prepare-your-network.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
