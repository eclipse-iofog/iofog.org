# ECN Viewer

The Edge Compute Network Viewer lets you visualise and manage your entire ECN from your favorite browser!
It can be used to:

- Get a quick summary of what is deployed on your Controller
- Deploy, start and stop applications
- Manage your application templates
- Visualise your Agents on a map
- Inspect in depth the state of every Agent, Application and Microservice
- ...

## Configuration

- You can specify the port on which Controller will serve the ECN Viewer (default to 80) by giving your Controller a `VIEWER_PORT` env variable.

## Screenshots

The following screenshots have been taken from a Controller at the start of our [tutorial](../tutorial/introduction.html)

<div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center">
  <img src="/images/ecn-viewer/summary.png" style="max-width:100%;border-radius: 0.3em;margin: 35px 0;" />
  <img src="/images/ecn-viewer/app.png" style="max-width:100%;border-radius: 0.3em;margin: 35px 0;" />
  <img src="/images/ecn-viewer/agent.png" style="max-width:100%;border-radius: 0.3em;margin: 35px 0;" />
  <img src="/images/ecn-viewer/agent-details.png" style="max-width:100%;border-radius: 0.3em;margin: 35px 0;" />
</div>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/reference-controller/ecn-viewer.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
