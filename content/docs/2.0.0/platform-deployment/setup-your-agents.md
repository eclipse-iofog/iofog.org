# Setup Agents

The actual 'edge' of our Edge Compute Network ('ECN') is composed of Agents. The other component (the Controllers) can be deployed anywhere, including cloud infrastructure, but Agents can only live on standalone hosts.

## Deploy Agents on Remote Hosts

Create a template of agent.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v2
kind: RemoteAgent
metadata:
  name: zebra-1
spec:
  host: 38.101.23.10
  ssh:
    user: foo
    keyFile: ~/.ssh/id_rsa" > /tmp/agent.yaml
```

Make sure to edit the `host`, `ssh.user`, and `ssh.keyFile` fields to correspond with the remote host we are deploying to.

Once we have edited the fields to our liking, go ahead and run:

```bash
iofogctl deploy -f /tmp/agent.yaml
```

## Verify the Deployment

We can use the following commands to verify the Agent is up and running:

```bash
iofogctl get agents
```

```bash
iofogctl describe agent zebra-1
```

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Now we are ready to start deploying Microservices to our new ECN! We explored how to do this in the <a href="../getting-started/quick-start-local.html">Quick Start With Local Deployment</a> already. We can now try deploying the same microservice on our new ECN. To learn more about microservice management, get started at <a href="../microservices/applications.html">Microservice Management - Distributed Applications</a>.</p>
  
  <p>To get going with our own Microservices, start by looking at the tutorial on creating our own Microservices at <a href="../tutorial/introduction.html">Tutorial - Our First Microservice</a>.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/agent-management/setup-your-agents.html"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
