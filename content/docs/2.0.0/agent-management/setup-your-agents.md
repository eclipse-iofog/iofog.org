# Setup Your Agents

The actual 'edge' of your Edge Compute Network ('ECN') is composed of Agents. The other component (the Controllers) can be deployed anywhere, including cloud infrastructure.

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

Make sure to edit the `host`, `ssh.user`, and `ssh.keyFile` fields to correspond with the remote host you are deploying to.

Once you have edited the fields to your liking, go ahead and run:

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

Now you are ready to start deploying Microservices to your new ECN! We explored how to do this in the [Quick Start Guide](../getting-started/quick-start.html). You can try deploying the same microservice on your new ECN.

To get going with your own Microservices, start by looking at the instructions on creating Microservices [here](../writing-microservices/overview.html).

<aside class="notifications note">
  <b>See anything wrong with the document? Help us improve it!</b>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/remote-deployment/setup-your-agents.md"
    target="_blank">
    <p style="text-align:left">Edit on Github <img src="/images/icos/ico-github.svg" alt=""></p>
  </a>
</aside>
