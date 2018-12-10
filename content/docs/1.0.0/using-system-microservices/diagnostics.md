## Diagnostics Container
**Diagnostics Container** is a container that performs diagnostics of basic functionality to work with ioFog. <br>
Use the Diagnostic Container if something goes wrong on your machine with ioFog Agent, e.g. Connectors are not available, a container cannot connect to ioFog host, ioFog client is not created, RestBlue or Log Container are not available, and so on.  <br> With the detailed report that the Diagnostics Container creates, you can be aware of the issues that may arise. <br>
 <br>
### Diagnostics Container performs the following checks:
- Client creation (tries to create ioFog client that checks if all the required parameters are provided); <br>
- Tries to update config (tries to get ioFog config, ping report_url provided from config); <br>
- Sends HEARTBEAT “signal” to report_url (every 30 sec if not specified); <br>
- Tries to connect to Sockets (Control and Message Websockets); <br>
- Checks if Connectors are available (pings list of Connectors’ IPs provided in config); <br>
- Checks if RestBlue is available (connects to RestBlue System Container); <br>
- Checks if Log Container is available (connects to Log System Container).<br>
 
### Examples of configuration JSONs: 
The full config for the container should look the following way: <br>
```{ "report_url": { "ip": "127.0.0.1", "host" : "localhost", "port" : 6666, "url" : "/report", "secure" : false }, "connector_list" : [ "192.0.0.1", "192.168.0.17", "12.12.3.123" ], "ping_rb": true, "ping_logger": true, "interval" : 60}``` <br>
If "report_url" is not provided or is not available then whole output will be logged to console. Following example is valid and can be used if you don't need to send logs outside: <br>
```{"connector_list" : [ "192.0.0.1", "192.168.0.17", "12.12.3.123" ], "ping_rb": true, "ping_logger": true, "interval" : 60}``` <br>

### Config explanation: <br>
"report_url": config specifying where to send logs (log to console; not required parameter) <br>
"ip": ip of machine for log reporting (used when host is unreachable) <br>
"host" : host of machine for log reporting <br>
"port" : port of listening server that is ready for log receiving (if not specified, assumed to be 80) <br>
"url" : relative url where to send config <br>
"secure" : set this parameter to "true" if you want to use https protocol (if not specified, assumed to be "false" and uses http) <br>
"connector_list" : list of Connectors that should be pinged <br>
"ping_rb" : connect to RestBlue System Container if true is set <br>
"ping_logger" : connect to Log System Container if true is set <br>
"interval" : perform checks after the specified interval; every 30 sec if not specified <br>

### Launching the Container
Enter iofog-controller user add -f first-name -l last-name -e email -p password in terminal. <br>
Enter iofog-controller flow add -n name -d description -a -u user-id in terminal. <br>
Enter iofog-controller iofog add -n name -l location -t latitude -g longitude -d description -D docker-url -M disk-limit -T disk-directory -m memory-limit -c cpu-limit -G log-limit -Y log-directory -C log-file-count -s status-frequency -F change-frequency -Q device-frequency -B -w -a -y fog-type -u user-id in terminal. <br>
Enter iofog-controller iofog provisioning-key -i node-id in terminal. <br>
Enter iofog-agent provision {provision-key}. <br>
Enter iofog-controller microservice add -n name -c catalog-id -F flow-id -I iofog-id -g config -v volumes -l log-size -r -p ports  -u user-id  in terminal. <br>
**! catalog-id = 4 for Diagnostics container.** <br>

### Diagnostics output is the detailed logs about system functionality.
      1. Go to Terminal.
      2. Get the list of containers with the following command: sudo docker ps in order to use container name for obtaining logs.
      3. See the detailed logs about system functionality with the following command: sudo docker logs CONTAINER_NAME (the last value is Container Name taken from the output of sudo docker ps).
     
![DIAGNOSTICS](https://github.com/ioFog/example-microservices/blob/master/diagnostics/DIAGNOSTICS.png)
