# Detach / Attach an Agent

We can transfer an Agent from one ECN to another by detaching the agent and attaching it to another ECN.
Note: detaching an agent will delete its connection with the Controller, and all microservices will be shut down.

```bash
iofogctl detach agent AGENT_NAME
```

Switch to another ECN / namespace

```bash
iofogctl attach agent AGENT_NAME
```

To display all resources in dettached state with the get command

```bash
iofogctl get all --detached
```

If we have an Agent ready and running on a remote host, we can also attach it directly using host and ssh credentials:

```bash
iofogctl attach agent NAME --host HOST --host AGENT_HOST --user SSH_USER --port SSH_PORT --key SSH_PRIVATE_KEY_PATH
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/agent-management/attach-detach.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
