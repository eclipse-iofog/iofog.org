# Docker Image Pruning

Agent disk space is a precious resource. We can reclaim disk space by pruning Docker images from our Agents:

```bash
iofogctl prune agent NAME
```

The pruning frequency of Agents is also configurable using `dockerPruningFrequency` configuration option. See [iofogctl - AgentConfig reference](../reference-iofogctl/reference-agent.html) for more details.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>This section describes a set of independent Agent management operations, hence there is no natural flow nor dependencies. Feel free to explore any topic in this section.</p>
  
  <p>If one wants to dive deeper into Agent internals, we recommend also checking out <a href="../reference-agent/overview.html">Agent reference</a> documentation.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/agent-management/docker-image-pruning.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
