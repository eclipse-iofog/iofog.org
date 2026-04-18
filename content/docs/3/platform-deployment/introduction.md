<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Deployed a local ECN first?</h3>
  <p>We recommened going through the <a href=../getting-started/quick-start-local.html>Quick Start Guide</a> before continuing on here. In this guide we also assume we are up and running with iofogctl, if that is not the case download and be at least marginally familiar with <a href=../iofogctl/download.html>iofogctl</a>.</p>
</aside>

# Introduction

Edge Compute Networks ('ECNs') are complicated things. At a high level, they are composed of a Control Plane and a set of Agents.

Setting up and managing an ECN out of an arbitrary set of remote hosts can seem like a daunting task. That's why we are going to use `iofogctl`. `iofogctl` is a CLI that simplifies the orchestration of ECNs as well as the deployment of microservices on those ECNs. In this guide, we will step through the process of creating a real, distributed ECN across a set of remote hosts.

In this section, we will go through two deployment options of an ioFog ECN. The first option is a remote deployment on a standalone host. This deployment requires us to setup the network and prepare the Controller and Agent hosts for SSH access. The second option is a deployment onto a Kubernetes cluster. In this case, we also need to setup the network, but we only need to prepare the Agent hosts for SSH access.

<aside class="notifications tip">
  <h3><img src="/images/icos/ico-tip.svg" alt="">Where to go from here?</h3>
  <p>Regardless of the type of deployment we need, now is the time to <a href=prepare-your-network.html>setup our network</a>.</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/platform-deployment/introduction.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
