# Prepare Your Network

Once we have a set of remote hosts (and/or a Kubernetes cluster) we need to make sure that we have appropriate firewall rules for the ioFog components that we will start deploying on those remote hosts.

The following is an exhaustive list of the ingress firewall rules required for any ioFog Edge Compute Network.

| Component | Protocol/Port | Description |
|---------------|---------------|-------------|
| Controller | tcp:51121, 80 | Controller API and ECN Viewer. |
| Connector | tcp:8080, 6000-6050 | Connector API and ioMessage ports. |
| iofogctl | tcp:22 | SSH access to install ioFog components on remote hosts. |

[Continue To Next Step: Setup your Control Plane](setup-your-controlplane.html).
