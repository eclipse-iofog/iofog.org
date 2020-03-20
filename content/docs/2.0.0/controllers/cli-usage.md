# Legacy Controller CLI Usage

Please see iofogctl for current CLI usage: [iofogctl](../tools/iofogctl/usage.html)

```sh
iofog-controller <command> <action> <options>
```

## Commands

|                               |                                               |
| ----------------------------- | --------------------------------------------- |
| [start](#start)               | Start iofog-controller service.               |
| [stop](#stop)                 | Stop iofog-controller service.                |
| [controller](#controller)     | Display iofog-controller service information. |
| [help](#help)                 | Display usage information.                    |
| [user](#user)                 | User operations.                              |
| [config](#config)             | Set/Display iofog-controller service config.  |
| [connector](#connector)       | Connector operations.                         |
| [tunnel](#tunnel)             | Tunnel operations.                            |
| [iofog](#iofog)               | ioFog node operations.                        |
| [catalog](#catalog)           | Microservices catalog operations.             |
| [flow](#flow)                 | Application flow operations.                  |
| [microservice](#microservice) | Microservice instance operations.             |
| [registry](#registry)         | Registries instance operations.               |
| [diagnostics](#diagnostics)   | Diagnostic instance operations.               |

---

## start

Start the iofog-controller daemon

```sh
iofog-controller start
```

---

## stop

Stop the iofog-controller daemon

```sh
iofog-controller stop
```

---

## controller

Display iofog-controller service information.

```sh
iofog-controller controller <action> <options>
```

#### Actions

|                      |                                           |
| -------------------- | ----------------------------------------- |
| **status**           | Display iofog-controller service status.  |
| **email-activation** | Is email activation.                      |
| **fog-types**        | List all Fog-types.                       |
| **version**          | Display iofog-controller service version. |

---

## help

Display the help document

```sh
iofog-controller help
```

---

## user

User operations.

```sh
iofog-controller user <action> <options>
```

#### Actions

|                    |                            |
| ------------------ | -------------------------- |
| **add**            | Add a new user.            |
| **update**         | Update existing user.      |
| **remove**         | Delete a user.             |
| **list**           | List all users.            |
| **generate-token** | Generate token for a user. |
| **activate**       | Activate a user.           |
| **suspend**        | Suspend a user.            |

#### Options

##### add

|                             |                      |
| --------------------------- | -------------------- |
| **-f, --first-name string** | User's first name    |
| **-l, --last-name string**  | User's last name     |
| **-e, --email string**      | User's email address |
| **-p, --password string**   | User's password      |

```sh
iofog-controller user add \
  --first-name test1 \
  --last-name test2 \
  --email test@example.com \
  --password password1
```

##### update

|                             |                      |
| --------------------------- | -------------------- |
| **-f, --first-name string** | User's first name    |
| **-l, --last-name string**  | User's last name     |
| **-e, --email string**      | User's email address |
| **-p, --password string**   | User's password      |

##### remove

|                         |                      |
| ----------------------- | -------------------- |
| **-e, --email string**  | User's email address |
| **-F, --force boolean** | User's force delete  |

##### generate-token

|                        |                      |
| ---------------------- | -------------------- |
| **-e, --email string** | User's email address |

##### activate

|                        |                      |
| ---------------------- | -------------------- |
| **-e, --email string** | User's email address |

##### suspend

|                        |                      |
| ---------------------- | -------------------- |
| **-e, --email string** | User's email address |

---

## config

Set/Display iofog-controller service config.

```sh
iofog-controller config <options>
```

#### Actions

|                      |                                  |
| -------------------- | -------------------------------- |
| **add**              | Change current configuration.    |
| **list**             | List current configuration.      |
| **dev-mode**         | Enable/disable developer mode.   |
| **email-activation** | Enable/disable email activation. |

#### Options

##### add

|                                    |                                           |
| ---------------------------------- | ----------------------------------------- |
| **-p, --port integer**             | Port                                      |
| **-c, --ssl-cert string**          | Path to SSL certificate file              |
| **-k, --ssl-key string**           | Path to SSL key file                      |
| **-i, --intermediate-cert string** | Path to SSL intermediate certificate file |
| **-h, --home-url string**          | Home page url for email activation links  |
| **-a, --email-address string**     | Email address to send activations from    |
| **-w, --email-password string**    | Email password to send activations from   |
| **-s, --email-service string**     | Email service to send activations         |
| **-d, --log-dir string**           | Path to log files directory               |
| **-z, --log-size integer**         | Log files size (MB)                       |

##### dev-mode

|               |                  |
| ------------- | ---------------- |
| **-o, --on**  | Enable dev mode  |
| **-f, --off** | Disable dev mode |

##### email-activation

|               |         |
| ------------- | ------- |
| **-o, --on**  | Enable  |
| **-f, --off** | Disable |

---

## connector

Connector operations.

```sh
iofog-controller connector <action> <options>
```

#### Actions

|            |                               |
| ---------- | ----------------------------- |
| **add**    | Add a new Connector.          |
| **update** | Update an existing Connector. |
| **remote** | Delete a Connector.           |
| **list**   | List all Connectors.          |

#### Options

##### add

|                            |                                 |
| -------------------------- | ------------------------------- |
| **-n, --name string**      | Connector name                  |
| **-d, --domain string**    | Connector domain name           |
| **-i, --public-ip string** | Connector public IP address     |
| **-c, --cert string**      | Certificate                     |
| **-S, --self-signed-on**   | Switch on self-signed enabled   |
| **-s, --self-signed-off**  | Switch off self-signed disabled |
| **-H, --dev-mode-on**      | Switch on dev mode              |
| **-h, --dev-mode-off**     | Switch off dev mode             |

##### update

|                            |                                 |
| -------------------------- | ------------------------------- |
| **-n, --name string**      | Connector name                  |
| **-d, --domain string**    | Connector domain name           |
| **-i, --public-ip string** | Connector public IP address     |
| **-c, --cert string**      | Certificate                     |
| **-S, --self-signed-on**   | Switch on self-signed enabled   |
| **-s, --self-signed-off**  | Switch off self-signed disabled |
| **-H, --dev-mode-on**      | Switch on dev mode              |
| **-h, --dev-mode-off**     | Switch off dev mode             |

##### remove

|                            |                             |
| -------------------------- | --------------------------- |
| **-i, --public-ip string** | Connector public IP address |

## Config Locations

Config files are located in project. There are 3 config files:

#### default.json (general data that is used for default values)

```json
{
  "App": {
    "Name": "iofog-controller"
  },
  "Server": {
    "Port": 54421,
    "DevMode": false
  },
  "Email": {
    "ActivationEnabled": false,
    "HomeUrl": "https://google.com"
  },
  "Service": {
    "LogsDirectory": "/var/log/iofog-controller",
    "LogsFileSize": 1048576
  },
  "Settings": {
    "UserTokenExpirationIntervalSeconds": 3600,
    "FogTokenExpirationIntervalSeconds": 3600
  },
  "Diagnostics": {
    "DiagnosticDir": "diagnostic"
  }
}
```

#### development.json (data for dev environment)

```json
{
  "App": {
    "Name": "iofog-controller-dev"
  },
  "Server": {
    "Port": 51121,
    "DevMode": true
  },
  "Email": {
    "ActivationEnabled": false,
    "HomeUrl": "https://google.com"
  },
  "Service": {
    "LogsDirectory": "/var/log/iofog-controller",
    "LogsFileSize": 1048576
  },
  "Settings": {
    "UserTokenExpirationIntervalSeconds": 360000,
    "FogTokenExpirationIntervalSeconds": 3600000
  },
  "Tunnel": {
    "Username": "username",
    "Password": "password",
    "Host": "23.253.111.231",
    "RsaKey": "rsa",
    "Lport": 22,
    "PortRange": "2000-10000"
  },
  "Diagnostics": {
    "DiagnosticDir": "diagnostic"
  }
}
```

#### production.json (production data)

```json
{
  "App": {
    "Name": "iofog-controller"
  },
  "Server": {
    "Port": 54421,
    "DevMode": true
  },
  "Email": {
    "ActivationEnabled": false
  },
  "Settings": {
    "UserTokenExpirationIntervalSeconds": 3600,
    "FogTokenExpirationIntervalSeconds": 3600
  }
}
```

---

## tunnel

Tunnel operations.

```sh
iofog-controller tunnel <action> <options>
```

#### Actions

|            |                                             |
| ---------- | ------------------------------------------- |
| **update** | Update existing tunnel or create a new one. |
| **list**   | List all tunnels.                           |

#### Options

##### update

|                             |                                          |
| --------------------------- | ---------------------------------------- |
| **-a, --action string**     | Type of action: can be 'open' or 'close' |
| **-u, --username string**   | Tunnel username                          |
| **-p, --password string**   | Tunnel password                          |
| **-s, --host string**       | Tunnel host address                      |
| **-k, --rsa-key string**    | Path to RSA key file                     |
| **-o, --port integer**      | Tunnel port                              |
| **-i, --iofog-uuid string** | ioFog node UUID                          |

```sh
iofog-controller tunnel update \
  --action close \
  --username dmitry \
  --password dpass \
  --host 127.12.14.52 \
  --rsa-key /home/dmitrys/documents/rsa.txt \
  --port 22 \
  --iofog-uuid NH44VjVFnr8946Yr8HPRrJdFZgLN8k7j
```

---

## iofog

ioFog node operations.

```sh
iofog-controller iofog <action> <options>
```

#### Actions

|                      |                                         |
| -------------------- | --------------------------------------- |
| **add**              | Add a new ioFog node.                   |
| **update**           | Update existing ioFog node.             |
| **remove**           | Delete an ioFog node.                   |
| **list**             | List all ioFog nodes.                   |
| **info**             | Get ioFog node settings.                |
| **provisioning-key** | Get provisioning key for an ioFog node. |
| **reboot**           | Reboot ioFog node.                      |
| **prune**            | Prune ioFog node.                       |
| **version**          | Change agent version of ioFog node.     |
| **hal-hw**           | Get HAL Hardware ioFog node data.       |
| **hal-usb**          | Get HAL USB ioFog node data.            |

#### Options

##### add

|                                            |                                                           |
| ------------------------------------------ | --------------------------------------------------------- |
| **-u, --user-id integer**                  | User's id                                                 |
| **-f, --file string**                      | Path to ioFog settings JSON file                          |
| **-n, --name string**                      | ioFog node name                                           |
| **-l, --location string**                  | ioFog node location                                       |
| **-t, --latitude float**                   | ioFog node latitude                                       |
| **-g, --longitude float**                  | ioFog node longitude                                      |
| **-d, --description string**               | ioFog node description                                    |
| **-D, --docker-url string**                | ioFog node docker url                                     |
| **-M, --disk-limit float**                 | ioFog node disk usage limit (MB)                          |
| **-T, --disk-directory string**            | ioFog node disk directory                                 |
| **-m, --memory-limit float**               | ioFog node memory usage limit (MB)                        |
| **-c, --cpu-limit float**                  | ioFog node CPU usage limit (%)                            |
| **-G, --log-limit float**                  | ioFog node log size limit (MB)                            |
| **-Y, --log-directory string**             | ioFog node log files directory                            |
| **-C, --log-file-count integer**           | ioFog node log files count                                |
| **-s, --status-frequency integer**         | ioFog node status check frequency (seconds)               |
| **-F, --change-frequency integer**         | ioFog node configuration change check frequency (seconds) |
| **-Q, --device-frequency integer**         | ioFog node device scan frequency (seconds)                |
| **-B, --bluetooth-enable**                 | Enable bluetooth on ioFog node                            |
| **-b, --bluetooth-disable**                | Disable bluetooth on ioFog node                           |
| **-W, --watchdog-enable**                  | Enable watchdog on ioFog node                             |
| **-w, --watchdog-disable**                 | Disable watchdog on ioFog node                            |
| **-a, --abs-hw-disable**                   | Disable hardware abstraction on ioFog node                |
| **-A, --abs-hw-enable**                    | Enable hardware abstraction on ioFog node                 |
| **-o, --reboot**                           | Reboot ioFog node                                         |
| **-y, --fog-type integer**                 | ioFog node architecture type                              |
| **-L, --log-level string**                 | ioFog node log level                                      |
| **-p, --docker-pruning-frequency integer** | ioFog node docker pruning frequency (hours)               |
| **-k, --disk-threshold integer**           | ioFog node disk threshold (%)                             |
| **-e, --prune**                            | Prune ioFog node                                          |

##### update

|                                            |                                                           |
| ------------------------------------------ | --------------------------------------------------------- |
| **-u, --user-id integer**                  | User's id                                                 |
| **-f, --file string**                      | Path to ioFog settings JSON file                          |
| **-n, --name string**                      | ioFog node name                                           |
| **-l, --location string**                  | ioFog node location                                       |
| **-t, --latitude float**                   | ioFog node latitude                                       |
| **-g, --longitude float**                  | ioFog node longitude                                      |
| **-d, --description string**               | ioFog node description                                    |
| **-D, --docker-url string**                | ioFog node docker url                                     |
| **-M, --disk-limit float**                 | ioFog node disk usage limit (MB)                          |
| **-T, --disk-directory string**            | ioFog node disk directory                                 |
| **-m, --memory-limit float**               | ioFog node memory usage limit (MB)                        |
| **-c, --cpu-limit float**                  | ioFog node CPU usage limit (%)                            |
| **-G, --log-limit float**                  | ioFog node log size limit (MB)                            |
| **-Y, --log-directory string**             | ioFog node log files directory                            |
| **-C, --log-file-count integer**           | ioFog node log files count                                |
| **-s, --status-frequency integer**         | ioFog node status check frequency (seconds)               |
| **-F, --change-frequency integer**         | ioFog node configuration change check frequency (seconds) |
| **-Q, --device-frequency integer**         | ioFog node device scan frequency (seconds)                |
| **-B, --bluetooth-enable**                 | Enable bluetooth on ioFog node                            |
| **-b, --bluetooth-disable**                | Disable bluetooth on ioFog node                           |
| **-W, --watchdog-enable**                  | Enable watchdog on ioFog node                             |
| **-w, --watchdog-disable**                 | Disable watchdog on ioFog node                            |
| **-a, --abs-hw-disable**                   | Disable hardware abstraction on ioFog node                |
| **-A, --abs-hw-enable**                    | Enable hardware abstraction on ioFog node                 |
| **-o, --reboot**                           | Reboot ioFog node                                         |
| **-y, --fog-type integer**                 | ioFog node architecture type                              |
| **-L, --log-level string**                 | ioFog node log level                                      |
| **-p, --docker-pruning-frequency integer** | ioFog node docker pruning frequency (hours)               |
| **-k, --disk-threshold integer**           | ioFog node disk threshold (%)                             |
| **-e, --prune**                            | Prune ioFog node                                          |

##### remove

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### info

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### provisioning-key

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### reboot

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### prune

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### version

|                                  |                                                |
| -------------------------------- | ---------------------------------------------- |
| **-i, --iofog-uuid string**      | ioFog node UUID                                |
| **-v, --version-command string** | ioFog version command &lt;upgrade/rollback&gt; |

##### hal-hw

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

##### hal-usb

|                             |                 |
| --------------------------- | --------------- |
| **-i, --iofog-uuid string** | ioFog node UUID |

---

## catalog

Microservices catalog operations for your configured registries.

```sh
iofog-controller catalog <action> <options>
```

#### Actions

|            |                               |
| ---------- | ----------------------------- |
| **add**    | Add a new catalog item.       |
| **update** | Update existing catalog item. |
| **remove** | Delete a catalog item.        |
| **list**   | List all catalog items.       |
| **info**   | Get catalog item settings.    |

#### Options

##### add

|                                 |                                                      |
| ------------------------------- | ---------------------------------------------------- |
| **-u, --user-id integer**       | User's id                                            |
| **-f, --file string**           | Path to catalog item settings JSON file              |
| **-n, --name string**           | Catalog item name                                    |
| **-d, --description string**    | Catalog item description                             |
| **-c, --category string**       | Catalog item category                                |
| **-x, --x86-image string**      | x86 docker image name                                |
| **-a, --arm-image string**      | ARM docker image name                                |
| **-p, --publisher string**      | Catalog item publisher name                          |
| **-s, --disk-required integer** | Amount of disk required to run the microservice (MB) |
| **-r, --ram-required integer**  | Amount of RAM required to run the microservice (MB)  |
| **-t, --picture string**        | Catalog item picture                                 |
| **-P, --public**                | Public catalog item                                  |
| **-V, --private**               | Private catalog item                                 |
| **-g, --registry-id integer**   | Catalog item docker registry ID                      |
| **-I, --input-type string**     | Catalog item input type                              |
| **-F, --input-format string**   | Catalog item input format                            |
| **-O, --output-type string**    | Catalog item output type                             |
| **-T, --output-format string**  | Catalog item output format                           |
| **-X, --config-example string** | Catalog item config example                          |

##### update

|                                 |                                                     |
| ------------------------------- | --------------------------------------------------- |
| **-i, --item-id integer**       | Catalog item ID                                     |
| **-f, --file string**           | Path to catalog item settings JSON file             |
| **-n, --name string**           | Catalog item name                                   |
| **-d, --description string**    | Catalog item description                            |
| **-c, --category string**       | Catalog item category                               |
| **-x, --x86-image string**      | x86 docker image name                               |
| **-a, --arm-image string**      | ARM docker image name                               |
| **-p, --publisher string**      | Catalog item publisher name                         |
| **-s, --disk-required integer** | Amount of disk required to run the microservice (MB |
| **-r, --ram-required integer**  | Amount of RAM required to run the microservice (MB  |
| **-t, --picture string**        | Catalog item picture                                |
| **-P, --public**                | Public catalog item                                 |
| **-V, --private**               | Private catalog item                                |
| **-g, --registry-id integer**   | Catalog item docker registry ID                     |
| **-I, --input-type string**     | Catalog item input type                             |
| **-F, --input-format string**   | Catalog item input format                           |
| **-O, --output-type string**    | Catalog item output type                            |
| **-T, --output-format string**  | Catalog item output format                          |
| **-X, --config-example string** | Catalog item config example                         |

##### remove

|                           |                 |
| ------------------------- | --------------- |
| **-i, --item-id integer** | Catalog item ID |

##### info

|                           |                 |
| ------------------------- | --------------- |
| **-i, --item-id integer** | Catalog item ID |

---

## flow

Application flow operations.

```sh
iofog-controller flow <action> <options>
```

#### Actions

|            |                       |
| ---------- | --------------------- |
| **add**    | Add a new flow.       |
| **update** | Update existing flow. |
| **remove** | Delete a flow.        |
| **list**   | List all flows.       |
| **info**   | Get flow settings.    |

#### Options

##### add

|                              |                                             |
| ---------------------------- | ------------------------------------------- |
| **-u, --user-id integer**    | User's id                                   |
| **-f, --file string**        | Path to application flow settings JSON file |
| **-n, --name string**        | Application flow name                       |
| **-d, --description string** | Application flow description                |
| **-a, --activate**           | Activate application flow                   |
| **-D, --deactivate**         | Deactivate application flow                 |

##### update

|                              |                                             |
| ---------------------------- | ------------------------------------------- |
| **-i, --flow-id integer**    | Application flow ID                         |
| **-f, --file string**        | Path to application flow settings JSON file |
| **-n, --name string**        | Application flow name                       |
| **-d, --description string** | Application flow description                |
| **-a, --activate**           | Activate application flow                   |
| **-D, --deactivate**         | Deactivate application flow                 |

##### remove

|                           |                     |
| ------------------------- | ------------------- |
| **-i, --flow-id integer** | Application flow ID |

##### info

|                           |                     |
| ------------------------- | ------------------- |
| **-i, --flow-id integer** | Application flow ID |

---

## microservice

Microservice instance operations.

```sh
iofog-controller microservice <action> <options>
```

#### Actions

|                           |                                     |
| ------------------------- | ----------------------------------- |
| **add**                   | Add a new microservice.             |
| **update**                | Update existing microservice.       |
| **remove**                | Delete a microservice.              |
| **list**                  | List all microservices.             |
| **info**                  | Get microservice settings.          |
| **route-create**          | Create microservice route.          |
| **route-remove**          | Remove microservice route.          |
| **port-mapping-create**   | Create microservice port mapping.   |
| **port-mapping-remove**   | Remove microservice port mapping.   |
| **port-mapping-list**     | List microservice port mapping.     |
| **volume-mapping-create** | Create microservice volume mapping. |
| **volume-mapping-remove** | Remove microservice volume mapping. |
| **volume-mapping-list**   | List microservice volume mapping.   |

#### Options

##### add

|                              |                                                 |
| ---------------------------- | ----------------------------------------------- |
| **-u, --user-id integer**    | User's id                                       |
| **-f, --file string**        | Path to microservice settings JSON file         |
| **-n, --name string**        | Microservice name                               |
| **-c, --catalog-id integer** | Catalog item ID                                 |
| **-F, --flow-id integer**    | Application flow ID                             |
| **-I, --iofog-uuid string**  | ioFog node UUID                                 |
| **-g, --config string**      | Microservice config                             |
| **-v, --volumes string[]**   | Microservice volume mapping(s)                  |
| **-l, --log-size integer**   | Log file size limit (MB)                        |
| **-r, --root-enable**        | Enable root access                              |
| **-R, --root-disable**       | Disable root access                             |
| **-p, --ports string[]**     | Container ports                                 |
| **-t, --routes string[]**    | Microservice route(s) (receiving microservices) |
| **-e, --env string[]**       | Microservice environemnt variable(s)            |
| **-C, --cmd string[]**       | Microservice container command and argument(s)  |
| **-x, --x86-image string**   | x86 docker image name                           |
| **-a, --arm-image string**   | ARM docker image name                           |

```sh
# Single mapping
iofog-controller microservice add \
  --volumes /host_src:/container_src:rw \
  --env KEY=value --cmd bash \
  [other required options]

# Multiple mappings
iofog-controller microservice add \
  --volumes /host_src:/container_src:rw /host_bin:/container_bin:r \
  [other required options]

# Port mapping (80:8080:false - internal port : external port : public mode)
iofog-controller microservice add \
  --ports 80:8080:false 443:5443:false \
  [other required options]

# Add routes (ABC:DEF - source microservice UUID : dest microservice UUID)
iofog-controller microservice add \
  --routes ABC:DEF RFG:HJK \
  [other required options]
```

##### update

|                                    |                                                |
| ---------------------------------- | ---------------------------------------------- |
| **-i, --microservice-uuid string** | Microservice UUID                              |
| **-f, --file string**              | Path to microservice settings JSON file        |
| **-n, --name string**              | Microservice name                              |
| **-F, --flow-id string**           | Application flow ID                            |
| **-I, --iofog-uuid string**        | ioFog node UUID                                |
| **-g, --config string**            | Microservice config                            |
| **-v, --volumes string[]**         | Microservice volume mapping(s)                 |
| **-l, --log-size integer**         | Log file size limit (MB)                       |
| **-r, --root-enable**              | Enable root access                             |
| **-R, --root-disable**             | Disable root access                            |
| **-w, --rebuild**                  | Rebuild microservice image on fog agent        |
| **-e, --env string[]**             | Microservice environemnt variable(s)           |
| **-C, --cmd string[]**             | Microservice container command and argument(s) |
| **-x, --x86-image string**         | x86 docker image name                          |
| **-a, --arm-image string**         | ARM docker image name                          |

```sh
iofog-controller update \
  --microservice-uuid <microservice-uuid> \
  --volumes {'hostDestination':'/var1/dest','containerDestination':'/var/dest','accessMode':'w'} \
  --name testcli
```

##### remove

|                                    |                                  |
| ---------------------------------- | -------------------------------- |
| **-i, --microservice-uuid string** | Microservice UUID                |
| **-z, --cleanUp**                  | Delete microservice with cleanup |

##### info

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |

##### route-create

|                        |                                              |
| ---------------------- | -------------------------------------------- |
| **-T, --route string** | Microservice route (receiving microservices) |

```sh
# Add route (ABC:DEF - source microservice uuid : dest microservice uuid)
iofog-controller microservice route-create \
  --route ABC:DEF
```

##### route-remove

|                        |                                              |
| ---------------------- | -------------------------------------------- |
| **-T, --route string** | Microservice route (receiving microservices) |

```sh
# Delete route (ABC:DEF - source microservice uuid : dest microservice uuid)
iofog-controller microservice route-remove \
  --route ABC:DEF
```

##### port-mapping-create

|                                    |                        |
| ---------------------------------- | ---------------------- |
| **-i, --microservice-uuid string** | Microservice UUID      |
| **-P, --mapping string**           | Container port mapping |

```sh
# Create port mapping (80:8080:false - internal port : external port : public mode, ABC - microservice)
iofog-controller microservice port-mapping-create \
  --mapping 80:8080:false \
  --microservice-uuid ABC
```

##### port-mapping-remove

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |
| **-b, --internal-port integer**    | Internal port     |

```sh
# Delete port mapping (80 - internal port, ABC - microservice uuid)
iofog-controller microservice port-mapping-remove \
  --internal-port 80 \
  --microservice-uuid ABC
```

##### port-mapping-list

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |

##### volume-mapping-create

|                                    |                        |
| ---------------------------------- | ---------------------- |
| **-i, --microservice-uuid string** | Microservice UUID      |
| **-P, --mapping string**           | Container port mapping |

```sh
# Create volume mapping
iofog-controller microservice volume-mapping-create \
  --mapping /host_src:/container_src:rw \
  --microservice-uuid ABC
```

##### volume-mapping-remove

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |
| **-a, --mapping-id integer**       | Volume mapping id |

```sh
# Delete volume mapping
iofog-controller microservice volume-mapping-remove \
  --microservice-uuid ABC \
  --mapping-id 1
```

##### volume-mapping-list

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |

---

## registry

Registries instance operations.

```sh
iofog-controller registry <action> <options>
```

#### Actions

|            |                      |
| ---------- | -------------------- |
| **add**    | Add a new Registry.  |
| **update** | Update a Registry.   |
| **remove** | Delete a Registry.   |
| **list**   | List all Registries. |

#### Options

##### add

|                                |                         |
| ------------------------------ | ----------------------- |
| **-U, --uri string**           | Registry URI            |
| **-b, --public**               | Set registry as public  |
| **-r, --private**              | Set registry as private |
| **-l, --username string**      | Registry's user name    |
| **-p, --password string**      | Password                |
| **-c, --requires-certificate** | Requires certificate    |
| **-C, --certificate string**   | Certificate             |
| **-e, --email string**         | Email address           |
| **-u, --user-id integer**      | User's id               |

##### update

|                                |                         |
| ------------------------------ | ----------------------- |
| **-i, --item-id integer**      | Registry id             |
| **-U, --uri string**           | Registry URI            |
| **-b, --public**               | Set registry as public  |
| **-r, --private**              | Set registry as private |
| **-l, --username string**      | Registry's user name    |
| **-p, --password string**      | Password                |
| **-c, --requires-certificate** | Requires certificate    |
| **-C, --certificate string**   | Certificate             |
| **-e, --email string**         | Email address           |

##### remove

|                           |           |
| ------------------------- | --------- |
| **-i, --item-id integer** | Item's id |

---

## diagnostics

Diagnostic instance operations.

```sh
iofog-controller diagnostics <action> <options>
```

#### Actions

|                           |                                                           |
| ------------------------- | --------------------------------------------------------- |
| **strace-update**         | Change microservice strace status to enabled or disabled. |
| **strace-info**           | Get microservice strace data.                             |
| **strace-ftp-post**       | Post microservice strace data to ftp.                     |
| **image-snapshot-create** | Create microservice image snapshot.                       |
| **image-snapshot-get**    | Get microservice image snapshot.                          |

#### Options

##### strace-update

|                                    |                             |
| ---------------------------------- | --------------------------- |
| **-i, --microservice-uuid string** | Microservice UUID           |
| **-e, --enable**                   | Enable microservice strace  |
| **-o, --disable**                  | Disable microservice strace |

##### strace-info

|                                    |                                  |
| ---------------------------------- | -------------------------------- |
| **-i, --microservice-uuid string** | Microservice UUID                |
| **-f, --format string**            | Format of strace data to receive |

##### strace-ftp-post

|                                    |                           |
| ---------------------------------- | ------------------------- |
| **-i, --microservice-uuid string** | Microservice UUID         |
| **--h, --ftpHost string**          | FTP host                  |
| **--p, --ftpPort integer**         | FTP port                  |
| **--u, --ftpUser string**          | FTP user                  |
| **--s, --ftpPass string**          | FTP user password         |
| **--d, --ftpDestDir string**       | FTP destination directory |

##### image-snapshot-create

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |

##### image-snapshot-get

|                                    |                   |
| ---------------------------------- | ----------------- |
| **-i, --microservice-uuid string** | Microservice UUID |
