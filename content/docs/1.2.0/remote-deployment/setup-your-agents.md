# Setup Your Agents

The actual 'edge' of your Edge Compute Network ('ECN') is composed of Agents. The other components (the Controllers and Connectors) can be deployed anywhere, including cloud infrastructure.

## Deploy Connectors on Remote Hosts

Create a template of agent.yaml like so:

```bash
echo "---
name: Agent-1
user: <Remote Username>
host: <Remote Hostname>
keyfile: <~/.ssh/id_rsa>" > /tmp/agent.yaml
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
iofogctl describe agent Agent-1
```

[Continue To Next Step: Setup All in One](setup-all-in-one.html).