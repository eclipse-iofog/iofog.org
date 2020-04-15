# Debugging

Because ioFog microservices are just Docker containers with nearly arbitrary code in them, how you'll do most of your debugging should be the same as other traditional development in Docker.

The easiest way to debug your microservice code is going to be running it locally on your development machine, inside Docker. But remote debugging in production is possible as well.

If your language and IDE have support for live debugging, you'll need to make sure the necessary ports on your Docker setup are open/mapped correctly.

The Docker folks have several wonderful tutorials on debugging, e.g. [a Node.js app](https://blog.docker.com/2016/07/live-debugging-docker/) or [a Java app](https://blog.docker.com/2016/09/java-development-using-docker/) in Docker.

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/developing-microservices/debugging.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
