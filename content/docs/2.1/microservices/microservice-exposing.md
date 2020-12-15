# Microservice Public Ports

Public Ports allow your microservices to securely expose public endpoints without opening ports on your Agents.

When deploying Applications and Microservices, you can now specify extra fields (`public`, `host` and `protocol`) when configuring the port mappings of your container.

If `public` is specified, this will open a tunnel that will forward all traffic incoming onto the port exposed by the container.

`host` allows you to specify the Agent that will open the public port, the default value being that the public port is opened alongside your Controller (same host for a Vanilla Controller, as a separate Load Balancer for a K8s deployment).

`protocol` lets you decide between `http` and `tcp`. It tells the public port which type of traffic to forward. the default value is `http`.

```yaml
...
name: msvc-1
agent:
 name: agent-1
container:
 ...
 ports:
   - internal: 80
     external: 5000
     public: 5001
     protocol: tcp
...
```

Deploying such a configuration would result in port 5001 being opened on the Controller host, and all incoming tcp traffic would be tunneled to agent-1, port 5000.

The public address can be retrieved using:

```bash
iofogctl describe microservice msvc-1
```

The outputted YAML will contain a `publicLink` key, with the value set to the URL of the public port.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/microservices/microservice-exposing.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
