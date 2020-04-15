# Agent Configurations

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

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2/reference-agent/configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
