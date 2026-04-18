
# VolumeMount YAML Specification

`iofogctl` allows users to deploy and manage volumeMounts.

The VolumeMount has a very simple definition

```yaml
apiVersion: iofog.org/v3
kind: VolumeMount
metadata:
  name: test-vm-from-configmap
spec:
  configMapName: configmap-name
```

```yaml
apiVersion: iofog.org/v3
kind: VolumeMount
metadata:
  name: test-vm-from-secret
spec:
  secretName: configmap-name
```

| Field        | Description                                           |
| ------------ | ----------------------------------------------------- |
| spec.configMapName          | The name of ConfigMap that you are going to create a VolumeMount from                                   |
| spec.secretName       | The name of Secret that you are going to create a VolumeMount from                                            |

## Attach VolumeMount to Agents


```bash
iofogctl attach volume-mount test-vm-from-configmap agentName-1 agentName-2 agentName-3
```
When you attach volumeMount to Agents, each Agent will create local volume with volumeMount's secret or configMap, then you can easily attach those volumes to running microservices. 

In the microservice **volumes** list, reference a VolumeMount by **name** and set **type** on the volume mapping. No prefix (e.g. `$VolumeMount/`) is required:

```yaml
        volumes:
          - volumeMount: test-vm-from-configmap
            containerDestination: /home/foo
            accessMode: 'ro'
            type: 'bind'
          - volumeMount: test-vm-from-secret
            containerDestination: /home/foo
            accessMode: 'ro'
            type: 'bind'
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Legacy prefix</h3>
  <p>The previous form using `hostDestination: $VolumeMount/<name>` is **deprecated**. Use the `volumeMount` field (or equivalent by-name reference) and `type` on the volume mapping instead.</p>
</aside>


## Detach VolumeMount from Agents


```bash
iofogctl detach volume-mount test-vm-from-configmap agentName-1 agentName-2 agentName-3
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/yaml-references/reference-volumemount.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
