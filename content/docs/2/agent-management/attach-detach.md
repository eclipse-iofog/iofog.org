# Attach / Detach an Agent

We can transfer an Agent from one ECN to another by detaching the agent and attaching it to another ECN.
Note: detaching an agent will delete its connection with the Controller, and all microservices will be shut down.

```bash
iofogctl detach agent agent-1 -n namespace-1
```

To display all resources in detached state with the get command

```bash
iofogctl get all --detached
```

Switch to another Namespace

```bash
iofogctl attach agent agent-1 -n namespace-2
```

If we have an Agent ready and running on a remote host, we can also attach it directly using host and SSH credentials:

```bash
iofogctl attach agent agent-1 --host 123.123.123.123 --user foo --port 22 --key ~/.ssh/id_rsa
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>This section describes a set of independent Agent management operations, hence there is no natural flow nor dependencies. Feel free to explore any topic in this section.</p>
  
  <p>If one wants to dive deeper into Agent internals, we recommend also checking out <a href="../reference-agent/overview.html">Agent reference</a> documentation.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/agent-management/attach-detach.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
