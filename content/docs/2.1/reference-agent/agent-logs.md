# Agent Logs

Analyze and explore your logs for troubleshooting.

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
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.1/reference-agent/agent-logs.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
