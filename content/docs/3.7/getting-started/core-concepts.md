

# Core Concepts

The enterprise edge has become a business-critical frontier. Today, up to 75% of enterprise data is created outside the data centers. It is generated across factories, stores, remote sites, vehicles, and infrastructure. The scale is massive.

At the same time, edge environments remain resource-constrained by design. They operate in real-world conditions, with limited connectivity and tight operational margins. Yet the hardware landscape is changing fast. New generations of edge CPUs and GPUs are now powerful, affordable, and widely available. This makes real-time analytics, Edge AI, and autonomous decision-making practical at the edge.

Traditional centralized cloud models can not keep up. Latency is dictated by physics. Costs grow with every round trip. And when connectivity is degraded, remote sites lose autonomy. For distributed infrastructures, this creates risk, complexity, and operational friction.

**ioFog** brings cloud-native principles to the edge, without ignoring real-world constraints. It is secure, vendor-agnostic, and open by design. By reducing operational complexity and restoring local autonomy.

## Introducing Eclipse ioFog

Eclipse **ioFog** is an Open Source Edge Computing platform designed to operate edge environments as a managed cluster, even when individual edge nodes must remain isolated for reliability and security reasons. **ioFog** shifts operations from manual, site-by-site work to a unified, cluster-wide model while preserving local autonomy at each edge location.

## Key Capabilities

Eclipse **ioFog** provides the essential capabilities required to reliably run and operate software workloads across distributed edge environments.

It focuses on the full lifecycle of **applications**, **services** and **edge operations**, enabling unified and consistent control at scale.

### Edge Environment and Agent Management

**ioFog** simplifies how edge environments are brought under control. Edge nodes are onboarded using lightweight agents that establish secure identity and connectivity to the control plane. Installation and upgrades are automated through **ioFog** management toolkits (cli and UI), without requiring deep, site-specific customization.

**ioFog** provides a unified and Open Source operational layer above hardware and operating systems, allowing enterprises to manage diverse environments as part of a single cluster while preserving local isolation and autonomy.

### Application and Workload Lifecycle Orchestration

**ioFog** orchestrates the complete lifecycle of containerized workloads at the edge. Applications are deployed, updated, versioned and retired consistently across distributed locations using declarative, YAML-based manifests.

Environmental differences are abstracted away, allowing teams to focus on what should run and where, rather than how each site is configured. This enables repeatable deployments, controlled rollouts and safe updates across edge clusters.

### Configuration, Secrets and Policy Management

**ioFog** provides built-in mechanisms for managing application configuration and sensitive data. Configuration values and secrets are centrally defined and securely distributed to edge workloads at runtime, without hardcoding or manual handling.
Access control and permissions are enforced through role-based access control (RBAC), ensuring that users, systems and workloads operate strictly within their intended scope.

### Secure Connectivity

**ioFog** establishes a trust between the control plane and edge devices. This is essential for edge environments that operate outside traditional security perimeters.

Secure communication is a first-class capability in **ioFog**. Each edge node and workload operates with a verified identity, supported by built-in certificate management.

**ioFog** provides a secure service connectivity network(Skupper) and distributed message bus(NATs) by default, enabling reliable, encrypted communication between services across nodes and sites. This allows edge environments to remain isolated from a network perspective while still participating in a trusted, managed cluster.

### Observability and Operations

**ioFog** delivers a unified operational view across distributed edge environments. Teams can observe workload status, connectivity and operational health across sites from a single interface.

Both a command-line interface (iofogctl) and a web-based UI (ECN-Viewer) are provided, supporting automation-first workflows as well as day-to-day operational visibility. This enables faster troubleshooting, controlled operations and predictable behavior at scale.


<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Ready for more?</h3>
    <p>If you want to know more about all the **ioFog** components and learn how to unified Edge orchestration at scale, head to <a href="architecture.html">Architecture overview</a>.</p>
    <p>If instead you want to get started right away, you can check out the <a href="../getting-started/quick-start-local.html">Quick Start guide</a> to deploy ioFog locally on your computer, or go through production deployment in <a href="../platform-deployment/introduction.html">Remote deployment</a> or <a href="../platform-deployment/kubernetes-prepare-cluster.html">Kubernetes deployment</a>.</p>
    <p>You can also head to our tutorial for developers to <a href="../tutorial/introduction.html">Learn how to use ioFog and build microservices</a></p>
</aside>


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/getting-started/core-concepts.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>