# LSPCI

### REST

REST server listens on port 54331.

#### LSPCI info (GET)

Returns parsed info of 'lspci' command

```json
http://localhost:54331/hal/hwc/lspci
```

**Response example**
 
 ```json
 	[
         {
           "device_class_id": "0600",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Host bridge ",
           "device_id": "0104",
           "revision_number": "09 ",
           "bus_device_number": "00",
           "bus_number": "00",
           "device_name": "2nd Generation Core Processor Family DRAM Controller "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "0101",
           "revision_number": "09 ",
           "bus_device_number": "01",
           "bus_number": "00",
           "device_name": "Xeon E3-1200/2nd Generation Core Processor Family PCI Express Root Port "
         },
         {
           "device_class_id": "0300",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "VGA compatible controller ",
           "device_id": "0126",
           "revision_number": "09 ",
           "bus_device_number": "02",
           "bus_number": "00",
           "device_name": "2nd Generation Core Processor Family Integrated Graphics Controller "
         },
         {
           "device_class_id": "0780",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Communication controller ",
           "device_id": "1c3a",
           "revision_number": "04 ",
           "bus_device_number": "16",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family MEI Controller #1 "
         },
         {
           "device_class_id": "0700",
           "bus_function_number": "3 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Serial controller ",
           "device_id": "1c3d",
           "revision_number": "04 -p02 ",
           "bus_device_number": "16",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family KT Controller "
         },
         {
           "device_class_id": "0200",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Ethernet controller ",
           "device_id": "1502",
           "revision_number": "04 ",
           "bus_device_number": "19",
           "bus_number": "00",
           "device_name": "82579LM Gigabit Network Connection "
         },
         {
           "device_class_id": "0c03",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "USB controller ",
           "device_id": "1c2d",
           "revision_number": "04 -p20 ",
           "bus_device_number": "1a",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family USB Enhanced Host Controller #2 "
         },
         {
           "device_class_id": "0403",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Audio device ",
           "device_id": "1c20",
           "revision_number": "04 ",
           "bus_device_number": "1b",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family High Definition Audio Controller "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "1c10",
           "revision_number": "b4 ",
           "bus_device_number": "1c",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family PCI Express Root Port 1 "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "1 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "1c12",
           "revision_number": "b4 ",
           "bus_device_number": "1c",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family PCI Express Root Port 2 "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "2 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "1c14",
           "revision_number": "b4 ",
           "bus_device_number": "1c",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family PCI Express Root Port 3 "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "3 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "1c16",
           "revision_number": "b4 ",
           "bus_device_number": "1c",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family PCI Express Root Port 4 "
         },
         {
           "device_class_id": "0604",
           "bus_function_number": "7 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "PCI bridge ",
           "device_id": "1c1e",
           "revision_number": "b4 ",
           "bus_device_number": "1c",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family PCI Express Root Port 8 "
         },
         {
           "device_class_id": "0c03",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "USB controller ",
           "device_id": "1c26",
           "revision_number": "04 -p20 ",
           "bus_device_number": "1d",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family USB Enhanced Host Controller #1 "
         },
         {
           "device_class_id": "0601",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "ISA bridge ",
           "device_id": "1c4f",
           "revision_number": "04 ",
           "bus_device_number": "1f",
           "bus_number": "00",
           "device_name": "QM67 Express Chipset Family LPC Controller "
         },
         {
           "device_class_id": "0104",
           "bus_function_number": "2 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "RAID bus controller ",
           "bus_device_number": "1f",
           "bus_number": "00",
           "revision_number": "04 "
         },
         {
           "device_class_id": "0c05",
           "bus_function_number": "3 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "SMBus ",
           "device_id": "1c22",
           "revision_number": "04 ",
           "bus_device_number": "1f",
           "bus_number": "00",
           "device_name": "6 Series/C200 Series Chipset Family SMBus Controller "
         },
         {
           "device_class_id": "0300",
           "bus_function_number": "0 ",
           "device_vendor": "NVIDIA Corporation ",
           "device_vendor_id": "10de",
           "device_class": "VGA compatible controller ",
           "bus_device_number": "00",
           "bus_number": "01",
           "revision_number": "a1 "
         },
         {
           "device_class_id": "0403",
           "bus_function_number": "1 ",
           "device_vendor": "NVIDIA Corporation ",
           "device_vendor_id": "10de",
           "device_class": "Audio device ",
           "device_id": "0bea",
           "revision_number": "a1 ",
           "bus_device_number": "00",
           "bus_number": "01",
           "device_name": "GF108 High Definition Audio Controller "
         },
         {
           "device_class_id": "0280",
           "bus_function_number": "0 ",
           "device_vendor": "Intel Corporation ",
           "device_vendor_id": "8086",
           "device_class": "Network controller ",
           "device_id": "422b",
           "revision_number": "35 ",
           "bus_device_number": "00",
           "bus_number": "03",
           "device_name": "Centrino Ultimate-N 6300 "
         },
         {
           "device_class_id": "0c03",
           "bus_function_number": "0 ",
           "device_vendor": "NEC Corporation ",
           "device_vendor_id": "1033",
           "device_class": "USB controller ",
           "device_id": "0194",
           "revision_number": "04 -p30 ",
           "bus_device_number": "00",
           "bus_number": "0a",
           "device_name": "uPD720200 USB 3.0 Host Controller "
         },
         {
           "device_class_id": "0c00",
           "bus_function_number": "0 ",
           "device_vendor": "O2 Micro, Inc. ",
           "device_vendor_id": "1217",
           "device_class": "FireWire (IEEE 1394) ",
           "device_id": "11f7",
           "revision_number": "05 -p10 ",
           "bus_device_number": "00",
           "bus_number": "0b",
           "device_name": "OZ600 1394a-2000 Controller "
         },
         {
           "device_class_id": "0805",
           "bus_function_number": "1 ",
           "device_vendor": "O2 Micro, Inc. ",
           "device_vendor_id": "1217",
           "device_class": "SD Host controller ",
           "device_id": "8320",
           "revision_number": "05 -p01 ",
           "bus_device_number": "00",
           "bus_number": "0b",
           "device_name": "OZ600RJ1/OZ900RJ1 SD/MMC Card Reader Controller "
         },
         {
           "device_class_id": "0180",
           "bus_function_number": "2 ",
           "device_vendor": "O2 Micro, Inc. ",
           "device_vendor_id": "1217",
           "device_class": "Mass storage controller ",
           "device_id": "8330",
           "revision_number": "05 ",
           "bus_device_number": "00",
           "bus_number": "0b",
           "device_name": "OZ600 MS/xD Controller "
         }
       ]
```
