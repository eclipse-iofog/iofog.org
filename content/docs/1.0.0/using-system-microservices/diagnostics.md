## Diagnostics Container

The Diagnostics Container performs diagnostics of basic functionality to work with ioFog.

Use the Diagnostic Container if something goes wrong on your machine with ioFog Agent, e.g. Connectors are not available, a container cannot connect to ioFog host, ioFog client is not created, RestBlue or Log Container are not available, and so on.

With the detailed report that the Diagnostics Container creates, you can be aware of the issues that may arise.

### Diagnostics Container performs the following checks:

- Client creation (tries to create ioFog client that checks if all the required parameters are provided)
- Tries to update config (tries to get ioFog config, ping report_url provided from config)
- Sends HEARTBEAT “signal” to report_url (every 30 sec if not specified)
- Tries to connect to Sockets (Control and Message Websockets)
- Checks if Connectors are available (pings list of Connectors’ IPs provided in config)
- Checks if RestBlue is available (connects to RestBlue System Container)
- Checks if Log Container is available (connects to Log System Container).<br>

### Examples of configuration JSONs:

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
  "connector_list": ["192.0.0.1", "192.168.0.17", "12.12.3.123"],
  "ping_rb": true,
  "ping_logger": true,
  "interval": 60
}
```

If "report_url" is not provided or is not available then whole output will be logged to console. Following example is valid and can be used if you don't need to send logs outside:

```json
{
  "connector_list": ["192.0.0.1", "192.168.0.17", "12.12.3.123"],
  "ping_rb": true,
  "ping_logger": true,
  "interval": 60
}
```

### Config explanation:

|                  |                                                                                                                        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| "report_url"     | config specifying where to send logs (log to console; not required parameter)                                          |
| "ip"             | ip of machine for log reporting (used when host is unreachable)                                                        |
| "host"           | host of machine for log reporting                                                                                      |
| "port"           | port of listening server that is ready for log receiving (if not specified, assumed to be 80)                          |
| "url"            | relative url where to send config                                                                                      |
| "secure"         | set this parameter to "true" if you want to use https protocol (if not specified, assumed to be "false" and uses http) |
| "connector_list" | list of Connectors that should be pinged                                                                               |
| "ping_rb"        | connect to RestBlue System Container if true is set                                                                    |
| "ping_logger"    | connect to Log System Container if true is set                                                                         |
| "interval"       | perform checks after the specified interval; every 30 sec if not specified                                             |

### Launching the Container

Enter iofog-controller user add -f first-name -l last-name -e email -p password in terminal.
#### catalog-id = 4 for Diagnostics container.

```sh
iofog-controller user add -f <first_name> -l <last_name> -e <email> -p <password>
iofog-controller flow add -n <name> -d <description> -a -u <user_id>
iofog-controller iofog add -n <name> -l <location> -t <latitude> -g <longitude> \
  -d <description> -D <docker_url> -M <disk_limit> -T <disk_directory> \
  -m <memory_limit> -c <cpu_limit> -G <log_limit> -Y <log_directory> \
  -C <log_file_count> -s <status_frequency> -F <change_frequency> \
  -Q <device_frequency> -B -w -a -y <fog_type> -u <user_id>
iofog-controller iofog <provisioning_key> -i <node_id>
iofog-agent provision <provision_key>
iofog-controller microservice add -n <name> -c <catalog_id> -F <flow_id> \
  -I <iofog_id> -g <config> -v <volumes> -l <log_size> -r -p <ports> -u <user_id>
```

### Diagnostics output is the detailed logs about system functionality.

1. Go to Terminal.
2. Get the list of containers with the following command: sudo docker ps in order to use container name for obtaining logs.
3. See the detailed logs about system functionality with the following command: `sudo docker logs CONTAINER_NAME` (the last value is Container Name taken from the output of sudo docker ps).
