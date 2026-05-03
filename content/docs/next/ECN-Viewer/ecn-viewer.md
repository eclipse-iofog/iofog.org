# ECN Viewer

ECN Viewer is the web control plane for Eclipse ioFog. It provides a UI for daily operations that usually require `iofogctl`: viewing cluster health, managing Agents and workloads, editing YAML resources, and auditing controller actions.

## Access and Auth

- ECN Viewer is served by the Controller.
- Access control follows the same RBAC model used by `iofogctl` and Keycloak.
- Users only see namespaces and resources permitted by their role bindings.

## 1) Overview Dashboard

Use the **Overview** section to quickly validate cluster health, edge node counts, and workload utilization.

![Cluster dashboard summary](../../../images/ecn-viewer/1.png)

The overview also includes focused cards for user workloads and system workloads.

![Microservices status and utilization](../../../images/ecn-viewer/2.png)

![System microservices status and utilization](../../../images/ecn-viewer/3.png)

![System microservices dashboard continuation](../../../images/ecn-viewer/4.png)

## 2) Node Operations

### Agent list and details

The **Nodes > List** page shows Agent status, host, deployment type, and resource usage. Selecting an Agent opens a right-side details panel.

![Agent list with details drawer](../../../images/ecn-viewer/5.png)

### Agent shell and YAML editing

From the same page, operators can open an interactive shell and edit Agent YAML directly.

![Agent shell and AgentConfig YAML editor](../../../images/ecn-viewer/6.png)

### Geographic map view

The **Nodes > Map** page visualizes where Agents are running.

![Global agent map view](../../../images/ecn-viewer/7.png)

Selecting an agent marker opens a location popup and details panel.

![Agent map with selected node details](../../../images/ecn-viewer/8.png)

## 3) Workload Operations

### Microservices

The **Workloads > Microservices** list provides filtering and quick status checks.

![Microservices list](../../../images/ecn-viewer/9.png)

Each microservice has a detailed panel with runtime metadata and configuration context.

![Microservice details drawer](../../../images/ecn-viewer/10.png)

Remote shell sessions and YAML editing are available directly for running microservices.

![Microservice shell and YAML editor](../../../images/ecn-viewer/11.png)

### System microservices

Built-in services such as Router/NATs are managed from **Workloads > System Microservices**.

![System microservices list](../../../images/ecn-viewer/12.png)

### Catalog microservices

Use **Catalog Microservices** to browse deployable items and image variants.

![Catalog microservices inventory](../../../images/ecn-viewer/13.png)

## 4) Config and Security Resources

ECN Viewer provides dedicated pages for config resources used by workloads and agents.

![Volume mounts list](../../../images/ecn-viewer/14.png)

![Certificates inventory](../../../images/ecn-viewer/15.png)

## 5) MessageBus (NATs) Management

MessageBus pages expose NATs operator, account, and user operations directly in the UI.

![NATs operators view](../../../images/ecn-viewer/16.png)

![NATs accounts with selected account details](../../../images/ecn-viewer/17.png)

![NATs users list](../../../images/ecn-viewer/18.png)

![NATs user details, JWT, and actions](../../../images/ecn-viewer/19.png)

NATs account rules are managed under **Access Control**.

![NATs account rules](../../../images/ecn-viewer/20.png)

## 6) Events and Audit Trail

Use **Events** to audit API activity. Filters support endpoint type, status, method, resource type, actor, and time range.

![Events with filtering and export controls](../../../images/ecn-viewer/21.png)

## Operational Scope

- ECN Viewer covers day-to-day management, observability, and audit workflows.
- Initial platform installation and some bootstrap tasks are still handled with `iofogctl`.

<aside class="notifications contribute">
  <h3><img src="../../../images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/ECN-Viewer/ecn-viewer.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
