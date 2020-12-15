# What's New in ioFog 2.1.0?

- [Template parametric expressions](../reference-iofogctl/reference-template-engine.html) now available!
- [Application template](../applications/application-templates.html), build your own App Store!
- [Edge resources](../agent-management/edge-resources.html), let your microservices know what their Agent is capable of!

## Template parametric expressions

Variables, filter and template "queries" can now be used as values for any field in your deployment YAMLs (And therefore, any value of the JSON body of most PUT/POST/PATCH Controller REST API requests).

Those variables allow you to reference the same document, or any resource preexisting on your Controller, adding a lot of flexibility in your deployments.

#### Quick capabilities overview

- Defining a variable: `{{variable-name}}`
- Using a filter: `{{"agent-name" | findAgent}}`
- Assigning a value: `{% assign agent = "agent-name" | findAgent %}`
- Example: Getting the host value of the agent named `zebra-1`: `{% assign agent = "zebra-1" | findAgent %}{{ agent.host }}`

[Find out more!](../reference-iofogctl/reference-template-engine.html)

## Application templates

What if we need to deploy the same code on a lot of Agents? We would need to details all the microservices and routes in a separate YAML document for every instance of your Application. This is tedious and error prone, as often only a few values would change from one Agent to another.

Wouldn't it be nice to have a way to specify the skeleton (template) of an Application and then reuse the same template over an over again, only modifying a few variables? That's where the Controller Application Template catalog comes into play!

[Find out more!](../applications/application-templates.html)

## Edge resources

The Edge is where the virtual meets the physical. Most if not all Edge applications are built to interact in some way with entities or resources that exist in the physical world.

Edge Resources are Digital Twins that allow you to define an interface for your microservices to communicate with resources available on your ioFog Agents.

[Find out more!](../agent-management/edge-resources.html)

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/getting-started/whats-new.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
