# Setup Your Agents

The actual 'edge' of your Edge Compute Network ('ECN') is composed of Agents. The other components (the Controllers and Connectors) can be deployed anywhere, including cloud infrastructure.

## Deploy Agents on Remote Hosts

Create a template of agent.yaml like so:

```bash
echo "---
apiVersion: iofog.org/v1
kind: Agent
metadata:
  name: zebra-1
spec:
  user: foo
  host: 38.101.23.10
  keyFile: ~/.ssh/id_rsa" > /tmp/agent.yaml
```

Make sure to edit the `user`, `host`, and `keyfile` fields to correspond with the remote host you are deploying to.

Once you have edited the fields to your liking, go ahead an run:

```bash
iofogctl deploy -f /tmp/agent.yaml
```

## Verify the Deployment

We can use the following commands to verify the Agent is up an running:

```bash
iofogctl get agents
```

```bash
iofogctl describe agent zebra-1
```

Now you are ready to start deploying Microservices to your new ECN! We explored how to do this in the [Quick Start Guide](../getting-started/quick-start.html). You can try deploying the same microservice on your new ECN.

To get going with your own Microservices, start by looking at the instructions on creating Microservices [here](../writing-microservices/overview.html).
