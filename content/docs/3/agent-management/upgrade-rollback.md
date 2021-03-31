# Agent Upgrade / Rollback

`iofogctl` provides a means to upgrade your Agents to the latest version and rollback to the previous version following an upgrade.

To upgrade, run the following command:

```bash
iofogctl upgrade agent agent-1
```

The Agent will spend a few minutes upgrading at this point. If the version doesn't change (e.g. via `iofogctl get agents`), then it is possible something went wrong. Review the contents of `/var/log/iofog-agent-upgrade.log` to find the output of the upgrade process on the Agent.

To revert the upgrade, run the rollback command:

```bash
iofogctl rollback agent agent-1
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/agent-management/agent-configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
