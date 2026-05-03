# Microservice Registry and Catalog Management

During the [Quickstart](../getting-started/quick-start-local.html) and the [tutorial](../tutorial/introduction.html), we specified images to be used for each microservice, for each type of Agent.

That was nice and easy, but what if we need to deploy the same code on a lot of Agents? We would need to specify the images for each Microservice. Wouldn't it be nice to have a way to specify the images to be used for each type of Agent once and then reuse this configuration? That's where the Controller Microservice catalog comes into play!

Each ioFog Controller comes with a built-in microservice catalog. You can see the list of preconfigured Microservices images using `iofogctl`:

```bash
iofogctl get catalog
```

```console
NAMESPACE
default

ID		NAME		DESCRIPTION						REGISTRY	X86					ARM					
2		RESTBlue	REST API for Bluetooth Low Energy layer.		remote		ghcr.io/eclipse-iofog/restblue:latest	ghcr.io/eclipse-iofog/restblue:latest	
5		NATs		NATs server microservice for Eclipse ioFog		remote		ghcr.io/eclipse-iofog/nats:latest		ghcr.io/eclipse-iofog/nats:latest		
4		Debug		The built-in debugger for Eclipse ioFog IoFog Agent.	remote		ghcr.io/eclipse-iofog/node-debugger:latest	ghcr.io/eclipse-iofog/node-debugger:latest	
1		Router		The built-in router for Eclipse ioFog.			remote		ghcr.io/eclipse-iofog/router:3.7.0		ghcr.io/eclipse-iofog/router:3.7.0		
3		HAL		REST API for Hardware Abstraction layer.		remote		ghcr.io/eclipse-iofog/hal:latest		ghcr.io/eclipse-iofog/hal:latest		

```

Instead of specifying the images for each Agent type, we can refer to catalog ID in your Microservice specification. We can see that there is a `Hello Web Demo` catalog item that is configured with the `iofog/hello-web` image for x86 Agents, and `iofog/hello-web-arm` for ARM Agents. So, to deploy a Microservice running those images, we can use the following YAML:

```bash
echo "---
apiVersion: 'iofog.org/v3'
kind: Application
metadata:
name: debugger
spec:
---
apiVersion: 'iofog.org/v3'
kind: Microservice # Or application, as application uses the same spec for its microservices
metadata:
  name: debugger
spec:
  agent:
    name: my-agent-name
    config: {}
  images:
    catalogId: 4
  container:
    env: []
    ports: []
    hostNetworkMode: ture
    isPrivileged: true
    volumes: []
    commands: []
  config: {}
  application: debugger
" > /tmp/debugger.yaml
iofogctl deploy microservice -f /tmp/debugger.yaml
```

Note that this YAML snippet assumes we have a running ECN in the current Namespace with an Agent called `my-agent-name`.

We can check that the expected images have been used by describing our Microservice with iofogctl:

```bash
iofogctl describe microservice debugger/debugger
```


## Create our own Catalog Items

We can also use iofogctl to create our own Catalog Items. The YAML spec reference can be found [here](../yaml-references/reference-catalog.html).

```bash
echo "---
apiVersion: 'iofog.org/v3'
kind: CatalogItem
metadata:
  name: 'my-multiplatform-microservice'
spec:
  description: 'Alpine Linux'
  x86: 'amd64/alpine:latest'
  arm: 'arm32v6/alpine:latest'
  registry: 'remote'

" > /tmp/my-catalog-item.yaml
iofogctl deploy -f /tmp/my-catalog-item.yaml
```

We can verify that our new Catalog Item was added to the Catalog:

```bash
iofogctl get catalog | grep my-multiplatform-microservice
```

```plain
17		my-multiplatform-microservice	Alpine Linux											remote		amd64/alpine:latest			arm32v6/alpine:latest
```

We used grep to filter the ouput, but the columns are the same as above. You can now use the `spec.images.catalogId` field on `Microservice` kind set to 17 in order to deploy you microservice.

# Registries

During the [tutorial](../tutorial/introduction.html), we saw that the images are being pulled from a repository specified in the YAML. The two values we have used so far are `remote` (public docker hub) and `local` (image locally present on the Agent). There is a third value available, which is a `repository ID`.

NB: `remote` and `local` are aliases for values `1` and `2`, which are the repository seeded in your Controller database.

We can list our current registries using `iofogctl get registries`

```plain
ID              URL                     USERNAME        PRIVATE         SECURE
1               registry.hub.docker.com                 false           true
2               from_cache                              false           true
```

We can add a new registry using the `Registry` [deploy kind](../yaml-references/reference-registry.html)

```bash
echo "---
apiVersion: iofog.org/v3
kind: Registry
spec:
  url: registry.hub.docker.com # This will create a registry that can download your private docker hub images
  username: john
  password: q1u45ic9kst563art
  email: user@domain.com
" > /tmp/my-private-registry.yaml
iofogctl deploy -f /tmp/my-private-registry.yaml
```

After running this, you should now have 3 registries and you can use the `ID` in the [microservice images registry field](../yaml-references/reference-application.html)


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/applications/microservice-registry-catalog.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
