# USB devices list

### REST

REST server listens on port 54331.

#### USB devices list (GET)

Returns a list of serial ports

```json
http://localhost:54331/hal/rs232/list
```

**Response example**

```json
 	[
         {
           "subsystem": "pci",
           "pid": null,
           "manufacturer": null,
           "description": "n/a",
           "product": null,
           "vid": null,
           "hwid": "n/a",
           "serial_number": null,
           "usb_device_path": null,
           "location": null,
           "port": "/dev/ttyS4",
           "device_path": "/sys/devices/pci0000:00/0000:00:16.3",
           "interface": null,
           "name": "ttyS4"
         },
         {
           "subsystem": "usb-serial",
           "pid": 8963,
           "manufacturer": "Prolific Technology Inc.",
           "description": "USB-Serial Controller D",
           "product": "USB-Serial Controller D",
           "vid": 1659,
           "hwid": "USB VID:PID=067B:2303 LOCATION=2-1.1",
           "serial_number": null,
           "usb_device_path": "/sys/devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.1",
           "location": "2-1.1",
           "port": "/dev/ttyUSB0",
           "device_path": "/sys/devices/pci0000:00/0000:00:1d.0/usb2/2-1/2-1.1/2-1.1:1.0/ttyUSB0",
           "interface": null,
           "name": "ttyUSB0"
         }
       ]
```
