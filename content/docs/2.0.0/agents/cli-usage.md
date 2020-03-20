# Legacy Agent CLI Usage

Please see iofogctl for current CLI usage: [iofogctl](../tools/iofogctl/usage.html)

```sh
iofog-agent command --option <argument>
```

## Commands

|                             |                                                                             |
| --------------------------- | --------------------------------------------------------------------------- |
| [config](#config)           | Change the software configuration according to the options provided.        |
| [switch](#switch)           | Switch between dev, prod, or def (default) configs.                         |
| [info](#info)               | Display the current configuration and other information about the software. |
| [provision](#provision)     | Attach this software to the configured ioFog controller.                    |
| [deprovision](#deprovision) | Detach this software from all ioFog controllers.                            |
| [status](#status)           | Display current status information about the software.                      |
| [version](#version)         | Display the software version and license information.                       |
| [prune](#prune)             | Prune docker images.                                                        |
| [help](#help)               | Display the help and usage information.                                     |

## config

Change the software configuration according to the options provided.

```sh
iofog-agent config --option [<optional-argument>]
iofog-agent config defaults
```

|                            |                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **defaults**               | Reset configuration to default values                                                                                                                                      |
| **-d number**              | Set the limit, in GiB, of disk space that the software is allowed to use                                                                                                   |
| **-dl**                    | Set the directory to use for disk storage                                                                                                                                  |
| **-m number**              | Set the limit, in MiB, of RAM memory that the software is allowed to use for messages                                                                                      |
| **-p number**              | Set the limit, in percentage, of CPU time that the software is allowed to use                                                                                              |
| **-a string**              | Set the uri of the fog controller to which this software connects                                                                                                          |
| **-ac string**             | Set the file path of the SSL/TLS certificate for validating the fog controller identity, default: `/etc/iofog-agent/cert.crt`                                              |
| **-c string**              | Set the UNIX socket or network address that the Docker daemon is using                                                                                                     |
| **-n string**              | Set the name of the network adapter that holds the correct IP address of this machine                                                                                      |
| **-l number**              | Set the limit, in GiB, of disk space that the log files can consume                                                                                                        |
| **-ld string**             | Set the directory to use for log file storage, default: `/var/log/iofog-agent`                                                                                             |
| **-lc number**             | Set the number of log files to evenly split the log storage limit                                                                                                          |
| **-ll string**             | Set the standard logging levels that can be used to control logging output                                                                                                 |
| **-sf number**             | Set the status update frequency                                                                                                                                            |
| **-cf number**             | Set the get changes frequency                                                                                                                                              |
| **-df number**             | Set the post diagnostics frequency                                                                                                                                         |
| **-sd number**             | Set the scan devices frequency                                                                                                                                             |
| **-pf number**             | Set the docker pruning frequency                                                                                                                                           |
| **-dt number**             | Set the available disk threshold                                                                                                                                           |
| **-idc on/off**            | Set the mode on which any not registered docker container will be shut down                                                                                                |
| **-gps auto/off/number**   | Set gps location of fog. Use auto to get coordinates by IP, use off to forbid gps, use GPS coordinates in DD format to set them manually. Format: DD.DDD(lat), DD.DDD(lon) |
| **-ft auto/intel_amd/arm** | Set fog type. Use auto to detect fog type by system commands, use arm or intel_amd to set it manually                                                                      |

## switch

Switch between dev, prod, or def (default) configs.

```sh
iofog-agent switch <dev|prod|def>
```

Configs are located at `/etc/iofog-agent/`. There are 4 config files:

#### config-switcher.xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<switcher>
  <current_config>default (production, development)</current_config>
</switcher>
```

#### config.xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<config>
  <access_token/>
  <controller_url>http://localhost:54421/api/v3/</controller_url>
  <iofog_uuid/>
  <dev_mode>on</dev_mode>
  <controller_cert>/etc/iofog-agent/cert.crt</controller_cert>
  <fog_type>auto</fog_type>
  <network_interface>dynamic</network_interface>
  <docker_url>unix:///var/run/docker.sock</docker_url>
  <disk_consumption_limit>50</disk_consumption_limit>
  <disk_directory>/var/lib/iofog-agent/</disk_directory>
  <memory_consumption_limit>4096</memory_consumption_limit>
  <processor_consumption_limit>80.0</processor_consumption_limit>
  <log_disk_consumption_limit>10.0</log_disk_consumption_limit>
  <log_disk_directory>/var/log/iofog-agent/</log_disk_directory>
  <log_file_count>10</log_file_count>
  <log_level>INFO</log_level>
  <status_update_freq>30</status_update_freq>
  <get_changes_freq>60</get_changes_freq>
  <post_diagnostics_freq>10</post_diagnostics_freq>
  <scan_devices_freq>60</scan_devices_freq>
  <gps>auto</gps>
  <gps_coordinates>0,0</gps_coordinates>
  <isolated_docker_container>off</isolated_docker_container>
  <docker_pruning_freq>1</docker_pruning_freq>
  <available_disk_threshold>90</available_disk_threshold>
</config>


#### config-development.xml

<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<config>
  <access_token/>
  <controller_url>http://localhost:51121/api/v3/</controller_url>
  <iofog_uuid/>
  <dev_mode>on</dev_mode>
  <controller_cert>/etc/iofog-agent/cert.crt</controller_cert>
  <fog_type>auto</fog_type>
  <network_interface>dynamic</network_interface>
  <docker_url>unix:///var/run/docker.sock</docker_url>
  <disk_consumption_limit>50</disk_consumption_limit>
  <disk_directory>/var/lib/iofog-agent/</disk_directory>
  <memory_consumption_limit>4096</memory_consumption_limit>
  <processor_consumption_limit>80.0</processor_consumption_limit>
  <log_disk_consumption_limit>10.0</log_disk_consumption_limit>
  <log_disk_directory>/var/log/iofog-agent/</log_disk_directory>
  <log_file_count>10</log_file_count>
  <log_level>INFO</log_level>
  <status_update_freq>30</status_update_freq>
  <get_changes_freq>60</get_changes_freq>
  <post_diagnostics_freq>10</post_diagnostics_freq>
  <scan_devices_freq>60</scan_devices_freq>
  <gps>auto</gps>
  <gps_coordinates>0,0</gps_coordinates>
  <isolated_docker_container>off</isolated_docker_container>
  <docker_pruning_freq>1</docker_pruning_freq>
  <available_disk_threshold>90</available_disk_threshold>
</config>
```

#### config-production.xml

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<config>
  <access_token/>
  <controller_url>http://localhost:54421/api/v3/</controller_url>
  <iofog_uuid/>
  <dev_mode>off</dev_mode>
  <controller_cert>/etc/iofog-agent/cert.crt</controller_cert>
  <fog_type>auto</fog_type>
  <network_interface>dynamic</network_interface>
  <docker_url>unix:///var/run/docker.sock</docker_url>
  <disk_consumption_limit>50</disk_consumption_limit>
  <disk_directory>/var/lib/iofog-agent/</disk_directory>
  <memory_consumption_limit>4096</memory_consumption_limit>
  <processor_consumption_limit>80.0</processor_consumption_limit>
  <log_disk_consumption_limit>10.0</log_disk_consumption_limit>
  <log_disk_directory>/var/log/iofog-agent/</log_disk_directory>
  <log_file_count>10</log_file_count>
  <log_level>INFO</log_level>
  <status_update_freq>30</status_update_freq>
  <get_changes_freq>60</get_changes_freq>
  <post_diagnostics_freq>10</post_diagnostics_freq>
  <scan_devices_freq>60</scan_devices_freq>
  <gps>auto</gps>
  <gps_coordinates>0,0</gps_coordinates>
  <isolated_docker_container>off</isolated_docker_container>
  <docker_pruning_freq>1</docker_pruning_freq>
  <available_disk_threshold>90</available_disk_threshold>
</config>
```

## info

Display the current configuration and other information about the software.

```sh
iofog-agent info
```

## provision

Attach this software to the configured ioFog controller.

```sh
iofog-agent provision <provisioning key>
```

## deprovision

Detach this software from all ioFog controllers.

```sh
iofog-agent deprovision
```

## status

Display current status information about the software.

```sh
iofog-agent status
```

## version

Display the software version and license information.

```sh
iofog-agent version
```

## prune

Prune docker images.

```sh
iofog-agent prune
```

## help

Display the help and usage information.

```sh
iofog-agent help
```
