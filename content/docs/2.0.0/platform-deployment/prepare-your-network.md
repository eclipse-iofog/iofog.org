# Prepare Your Network

Once we have a set of remote hosts (and/or a Kubernetes cluster) we need to make sure that we have appropriate firewall rules for the ioFog components that we will start deploying on those remote hosts.

The following is an exhaustive list of the ingress firewall rules required for any ioFog Edge Compute Network.

| Component  | Protocol/Port | Description                                             |
| ---------- | ------------- | ------------------------------------------------------- |
| Controller | tcp:51121, 80 | Controller API and ECN Viewer.                          |
| iofogctl   | tcp:22        | SSH access to install ioFog components on remote hosts. |

[Continue To Next Step: Prepare Your Remote Hosts](prepare-your-remote-hosts.html).

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/platform-deployment/kubernetes-prepare-network.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
