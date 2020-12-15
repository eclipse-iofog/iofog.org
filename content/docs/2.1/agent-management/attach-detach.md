# Attach / Detach an Agent

We can transfer an Agent from one ECN to another by detaching the Agent and attaching it to another ECN.
Note: detaching an Agent will delete its connection with the Controller, and all microservices will be shut down.

```bash
iofogctl detach agent agent-1 -n namespace-1
```

To display all resources in detached state with the get command:

```bash
iofogctl get all --detached
```

Attach the Agent to another ECN / Namespace

```bash
iofogctl attach agent agent-1 -n namespace-2
```

We can also move Agents between Namespaces with a single command. The following command will move agent-1 from namespace-1 to namespace-2:

```bash
iofogctl move agent agent-1 namespace-2 -n namespace-1
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/agent-management/attach-detach.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
