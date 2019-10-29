### Translating your yml files to the 1.3.0 standard

There are a couple quick changes you can do to your current yml file to make them 1.3.0 compatible if you are using the 1.2.x standard.

We now follow a more k8s style formatting by using apiVersions, kinds, metadata and spec top level keys.

All of our current top level fields in 1.2.x will now be handled under spec.

1.2.x YAML:

```yaml
---
controllers:
  - name: LocalController
    host: localhost
    iofoguser:
      name: Quick
      surname: Start
      email: user@domain.com
      password: q1u45ic9kst563art

agents:
  - name: LocalAgent
    host: localhost
```

Current Spec:

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
    password: mysecretpw
  controllers:
    - name: controller
      user: default
      host: xxx.xxx.x.xxx #(ip address)
      keyFile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v1
kind: Connector
metadata:
  name: metdata
  namespace: default
spec:
  user: connector
  host: xxx.xxx.x.xxx #(ip address)
  keyfile: ~/.ssh/id_rsa
---
apiVersion: iofog.org/v1
kind: Agent
metadata:
  name: agent-name
  namespace: default
spec:
  user: agent
  host: xxx.xxx.x.xxx #(ip address)
  keyFile: ~/.ssh/id_rsa
```

Note: we seperate kinds by three dashes, this allows you to use a single file, to deploy all your infrastructure and keep it legible.

As you can see, the top fields are now standard for whatever you want to deploy, which you simply identify in the `kind` field.
The name and namespaces you were operating in are now handled under the metadata tag, and the spec tag, while different for each kind, contains
the same kind of data as the previous spec, simply under spec. Our current YAML spec version is 1, but may be updated in the future.

This also carries over to your microservices. If you wish to deploy your services through iofogctl, you can move these over very easily by
adding the following to the top of your deployment file for each application that file containers:

```yaml
apiVersion: iofog.org/v1
kind: Application
metadata:
  name: "YourOldName"
spec:
```

and simply move the microservices and routes sections from 1.2.x under spec

Otherwise, we have also adopted `camelCase` as standard, so many of your fields under spec, will need to be changed
to follow the spec. This will impact both application and platform specifications, to follow k8s standard.

Thank you, and if you have any questions, please come ask
on [Slack](https://join.slack.com/t/iofog/shared_invite/enQtNTQxMDczNjE0Mjc5LTRhMTE2YjgwNmRhOTg5ZmI3MGQ5OGM0N2E1MDg0OTJmMWYxZTgxZjE2MjA3NzY2MTFlZmEyYzc3OGQ5NmM4ZjI)
or [Discourse](https://discuss.iofog.org/)
