# LSUSB info

### REST

REST server listens on port 54331.


#### LSUSB info (GET)

Returns parsed info of 'lsusb' command

```json
http://localhost:54331/hal/hwc/lsusb
```

**Response example**

```json 
 	[
         {
           "bus_number": "002",
           "device_id": "5802",
           "device_bus_number": "004",
           "manufacture_id": "0a5c",
           "manufacture_device_name": "Broadcom Corp. BCM5880 Secure Applications Processor with fingerprint touch sensor"
         },
         {
           "bus_number": "002",
           "device_id": "0a44",
           "device_bus_number": "003",
           "manufacture_id": "046d",
           "manufacture_device_name": "Logitech, Inc. Headset H390"
         },
         {
           "bus_number": "002",
           "device_id": "0024",
           "device_bus_number": "002",
           "manufacture_id": "8087",
           "manufacture_device_name": "Intel Corp. Integrated Rate Matching Hub"
         },
         {
           "bus_number": "002",
           "device_id": "0002",
           "device_bus_number": "001",
           "manufacture_id": "1d6b",
           "manufacture_device_name": "Linux Foundation 2.0 root hub"
         },
         {
           "bus_number": "004",
           "device_id": "0003",
           "device_bus_number": "001",
           "manufacture_id": "1d6b",
           "manufacture_device_name": "Linux Foundation 3.0 root hub"
         },
         {
           "bus_number": "003",
           "device_id": "c31d",
           "device_bus_number": "003",
           "manufacture_id": "046d",
           "manufacture_device_name": "Logitech, Inc. Media Keyboard K200"
         },
         {
           "bus_number": "003",
           "device_id": "c05b",
           "device_bus_number": "002",
           "manufacture_id": "046d",
           "manufacture_device_name": "Logitech, Inc. M-U0004 810-001317 [B110 Optical USB Mouse]"
         },
         {
           "bus_number": "003",
           "device_id": "0002",
           "device_bus_number": "001",
           "manufacture_id": "1d6b",
           "manufacture_device_name": "Linux Foundation 2.0 root hub"
         },
         {
           "bus_number": "001",
           "device_id": "0024",
           "device_bus_number": "002",
           "manufacture_id": "8087",
           "manufacture_device_name": "Intel Corp. Integrated Rate Matching Hub"
         },
         {
           "bus_number": "001",
           "device_id": "0002",
           "device_bus_number": "001",
           "manufacture_id": "1d6b",
           "manufacture_device_name": "Linux Foundation 2.0 root hub"
         }
       ]
```
