# Public services

Public services allow your microservices to securely expose public endpoints without opening ports on your Agents.

When deploying Applications and Microservices, you can specify a `proxy` configuration when configuring the port mappings of your container.

If `proxy` is specified and set to `true`, this will open a tunnel that will forward all traffic incoming onto the port exposed by the container.

`protocol` lets you decide between `tcp` and `udp`. It tells the public port which type of traffic to forward. the default value is `tcp`.

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
     proxy: true
...
```

Deploying such a configuration would result in a port being opened on the public host, and all incoming tcp traffic would be tunneled to agent-1, port 5000.

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
     proxy: true
...
```

The public port is selected by Port Broker from public host's configured public port range.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/applications/microservice-exposing.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
