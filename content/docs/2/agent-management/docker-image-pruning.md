# Docker Image Pruning

Agent disk space is a precious resource. We can reclaim disk space by pruning Docker images from our Agents:

```bash
iofogctl prune agent agent-1
```

The pruning frequency of Agents is also configurable using `dockerPruningFrequency` configuration option. See [iofogctl - AgentConfig reference](../reference-iofogctl/reference-agent.html) for more details.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/agent-management/docker-image-pruning.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
