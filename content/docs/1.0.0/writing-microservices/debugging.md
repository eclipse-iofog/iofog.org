# Debugging
Because ioFog microservices are just Docker containers with nearly arbitrary code in them, how you'll do most of your debugging should be the same as other traditional development in Docker.

The easiest way to debug your microservice code is going to be running it locally on your development machine, inside Docker. But remote debugging in production is possible as well.

If your language and IDE have support for live debugging, you'll need to make sure the necessary ports on your Docker setup are open/mapped correctly.

The Docker folks have several wonderful tutorials on debugging, e.g. [a Node.js app](https://blog.docker.com/2016/07/live-debugging-docker/) or [a Java app](https://blog.docker.com/2016/09/java-development-using-docker/) in Docker.
