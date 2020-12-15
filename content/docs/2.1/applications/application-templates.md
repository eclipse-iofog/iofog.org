# Application Templates

During the [Quickstart](../getting-started/quick-start-local.html) and the [tutorial](../tutorial/introduction.html), we specified the microservices list and routes for each application.

That was nice and easy, but what if we need to deploy the same code on a lot of Agents? We would need to details all the microservices and routes in a separate YAML document for every instance of your Application. This is tedious and error prone, as often only a few values would change from one Agent to another.

Wouldn't it be nice to have a way to specify the skeleton (template) of an Application and then reuse the same template over an over again, only modifying a few variables? That's where the Controller Application Template catalog comes into play!

Currently the Application Template catalog comes in empty, so let's start by adding a template!

## Creating an Application template

We can use `iofogctl` to create our own Application Templates. The YAML spec reference can be found [here](../reference-iofogctl/reference-application-template.html).

```bash
echo "---
apiVersion: iofog.org/v2
kind: ApplicationTemplate
metadata:
  name: heartrate
spec:
    description: This is an application template to test with. It's based on Edgeworx Heartrate monitor demo.
    variables:
    - key: agent-name
      description: Name of Agent to deploy Microservices to
    - key: username
      description: Display name for the heartrate monitor
      defaultValue: Anonymous User
    application:
      routes:
      - name: route-1
        from: monitor
        to: viewer
      microservices:
      - name: monitor
        agent:
          name: \"{{agent-name}}\"
        images:
          arm: edgeworx/healthcare-heart-rate:arm-v1
          x86: edgeworx/healthcare-heart-rate:x86-v1
          registry: remote # public docker
        container:
          rootHostAccess: false
          ports: []
        config:
          test_mode: true
          data_label: \"{{username}}\"
      # Simple JSON viewer for the heart rate output
      - name: viewer
        agent:
          name: \"{{agent-name}}\"
        images:
          arm: edgeworx/healthcare-heart-rate-ui:arm
          x86: edgeworx/healthcare-heart-rate-ui:x86
          registry: remote
        container:
          rootHostAccess: false
          ports:
            # The ui will be listening on port 80 (internal).
            - external: 5001
              internal: 80

" > /tmp/my-app-template.yaml
iofogctl deploy -f /tmp/my-app-template.yaml
```

### Key notes

- The application template leverage the power of [template parametric expressions](../reference-iofogctl/reference-template-engine.html) to let you specify variables, which values will only be assigned when deploying the actual Application
- The application part of the template has the exact same definition than any other [Application specification](../reference-iofogctl/reference-application.html)

## Getting your catalog

We can verify that our new Application Template was added to the Catalog:

```bash
iofogctl get application-templates
```

```plain
TEMPLATE    DESCRIPTION                                                                                     MICROSERVICES     ROUTES
heartrate   This is an application template to test with. It's based on Edgeworx Heartrate monitor demo.    monitor, viewer route-1
```

Instead of specifying the entire Application each time, we can refer to the Application Template name in our Application specification. To deploy an Application based on this template, we can use the following YAML:

```bash
echo "---
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: heartrate-demo
spec:
  template:
    name: heartrate
    variables:
    - key: agent-name
      value: my-agent-name
    - key: username
      value: Alex
" > /tmp/hello-web-catalog.yaml
iofogctl deploy microservice -f /tmp/hello-web-catalog.yaml
```

Note that this YAML snippet assumes we have a running ECN in the current Namespace with an Agent called `my-agent-name`.

We can check that the expected Application has been deployed using iofogctl

```bash
iofogctl describe application heartrate-demo
```

```plain
apiVersion: iofog.org/v2
kind: Application
metadata:
  name: heartrate-demo
  namespace: default
spec:
  name: heartrate-demo
  microservices:
  - uuid: gF8hqpFxdfrJpnLmNpp9K7rgx2dMjpPC
    name: monitor-heartrate-demo
    agent:
      name: my-agent-name
      config:
        dockerUrl: unix:///var/run/docker.sock
        diskLimit: 10
        diskDirectory: /var/lib/iofog-agent/
        memoryLimit: 4096
        cpuLimit: 80
        logLimit: 10
        logDirectory: /var/log/iofog-agent/
        logFileCount: 10
        statusFrequency: 10
        changeFrequency: 10
        deviceScanFrequency: 60
        bluetoothEnabled: false
        watchdogEnabled: false
        abstractedHardwareEnabled: false
    images:
      catalogId: 0
      x86: edgeworx/healthcare-heart-rate:x86-v1
      arm: edgeworx/healthcare-heart-rate:arm-v1
      registry: remote
    container:
      volumes: []
      env: []
      extraHosts: []
      ports: []
      rootHostAccess: false
    config:
      data_label: Alex
      test_mode: true
    application: heartrate-demo
  - uuid: KgNymMHkvf7RW69GzgytHKtRzqjT78zB
    name: viewer-heartrate-demo
    agent:
      name: my-agent-name
      config:
        dockerUrl: unix:///var/run/docker.sock
        diskLimit: 10
        diskDirectory: /var/lib/iofog-agent/
        memoryLimit: 4096
        cpuLimit: 80
        logLimit: 10
        logDirectory: /var/log/iofog-agent/
        logFileCount: 10
        statusFrequency: 10
        changeFrequency: 10
        deviceScanFrequency: 60
        bluetoothEnabled: false
        watchdogEnabled: false
        abstractedHardwareEnabled: false
    images:
      catalogId: 0
      x86: edgeworx/healthcare-heart-rate-ui:x86
      arm: edgeworx/healthcare-heart-rate-ui:arm
      registry: remote
    container:
      volumes: []
      env: []
      extraHosts: []
      ports:
      - internal: 80
        external: 5001
      rootHostAccess: false
    config: {}
    application: heartrate-demo
  routes:
  - name: route-1-heartrate-demo
    from: monitor-heartrate-demo
    to: viewer-heartrate-demo
```

We can see that the agent name, and the username, got correctly substitued.

## Caveat

Once an application has been deployed based on a template, it behaves exactly like any other Application.
Any further update to the Application Template will NOT modify the Application.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/applications/application-templates.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
