# Legacy Connector CLI Usage

```sh
iofog-connector <command> <options>
```

## Commands

|                     |                                                        |
| ------------------- | ------------------------------------------------------ |
| [start](#start)     | Start connector service.                               |
| [stop](#stop)       | Stop connector service.                                |
| [help](#help)       | Display usage information.                             |
| [version](#version) | Display the software version and license information.  |
| [status](#status)   | Display current status information about the software. |

---

## start

Start the iofog-connector daemon

```sh
iofog-connector start
```

---

## stop

Stop the iofog-connector daemon

```sh
iofog-connector stop
```

---

## help

Display usage information.

```sh
iofog-connector help <options>
```

#### Options

|                    |
| ------------------ |
| **-h, -?, --help** |

---

## version

Display the software version and license information.

```sh
iofog-connector version <options>
```

#### Options

|                   |
| ----------------- |
| **-v, --version** |

---

## status

Display current status information about the software.

```sh
iofog-connector status
```

# Configuration

Configuration is located in `/etc/iofog-connector/configs.json`

```json
{
  "ports": ["6000-6001", "7000-7002", "30000-39999", "40000-49999"],
  "exclude": ["7001"],
  "broker": 12345,
  "address": "127.0.0.1",
  "dev": true
}
```

# Certificates

The cert/key pair is located here:

````
/etc/iofog-connector/server-cert.pem
/etc/iofog-connector/server-key.pem
```

# Logs

The log files are located inside `/var/log/iofog-connector`
````
