---
title: "Controllers CLI Usage"
category: "Controllers"
type: "documentation"
version: "1.0.0"
---

# Controller CLI Usage

```sh
fog-controller <command> <action> <options>
```
## Commands
| | |
| - | - |
| [start](#) | Start fog-controller service. |
| [stop](#) | Stop fog-controller service. |
| [controller](#) | Display fog-controller service information. |
| [help](#) | Display usage information. |
| [user](#) | User operations. |
| [config](#) | Set/Display fog-controller service config. |
| [connector](#) | Connector operations. |
| [proxy](#) | Proxy operations. |
| [iofog](#) | ioFog nodes operations. |
| [catalog](#) | Microservices catalog operations. |
| [flow](#) | Application flow operations. |
| [microservice](#) | Microservice instance operations. |
| [registry](#) | Registries instance operations. |
| [diagnostics](#) | Diagnostic instance operations. |

---

## start
Start the iofog-controller daemon

```sh
fog-controller start
```

---

## stop
Stop the iofog-controller daemon

```sh
fog-controller stop
```

---

## controller
Display fog-controller service information.

```sh
fog-controller controller <action> <options>
```

#### Actions
| | |
| - | - |
| **status** | Display fog-controller service status. |
| **email-activation** |Is email activation. |
| **fog-types** | List all Fog-types. |

---

## help
Display the help document

```sh
fog-controller help
```

---

## user
User operations.

```sh
fog-controller user <action> <options>
```

#### Actions
| | |
| - | - |
| **add** | Add a new user. |
| **update** | Update existing user. |
| **remove** | Delete a user. |
| **list** | List all users. |
| **generate-token** | Generate token for a user. |
| **activate** | Activate a user. |
| **suspend** | Suspend a user. |

#### Options
##### add
| | |
| - | - |
| **-f, --first-name string** | User's first name |
| **-l, --last-name string** | User's last name |
| **-e, --email string** | User's email address |
| **-p, --password string** | User's password |

##### update

  -f, --first-name string   User's first name
  -l, --last-name string    User's last name
  -e, --email string        User's email address
  -p, --password string     User's password

##### remove

  -e, --email string   User's email address

##### generate-token

  -e, --email string   User's email address

##### activate

  -e, --email string   User's email address

##### suspend

  -e, --email string   User's email address

---

## config
Set/Display fog-controller service config.

```sh
fog-controller config <options>
```

#### Actions
| | |
| - | - |
| **add** | Add a new user. |
| **update** | Update existing user. |
| **remove** | Delete a user. |
| **list** | List all users. |
| **generate-token** | Generate token for a user. |
| **activate** | Activate a user. |
| **suspend** | Suspend a user. |



<!--


**Command List**

 start          -- Start fog-controller service.
 stop           -- Stop fog-controller service.
 controller     -- Display fog-controller service information.
 help           -- Display usage information.
 version        -- Display fog-controller service version.
 user           -- User operations.
 config         -- Set/Display fog-controller service config.
 connector      -- Connector operations.
 proxy          -- Proxy operations.
 iofog          -- ioFog nodes operations.
 catalog        -- Microservices catalog operations.
 flow           -- Application flow operations.
 microservice   -- Microservice instance operations.
 registry       -- Registries instance operations.
 diagnostics    -- Diagnostic instance operations.
<br>
<br>
<br>


**Config**
$ fog-controller config <*options*>

 *add*

 -p, --port number                (Port)
 -c, --ssl-cert string            (Path to SSL certificate file)
 -k, --ssl-key string             (Path to SSL key file)
 -i, --intermediate-cert string   (Path to SSL intermediate certificate file)
 -m, --email-activation-on        (Email activation required)
 -n, --email-activation-off       (Email activation not required)
 -a, --email-address string       (Email address to send activations from)
 -w, --email-password string      (Email password to send activations from)
 -s, --email-service string       (Email service to send activations)
 -d, --log-dir string             (Log files directory)
 -z, --log-size number            (Log files size (MB))

 *list*<br>

 *dev-mode*<br>

 -o, --on     (Enable dev mode)<br>
 -f, --off    (Disable dev mode)<br>

<br>
<br>
<br>

**Connector**

$ fog-controller connector <*command*> <*options*>

**Command List**

 add      -- Add a new Connector.
 update   -- Update existing Connector.
 remove   -- Delete a Connector.
 list     -- List all Connectors.

*add*

 -n, --name string        (Connector name)
 -d, --domain string      (Connector domain name)
 -i, --public-ip string   (Connector public IP address)
 -c, --cert string        (Certificate)
 -S, --self-signed-on     (Switch on self-signed enabled)
 -s, --self-signed-off    (Switch off self-signed disabled)
 -H, --dev-mode-on        (Switch on dev mode)
 -h, --dev-mode-off       (Switch off dev mode)

*update*

 -n, --name string        (Connector name)
 -d, --domain string      (Connector domain name)
 -i, --public-ip string   (Connector public IP address)
 -c, --cert string        (Certificate)
 -S, --self-signed-on     (Switch on self-signed enabled)
 -s, --self-signed-off    (Switch off self-signed disabled)
 -H, --dev-mode-on        (Switch on dev mode)
 -h, --dev-mode-off       (Switch off dev mode)

*remove*

 -i, --public-ip string   (Connector public IP address)

<br>
<br>
<br>

**Proxy**

$ fog-controller proxy <*command*> <*options*>

**Command List**

 update   -- Update existing proxy or create a new one.
 list     -- List all proxies.

*update*

 -u, --username string   (Proxy username)
 -p, --password string   (Proxy password)
 -s, --host string       (Proxy host address)
 -k, --rsa-key string    (Proxy RSA key)
 -o, --port number       (Proxy port)
 -f, --iofogUuid string  (Fog UUID)
 -a, --action string     (Action: can be either 'open' or 'close')

**Example**<br>
 proxy update -u dmitry -p dpass -s 127.12.14.52 -k /home/dmitrys/documents/rsa.txt -o 22 -f NH44VjVFnr8946Yr8HPRrJdFZgLN8k7j -a close<br>

*list*<br>

**Example**<br>
proxy list
<br>
<br>
<br>

 **IoFog**

 $ fog-controller iofog <*command*> <*options*>

**Command List**

  add                -- Add a new ioFog node.
  update             -- Update existing ioFog node.
  remove             -- Delete an ioFog node.
  list               -- List all ioFog nodes.
  info               -- Get ioFog node settings.
  provisioning-key   -- Get provisioning key for an ioFog node.
  reboot             -- Reboot ioFog node.
  version            -- Change agent version of ioFog node.
  tunnel             -- Tunnel operations for an ioFog node.
  hal-hw             -- Get HAL Hardware ioFog node data.
  hal-usb            -- Get HAL USB ioFog node data.

*add*

  -f, --file string               (ioFog settings JSON file)
  -n, --name string               (ioFog node name)
  -l, --location string           (ioFog node location)
  -t, --latitude number           (ioFog node latitude)
  -g, --longitude number          (ioFog node longitude)
  -d, --description string        (ioFog node description)
  -D, --docker-url string         (ioFog node docker url)
  -M, --disk-limit number         (ioFog node disk usage limit (MB))
  -T, --disk-directory string     (ioFog node disk directory)
  -m, --memory-limit number       (ioFog node memory usage limit (MB))
  -c, --cpu-limit number          (ioFog node CPU usage limit (%))
  -G, --log-limit number          (ioFog node log size limit (MB))
  -Y, --log-directory string      (ioFog node log files directory)
  -C, --log-file-count number     (ioFog node log files count)
  -s, --status-frequency number   (ioFog node status check frequency (seconds))
  -F, --change-frequency number   (ioFog node configuration change check frequency (seconds))
  -Q, --device-frequency number   (ioFog node device scan frequency (seconds))
  -B, --bluetooth-enable          (Enable bluetooth on ioFog node)
  -b, --bluetooth-disable         (Disable bluetooth on ioFog node)
  -W, --watchdog-enable           (Enable watchdog on ioFog node)
  -w, --watchdog-disable          (Disable watchdog on ioFog node)
  -a, --abs-hw-disable            (Disable hardware abstraction on ioFog node)
  -A, --abs-hw-enable             (Enable hardware abstraction on ioFog node)
  -o, --reboot                    (Reboot ioFog node)
  -y, --fog-type number           (ioFog node architecture type)
  -u, --user-id number            (User's id)

*update*

  -f, --file string               (ioFog settings JSON file)
  -i, --node-id string            (ioFog node ID)
  -n, --name string               (ioFog node name)
  -l, --location string           (ioFog node location)
  -t, --latitude number           (ioFog node latitude)
  -g, --longitude number          (ioFog node longitude)
  -d, --description string        (ioFog node description)
  -D, --docker-url string         (ioFog node docker url)
  -M, --disk-limit number         (ioFog node disk usage limit (MB))
  -T, --disk-directory string     (ioFog node disk directory)
  -m, --memory-limit number       (ioFog node memory usage limit (MB))
  -c, --cpu-limit number          (ioFog node CPU usage limit (%))
  -G, --log-limit number          (ioFog node log size limit (MB))
  -Y, --log-directory string      (ioFog node log files directory))
  -C, --log-file-count number     (ioFog node log files count)
  -s, --status-frequency number   (ioFog node status check frequency (seconds))
  -F, --change-frequency number   (ioFog node configuration change check frequency (seconds))
  -Q, --device-frequency number   (ioFog node device scan frequency (seconds))
  -B, --bluetooth-enable          (Enable bluetooth on ioFog node)
  -b, --bluetooth-disable         (Disable bluetooth on ioFog node)
  -W, --watchdog-enable           (Enable watchdog on ioFog node)
  -w, --watchdog-disable          (Disable watchdog on ioFog node)
  -a, --abs-hw-disable            (Disable hardware abstraction on ioFog node)
  -A, --abs-hw-enable             (Enable hardware abstraction on ioFog node)
  -o, --reboot                    (Reboot ioFog node)
  -y, --fog-type number           (ioFog node architecture type)

*remove*

  -i, --node-id string   (ioFog node ID)

*info*

  -i, --node-id string   (ioFog node ID)

*provisioning-key*

  -i, --node-id string   (ioFog node ID)

*reboot*

  -i, --node-id string   (ioFog node ID)

*version*

  -i, --node-id         string           (ioFog node ID)
  -v, --version-command string           (ioFog version command)

*tunnel*

  -e, --enable     (Enable tunnel)
  -S, --disable    (Disable tunnel)
  -O, --info       (Display tunnel info)

 *hal-hw*

  -i, --node-id string   (ioFog node ID)<br>

 *hal-usb*

  -i, --node-id string   (ioFog node ID)<br>

*JSON File Schema*

  name: string
  location: string
  latitude: number
  longitude: number
  description: string
  dockerUrl: string
  diskLimit: number
  diskDirectory: string
  memoryLimit: number
  cpuLimit: number
  logLimit: number
  logDirectory: string
  logFileCount: number
  statusFrequency: number
  changeFrequency: number
  deviceScanFrequency: number
  bluetoothEnabled: boolean
  watchdogEnabled: boolean
  abstractedHardwareEnabled: boolean
  reboot: boolean
  fogType: number

<br>
<br>
<br>

**Catalog**<br>

$ fog-controller catalog <*command*> <*options*>

**Command List**<br>

 add      -- Add a new catalog item.<br>
 update   -- Update existing catalog item.<br>
 remove   -- Delete a catalog item.<br>
 list     -- List all catalog items.<br>
 info     -- Get catalog item settings.<br>

*add*

 -f, --file string             (Catalog item settings JSON file)<br>
 -n, --name string             (Catalog item name)<br>
 -d, --description string      (Catalog item description)<br>
 -c, --category string         (Catalog item category)<br>
 -x, --x86-image string        (x86 docker image name)<br>
 -a, --arm-image string        (ARM docker image name)<br>
 -p, --publisher string        (Catalog item publisher name)<br>
 -s, --disk-required number    (Amount of disk required to run the microservice (MB))<br>
 -r, --ram-required number     (Amount of RAM required to run the microservice (MB))<br>
 -t, --picture string          (Catalog item picture)<br>
 -P, --public                  (Public catalog item)<br>
 -V, --private                 (Private catalog item)<br>
 -g, --registry-id number      (Catalog item docker registry ID)<br>
 -I, --input-type string       (Catalog item input type)<br>
 -F, --input-format string     (Catalog item input format)<br>
 -O, --output-type string      (Catalog item output type)<br>
 -T, --output-format string    (Catalog item output format)<br>
 -X, --config-example string   (Catalog item config example)<br>
 -u, --user-id number          (User's id)<br>

*update*<br>

 -f, --file string             (Catalog item settings JSON file)<br>
 -i, --item-id string          (Catalog item ID)<br>
 -n, --name string             (Catalog item name)<br>
 -d, --description string      (Catalog item description)<br>
 -c, --category string         (Catalog item category)<br>
 -x, --x86-image string        (x86 docker image name)<br>
 -a, --arm-image string        (ARM docker image name)<br>
 -p, --publisher string        (Catalog item publisher name)<br>
 -s, --disk-required number    (Amount of disk required to run the microservice (MB))<br>
 -r, --ram-required number     (Amount of RAM required to run the microservice (MB))<br>
 -t, --picture string          (Catalog item picture)<br>
 -P, --public                  (Public catalog item)<br>
 -V, --private                 (Private catalog item)<br>
 -g, --registry-id number      (Catalog item docker registry ID)<br>
 -I, --input-type string       (Catalog item input type)<br>
 -F, --input-format string     (Catalog item input format)<br>
 -O, --output-type string      (Catalog item output type)<br>
 -T, --output-format string    (Catalog item output format)<br>
 -X, --config-example string   (Catalog item config example)<br>

*remove*<br>

 -i, --item-id string   -- Catalog item ID<br>

*info*<br>

 -i, --item-id string   -- Catalog item ID<br>

*JSON File Schema*<br>

 name: string<br>
 description: string<br>
 category: string<br>
 publisher: string<br>
 diskRequired: number<br>
 ramRequired: number<br>
 picture: string<br>
 isPublic: boolean<br>
 registryId: number<br>
 configExample: string<br>
 images: array of objects<br>
 containerImage: string<br>
 fogTypeId: number<br>
 inputType: object<br>
 infoType: string<br>
 infoFormat: string<br>
 outputType: object<br>
 infoType: string<br>
 infoFormat: string<br>
<br>
<br>
<br>
**Flow**<br>

 $ fog-controller flow <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new flow.<br>
 update    -- Update existing flow.<br>
 remove    -- Delete a flow.<br>
 list      -- List all flows.<br>
 info      -- Get flow settings.<br>

*add*<br>

 -f, --file string          (Application flow settings JSON file)<br>
 -n, --name string          (Application flow name)<br>
 -d, --description string   (Application flow description)<br>
 -a, --activate             (Activate application flow)<br>
 -D, --deactivate           (Deactivate application flow)<br>
 -u, --user-id number       (User's id)<br>

*update*<br>

 -f, --file string          (Application flow settings JSON file)<br>
 -i, --flow-id string       (Application flow ID)<br>
 -n, --name string          (Application flow name)<br>
 -d, --description string   (Application flow description)<br>
 -a, --activate             (Activate application flow)<br>
 -D, --deactivate           (Deactivate application flow)<br>

*remove*<br>

 -i, --flow-id string   -- Application flow ID

*info*<br>

 -i, --flow-id string   -- Application flow ID

*JSON File Schema*<br>

 name: string<br>
 description: string<br>
 isActivated: boolean<br>

<br>
<br>
<br>

 **Microservice**<br>

 $ fog-controller microservice <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new microservice.<br>
 update   -- Update existing microservice.<br>
 remove   -- Delete a microservice.<br>
 list     -- List all microservices.<br>
 info     -- Get microservice settings.<br>
 route    -- Add/Remove microservice route.<br>
 strace   -- strace option operations.<br>

*add*<br>

 -f, --file string         (Microservice settings JSON file)<br>
 -n, --name string         (Microservice name)<br>
 -c, --catalog-id string   (Catalog item ID)<br>
 -F, --flow-id string      (Application flow ID)<br>
 -I, --iofog-id string     (ioFog node ID)<br>
 -g, --config string       (Microservice config)<br>
 -v, --volumes string[]    (Microservice volume mapping(s))<br>
 -l, --log-limit number    (Log file size limit (MB))<br>
 -r, --root-enable         (Enable root access)<br>
 -R, --root-disable        (Disable root access)<br>
 -p, --ports string[]      (Container ports)<br>
 -t, --routes string[]     (Microservice route(s) (receiving microservices))<br>
 -u, --user-id number      (User's id)<br>

*update*<br>

 -f, --file string              (Microservice settings JSON file)<br>
 -i, --microservice-id string   (Microservice ID)<br>
 -n, --name string              (Microservice name)<br>
 -c, --catalog-id string        (Catalog item ID)<br>
 -F, --flow-id string           (Application flow ID)<br>
 -I, --iofog-id string          (ioFog node ID)<br>
 -g, --config string            (Microservice config)<br>
 -v, --volumes string[]         (Microservice volume mapping(s))<br>
 -l, --log-limit number         (Log file size limit (MB))<br>
 -r, --root-enable              (Enable root access)<br>
 -R, --root-disable             (Disable root access)<br>
 -p, --ports string[]           (Container ports)<br>
 -t, --routes string[]          (Microservice route(s) (receiving microservices))<br>

*remove*<br>

 -i, --microservice-id string   (Microservice ID)<br>

*info*<br>

 -i, --microservice-id string   (Microservice ID)<br>

*route*<br>

 -i, --microservice-id string   (Microservice ID)<br>
 -a, --add string[]             (Add new route(s))<br>
 -m, --remove string[]          (Delete existing route(s))<br>

*strace*<br>

 -i, --microservice-id string   (Microservice ID)<br>
 -e, --enable                   (Enable strace option)<br>
 -d, --disable                  (Disable strace option)<br>
 -G, --get string               (Get strace data, formats: string,file)<br>

*JSON File Schema*<br>

 name: string<br>
 catalogItemId: string<br>
 flowId: string<br>
 ioFogNodeId: string<br>
 config: string<br>
 volumeMappings: string<br>
 logLimit: number<br>
 rootHostAccess: true<br>
 ports: object<br>
 internal: number<br>
 external: number<br>
 tunnel: boolean<br>
 routes: array of strings<br>

*Examples*

 1. Single mapping:                       $ fog-controller microservice add [other required options] --volumes
                                       /host_src:/container_src<br>
 2. Multiple mappings:                   $ fog-controller microservice add [other required options] --volumes
                                       /host_src:/container_src /host_bin:/container_bin<br>
 3. Ports (internal:external:tunnel):     $ fog-controller microservice add [other required options] --ports
                                       80:8080:false 443:5443:true<br>
 4. Add routes:                           $ fog-controller microservice route -i ABCD --add DEF GHI<br>
 5. Delete route:                         $ fog-controller microservice route -i ABC --remove DEF<br>
 6. Get strace data:                      $ fog-controller microservice strace -i ABC --get file<br>
<br>
<br>
<br>

 **Registry**

 $ fog-controller registry <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new Registry.<br>
 remove   -- Delete a Registry.<br>
 list     -- List all Registries.<br>

*add*<br>

 -u, --uri string        (Registry URI)<br>
 -b, --public            (Set registry as public)<br>
 -r, --private           (Set registry as private)<br>
 -l, --username string   (Registry's user name)<br>
 -p, --password string   (Password)<br>
 -e, --email string      (Email address)<br>
 -i, --user-id number    (User's id)<br>

*remove*<br>

 -d, --item-id number    (Item's id)
<br>
<br>
<br>

 **Diagnostics**

 $ fog-controller diagnostics <*command*> <*options*><br>

*Command List*<br>

 strace-update           -- Change microservice strace status to enabled or disabled.<br>
 strace-info             -- Get microservice strace data.<br>
 strace-ftp-post         -- Post microservice strace data to ftp.<br>
 image-snapshot-create   -- Create microservice image snapshot.<br>
 image-snapshot-get      -- Get microservice image snapshot.<br>

*strace-update*<br>

 -e, --enable                   (Enable microservice strace)<br>
 -o, --disable                  (Disable microservice strace)<br>
 -i, --microservice-id string   (Microservice ID)<br>

*strace-info*<br>

 -i, --microservice-id string   (Microservice ID)<br>
 -f, --format string            (Format of strace data to receive)<br>

 *strace-ftp-post*

 -i, --microservice-id string   (Microservice ID)<br>
 -h, --ftpHost string           (FTP host)<br>
 -p, --ftpPort number           (FTP port)<br>
 -u, --ftpUser string           (FTP user)<br>
 -s, --ftpPass string           (FTP user password)<br>
 -d, --ftpDestDir string        (FTP destination directory)<br>

*image-snapshot-create*

 -i, --microservice-id string   (Microservice ID)<br>

*image-snapshot-get*

 -i, --microservice-id string   (Microservice ID)<br>

 -->