# Microservice Updates and Lifecycle

## Microservice Updates

We can modify Microservices through the same [Microservice kind](../reference-iofogctl/reference-application.html#microservices) that we deploy them with.

To help us with this, a Microservice YAML spec of a deployed Microservice can be retrieved using the `describe` command:

```bash
iofogctl describe microservice msvc-1 -o /tmp/msvc.yaml
```

With the msvc.yaml file generated for us, we can make changes to the spec and run deploy again to make modifications to the existing Microservice.

```bash
iofogctl deploy -f /tmp/msvc.yaml
```

## Microservice States

Once we deploy a Microservice, the Agent that hosts it will report the Microservice's status back to the Controller.

The Microservice could be in one of various states including starting, pulling, running, or deleting.

We can view this status by running:

```bash
iofogctl get microservices
```

```plain
NAMESPACE
default

MICROSERVICE  STATUS    AGENT     ROUTES    VOLUMES           PORTS
msvc-1        RUNNING   agent-1   route-1   /tmp/msvc:/tmp
msvc-2        DELETING  agent-2             /tmp/iofog:/data  5000:8
```

When we manage a deployed Microservice through commands like `move`, `deploy`, and `delete`, we can expect the Microservice to transition between states.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/microservices/microservice-lifecycle-management.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
