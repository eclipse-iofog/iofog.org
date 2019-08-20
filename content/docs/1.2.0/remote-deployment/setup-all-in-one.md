# Setup Your Edge Compute Network in One Step

You can use `iofogctl` to deploy your entire Edge Compute Network ('ECN') from one command.

All the commands in the preceding sections can be coallesced into the following:

```bash
iofogctl deploy -f ecn.yaml
```

The ecn.yaml file should something look like this:
```yaml
controllers:
- name: Controller-1
  user: <Remote Username>
  host: <Remote Hostname>
  keyfile: <~/.ssh/id_rsa>
  iofoguser:
    name: <Fist Name>
    surname: <Surname>
    email: <Email Address>
    password: <Password>

agents:
 - name: Agent-1
   user: <Remote Username>
   host: <Remote Hostname>
   keyfile: <~/.ssh/id_rsa
 - name: Agent-2
   user: <Remote Username>
   host: <Remote Hostname>
   keyfile: <~/.ssh/id_rsa
```