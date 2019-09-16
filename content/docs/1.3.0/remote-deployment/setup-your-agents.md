# Setup Your Agents

The actual 'edge' of your Edge Compute Network ('ECN') is composed of Agents. The other components (the Controllers and Connectors) can be deployed anywhere, including cloud infrastructure.

## Deploy Agents on Remote Hosts

Create a template of agent.yaml like so:

```bash
echo "---
name: zebra-1
user: foo
host: 38.101.23.10
keyfile: ~/.ssh/id_rsa" > /tmp/agent.yaml
```

Once the templated fields have been edited, we can run:

```bash
iofogctl deploy agent -f /tmp/agent.yaml
```

## Verify the Deployment

We can use the following commands to verify the Agent is up an running:

```bash
iofogctl get agents
```

```bash
iofogctl describe agent zebra-1
```

[Continue To Next Step: Setup High Availability](setup-high-availability.html).
