# Move and Rename Microservices

## Move Microservices

We can move a deployed Microservice between Agents within the same iofogctl Namespace. Remember that a Namespace corresponds to a single Edge Compute Network.

If we wanted to move `msvc-1` to `agent-2` we could run:

```bash
iofogctl move microservice msvc-1 agent-2
```

## Rename Microservices

We can change Microservice names after they have been deployed.

If we wanted to rename `msvc-1` to `new-msvc-1` we could run:

```plain
iofogctl rename msvc-1 new-msvc-1
```

Microservice names must be unique within a single Namespace. The above command would fail if `new-msvc-1` already existed in the corresponding Namespace.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/applications/microservice-move-rename.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
