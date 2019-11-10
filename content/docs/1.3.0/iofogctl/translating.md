### Translating your yml files to the 1.3.0 standard

There are a couple quick changes you can do to your current yml file to make them 1.3.0 compatible if you are using the 1.2.x standard.

* We now follow Kubernetes-style by using `apiVersion`, `kind`, `metadata` and `spec` top level keys.
* All of the top level fields in 1.2.x will now be handled under `spec`. 
* Some of the fields have become nested where they were flat before (e.g. ssh and kube details).
* All fields must now be `camelCase`. Regarding abbreviations, follow these examples: `htmlExample`, `exampleHTML`, `htmlXMLExample`.


#### 1.2.x YAML

```YAML
# Vanilla and Kubernetes Controllers shown for example
controllers:
- name: Controller-1
  user: serge
  host: 30.40.50.5
  keyfile: ~/.ssh/id_rsa
  iofoguser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art
- name: Controller-2
  kubeconfig: ~/.kube/config
  iofoguser:
    name: Quick
    surname: Start
    email: user@domain.com
    password: q1u45ic9kst563art

agents:
- name: Agent-1
  user: serge
  host: 30.40.50.7
  keyfile: ~/.ssh/id_rsa
```

#### 1.3.x YAML

```yaml
---
apiVersion: iofog.org/v1
kind: ControlPlane
metadata:
  name: ymlspec
  namespace: default
spec:
  iofogUser:
    name: iofog
    surname: user
    email: host@domain.com
    password: 89ghuiwfg80
  # 3 types of controllers shown for example only
  controllers:
    - name: vanilla
      host: 30.40.50.60
      ssh:
        user: default
        keyFile: ~/.ssh/id_rsa
    - name: kubernetes
      kube:
        config: ~/.kube/config
    - name: local
      host: localhost
---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: vanilla
  namespace: default
spec:
  host: 30.40.50.61
  ssh:
    user: connector
    keyfile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: kubernetes
  namespace: default
spec:
  kube:
    config: ~/.kube/config
---
apiVersion: iofog.org/v1
kind: Agent
metadata:
  name: agent-name
  namespace: default
spec:
  host: 30.40.50.62
  ssh:
    user: agent
    keyFile: ~/.ssh/id_rsa
```

Note: we separate kinds by three dashes, this allows you to use a single file, to deploy all your infrastructure and keep it legible.

As you can see, the top fields are now standard for whatever you want to deploy, which you simply identify in the `kind` field.
The name and namespaces you were operating in are now handled under the metadata tag, and the spec tag, while different for each kind, contains
the same kind of data as the previous spec, simply under spec. Our current YAML spec version is 1, but may be updated in the future.

This also carries over to your microservices. If you wish to deploy your services through iofogctl, you can move these over very easily by
adding the following to the top of your deployment file for each application that file containers:

```yaml
apiVersion: iofog.org/v1
kind: Application
metadata:
  name: "old-resource-name"
spec:
```

and simply move the microservices and routes sections from 1.2.x under spec. Take care to use the new `ssh` and `kube` fields also.

Thank you, and if you have any questions, please come ask
on [Slack](https://join.slack.com/t/iofog/shared_invite/enQtNTQxMDczNjE0Mjc5LTRhMTE2YjgwNmRhOTg5ZmI3MGQ5OGM0N2E1MDg0OTJmMWYxZTgxZjE2MjA3NzY2MTFlZmEyYzc3OGQ5NmM4ZjI)
or [Discourse](https://discuss.iofog.org/)
