# Public services

Public services allow your microservices to securely expose public endpoints without opening ports on your Agents.

When deploying Applications and Microservices, you can specify a `public` configuration when configuring the port mappings of your container.

If `public` is specified, this will open a tunnel that will forward all traffic incoming onto the port exposed by the container.

`schemes` allows you to specify the protocols supported by the underlying exposed Microservice. Controller will generate a public URL for each protocol supported.
The example below would be for a Microservice exposing a HTTPS server.

`protocol` lets you decide between `http` and `tcp`. It tells the public port which type of traffic to forward. the default value is `http`. `http` protocol will only work if the schemes are `http` and/or `https`.

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
     public:
      schemes:
      - https
      protocol: http
...
```

Deploying such a configuration would result in a port being opened on the Controller host, and all incoming tcp traffic would be tunneled to agent-1, port 5000.

The public address can be retrieved using:

```bash
iofogctl describe microservice msvc-1
```

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
     public:
      schemes:
      - https
      links:
      - https://<controller-ip>:<port>
      protocol: http
...
```

The public port is selected by Controller from it's configured public port range (default from `6000-7000`).
The range can be configured by updating Controller env variable `PublicPorts_Range`

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/applications/microservice-exposing.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
