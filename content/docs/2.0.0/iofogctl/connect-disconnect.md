# Connecting To Existing Edge Compute Networks

Instead of deploying our own ECN, we can connect to an existing one.

Note that we must always specify an empty or non-existent namespace when we use the connect command. This is because each cluster should be in its own namespace. Don't forget that not specifying the namespace means iofogctl will use the `default` namespace.

```bash
echo "---
apiVersion: iofog.org/v2
kind: RemoteControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  controllers:
  - name: alpaca-1
    host: 30.40.50.1" > /tmp/remote-controlplane.yaml
```

After editing the email, password, and host fields, we can go ahead and connect.

```bash
iofogctl connect -f /tmp/remote-controlplane.yaml
```

Or for Kubernetes Control Planes, we can use Kube Config to connect. Keep in mind that the `iofogctl --namespace` flag must match the Kubernetes namespace where the Control Plane is deployed, otherwise `iofogctl` will be unable to find the deployment.

```bash
echo "---
apiVersion: iofog.org/v2
kind: KubernetesControlPlane
metadata:
  name: albatros
spec:
  iofogUser:
    email: user@domain.com
    password: h9g84q
  config: ~/.kube/config" > /tmp/k8s-controlplane.yaml
```

After editing the email, password, and kube config fields, we can go ahead and connect.

```bash
iofogctl connect -f /tmp/k8s-controlplane.yaml
```

We can also connect to an ECN without providing a YAML file (and without configuring SSH details automatically).

For Remote Control Planes (i.e. not on Kubernetes) we can run the following command and connect via the Controller endpoint.

```bash
iofogctl connect --ecn-addr 40.50.60.70 --name albatros --email user@domain.com --pass h9g84q
```

For Kubernetes Control Planes we can run the same command but provide the Kubernetes config file instead of a Controller endpoint.

```bash
iofogctl connect --kube ~/.kube/config --email user@domain.com --pass h9g84q
```

After using these commands, we can manually add SSH details where necessary using the `configure` command. The `configure` command lets us configure a single component or a group of components or all components at once. We can also configure which namespace is used as a default namespace.

```bash
iofogctl configure controlplane --kube KUBECONFIG
iofogctl configure controller NAME --user USER --key KEYFILE --port PORTNUM
iofogctl configure agent NAME --user USER --key KEYFILE --port PORTNUM

iofogctl configure default-namespace NAMESPACE

iofogctl configure controllers --user USER --key KEYFILE --port PORTNUM
iofogctl configure agents --user USER --key KEYFILE --port PORTNUM
```

## Disconnect From Edge Compute Network

When we are finished working with the cluster, we can disconnect from it and release the corresponding namespace from `iofogctl`.

```bash
iofogctl disconnect
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/iofogctl/connect-disconnect.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
