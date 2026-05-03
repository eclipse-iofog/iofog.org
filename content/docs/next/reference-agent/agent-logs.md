
# Agent Logs

Analyze and explore your logs for troubleshooting.

**Streaming logs:** Agent logs can be streamed via **WebSocket** (exec-style session), similar to microservice logs. ECN-Viewer and iofogctl support this so you can tail Agent logs in real time. See [Microservice Logs](../applications/microservice-logs.html) and the ECN-Viewer documentation for the unified log/exec experience.

```bash

iofogctl logs agent --help
Get log contents of deployed resource

Usage:
  iofogctl logs RESOURCE NAME [flags]

Examples:
iofogctl logs controller   NAME
              agent        NAME
              microservice AppName/MsvcName

Flags:
      --follow         Follow log output (default true)
  -h, --help           help for logs
      --since string   Start time in ISO 8601 format (e.g., 2024-01-01T00:00:00Z)
      --tail int       Number of lines to tail (range: 1-10000) (default 100)
      --until string   End time in ISO 8601 format (e.g., 2024-01-02T00:00:00Z)

Global Flags:
      --debug              Toggle for displaying verbose output of API clients (HTTP and SSH)
  -n, --namespace string   Namespace to execute respective command within (default "default")
  -v, --verbose            Toggle for displaying verbose output of iofogctl

```

### Default log file storage location: `/var/log/iofog-agent`

### Log format: `JSON`

The JSON log format makes it easy to export logs to other programs or to a logging service.

### Sample log:

```bash
{"timestamp":"2021-03-01T14:20:04.282+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"main","module":"Supervisor","message":" Starting Process Manager"}
{"timestamp":"2021-03-01T14:20:04.286+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"main","module":"Supervisor","message":" Started Process Manager"}
{"timestamp":"2021-03-01T14:20:04.290+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"PMCT","module":"Process Manager","message":"WAITING FOR NEW TASK"}
{"timestamp":"2021-03-01T14:20:04.291+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"main","module":"Supervisor","message":" Starting ResourceManager"}
{"timestamp":"2021-03-01T14:20:04.292+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"main","module":"Supervisor","message":" Started ResourceManager"}
{"timestamp":"2021-03-01T14:20:04.297+1300","level":"WARNING","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"RMUD","module":"Field Agent","message":"Not provisioned"}
{"timestamp":"2021-03-01T14:20:04.298+1300","level":"WARNING","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"RMUD","module":"Field Agent","message":"Not provisioned"}
{"timestamp":"2021-03-01T14:20:04.299+1300","level":"INFO","agent_id":"","pid":2670,"hostname":"iofog-agent","thread":"main","module":"Supervisor","message":" Starting Tracker"}

```

### Logging field names

- **timestamp**: Timestamp in RFC3339 format with millisecond precision, e.g. 2002-10-02T15:00:00.005-06:00

- **level**: `INFO, WARNING, FINE, FINER, FINEST, SEVERE`

- **agent_id**: the iofog agent id.

- **pid**: process id.

- **hostname**: hostname, e.g. localhost

- **thread**: thread name or identififer.

- **module**: name of the process.

- **message**: body of the log message.

- **stacktrace**: contents of a stacktrace.


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/reference-agent/agent-logs.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
