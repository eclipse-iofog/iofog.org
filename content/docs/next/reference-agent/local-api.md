
# Agent Local API Reference

- [API Endpoints](#api-endpoints)

The Agent daemon supports a local API with REST-like endpoints as well as WebSockets.

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> SDKs are available!</h3>
    <p>While this API is public, it is a relatively low-level. We have SDK libraries for many popular languages to make it easier <a href="sdk.html"></a> View Available SDKs.</p>
</aside>

## API Endpoints

#### Get Container Configuration

This endpoint provides the current JSON configuration string for the requesting container. Containers identify themselves by their element ID, which is mapped into the container as an environment variable.

##### Endpoint

<pre>
http://iofog:54321/v2/config/get
</pre>

##### Response

```json
{
  "status": "okay",
  "config": "{\"property1\":\"value1\",\"property2\":\"value2\"}"
}
```

##### Querystring Parameters

<pre>
	None
</pre>

##### POST Parameters

```json
{
  "id": "R4b2WPZRbycCzyZBz9tD7BdMWg94YDhQ"

  // Note: The POST value is JSON and must be sent
  // with HTTP header set as “Content-Type:application/json”
}
```

#### Get Control Websocket Connection

This endpoint opens a control Websocket connection for the container. The control commands sent over this Websocket are specified here. It is the responsibility of the container to establish this connection and ensure it is always running. If the container loses the Websocket connection, it should establish a new connection. The Local API is responsible for knowing which Websocket connection belongs to which container so that it can pass information to the appropriate recipients.

The container ID must be passed as part of the URL because otherwise it would have to be passed in the Websocket connection itself and that would make associated connections with container IDs rather difficult.

##### Endpoint

<pre>
ws://iofog:54321/v2/control/socket/id/34t9whefsdfDFKjhw4tiouhwef
</pre>

##### Response

<pre>
None - the Websocket will simply be opened successfully
</pre>

##### Querystring Parameters

<pre>
id - the container ID of the container requesting the Websocket connection (example shown here as 34t9whefsdfDFKjhw4tiouhwef)
</pre>

##### POST Parameters

```json
None
```

##### Transmissions From ioFog To Container

<pre>
Standard "Ping" message (op code 9)
Standard "Pong" message (op code 10)
Acknowledgement message (op code 11)
New container configuration available (op code 12)
</pre>

##### Transmissions From Container To ioFog

<pre>
Standard "Ping" message (op code 9)
Standard "Pong" message (op code 10)
Acknowledgement message (op code 11)
</pre>

#### Get service status

This endpoint return service status, same as cli command `iofog-agent status`.

##### Endpoint

<pre>
http://iofog:54321/v2/status
</pre>

##### Method

<pre>
GET
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
{
  "running-microservices": "string",
  "system-total-cpu": "string",
  "memory-usage": "string",
  "system-available-memory": "string",
  "system-time": "string",
  "disk-usage": "string",
  "connection-to-controller": "string",
  "cpu-usage": "string",
  "messages-processed": "string",
  "system-available-disk": "string",
  "iofog-daemon": "string"
}
```

##### Querystring Parameters

<pre>
None
</pre>

#### Get service info

This endpoint return service info, same as cli command `iofog-agent info`.

##### Endpoint

<pre>
http://iofog:54321/v2/info
</pre>

##### Method

<pre>
GET
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
{
  "log-file-directory": "string",
  "iofog-controller": "string",
  "cpu-usage-limit": "string",
  "developer-mode": "string",
  "post-diagnostics-frequency": "string",
  "docker-url": "string",
  "status-update-frequency": "string",
  "memory-ram-limit": "string",
  "log-disk-limit": "string",
  "isolated-docker-containers-mode": "string",
  "iofog-certificate": "string",
  "ip-address": "string",
  "network-interface": "string",
  "fog-type": "string",
  "disk-usage-limit": "string",
  "iofog-uuid": "string",
  "gps-mode": "string",
  "message-storage-directory": "string",
  "get-changes-frequency": "string",
  "gps-coordinates": "string",
  "log-rolling-file-count": "string",
  "scan-devices-frequency": "string",
  "log-level": "string",
  "docker-pruning-frequency": "string",
  "disk-threshold integer": "string"
}
```

##### Querystring Parameters

<pre>
None
</pre>

#### Get service version

This endpoint return service version, same as cli command `iofog-agent version`.

##### Endpoint

<pre>
http://iofog:54321/v2/version
</pre>

##### Method

<pre>
GET
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
{
  "version": "3.0.0"
}
```

##### Querystring Parameters

<pre>
None
</pre>

#### Attach ioFog Agent to the configured ioFog controller

This endpoint attaches ioFog Agent to the configured ioFog controller, same as cli command `iofog-agent provision <provisioning_key>`.

##### Endpoint

<pre>
http://iofog:54321/v2/provision
</pre>

##### Method

<pre>
POST
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
Success
```

##### Querystring Parameters

<pre>
None
</pre>

##### POST Parameters

```json
{
  "provisioning-key": "string"
}
```

#### Detach ioFog Agent to the configured ioFog controller

This endpoint detaches ioFog Agent to the configured ioFog controller, same as cli command `iofog-agent deprovision`.

##### Endpoint

<pre>
http://iofog:54321/v2/deprovision
</pre>

##### Method

<pre>
DELETE
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
Success
```

##### Querystring Parameters

<pre>
None
</pre>

#### Change ioFog Agent configuration according to the options provided

This endpoint changes ioFog Agent configuration according to the options provided, same as cli command `iofog-agent config`.

##### Endpoint

<pre>
http://iofog:54321/v2/config
</pre>

##### Method

<pre>
POST
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
Success
```

##### Querystring Parameters

<pre>
None
</pre>

##### Post Parameters

```json
{
  "disk-limit": "string",
  "disk-directory": "string",
  "memory-limit": "string",
  "cpu-limit": "string",
  "controller-url": "string",
  "cert-directory": "string",
  "docker-url": "string",
  "network-adapter": "string",
  "logs-limit": "string",
  "logs-directory": "string",
  "logs-count": "string",
  "status-frequency": "string",
  "changes-frequency": "string",
  "diagnostics-frequency": "string",
  "device-scan-frequency": "string",
  "isolated": "string",
  "gps": "string",
  "fog-type": "string",
  "developer-mode": "string",
  "log-level": "string",
  "docker-pruning-frequency": "string",
  "disk-threshold integer": "string"
}
```

##### Querystring Parameters

<pre>
None
</pre>

#### Prune iofog agent

This endpoint prunes ioFog Agent, same as cli command `iofog-agent prune`.

##### Endpoint

<pre>
http://iofog:54321/v2/prune
</pre>

##### Method

<pre>
POST
</pre>

##### Header

<pre>
Authorization (authorization key can be found in /etc/iofog-agent/local-api file)
</pre>

##### Response

```json
Success
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/reference-agent/local-api.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
