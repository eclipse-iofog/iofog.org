---
title: "Controllers CLI Usage"
category: "Controllers"
type: "documentation"
version: "1.0.0"
---

# Controller CLI Usage

```sh
iofog-controller <command> <action> <options>
```
## Commands
| | |
| - | - |
| [start](#) | Start iofog-controller service. |
| [stop](#) | Stop iofog-controller service. |
| [controller](#) | Display iofog-controller service information. |
| [help](#) | Display usage information. |
| [user](#) | User operations. |
| [config](#) | Set/Display iofog-controller service config. |
| [connector](#) | Connector operations. |
| [proxy](#) | Proxy operations. |
| [node](#) | ioFog node operations. |
| [catalog](#) | Microservices catalog operations. |
| [flow](#) | Application flow operations. |
| [microservice](#) | Microservice instance operations. |
| [registry](#) | Registries instance operations. |
| [diagnostics](#) | Diagnostic instance operations. |

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
| | |
| - | - |
| **status** | Display iofog-controller service status. |
| **email-activation** |Is email activation. |
| **fog-types** | List all Fog-types. |

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
Set/Display iofog-controller service config.

```sh
iofog-controller config <options>
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

---

## connector
Connector operations.

```sh
iofog-controller connector <action> <options>
```

#### Actions
| | |
| - | - |
| **add** | Add a new Connector. |
| **update** | Update an existing Connector. |
| **remote** | Delete a Connector. |
| **list** | List all Connectors. |

#### Options
##### add
| | |
| - | - |
| **-n, --name string** | (Connector name) |
| **-d, --domain string** | (Connector domain name) |
| **-i, --public-ip string** | (Connector public IP address) |
| **-c, --cert string** | (Certificate) |
| **-S, --self-signed-on** | (Switch on self-signed enabled) |
| **-s, --self-signed-off** | (Switch off self-signed disabled) |
| **-H, --dev-mode-on** | (Switch on dev mode) |
| **-h, --dev-mode-off** | (Switch off dev mode) |

##### update
| | |
| - | - |
| **-n, --name string** | (Connector name) |
| **-d, --domain string** | (Connector domain name) |
| **-i, --public-ip string** | (Connector public IP address) |
| **-c, --cert string** | (Certificate) |
| **-S, --self-signed-on** | (Switch on self-signed enabled) |
| **-s, --self-signed-off** | (Switch off self-signed disabled) |
| **-H, --dev-mode-on** | Switch on dev mode) |
| **-h, --dev-mode-off** | (Switch off dev mode) |

##### remove
| | |
| - | - |
| **-i, --public-ip string** | (Connector public IP address) |

---

## proxy
Proxy operations.

```sh
iofog-controller proxy <action> <options>
```

#### Actions
| | |
| - | - |
| **update** | Update existing proxy or create a new one. |
| **list** | List all proxies. |

#### Options
##### update
| | |
| - | - |
| **-u, --username string** | (Proxy username) |
| **-p, --password string** | (Proxy password) |
| **-s, --host string** | (Proxy host address) |
| **-k, --rsa-key string** | (Proxy RSA key) |
| **-o, --port number** | (Proxy port) |
| **-f, --iofogUuid string** | (Fog UUID) |
| **-a, --action string** | (Action: can be either 'open' or 'close') |

---

## node
ioFog node operations.

```sh
iofog-controller node <action> <options>
```

#### Actions
| | |
| - | - |
| **add** | Add a new ioFog node. |
| **update** | Update existing ioFog node. |
| **remove** | Delete an ioFog node. |
| **list** | List all ioFog nodes. |
| **info** | Get ioFog node settings. |
| **provisioning-key** | Get provisioning key for an ioFog node. |
| **reboot** | Reboot ioFog node. |
| **version** | Change agent version of ioFog node. |
| **tunnel** | Tunnel operations for an ioFog node. |
| **hal-hw** | Get HAL Hardware ioFog node data. |
| **hal-usb** | Get HAL USB ioFog node data. |

#### Options
##### add
| | |
| - | - |
| **-f, --file string** | ioFog settings JSON file |
| **-n, --name string** | ioFog node name |
| **-l, --location string** | ioFog node location |
| **-t, --latitude number** | ioFog node latitude |
| **-g, --longitude number** | ioFog node longitude |
| **-d, --description string** | ioFog node description |
| **-D, --docker-url string** | ioFog node docker url |
| **-M, --disk-limit number** | ioFog node disk usage limit (MB) |
| **-T, --disk-directory string** | ioFog node disk directory |
| **-m, --memory-limit number** | ioFog node memory usage limit (MB) |
| **-c, --cpu-limit number** | ioFog node CPU usage limit (%) |
| **-G, --log-limit number** | ioFog node log size limit (MB) |
| **-Y, --log-directory string** | ioFog node log files directory |
| **-C, --log-file-count number** | ioFog node log files count |
| **-s, --status-frequency number** | ioFog node status check frequency (seconds) |
| **-F, --change-frequency number** | ioFog node configuration change check frequency (seconds) |
| **-Q, --device-frequency number** | ioFog node device scan frequency (seconds) |
| **-B, --bluetooth-enable** | Enable bluetooth on ioFog node |
| **-b, --bluetooth-disable** | Disable bluetooth on ioFog node |
| **-W, --watchdog-enable** | Enable watchdog on ioFog node |
| **-w, --watchdog-disable** | Disable watchdog on ioFog node |
| **-a, --abs-hw-disable** | Disable hardware abstraction on ioFog node |
| **-A, --abs-hw-enable** | Enable hardware abstraction on ioFog node |
| **-o, --reboot** | Reboot ioFog node |
| **-y, --fog-type number** | ioFog node architecture type |
| **-u, --user-id number** | User's id |

##### update
| | |
| - | - |
| **-f, --file string** | ioFog settings JSON file |
| **-n, --name string** | ioFog node name |
| **-l, --location string** | ioFog node location |
| **-t, --latitude number** | ioFog node latitude |
| **-g, --longitude number** | ioFog node longitude |
| **-d, --description string** | ioFog node description |
| **-D, --docker-url string** | ioFog node docker url |
| **-M, --disk-limit number** | ioFog node disk usage limit (MB) |
| **-T, --disk-directory string** | ioFog node disk directory |
| **-m, --memory-limit number** | ioFog node memory usage limit (MB) |
| **-c, --cpu-limit number** | ioFog node CPU usage limit (%) |
| **-G, --log-limit number** | ioFog node log size limit (MB) |
| **-Y, --log-directory string** | ioFog node log files directory |
| **-C, --log-file-count number** | ioFog node log files count |
| **-s, --status-frequency number** | ioFog node status check frequency (seconds) |
| **-F, --change-frequency number** | ioFog node configuration change check frequency (seconds) |
| **-Q, --device-frequency number** | ioFog node device scan frequency (seconds) |
| **-B, --bluetooth-enable** | Enable bluetooth on ioFog node |
| **-b, --bluetooth-disable** | Disable bluetooth on ioFog node |
| **-W, --watchdog-enable** | Enable watchdog on ioFog node |
| **-w, --watchdog-disable** | Disable watchdog on ioFog node |
| **-a, --abs-hw-disable** | Disable hardware abstraction on ioFog node |
| **-A, --abs-hw-enable** | Enable hardware abstraction on ioFog node |
| **-o, --reboot** | Reboot ioFog node |
| **-y, --fog-type number** | ioFog node architecture type |

##### remove
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

##### info
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

##### provisioning-key
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

##### reboot
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

##### version
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |
| **-v, --version-command string** | ioFog version command |

##### tunnel
| | |
| - | - |
| **-e, --enable** | Enable tunnel |
| **-S, --disable** | Disable tunnel |
| **-O, --info** | Display tunnel info |

##### hal-hw
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

##### hal-usb
| | |
| - | - |
| **-i, --node-id string** | ioFog node ID |

---

## catalog
Microservices catalog operations for your configured registries.

```sh
iofog-controller catalog <action> <options>
```

#### Actions
| | |
| - | - |
| **add** | Add a new new catalog item. |
| **update** | Update existing catalog item. |
| **remove** | Delete a catalog item. |
| **list** | List all catalog items. |
| **info** | Get catalog item settings. |

#### Options
##### add
| | |
| - | - |
| **-f, --file string** | Catalog item settings JSON file |
| **-n, --name string** | Catalog item name) |
| **-d, --description string** | Catalog item description |
| **-c, --category string** | Catalog item category |
| **-x, --x86-image string** | x86 docker image name |
| **-a, --arm-image string** | ARM docker image name |
| **-p, --publisher string** | Catalog item publisher name |
| **-s, --disk-required number** | Amount of disk required to run the microservice (MB) |
| **-r, --ram-required number** | Amount of RAM required to run the microservice (MB) |
| **-t, --picture string** | Catalog item picture |
| **-P, --public** | Public catalog item |
| **-V, --private** | Private catalog item |
| **-g, --registry-id number** | Catalog item docker registry ID |
| **-I, --input-type string** | Catalog item input type |
| **-F, --input-format string** | Catalog item input format |
| **-O, --output-type string** | Catalog item output type |
| **-T, --output-format string** | Catalog item output format |
| **-X, --config-example string** | Catalog item config example |
| **-u, --user-id number** | User's id |

<!--


 -n, --name string             (Catalog item name |
 -d, --description string      (Catalog item description |
 -c, --category string         (Catalog item category |
 -x, --x86-image string        (x86 docker image name |
 -a, --arm-image string        (ARM docker image name |
 -p, --publisher string        (Catalog item publisher name |
 -s, --disk-required number    (Amount of disk required to run the microservice (MB) |
 -r, --ram-required number     (Amount of RAM required to run the microservice (MB) |
 -t, --picture string          (Catalog item picture |
 -P, --public                  (Public catalog item |
 -V, --private                 (Private catalog item |
 -g, --registry-id number      (Catalog item docker registry ID |
 -I, --input-type string       (Catalog item input type |
 -F, --input-format string     (Catalog item input format |
 -O, --output-type string      (Catalog item output type |
 -T, --output-format string    (Catalog item output format |
 -X, --config-example string   (Catalog item config example |
 -u, --user-id number          (User's id |

*update*<br>

 -f, --file string             (Catalog item settings JSON file |
 -i, --item-id string          (Catalog item ID |
 -n, --name string             (Catalog item name |
 -d, --description string      (Catalog item description |
 -c, --category string         (Catalog item category |
 -x, --x86-image string        (x86 docker image name |
 -a, --arm-image string        (ARM docker image name |
 -p, --publisher string        (Catalog item publisher name |
 -s, --disk-required number    (Amount of disk required to run the microservice (MB) |
 -r, --ram-required number     (Amount of RAM required to run the microservice (MB) |
 -t, --picture string          (Catalog item picture |
 -P, --public                  (Public catalog item |
 -V, --private                 (Private catalog item |
 -g, --registry-id number      (Catalog item docker registry ID |
 -I, --input-type string       (Catalog item input type |
 -F, --input-format string     (Catalog item input format |
 -O, --output-type string      (Catalog item output type |
 -T, --output-format string    (Catalog item output format |
 -X, --config-example string   (Catalog item config example |

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

 $ iofog-controller flow <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new flow.<br>
 update    -- Update existing flow.<br>
 remove    -- Delete a flow.<br>
 list      -- List all flows.<br>
 info      -- Get flow settings.<br>

*add*<br>

 -f, --file string          (Application flow settings JSON file |
 -n, --name string          (Application flow name |
 -d, --description string   (Application flow description |
 -a, --activate             (Activate application flow |
 -D, --deactivate           (Deactivate application flow |
 -u, --user-id number       (User's id |

*update*<br>

 -f, --file string          (Application flow settings JSON file |
 -i, --flow-id string       (Application flow ID |
 -n, --name string          (Application flow name |
 -d, --description string   (Application flow description |
 -a, --activate             (Activate application flow |
 -D, --deactivate           (Deactivate application flow |

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

 $ iofog-controller microservice <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new microservice.<br>
 update   -- Update existing microservice.<br>
 remove   -- Delete a microservice.<br>
 list     -- List all microservices.<br>
 info     -- Get microservice settings.<br>
 route    -- Add/Remove microservice route.<br>
 strace   -- strace option operations.<br>

*add*<br>

 -f, --file string         (Microservice settings JSON file |
 -n, --name string         (Microservice name |
 -c, --catalog-id string   (Catalog item ID |
 -F, --flow-id string      (Application flow ID |
 -I, --iofog-id string     (ioFog node ID |
 -g, --config string       (Microservice config |
 -v, --volumes string[]    (Microservice volume mapping(s) |
 -l, --log-limit number    (Log file size limit (MB) |
 -r, --root-enable         (Enable root access |
 -R, --root-disable        (Disable root access |
 -p, --ports string[]      (Container ports |
 -t, --routes string[]     (Microservice route(s) (receiving microservices) |
 -u, --user-id number      (User's id |

*update*<br>

 -f, --file string              (Microservice settings JSON file |
 -i, --microservice-id string   (Microservice ID |
 -n, --name string              (Microservice name |
 -c, --catalog-id string        (Catalog item ID |
 -F, --flow-id string           (Application flow ID |
 -I, --iofog-id string          (ioFog node ID |
 -g, --config string            (Microservice config |
 -v, --volumes string[]         (Microservice volume mapping(s) |
 -l, --log-limit number         (Log file size limit (MB) |
 -r, --root-enable              (Enable root access |
 -R, --root-disable             (Disable root access |
 -p, --ports string[]           (Container ports |
 -t, --routes string[]          (Microservice route(s) (receiving microservices) |

*remove*<br>

 -i, --microservice-id string   (Microservice ID |

*info*<br>

 -i, --microservice-id string   (Microservice ID |

*route*<br>

 -i, --microservice-id string   (Microservice ID |
 -a, --add string[]             (Add new route(s) |
 -m, --remove string[]          (Delete existing route(s) |

*strace*<br>

 -i, --microservice-id string   (Microservice ID |
 -e, --enable                   (Enable strace option |
 -d, --disable                  (Disable strace option |
 -G, --get string               (Get strace data, formats: string,file |

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

 1. Single mapping:                       $ iofog-controller microservice add [other required options] --volumes
                                       /host_src:/container_src<br>
 2. Multiple mappings:                   $ iofog-controller microservice add [other required options] --volumes
                                       /host_src:/container_src /host_bin:/container_bin<br>
 3. Ports (internal:external:tunnel):     $ iofog-controller microservice add [other required options] --ports
                                       80:8080:false 443:5443:true<br>
 4. Add routes:                           $ iofog-controller microservice route -i ABCD --add DEF GHI<br>
 5. Delete route:                         $ iofog-controller microservice route -i ABC --remove DEF<br>
 6. Get strace data:                      $ iofog-controller microservice strace -i ABC --get file<br>
<br>
<br>
<br>

 **Registry**

 $ iofog-controller registry <*command*> <*options*><br>

*Command List*<br>

 add      -- Add a new Registry.<br>
 remove   -- Delete a Registry.<br>
 list     -- List all Registries.<br>

*add*<br>

 -u, --uri string        (Registry URI |
 -b, --public            (Set registry as public |
 -r, --private           (Set registry as private |
 -l, --username string   (Registry's user name |
 -p, --password string   (Password |
 -e, --email string      (Email address |
 -i, --user-id number    (User's id |

*remove*<br>

 -d, --item-id number    (Item's id)
<br>
<br>
<br>

 **Diagnostics**

 $ iofog-controller diagnostics <*command*> <*options*><br>

*Command List*<br>

 strace-update           -- Change microservice strace status to enabled or disabled.<br>
 strace-info             -- Get microservice strace data.<br>
 strace-ftp-post         -- Post microservice strace data to ftp.<br>
 image-snapshot-create   -- Create microservice image snapshot.<br>
 image-snapshot-get      -- Get microservice image snapshot.<br>

*strace-update*<br>

 -e, --enable                   (Enable microservice strace |
 -o, --disable                  (Disable microservice strace |
 -i, --microservice-id string   (Microservice ID |

*strace-info*<br>

 -i, --microservice-id string   (Microservice ID |
 -f, --format string            (Format of strace data to receive |

 *strace-ftp-post*

 -i, --microservice-id string   (Microservice ID |
 -h, --ftpHost string           (FTP host |
 -p, --ftpPort number           (FTP port |
 -u, --ftpUser string           (FTP user |
 -s, --ftpPass string           (FTP user password |
 -d, --ftpDestDir string        (FTP destination directory |

*image-snapshot-create*

 -i, --microservice-id string   (Microservice ID |

*image-snapshot-get*

 -i, --microservice-id string   (Microservice ID |

 -->