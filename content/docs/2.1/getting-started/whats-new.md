# What's New in ioFog 2.1.0?

- [Template parametric expressions](../reference-iofogctl/reference-template-engine.html) now available!
- [Application template](../reference-iofogctl/reference-application-template.html), build your own App Store!
- [Edge resources](../reference-iofogctl/reference-edge-resources.html), let your microservices know what their Agent is capable of!

## Template parametric expressions

For every `yaml` configuration files and also for the corresponding controller API request body, the template parametric expression can be used for any value.

#### Quick capabilities overview

- Defining a variable: `{{variable-name}}`
- Using a filter: `{{"agent-name" | findAgent}}`
- Assigning a value: `{% assign agent = "agent-name" | findAgent %}`
- Example: Getting the host value of the agent named `zebra-1`: `{% assign agent = "zebra-1" | findAgent %}{{ agent.host }}`

[Find out more!](../reference-iofogctl/reference-template-engine.html)

## Application templates

[Find out more!](../reference-iofogctl/reference-application-template.html)

## Edge resources

[Find out more!](../reference-iofogctl/reference-edge-resources.html)

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/getting-started/whats-new.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
