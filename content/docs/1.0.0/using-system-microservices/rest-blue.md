# bluetooth-rest-api (REST-BLUE)

Prerequisites:

- container needs to be run with 2 options to grant access: --net=host --privileged

Upon startup the container will start scanning if bluetooth is powered on and upon discovering devices it will store them locally and generate an internal ID. In most cases the container will work with this locally stored devices unless the scanning is restarted. If container received command to restart scanning it will delete all previously stored devices and start scanning anew ( which results in generating new local IDs for devices).
Container will return 'Timeout exception' in case if it didn't get any results of processing.

> For example, if you try to hit http://localhost:10500/device/mac/{mac}/services?scan=true endpoint you can get 'Timeout exception' for next reasons:
>
> 1. device with specified mac was't found while scanning anew
> 2. device is inactive and container hang up on trying to connect to it
> 3. after connecting to device container hang up on discovering services

Container provides next REST endpoints :

#### Set Device Identifier (POST)

This endpoint provides the possibility to set config for bluetooth-rest-api system container, upon receiving config container will wipe out all previously stored devices and restart scanning. 'name' - will tell container differentiate devices' uniqueness by localname, 'mac' - will tell container differentiate devices' uniqueness by mac address

###### Endpoint 1

<pre>
http://localhost:10500/config/scan
</pre>

###### POST JSON raw body

<pre>
{ "deviceIdentifier" : "name"/"mac" }
</pre>

###### Response

<pre>
"New config applied. Scanning restarted"
</pre>

#### Turn ON/OFF level of logging (POST)

This endpoint provides the possibility to turn ON/OFF DEBUG level logging (empty level value will turn off/ "DEBUG" will show exessive logs)

###### Endpoint 2

<pre>
http://localhost:10500/config/logging
</pre>

###### POST JSON raw body

<pre>
{ "LOG_LEVEL" : "DEBUG" }
</pre>

###### Response

<pre>
"LOG_LEVEL = ${LOG_LEVEL} is applied"
</pre>

#### Restart scanning

This endpoint sends the command to restart scanning to a container. As a result all previously stored devices will be wiped out and then the scanning will be restarted.

###### Endpoint 3

<pre>
http://localhost:10500/scan/restart
</pre>

###### Response

<pre>
"Scanning restarted"
</pre>

#### Get list of devices (GET)

This endpoint returns a list of discovered devices till current moment.

###### Endpoint 4

<pre>
http://localhost:10500/devices
</pre>

###### Response

<pre>
[
  {
    "id": "TzPxHVbBnn",
    "mac-address": "fe:10:4f:c6:b9:39",
    "local-name": "Kontakt",
    "mac-id": "fe104fc6b939",
    "rssi": -74
  },
  {
    "id": "MvSG3gCXU3",
    "mac-address": "5b:d7:13:2b:f9:42",
    "mac-id": "5bd7132bf942",
    "rssi": -81
  }
]
</pre>

#### Get list of services (GET)

This endpoint returns a list of services discovered for specified device ID/Mac Address.

###### Endpoint 5

<pre>
http://localhost:10500/device/iid/{ID}/services
</pre>

###### Endpoint 6

<pre>
http://localhost:10500/device/mac/{mac}/services
</pre>

###### Response

<pre>
[
  {
    "uuid": "1800",
    "name": "Generic Access",
    "type": "org.bluetooth.service.generic_access"
  },
  {
    "uuid": "1801",
    "name": "Generic Attribute",
    "type": "org.bluetooth.service.generic_attribute"
  },
  {
    "uuid": "180a",
    "name": "Device Information",
    "type": "org.bluetooth.service.device_information"
  },
  {
    "uuid": "1804",
    "name": "Tx Power",
    "type": "org.bluetooth.service.tx_power"
  },
  {
    "uuid": "180f",
    "name": "Battery Service",
    "type": "org.bluetooth.service.battery_service"
  },
  {
    "uuid": "a1ea81100e1bd4a1b84063f88c8da1ea",
    "name": null,
    "type": null
  },
  {
    "uuid": "a1ea81200e1bd4a1b84063f88c8da1ea",
    "name": null,
    "type": null
  },
  {
    "uuid": "a1ea81300e1bd4a1b84063f88c8da1ea",
    "name": null,
    "type": null
  }
]
</pre>

#### Get list of characteristics (GET)

This endpoint returns the list of discovered characteristics for specified service sID and device dID/Mac Address

###### Endpoint 7

<pre>
http://localhost:10500/device/iid/{dID}/service/{sID}/characteristics
</pre>

###### Endpoint 8

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristics
</pre>

###### Response

<pre>
[
  {
    "uuid": "2a00",
    "name": "Device Name",
    "type": "org.bluetooth.characteristic.gap.device_name",
    "properties": [
      "read"
    ]
  },
  {
    "uuid": "2a01",
    "name": "Appearance",
    "type": "org.bluetooth.characteristic.gap.appearance",
    "properties": [
      "read"
    ]
  },
  {
    "uuid": "2a04",
    "name": "Peripheral Preferred Connection Parameters",
    "type": "org.bluetooth.characteristic.gap.peripheral_preferred_connection_parameters",
    "properties": [
      "read"
    ]
  }
]
</pre>

#### Read characteristic's value (GET)

This endpoint reads the value from specified characteristic cID for specified service sID and device dID/Mac Address

###### Endpoint 9

<pre>
http://localhost:10500/device/iid/{dID}/service/{sID}/characteristic/{cID}
</pre>

###### Endpoint 10

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristic/{cID}
</pre>

###### Response

<pre>
{
  "data": "base64 encoded data"
}
</pre>

#### Write value to characteristic (POST)

This endpoint writes value to specified characteristic cID for specified service sID and device dID/Mac Address

###### Endpoint 11

<pre>
http://localhost:10500/device/iid/{dID}/service/{sID}/characteristic/{cID}
</pre>

###### Endpoint 12

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristic/{cID}
</pre>

###### POST JSON raw body

"withresponse" isn't required (in case it's omitted the default value will be false)

<pre>
{ "data" : "base64 encoded data" , "withresponse" : true }
</pre>

###### Response

<pre>
"Success writing data to characteristic id = cID"
</pre>

#### Get list of descriptors (GET)

This endpoint returns a list of discovered descriptors for specified characteristic cID, service sID and device dID/Mac Address

###### Endpoint 13

<pre>
http://localhost:10500/device/id/{dID}/service/{sID}/characteristic/{cID}/descriptors
</pre>

###### Endpoint 14

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristic/{cID}/descriptors
</pre>

###### Response

<pre>
[
  {
    "uuid": "2901",
    "name": "Characteristic User Description",
    "type": "org.bluetooth.descriptor.gatt.characteristic_user_description"
  },
  {
    "uuid": "2900",
    "name": "Characteristic Extended Properties",
    "type": "org.bluetooth.descriptor.gatt.characteristic_extended_properties"
  }
]
</pre>

#### Read the value from descriptor (GET)

This endpoint reads the value from specified descriptor dsID for specified characteristic cID, service sID and device dID/Mac Address

###### Endpoint 15

<pre>
http://localhost:10500/device/iid/{dID}/service/{sID}/characteristic/{cID}/descriptor/{dsID}
</pre>

###### Endpoint 16

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristic/{cID}/descriptor/{dsID}
</pre>

###### Response

<pre>
{
  "data": "base64 encoded data"
}
</pre>

#### Subscribe to characteristic's notify event (GET)

This endpoint sets notify property to true for specified characteristic's cID for specified service sID and device dID/Mac Address and returns url where buffered values can be picked up. If timeout parameter is specified (in millisecond) it'll be applied, otherwise RESTBlue will use the default value 1 min (60000 milliseconds).
This timeout is specified to handle usecase when device is still connected and advertising, but RESTBlue stopped receiving any data on notify subscription.
When picking up buffered notify data:

- If RESTBlue doesn't receive any data for more than specified timeout it will unsubscribe and remove notify buffer url and return 500 status code with error:TIMEOUT_DATA.
- In case if device disconnected while being subscribed the response will be OK with device_disconnected:true and last batch of data.

###### Endpoint 17

<pre>
http://localhost:10500/device/iid/{dID}/service/{sID}/characteristic/{cID}/notify??timeout=TIME_MILLISEC
</pre>

###### Endpoint 18

<pre>
http://localhost:10500/device/mac/{mac}/service/{sID}/characteristic/{cID}/notify
</pre>

###### Response

<pre>
{
  "message": "Notification is turned ON for characteristic uuid = CH_ID ",
  "url": "notify_buffer/BUFFER_GENERATEDID"
}
</pre>

#### Check status of Bluetooth Adapter (GET)

This endpoint return the status of Bluetooth Adapter: if it'spowered on/off (true/false).

###### Endpoint 19

<pre>
http://localhost:10500/status
</pre>

###### Response

<pre>
{
  "bluetooth_adapter_powered_on": true/false
}
</pre>

Parameters for endpoint 5-18:

- scan=true : This parameter will tell REST Blue to stop scanning, clean up previously stored devices and start scan again and look for specified in the url device.
- drct=1000 : Device reconnect timeout. Default value = 1000 millisecond. This parameter is specified in milliseconds, it's a timeout that REST Blue will wait to reconnect to device after receiving disconnect event for this device. REST Blue will try to reconnect only if it was subscribed on device's notifications and is storing data for 'NOTIFY Buffer' functionality.
- drca=5 : Device reconnect attempts. Default value = 5 attempts. This parameter specifies how many attempts REST Blue should make to reconnect to device in case it lost connection while being subscribed to data notifications.

For Endpoints number 5-18 all the operations will be performed with previously scanned devices (the scanning starts upon container's start).
For Endpoints numbers 6, 8, 10, 12, 14, 16, 18 (basically the ones with mac parameter to identify device) if add scan=true parameter to url, new device can be searched.
