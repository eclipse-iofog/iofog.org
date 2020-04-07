# Remote debugging using IntelliJ

Here we'll see how to remotely debug our Agent. This assumes we have an IntelliJ IDEA IDE up and running, and have already imported the <a href="https://github.com/eclipse-iofog/Agent.git">eclipse-iofog/Agent github repository</a> project we are going to debug.

- Open the IntelliJ IDEA IDE and click on Run Configurations (top right)

<figure>
    <img src="/images/edit-configuration.png" alt="" height="80px" width="500px">
    <figcaption>Intellij edit configuration</figcaption>
</figure>

- Click on the green plus (top left) and select Remote to add a new configuration for a remote app.

- Enter a name for the configuration, for example my-remote-agent.

<figure>
    <img src="/images/add-remote-agent.png" alt="" height="400px" width="500px">
    <figcaption>Step to add remote agent</figcaption>
</figure>

- Change the port number to 54322.

- Change the host with the Agent ip.

- Click on apply and ok.
  You will be taken back to the project source code.

- Click on the bug icon and select the new configuration to run it.

<figure>
    <img src="/images/run-debug.png" alt="" height="80px" width="400px">
    <figcaption>Step to run the debugging</figcaption>
</figure>

The project starts running and generating all the log messages of a regular launch in the terminal window. IntelliJ IDEA will intercept the execution at the breakpoint. From here the management is the same as for a regular Java application using your preferred IDE.

Default log file storage location: `/var/log/iofog-agent`

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/reference-agent/debugging.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
