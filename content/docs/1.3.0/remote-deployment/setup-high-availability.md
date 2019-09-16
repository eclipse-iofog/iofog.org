# High Availability

So far we have deployed an Edge Compute Network ('ECN') with a single Controller and a single Connector instance. This is great for development purposes but it won't cut it in production.

In this section we will look at how to deploy a highly available ECN with load balanced Controllers and multiple Connectors.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">In the interests of brevity...</h3>
  <p>In this section, we will use a single command to deploy every component of our ECN. Take note of the differences in the YAML files and the usage of iofogctl.</p>
</aside>

## Highly Available Control Plane

#### State in the Control Plane

In an HA configuration, Controller instances use an external database to house their state. As such, each instance's runtime is stateless as far as failover is concerned. That means we don't mind losing a Controller instance if there are others still running, because each instance can fulfill any request on its own.

So the first step to having a highly available Control Plane is to host a database that the Controller instances can rely on.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt="">Which database should we use?</h3>
  <p>Controller currently only supports Postgres for HA deployments. However, we have made it easy for you to add your own database clients into Controller if you feel like contributing! You can find the code <a href="https://github.com/eclipse-iofog/controller">here</a>.</p>
</aside>

As mentioned earlier, there are two flavours of Controller deployments - Kubernetes and Vanilla. We can achieve high availability with both flavours and the following subsections will show us how.

#### Load Balancing the Control Plane

Because each Controller instance is stateless apart from the data in the external database, you are free to employ any proxy strategy that you wish. This means that both active/passive and active/active models will work. It also means that you can scale out you Controller deployments without much fuss so you don't need to limit your HA Controller instances to two.

#### Kubernetes Controllers

When deploying our Control Plane on Kubernetes, our Controller instances will automatically be deployed with a load balancer. All we need to do is specify our database details and change the replica count of our Kubernetes Controller.

The ecn.yaml file should look something look like this:

```yaml
controlplane:
  database:
    user: admin
    host: 99.230.43.25
    password: hga98023rgdj
    port: 5432
  iofoguser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  controllers:
    - name: Controller-A
      replicas: 3
      kubeconfig: ~/.kube/config

connectors:
  - name: Connector-A
    user: foo
    host: 38.101.23.3
    keyfile: ~/.ssh/id_rsa

agents:
  - name: Agent-A
    user: bar
    host: 77.91.1.37
    keyfile: ~/.ssh/id_rsa
  - name: Agent-B
    user: foo
    host: 77.91.1.38
    keyfile: ~/.ssh/id_rsa
```

And we can use our ecn.yaml like this:

```bash
iofogctl deploy -f ecn.yaml
```

#### Vanilla Controllers

Earlier in this guide we mentioned there are two flavours of Controllers - Kubernetes and vanilla. A vanilla Controller simply runs on a remote host (rather than as a container in a Kubernete cluster).

With a vanilla Controller we need to provide our own external load balancer in front of our Controller instances. We don't cover how to setup a load balancer in this guide. Controller's default port is 51121, so make sure your load balancer is configured appropritely.

The ecn.yaml file for a highly available set of vanilla Controller looks very similar to what we have seen before. Note the additional load balancer field which should specify the load balanced endpoint.

```yaml
controlplane:
  loadbalancer:
    host: 77.23.44.9
  database:
    user: admin
    host: 99.230.43.25
    password: hga98023rgdj
    port: 5432
  iofoguser:
    name: Foo
    surname: Bar
    email: user@domain.com
    password: iht234g9afhe
  controllers:
    - name: alpaca-1
      user: foo
      host: 44.171.23.3
      keyfile: ~/.ssh/id_rsa
    - name: alpaca-2
      user: foo
      host: 44.171.23.4
      keyfile: ~/.ssh/id_rsa

connectors:
  - name: meerkat
    user: foo
    host: 38.101.23.3
    keyfile: ~/.ssh/id_rsa

agents:
  - name: zebra-1
    user: bar
    host: 77.91.1.37
    keyfile: ~/.ssh/id_rsa
  - name: zebra-2
    user: foo
    host: 77.91.1.38
    keyfile: ~/.ssh/id_rsa
```

Which we can, ofcourse, run like so:

```bash
iofogctl deploy -f ecn.yaml
```
