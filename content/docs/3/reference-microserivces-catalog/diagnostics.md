# System: Diagnostics Microservice

The Diagnostics Container performs diagnostics of basic functionality to work with ioFog.

Use the Diagnostic Container if something goes wrong on your machine with ioFog Agent, e.g. a container cannot connect to ioFog host, ioFog client is not created, RestBlue or Log Container are not available, and so on.

With the detailed report that the Diagnostics Container creates, you can be aware of the issues that may arise.

## Diagnostics Container performs the following checks:

- Client creation (tries to create ioFog client that checks if all the required parameters are provided)
- Tries to update config (tries to get ioFog config, ping report_url provided from config)
- Sends HEARTBEAT “signal” to report_url (every 30 sec if not specified)
- Tries to connect to Sockets (Control and Message Websockets)
- Checks if RestBlue is available (connects to RestBlue System Container)
- Checks if Log Container is available (connects to Log System Container).<br>

## Examples of configuration JSONs:

The full config for the container should look the following way:

```json
{
  "report_url": {
    "ip": "127.0.0.1",
    "host": "localhost",
    "port": 6666,
    "url": "/report",
    "secure": false
  },
  "ping_rb": true,
  "ping_logger": true,
  "interval": 60
}
```

If "report_url" is not provided or is not available then whole output will be logged to console. Following example is valid and can be used if you don't need to send logs outside:

```json
{
  "ping_rb": true,
  "ping_logger": true,
  "interval": 60
}
```

## Config explanation:

|               |                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| "report_url"  | config specifying where to send logs (log to console; not required parameter)                                          |
| "ip"          | ip of machine for log reporting (used when host is unreachable)                                                        |
| "host"        | host of machine for log reporting                                                                                      |
| "port"        | port of listening server that is ready for log receiving (if not specified, assumed to be 80)                          |
| "url"         | relative url where to send config                                                                                      |
| "secure"      | set this parameter to "true" if you want to use https protocol (if not specified, assumed to be "false" and uses http) |
| "ping_rb"     | connect to RestBlue System Container if true is set                                                                    |
| "ping_logger" | connect to Log System Container if true is set                                                                         |
| "interval"    | perform checks after the specified interval; every 30 sec if not specified                                             |

## Launching the Container

The `Diagnostic` images will always be available on ioFog Controllers using the catalog item ID `4`.

Please refer to the [catalog overview](../applications/microservice-registry-catalog.html) if you don't know yet how to deploy microservices using catalog items.

## Diagnostics output is the detailed logs about system functionality.

You can retrieve the console logs of any microservice by running `iofogctl logs microservice MICROSERVICE_NAME`

```console
$ iofogctl logs microservice Diagnostic
```

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.0/reference-microserivces-catalog/diagnostics.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
