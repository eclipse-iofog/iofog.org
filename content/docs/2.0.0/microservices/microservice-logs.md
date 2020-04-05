# Microservice Logs

Debugging distributed applications can be tricky. Fortunately, iofogctl makes it easy to find out what each of our microservices are doing.

With the `logs` command, we can use iofogctl to inspect the output of each microservice's container:

```bash
iofogctl logs microservice NAME
```

If we have issues getting logs, its a good idea to check the status of the respective microservice:

```bash
iofogctl get microservices
```

```plain
NAMESPACE
default

MICROSERVICE  STATUS    AGENT     ROUTES    VOLUMES           PORTS
msvc-1        RUNNING   agent-1   route-1   /tmp/msvc:/tmp
msvc-2        DELETING  agent-2             /tmp/iofog:/data  5000:80
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/microservices/microservice-logs.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
