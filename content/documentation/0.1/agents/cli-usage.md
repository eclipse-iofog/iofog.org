---
title: "Agent CLI Usage"
category: "Agents"
type: "documentation"
version: "0.1"
---

# Agent CLI Usage

```bash
$ iofog command --option <argument>
```

## Commands

### config

> Change the software configuration according to the options provided.

##### Usage

```bash
$ iofog config --option [<optional-argument>]
$ iofog config defaults
```

##### Arguments

|     |  |
| --- | -- |
| `defaults`                 | Reset configuration to default values |
| `-d <#GB Limit>`           | Set the limit, in GiB, of disk space that the software is allowed to use |
| `-dl `                     | Set the directory to use for disk storage |
| `-m <#MB Limit`            | Set the limit, in MiB, of RAM memory that the software is allowed to use for messages |
| `-p <#cpu % Limit>`        | Set the limit, in percentage, of CPU time that the software is allowed to use |
| `-a <uri>`                 | Set the uri of the fog controller to which this software connects |
| `-ac <filepath>`           | Set the file path of the SSL/TLS certificate for validating the fog controller identity |
| `-c <uri>`                 | Set the UNIX socket or network address that the Docker daemon is using |
| `-n <network adapter>`     |    Set the name of the network adapter that holds the correct IP address of this machine |
| `-l <#MB Limit>`           | Set the limit, in MiB, of disk space that the log files can consume |
| `-ld <dir>`                | Set the directory to use for log file storage |
| `-lc <#log files>`         | Set the number of log files to evenly split the log storage limit |
| `-sf <#seconds>`           | Set the status update frequency |
| `-cf <#seconds>`           | Set the get changes frequency |
| `-df <#seconds>`           | Set the post diagnostics frequency |
| `-sd <#seconds>`           | Set the scan devices frequency |
| `-idc <on/off>`            | Set the mode on which any not registered docker container will be shut down |
| `-gps <auto/off/#GPS>`     | Set gps location of fog. Use auto to get coordinates by IP, use off to forbid gps, use GPS coordinates in DD format to set them manually. Format: DD.DDD(lat), DD.DDD(lon) |
| `-ft <auto/intel_amd/arm>` | Set fog type. Use auto to detect fog type by system commands, use arm or intel_amd to set it manually |

<details class="agent-command">
  <summary><h3>info</h3></summary>
<div markdown="1">

> Display the current configuration and other information about the software

##### Usage

| `$ iofog info`

</div>
</details>


<details class="agent-command">
  <summary><h3>provision</h3></summary>
<div markdown="1">

> Change the software configuration according to the options provided.

##### Usage

| `$ iofog config --option [<optional-argument>]`
| `$ iofog config defaults`

##### Arguments

| `defaults`                 | Reset configuration to default values

</div>
</details>


<details class="agent-command">
  <summary><h3>deprovision</h3></summary>
<div markdown="1">

> Change the software configuration according to the options provided.

##### Usage

| `$ iofog config --option [<optional-argument>]`
| `$ iofog config defaults`

##### Arguments

| `defaults`                 | Reset configuration to default values

</div>
</details>


<details class="agent-command">
  <summary><h3>status</h3></summary>
<div markdown="1">

> Change the software configuration according to the options provided.

##### Usage

| `$ iofog config --option [<optional-argument>]`
| `$ iofog config defaults`

##### Arguments

| `defaults`                 | Reset configuration to default values

</div>
</details>


<details class="agent-command">
  <summary><h3>version</h3></summary>
<div markdown="1">

> Change the software configuration according to the options provided.

##### Usage

| `$ iofog config --option [<optional-argument>]`
| `$ iofog config defaults`

##### Arguments

| `defaults`                 | Reset configuration to default values

</div>
</details>


<details class="agent-command">
  <summary><h3>help</h3></summary>
<div markdown="1">

> Change the software configuration according to the options provided.

##### Usage

| `$ iofog config --option [<optional-argument>]`
| `$ iofog config defaults`

##### Arguments

| `defaults`                 | Reset configuration to default values

</div>
</details>


<!--
```


Option           GNU long option         Meaning
======           ===============         =======
-h, -?           --help                  Show this message
-v               --version               Display the software version and
                                         license information


Command          Arguments               Meaning
=======          =========               =======
help                                     Show this message
version                                  Display the software version and
                                         license information
status                                   Display current status information
                                         about the software
provision        <provisioning key>      Attach this software to the
                                         configured ioFog controller
deprovision                              Detach this software from all
                                         ioFog controllers
info                                     Display the current configuration
                                         and other information about the
                                         software
config           [Parameter] [VALUE]     Change the software configuration
                                         according to the options provided
                 defaults                Reset configuration to default values
                 -d <#GB Limit>          Set the limit, in GiB, of disk space
                                         that the software is allowed to use
                 -dl <dir>               Set the directory to use for disk
                                         storage
                 -m <#MB Limit>          Set the limit, in MiB, of RAM memory that
                                         the software is allowed to use for
                                         messages
                 -p <#cpu % Limit>       Set the limit, in percentage, of CPU
                                         time that the software is allowed
                                         to use
                 -a <uri>                Set the uri of the fog controller
                                         to which this software connects
                 -ac <filepath>          Set the file path of the SSL/TLS
                                         certificate for validating the fog
                                         controller identity
                 -c <uri>                Set the UNIX socket or network address
                                         that the Docker daemon is using
                 -n <network adapter>    Set the name of the network adapter
                                         that holds the correct IP address of
                                         this machine
                 -l <#MB Limit>          Set the limit, in MiB, of disk space
                                         that the log files can consume
                 -ld <dir>               Set the directory to use for log file
                                         storage
                 -lc <#log files>        Set the number of log files to evenly
                                         split the log storage limit
                 -sf <#seconds>          Set the status update frequency
                 -cf <#seconds>          Set the get changes frequency
                 -df <#seconds>          Set the post diagnostics frequency
                 -sd <#seconds>          Set the scan devices frequency
                 -idc <on/off>           Set the mode on which any not
										  registered docker container will be
										  shut down
                 -gps <auto/off          Set gps location of fog.
                      /#GPS DD.DDD(lat), Use auto to get coordinates by IP,
                            DD.DDD(lon)  use off to forbid gps,
                                         use GPS coordinates in DD format to set them manually
                 -ft <auto               Set fog type.
                     /intel_amd/arm>     Use auto to detect fog type by system commands,
                                         use arm or intel_amd to set it manually


Report bugs to: edgemaster@iofog.org
ioFog home page: http://iofog.org
For users with Eclipse accounts, report bugs to: https://bugs.eclipse.org/bugs/enter_bug.cgi?product=iofog
```


- help
- version
- status
- provision
- deprovision
- info
- config

-->