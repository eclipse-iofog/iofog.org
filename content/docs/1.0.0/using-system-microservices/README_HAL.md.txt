# HAL
HAL stands for Hardware Abstraction Layer. It's REST/WS abstraction for hardware capabilities for Linux based 
machines.
 
> ##### Prerequisites:
> as Docker container, it needs to be run with next options to grant access: 
> <pre> --net=host --privileged </pre>
> in other cases it needs to start under root user
 
### REST
REST server listens on port 54331. 

#### LSCPU info (GET)
 Returns parsed info of 'lscpu' command
 <pre> http://localhost:54331/hal/hwc/lscpu </pre>
 Response example
 <pre> {
        "on_line_cpus_list": "0-7",
        "cpus": "8",
        "cpu_family": "6",
        "l1d_cache": "32K",
        "cpu_max_mhz": "3400,0000",
        "cores_per_socket": "4",
        "byte_order": "Little Endian",
        "architecture": "x86_64",
        "cpu_min_mhz": "800,0000",
        "virtualization": "VT-x",
        "numa_nodes": "1",
        "bogomips": "4589.92",
        "l2_cache": "256K",
        "model": "42",
        "stepping": "7",
        "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
        "cpu_mhz": "3100.592",
        "vendor_id": "GenuineIntel",
        "numa_node0_cpus": "0-7",
        "l1i_cache": "32K",
        "threads_per_core": "2",
        "sockets": "1",
        "cpu_op_modes": "32-bit, 64-bit",
        "l3_cache": "8192K",
        "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
      } </pre>
#### LSPCI info (GET)
 Returns parsed info of 'lspci' command
 <pre> http://localhost:54331/hal/hwc/lspci </pre>
 Response example
 <pre> [
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
       ] </pre>
#### LSUSB info (GET)
 Returns parsed info of 'lsusb' command
 <pre> http://localhost:54331/hal/hwc/lsusb </pre>
 Response example
 <pre> [
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
       ] </pre>
#### LSHW info (GET)
 Returns parsed info of 'lshw' command
 <pre> http://localhost:54331/hal/hwc/lshw </pre>
 Response example
 <pre> {
         "id": "machine_id",
         "handle": "handle_string",
         "configuration": {
           "boot": "normal",
           "chassis": "laptop",
           "uuid": "machine_uuid"
         },
         "description": "Laptop",
         "class": "system",
         "product": "Precision M4600",
         "vendor": "Dell Inc.",
         "claimed": true,
         "children": [
           {
             "claimed": true,
             "id": "core",
             "serial": "serial_string",
             "vendor": "Dell Inc.",
             "children": [
               {
                 "id": "firmware",
                 "vendor": "Dell Inc.",
                 "description": "BIOS",
                 "class": "memory",
                 "date": "12/26/2013",
                 "size": 65536,
                 "capacity": 2031616,
                 "claimed": true,
                 "capabilities": {
                   "int13floppy720": "3.5\" 720KB floppy",
                   "shadowing": "BIOS shadowing",
                   "acpi": "ACPI",
                   "int9keyboard": "i8042 keyboard controller",
                   "int13floppy1200": "5.25\" 1.2MB floppy",
                   "upgrade": "BIOS EEPROM can be upgraded",
                   "int13floppy2880": "3.5\" 2.88MB floppy",
                   "pci": "PCI bus",
                   "edd": "Enhanced Disk Drive extensions",
                   "bootselect": "Selectable boot path",
                   "int14serial": "INT14 serial line control",
                   "int17printer": "INT17 printer control",
                   "biosbootspecification": "BIOS boot specification",
                   "cdboot": "Booting from CD-ROM/DVD",
                   "int5printscreen": "Print Screen key"
                 },
                 "physid": "0",
                 "version": "A16",
                 "units": "bytes"
               },
               {
                 "id": "cpu",
                 "children": [
                   {
                     "id": "id_string",
                     "configuration": {
                       "level": "1"
                     },
                     "description": "L1 cache",
                     "class": "memory",
                     "slot": "L1-Cache",
                     "handle": "handle_string",
                     "size": 32768,
                     "capacity": 32768,
                     "claimed": true,
                     "capabilities": {
                       "write-back": "Write-back",
                       "unified": "Unified cache",
                       "internal": "Internal"
                     },
                     "physid": "5",
                     "units": "bytes"
                   },
                   {
                     "id": "id_string",
                     "configuration": {
                       "level": "2"
                     },
                     "description": "L2 cache",
                     "class": "memory",
                     "slot": "L2-Cache",
                     "handle": "handle_string",
                     "size": 262144,
                     "capacity": 262144,
                     "claimed": true,
                     "capabilities": {
                       "varies": "Varies With Memory Address",
                       "unified": "Unified cache",
                       "internal": "Internal"
                     },
                     "physid": "6",
                     "units": "bytes"
                   },
                   {
                     "id": "id_string",
                     "configuration": {
                       "level": "3"
                     },
                     "description": "L3 cache",
                     "class": "memory",
                     "slot": "L3-Cache",
                     "handle": "handle_string",
                     "size": 8388608,
                     "capacity": 8388608,
                     "claimed": true,
                     "capabilities": {
                       "varies": "Varies With Memory Address",
                       "unified": "Unified cache",
                       "internal": "Internal"
                     },
                     "physid": "7",
                     "units": "bytes"
                   }
                 ],
                 "handle": "handle_string",
                 "configuration": {
                   "cores": "4",
                   "threads": "8",
                   "enabledcores": "4"
                 },
                 "description": "CPU",
                 "class": "processor",
                 "product": "product_string",
                 "vendor": "Intel Corp.",
                 "size": 1496319000,
                 "capacity": 4000000000,
                 "claimed": true,
                 "capabilities": {
                   "nx": "no-execute bit (NX)",
                   "cx8": "compare and exchange 8-byte",
                   "aperfmperf": true,
                   "acpi": "thermal control (ACPI)",
                   "sse2": "streaming SIMD extensions (SSE2)",
                   "ida": true,
                   "tm": "thermal interrupt and status",
                   "pni": true,
                   "de": "debugging extensions",
                   "epb": true,
                   "msr": "model-specific registers",
                   "ss": "self-snoop",
                   "lahf_lm": true,
                   "sse": "streaming SIMD extensions (SSE)",
                   "sse4_2": true,
                   "bts": true,
                   "arat": true,
                   "cpufreq": "CPU Frequency scaling",
                   "mce": "machine check exceptions",
                   "pbe": "pending break event",
                   "arch_perfmon": true,
                   "rep_good": true,
                   "vpid": true,
                   "mca": "machine check architecture",
                   "pts": true,
                   "vmx": true,
                   "fpu": "mathematical co-processor",
                   "ssse3": true,
                   "eagerfpu": true,
                   "vme": "virtual mode extensions",
                   "ht": "HyperThreading",
                   "fxsr": "fast floating point save/restore",
                   "monitor": true,
                   "aes": true,
                   "syscall": "fast system calls",
                   "avx": true,
                   "tsc_deadline_timer": true,
                   "dts": "debug trace and EMON store MSRs",
                   "dtherm": true,
                   "xsave": true,
                   "pge": "page global enable",
                   "cmov": "conditional move instruction",
                   "constant_tsc": true,
                   "vnmi": true,
                   "apic": "on-chip advanced programmable interrupt controller (APIC)",
                   "pse36": "36-bit page size extensions",
                   "tpr_shadow": true,
                   "pcid": true,
                   "mmx": "multimedia extensions (MMX)",
                   "dtes64": true,
                   "pclmulqdq": true,
                   "sep": "fast system calls",
                   "pln": true,
                   "pdcm": true,
                   "flexpriority": true,
                   "xtpr": true,
                   "mtrr": "memory type range registers",
                   "x86-64": "64bits extensions (x86-64)",
                   "pat": "page attribute table",
                   "clflush": true,
                   "pae": "4GB+ memory addressing (Physical Address Extension)",
                   "ds_cpl": true,
                   "xsaveopt": true,
                   "wp": true,
                   "est": true,
                   "ept": true,
                   "smx": true,
                   "tm2": true,
                   "nonstop_tsc": true,
                   "pse": "page size extensions",
                   "nopl": true,
                   "xtopology": true,
                   "popcnt": true,
                   "x2apic": true,
                   "sse4_1": true,
                   "cx16": true,
                   "rdtscp": true,
                   "tsc": "time stamp counter",
                   "fpu_exception": "FPU exceptions reporting",
                   "pebs": true
                 },
                 "clock": 100000000,
                 "width": 64,
                 "slot": "CPU 1",
                 "physid": "4",
                 "serial": "serial_string",
                 "units": "Hz",
                 "version": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GH",
                 "businfo": "bus_info_sting"
               },
               {
                 "claimed": true,
                 "id": "memory",
                 "children": [
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "description": "SODIMM DDR3 Synchronous 1333 MHz (0,8 ns)",
                     "class": "memory",
                     "product": "product_string",
                     "vendor": "Hynix/Hyundai",
                     "size": 4294967296,
                     "claimed": true,
                     "clock": 1333000000,
                     "width": 64,
                     "slot": "slot_string",
                     "physid": "0",
                     "serial": "serial_string",
                     "units": "bytes"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "description": "SODIMM DDR3 Synchronous 1333 MHz (0,8 ns)",
                     "class": "memory",
                     "product": "product_string",
                     "vendor": "Samsung",
                     "size": 4294967296,
                     "claimed": true,
                     "clock": 1333000000,
                     "width": 64,
                     "slot": "slot_string",
                     "physid": "1",
                     "serial": "serial_string",
                     "units": "bytes"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "description": "SODIMM DDR3 Synchronous 1333 MHz (0,8 ns)",
                     "class": "memory",
                     "product": "product_string",
                     "vendor": "Hynix/Hyundai",
                     "size": 4294967296,
                     "claimed": true,
                     "clock": 1333000000,
                     "width": 64,
                     "slot": "slot_string",
                     "physid": "2",
                     "serial": "serial_string",
                     "units": "bytes"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_sting",
                     "description": "SODIMM DDR3 Synchronous 1333 MHz (0,8 ns)",
                     "class": "memory",
                     "product": "M471B5273CH0-CH9",
                     "vendor": "Samsung",
                     "size": 4294967296,
                     "claimed": true,
                     "clock": 1333000000,
                     "width": 64,
                     "slot": "slot_string",
                     "physid": "3",
                     "serial": "serial_string",
                     "units": "bytes"
                   }
                 ],
                 "class": "memory",
                 "description": "System Memory",
                 "slot": "System board or motherboard",
                 "physid": "3f",
                 "handle": "handle_string",
                 "size": 17179869184,
                 "units": "bytes"
               },
               {
                 "id": "pci",
                 "children": [
                   {
                     "id": "pci_id_string",
                     "children": [
                       {
                         "id": "display",
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0",
                           "driver": "nouveau"
                         },
                         "description": "VGA compatible controller",
                         "class": "display",
                         "product": "product_string",
                         "vendor": "NVIDIA Corporation",
                         "claimed": true,
                         "clock": 33000000,
                         "width": 64,
                         "capabilities": {
                           "bus_master": "bus mastering",
                           "vga_controller": true,
                           "pciexpress": "PCI Express",
                           "cap_list": "PCI capabilities listing",
                           "pm": "Power Management",
                           "msi": "Message Signalled Interrupts",
                           "rom": "extension ROM"
                         },
                         "physid": "0",
                         "version": "a1",
                         "businfo": "bus_info_string"
                       },
                       {
                         "id": "multimedia",
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0",
                           "driver": "snd_hda_intel"
                         },
                         "description": "Audio device",
                         "class": "multimedia",
                         "product": "product_string",
                         "vendor": "NVIDIA Corporation",
                         "claimed": true,
                         "clock": 33000000,
                         "width": 32,
                         "capabilities": {
                           "pm": "Power Management",
                           "bus_master": "bus mastering",
                           "msi": "Message Signalled Interrupts",
                           "cap_list": "PCI capabilities listing",
                           "pciexpress": "PCI Express"
                         },
                         "physid": "0.1",
                         "version": "a1",
                         "businfo": "bus_info_string"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "product_string",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "pci": true,
                       "msi": "Message Signalled Interrupts"
                     },
                     "physid": "1",
                     "version": "09",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "display",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "i915"
                     },
                     "description": "VGA compatible controller",
                     "class": "display",
                     "product": "2nd Generation Core Processor Family Integrated Graphics Controller",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 64,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "vga_controller": true,
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "msi": "Message Signalled Interrupts",
                       "rom": "extension ROM"
                     },
                     "physid": "2",
                     "version": "09",
                     "businfo": "bis_info_string"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "mei_me"
                     },
                     "description": "Communication controller",
                     "class": "communication",
                     "product": "6 Series/C200 Series Chipset Family MEI Controller #1",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 64,
                     "capabilities": {
                       "pm": "Power Management",
                       "msi": "Message Signalled Interrupts",
                       "cap_list": "PCI capabilities listing",
                       "bus_master": "bus mastering"
                     },
                     "physid": "16",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "serial"
                     },
                     "description": "Serial controller",
                     "class": "communication",
                     "product": "6 Series/C200 Series Chipset Family KT Controller",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 66000000,
                     "width": 32,
                     "capabilities": {
                       "16550": true,
                       "pm": "Power Management",
                       "bus_master": "bus mastering",
                       "msi": "Message Signalled Interrupts",
                       "cap_list": "PCI capabilities listing"
                     },
                     "physid": "16.3",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "network",
                     "handle": "handle_string",
                     "configuration": {
                       "multicast": "yes",
                       "latency": "0",
                       "port": "twisted pair",
                       "link": "no",
                       "broadcast": "yes",
                       "firmware": "0.13-3",
                       "driverversion": "3.2.6-k",
                       "autonegotiation": "on",
                       "driver": "e1000e"
                     },
                     "description": "Ethernet interface",
                     "class": "network",
                     "product": "82579LM Gigabit Network Connection",
                     "vendor": "Intel Corporation",
                     "capacity": 1000000000,
                     "claimed": true,
                     "logicalname": "log_name_string",
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "100bt-fd": "100Mbit/s (full duplex)",
                       "10bt": "10Mbit/s",
                       "100bt": "100Mbit/s",
                       "pm": "Power Management",
                       "msi": "Message Signalled Interrupts",
                       "bus_master": "bus mastering",
                       "ethernet": true,
                       "10bt-fd": "10Mbit/s (full duplex)",
                       "physical": "Physical interface",
                       "autonegotiation": "Auto-negotiation",
                       "tp": "twisted pair",
                       "cap_list": "PCI capabilities listing",
                       "1000bt-fd": "1Gbit/s (full duplex)"
                     },
                     "physid": "physid_string",
                     "serial": "serial_string",
                     "units": "bit/s",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "children": [
                       {
                         "id": "id_string",
                         "handle": "handle_string",
                         "configuration": {
                           "speed": "480Mbit/s",
                           "slots": "3",
                           "driver": "hub"
                         },
                         "businfo": "bus_indo_srting",
                         "class": "bus",
                         "product": "EHCI Host Controller",
                         "vendor": "Linux 4.8.0-53-generic ehci_hcd",
                         "claimed": true,
                         "logicalname": "log_name_string",
                         "children": [
                           {
                             "id": "id_string",
                             "handle": "handle_string",
                             "configuration": {
                               "speed": "480Mbit/s",
                               "slots": "6",
                               "driver": "hub"
                             },
                             "description": "USB hub",
                             "class": "bus",
                             "product": "Integrated Rate Matching Hub",
                             "vendor": "Intel Corp.",
                             "claimed": true,
                             "capabilities": {
                               "usb-2.00": "USB 2.0"
                             },
                             "physid": "physid_string",
                             "version": "0.00",
                             "businfo": "bus_info_string"
                           }
                         ],
                         "capabilities": {
                           "usb-2.00": "USB 2.0"
                         },
                         "physid": "physid_string",
                         "version": "4.08"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "ehci-pci"
                     },
                     "description": "USB controller",
                     "class": "bus",
                     "product": "6 Series/C200 Series Chipset Family USB Enhanced Host Controller #2",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "ehci": "Enhanced Host Controller Interface (USB2)",
                       "pm": "Power Management",
                       "cap_list": "PCI capabilities listing",
                       "debug": "Debug port",
                       "bus_master": "bus mastering"
                     },
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "multimedia",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "snd_hda_intel"
                     },
                     "description": "Audio device",
                     "class": "multimedia",
                     "product": "6 Series/C200 Series Chipset Family High Definition Audio Controller",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 64,
                     "capabilities": {
                       "pm": "Power Management",
                       "bus_master": "bus mastering",
                       "msi": "Message Signalled Interrupts",
                       "cap_list": "PCI capabilities listing",
                       "pciexpress": "PCI Express"
                     },
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "6 Series/C200 Series Chipset Family PCI Express Root Port 1",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "msi": "Message Signalled Interrupts",
                       "pci": true
                     },
                     "physid": "physid_string",
                     "version": "b4",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "children": [
                       {
                         "id": "network",
                         "handle": "handle_string",
                         "configuration": {
                           "wireless": "IEEE 802.11",
                           "multicast": "yes",
                           "link": "yes",
                           "broadcast": "yes",
                           "ip": "ip_address",
                           "firmware": "9.221.4.1 build 25532",
                           "driverversion": "4.8.0-53-generic",
                           "latency": "0",
                           "driver": "iwlwifi"
                         },
                         "description": "Wireless interface",
                         "class": "network",
                         "product": "Centrino Ultimate-N 6300",
                         "vendor": "Intel Corporation",
                         "claimed": true,
                         "logicalname": "log_name_string",
                         "clock": 33000000,
                         "width": 64,
                         "capabilities": {
                           "bus_master": "bus mastering",
                           "ethernet": true,
                           "physical": "Physical interface",
                           "pciexpress": "PCI Express",
                           "cap_list": "PCI capabilities listing",
                           "pm": "Power Management",
                           "wireless": "Wireless-LAN",
                           "msi": "Message Signalled Interrupts"
                         },
                         "physid": "physid_string",
                         "serial": "serial_string",
                         "version": "35",
                         "businfo": "bus_info_string"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "6 Series/C200 Series Chipset Family PCI Express Root Port 2",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "msi": "Message Signalled Interrupts",
                       "pci": true
                     },
                     "physid": "physid_string",
                     "version": "b4",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "6 Series/C200 Series Chipset Family PCI Express Root Port 3",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "msi": "Message Signalled Interrupts",
                       "pci": true
                     },
                     "physid": "physid_string",
                     "version": "b4",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "children": [
                       {
                         "id": "usb",
                         "children": [
                           {
                             "id": "id_string",
                             "handle": "handle_string",
                             "configuration": {
                               "speed": "480Mbit/s",
                               "slots": "2",
                               "driver": "hub"
                             },
                             "businfo": "bus_info_string",
                             "class": "bus",
                             "product": "xHCI Host Controller",
                             "vendor": "Linux 4.8.0-53-generic xhci-hcd",
                             "claimed": true,
                             "logicalname": "log_name_string",
                             "children": [
                               {
                                 "id": "id_string",
                                 "handle": "handle_string",
                                 "configuration": {
                                   "maxpower": "98mA",
                                   "speed": "1Mbit/s",
                                   "driver": "usbhid"
                                 },
                                 "description": "Mouse",
                                 "class": "input",
                                 "product": "USB Optical Mouse",
                                 "vendor": "Logitech",
                                 "claimed": true,
                                 "capabilities": {
                                   "usb-2.00": "USB 2.0"
                                 },
                                 "physid": "physid_string",
                                 "version": "54.00",
                                 "businfo": "bus_info_string"
                               },
                               {
                                 "id": "id_string",
                                 "handle": "handle_string",
                                 "configuration": {
                                   "maxpower": "90mA",
                                   "speed": "1Mbit/s",
                                   "driver": "usbhid"
                                 },
                                 "description": "Keyboard",
                                 "class": "input",
                                 "product": "USB Keyboard",
                                 "vendor": "Logitech",
                                 "claimed": true,
                                 "capabilities": {
                                   "usb-1.10": "USB 1.1"
                                 },
                                 "physid": "physid_string",
                                 "version": "66.01",
                                 "businfo": "bus_info_string"
                               }
                             ],
                             "capabilities": {
                               "usb-2.00": "USB 2.0"
                             },
                             "physid": "physid_string",
                             "version": "4.08"
                           },
                           {
                             "id": "id_string",
                             "handle": "handle_string",
                             "configuration": {
                               "speed": "5000Mbit/s",
                               "slots": "2",
                               "driver": "hub"
                             },
                             "businfo": "bus_info_string",
                             "class": "bus",
                             "product": "xHCI Host Controller",
                             "vendor": "Linux 4.8.0-53-generic xhci-hcd",
                             "claimed": true,
                             "logicalname": "log_name_string",
                             "capabilities": {
                               "usb-3.00": true
                             },
                             "physid": "physid_string",
                             "version": "4.08"
                           }
                         ],
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0",
                           "driver": "xhci_hcd"
                         },
                         "description": "USB controller",
                         "class": "bus",
                         "product": "uPD720200 USB 3.0 Host Controller",
                         "vendor": "NEC Corporation",
                         "claimed": true,
                         "clock": 33000000,
                         "width": 64,
                         "capabilities": {
                           "bus_master": "bus mastering",
                           "xhci": true,
                           "pciexpress": "PCI Express",
                           "msix": "MSI-X",
                           "pm": "Power Management",
                           "msi": "Message Signalled Interrupts",
                           "cap_list": "PCI capabilities listing"
                         },
                         "physid": "physid_string",
                         "version": "04",
                         "businfo": "bus_info_string"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "6 Series/C200 Series Chipset Family PCI Express Root Port 4",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "msi": "Message Signalled Interrupts",
                       "pci": true
                     },
                     "physid": "physid_string",
                     "version": "b4",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "children": [
                       {
                         "id": "firewire",
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0",
                           "driver": "firewire_ohci"
                         },
                         "description": "FireWire (IEEE 1394)",
                         "class": "bus",
                         "product": "OZ600 1394a-2000 Controller",
                         "vendor": "O2 Micro, Inc.",
                         "claimed": true,
                         "clock": 33000000,
                         "width": 32,
                         "capabilities": {
                           "bus_master": "bus mastering",
                           "pciexpress": "PCI Express",
                           "cap_list": "PCI capabilities listing",
                           "ohci": "Open Host Controller Interface",
                           "pm": "Power Management",
                           "msi": "Message Signalled Interrupts"
                         },
                         "physid": "physid_string",
                         "version": "05",
                         "businfo": "bus_info_string"
                       },
                       {
                         "id": "generic",
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0",
                           "driver": "sdhci-pci"
                         },
                         "description": "SD Host controller",
                         "class": "generic",
                         "product": "OZ600RJ1/OZ900RJ1 SD/MMC Card Reader Controller",
                         "vendor": "O2 Micro, Inc.",
                         "claimed": true,
                         "clock": 33000000,
                         "width": 32,
                         "capabilities": {
                           "pm": "Power Management",
                           "bus_master": "bus mastering",
                           "msi": "Message Signalled Interrupts",
                           "cap_list": "PCI capabilities listing",
                           "pciexpress": "PCI Express"
                         },
                         "physid": "physid_string",
                         "version": "05",
                         "businfo": "bus_info_string"
                       },
                       {
                         "id": "storage",
                         "handle": "handle_string",
                         "configuration": {
                           "latency": "0"
                         },
                         "description": "Mass storage controller",
                         "class": "storage",
                         "product": "OZ600 MS/xD Controller",
                         "vendor": "O2 Micro, Inc.",
                         "clock": 33000000,
                         "width": 32,
                         "capabilities": {
                           "bus_master": "bus mastering",
                           "pciexpress": "PCI Express",
                           "cap_list": "PCI capabilities listing",
                           "pm": "Power Management",
                           "storage": true,
                           "msi": "Message Signalled Interrupts"
                         },
                         "physid": "physid_string",
                         "version": "05",
                         "businfo": "bus_info_string"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "driver": "pcieport"
                     },
                     "description": "PCI bridge",
                     "class": "bridge",
                     "product": "6 Series/C200 Series Chipset Family PCI Express Root Port 8",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "pciexpress": "PCI Express",
                       "cap_list": "PCI capabilities listing",
                       "pm": "Power Management",
                       "normal_decode": true,
                       "msi": "Message Signalled Interrupts",
                       "pci": true
                     },
                     "physid": "physid_string",
                     "version": "b4",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "id_string",
                     "children": [
                       {
                         "id": "id_string",
                         "handle": "handle_string",
                         "configuration": {
                           "speed": "480Mbit/s",
                           "slots": "3",
                           "driver": "hub"
                         },
                         "businfo": "bus_info_string",
                         "class": "bus",
                         "product": "EHCI Host Controller",
                         "vendor": "Linux 4.8.0-53-generic ehci_hcd",
                         "claimed": true,
                         "logicalname": "log_name_string",
                         "children": [
                           {
                             "id": "id_string",
                             "handle": "handle_string",
                             "configuration": {
                               "speed": "480Mbit/s",
                               "slots": "8",
                               "driver": "hub"
                             },
                             "description": "USB hub",
                             "class": "bus",
                             "product": "Integrated Rate Matching Hub",
                             "vendor": "Intel Corp.",
                             "claimed": true,
                             "children": [
                               {
                                 "id": "id_string",
                                 "handle": "handle_string",
                                 "configuration": {
                                   "maxpower": "100mA",
                                   "speed": "12Mbit/s",
                                   "driver": "usbhid"
                                 },
                                 "description": "Audio device",
                                 "class": "multimedia",
                                 "product": "Logitech USB Headset",
                                 "vendor": "Logitech",
                                 "claimed": true,
                                 "capabilities": {
                                   "audio-control": "Control device",
                                   "usb-1.10": "USB 1.1"
                                 },
                                 "physid": "physid_string",
                                 "version": "1.27",
                                 "businfo": "bus_info_string"
                               },
                               {
                                 "id": "id_string",
                                 "handle": "handle_string",
                                 "configuration": {
                                   "maxpower": "100mA",
                                   "speed": "12Mbit/s"
                                 },
                                 "description": "Generic USB device",
                                 "class": "generic",
                                 "product": "5880",
                                 "vendor": "Broadcom Corp",
                                 "capabilities": {
                                   "usb-1.10": "USB 1.1"
                                 },
                                 "physid": "physid_string",
                                 "serial": "serial_string",
                                 "version": "1.01",
                                 "businfo": "bus_info_string"
                               }
                             ],
                             "capabilities": {
                               "usb-2.00": "USB 2.0"
                             },
                             "physid": "physid_string",
                             "version": "0.00",
                             "businfo": "bus_info_string"
                           }
                         ],
                         "capabilities": {
                           "usb-2.00": "USB 2.0"
                         },
                         "physid": "physid_string",
                         "version": "4.08"
                       }
                     ],
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "ehci-pci"
                     },
                     "description": "USB controller",
                     "class": "bus",
                     "product": "6 Series/C200 Series Chipset Family USB Enhanced Host Controller #1",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "ehci": "Enhanced Host Controller Interface (USB2)",
                       "pm": "Power Management",
                       "cap_list": "PCI capabilities listing",
                       "debug": "Debug port",
                       "bus_master": "bus mastering"
                     },
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "isa",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "lpc_ich"
                     },
                     "description": "ISA bridge",
                     "class": "bridge",
                     "product": "QM67 Express Chipset Family LPC Controller",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 33000000,
                     "width": 32,
                     "capabilities": {
                       "bus_master": "bus mastering",
                       "isa": true,
                       "cap_list": "PCI capabilities listing"
                     },
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "storage",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0",
                       "driver": "ahci"
                     },
                     "description": "RAID bus controller",
                     "class": "storage",
                     "product": "82801 Mobile SATA Controller [RAID mode]",
                     "vendor": "Intel Corporation",
                     "claimed": true,
                     "clock": 66000000,
                     "width": 32,
                     "capabilities": {
                       "pm": "Power Management",
                       "storage": true,
                       "msi": "Message Signalled Interrupts",
                       "cap_list": "PCI capabilities listing",
                       "bus_master": "bus mastering"
                     },
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   },
                   {
                     "id": "serial",
                     "handle": "handle_string",
                     "configuration": {
                       "latency": "0"
                     },
                     "description": "SMBus",
                     "class": "bus",
                     "product": "6 Series/C200 Series Chipset Family SMBus Controller",
                     "vendor": "Intel Corporation",
                     "clock": 33000000,
                     "width": 64,
                     "physid": "physid_string",
                     "version": "04",
                     "businfo": "bus_info_string"
                   }
                 ],
                 "handle": "handle_string",
                 "description": "Host bridge",
                 "class": "bridge",
                 "product": "2nd Generation Core Processor Family DRAM Controller",
                 "vendor": "Intel Corporation",
                 "claimed": true,
                 "clock": 33000000,
                 "width": 32,
                 "physid": "physid_string",
                 "version": "09",
                 "businfo": "bus_info_string"
               },
               {
                 "claimed": true,
                 "id": "id_string",
                 "logicalname": "log_name_string",
                 "children": [
                   {
                     "id": "disk",
                     "units": "bytes",
                     "configuration": {
                       "signature": "signature_string",
                       "ansiversion": "5",
                       "logicalsectorsize": "512",
                       "sectorsize": "512"
                     },
                     "description": "ATA Disk",
                     "class": "disk",
                     "product": "KINGSTON SV300S3",
                     "handle": "handle_sting",
                     "size": 480103981056,
                     "claimed": true,
                     "logicalname": "log_name_string",
                     "children": [
                       {
                         "id": "id_string",
                         "configuration": {
                           "mount.options": "rw,relatime,errors=remount-ro,data=ordered",
                           "modified": "2017-06-05 10:40:06",
                           "mount.fstype": "ext4",
                           "lastmountpoint": "/",
                           "created": "2017-03-21 14:11:06",
                           "mounted": "2017-06-02 12:11:56",
                           "filesystem": "ext4",
                           "state": "mounted"
                         },
                         "description": "EXT4 volume",
                         "class": "volume",
                         "vendor": "Linux",
                         "size": 463046967296,
                         "capacity": 463046967296,
                         "claimed": true,
                         "logicalname": [
                           "log_name_string_1",
                           "log_name_string_2",
                           "log_name_string_3"
                         ],
                         "capabilities": {
                           "bootable": "Bootable partition (active)",
                           "primary": "Primary partition",
                           "extents": "extent-based allocation",
                           "ext4": true,
                           "ext2": "EXT2/EXT3",
                           "extended_attributes": "Extended Attributes",
                           "initialized": "initialized volume",
                           "huge_files": "16TB+ files",
                           "journaled": true,
                           "dir_nlink": "directories with 65000+ subdirs",
                           "large_files": "4GB+ files"
                         },
                         "physid": "physid_string",
                         "serial": "serial_string",
                         "dev": "dev_string",
                         "version": "1.0",
                         "businfo": "bus_info_string"
                       },
                       {
                         "id": "id_string",
                         "description": "Extended partition",
                         "class": "volume",
                         "size": 17054041088,
                         "capacity": 17054041088,
                         "claimed": true,
                         "logicalname": "log_name_string",
                         "children": [
                           {
                             "claimed": true,
                             "id": "id_string",
                             "logicalname": "log_name_string",
                             "class": "volume",
                             "description": "Linux swap / Solaris partition",
                             "capabilities": {
                               "nofs": "No filesystem"
                             },
                             "physid": "physid_string",
                             "dev": "dev_string",
                             "capacity": 17054040064
                           }
                         ],
                         "physid": "physid_string",
                         "capabilities": {
                           "extended": "Extended partition",
                           "partitioned:extended": "Extended partition",
                           "primary": "Primary partition",
                           "partitioned": "Partitioned disk"
                         },
                         "dev": "dev_string",
                         "businfo": "bus_info_string"
                       }
                     ],
                     "capabilities": {
                       "partitioned:dos": "MS-DOS partition table",
                       "partitioned": "Partitioned disk"
                     },
                     "physid": "physid_string",
                     "serial": "serial_string",
                     "dev": "dev_string",
                     "version": "BBF0",
                     "businfo": "bus_info_string"
                   }
                 ],
                 "class": "storage",
                 "capabilities": {
                   "emulated": "Emulated device"
                 },
                 "physid": "physid_string"
               },
               {
                 "claimed": true,
                 "id": "id_string",
                 "logicalname": "log_name_string",
                 "children": [
                   {
                     "id": "id_string",
                     "handle": "handle_string",
                     "configuration": {
                       "ansiversion": "5",
                       "status": "open"
                     },
                     "description": "DVD-RAM writer",
                     "class": "disk",
                     "product": "DVD+-RW GS30N",
                     "vendor": "HL-DT-ST",
                     "claimed": true,
                     "logicalname": [
                       "log_name_string_1",
                       "log_name_string_2",
                       "log_name_string_3",
                       "log_name_string_4",
                       "log_name_string_5"
                     ],
                     "capabilities": {
                       "dvd": "DVD playback",
                       "removable": "support is removable",
                       "dvd-r": "DVD-R burning",
                       "cd-rw": "CD-RW burning",
                       "dvd-ram": "DVD-RAM burning",
                       "cd-r": "CD-R burning",
                       "audio": "Audio CD playback"
                     },
                     "physid": "physid_string",
                     "dev": "dev_string",
                     "version": "A101",
                     "businfo": "bus_info_string"
                   }
                 ],
                 "class": "storage",
                 "capabilities": {
                   "emulated": "Emulated device"
                 },
                 "physid": "physid_string"
               }
             ],
             "class": "bus",
             "description": "Motherboard",
             "physid": "physid_string",
             "product": "08V9YG",
             "handle": "handle_string",
             "version": "A00"
           },
           {
             "id": "battery", 
             "handle": "handle_string",
             "configuration": {
               "voltage": "11,1V"
             },
             "units": "mWh",
             "class": "power",
             "product": "DELL HPNYM19",
             "vendor": "SMP",
             "capacity": 86580,
             "claimed": true,
             "slot": "Sys. Battery Bay",
             "physid": "physid_string",
             "serial": "serial_string",
             "version": "09/22/2011"
           }
         ],
         "width": 64,
         "capabilities": {
           "dmi-2.6": "DMI version 2.6",
           "vsyscall32": "32-bit processes",
           "smbios-2.6": "SMBIOS version 2.6"
         },
         "serial": "serial_string",
         "version": "01"
       } </pre>
#### CPU info (GET)
 Returns parsed info from file /proc/cpuinfo
 <pre> http://localhost:54331/hal/hwc/proc/cpuinfo </pre>
 Response example
 <pre> [
         {
           "bugs": "",
           "processor_number": "0",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2977.478",
           "apicid": "0",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "0",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "0",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "1",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2953.192",
           "apicid": "2",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "2",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "1",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "2",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2975.372",
           "apicid": "4",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "4",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "2",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "3",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2999.938",
           "apicid": "6",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "6",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "3",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "4",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2985.479",
           "apicid": "1",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "1",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "0",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "5",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2802.001",
           "apicid": "3",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "3",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "1",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "6",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2945.190",
           "apicid": "5",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "5",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "2",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         },
         {
           "bugs": "",
           "processor_number": "7",
           "cpuid_level": "13",
           "vendor_id": "GenuineIntel",
           "address_sizes": "36 bits physical, 48 bits virtual",
           "fpu": "yes",
           "stepping": "7",
           "cache_alignment": "64",
           "flags": "fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 cx16 xtpr pdcm pcid sse4_1 sse4_2 x2apic popcnt tsc_deadline_timer aes xsave avx lahf_lm epb tpr_shadow vnmi flexpriority ept vpid xsaveopt dtherm ida arat pln pts",
           "physical_id": "0",
           "cpu_family": "6",
           "siblings": "8",
           "cpu_MHz": "2957.122",
           "apicid": "7",
           "power_management": "",
           "model": "42",
           "cache_size": "8192 KB",
           "cpu_cores": "4",
           "fpu_exception": "yes",
           "initial_apicid": "7",
           "bogomips": "4589.92",
           "microcode": "0x29",
           "core_id": "3",
           "clflush_size": "64",
           "wp": "yes",
           "model_name": "Intel(R) Core(TM) i7-2820QM CPU @ 2.30GHz"
         }
       ] </pre>
#### USB devices list (GET)
 Returns a list of serial ports
 <pre> http://localhost:54331/hal/rs232/list </pre>
 Response example
 <pre> [
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
       ] </pre>
 
### WebSockets
WS server listens on port 54332. 

#### Get USB-to-Serial Web-socket Connection

This endpoint opens a message Web-socket connection to USB-to-Serial device. The messages and other commands sent 
over this Web-socket are specified here. It is the responsibility of the container to establish this connection 
and ensure it is running. 

The PORT of USB-to-Serial device must be passed as part of the URL because otherwise it would have to be passed in 
the Web-socket connection itself and that would make associated connections with different devices rather difficult.

##### Endpoint

<pre>
	ws://loocalhost:54332/hal/rs232/{PORT=dev/ttyusb0}
</pre>

##### Response

<pre>
	None - the Websocket will simply be opened successfully
</pre>

##### Querystring Parameters

<pre>
	PORT - the PORT of USB-to-Serial device to connect to via the Websocket connection 
	(example shown here as '/dev/ttyusb0')
</pre>

##### Signals from HAL to Client

<pre>
	- op code 4: (single byte command) indicates connection to device was opened (it's an answer to connection open op 
	code signal sent with configuration for opening connection to physical device); at this point HAL starts 
	listening on data from connected device.
	- op code 6: indicates that HAL recieved some data from physical device (op code single byte followed by pure bytes 
	of data recieved from device)
	- standart close frame: indicates that current connection was closed. 
	    > status code 1000 with close frame : means that device normally closed connection
	    > status code 4000 with close frame : there was an exception, error will be passed in reason. 
</pre>

##### Signals from Client to HAL

<pre>
    - op code 3: signals HAL to open connection to device with specified configuration in passed data (op code single 
    byte followed by bytes of json configuration to open connection to device ); in case with USB-to-Serial: PORT 
    property is required.
    - op code 5: signals HAL to send recieved data to connected device (op code single byte followed by pure bytes of 
    data to send to device) 
    - standart close frame: indicates that client wants to close current connection. 
        > status code 1000 with close frame : means that device normally closed connection
    	> status code 4000 with close frame : there was an exception, error will be passed in reason. 	
</pre>

###### JSON Configuration for USB-to-Serial device 
All available configuration properties:
- 'port'(required to open connection)
- 'baudrate'
- 'bytesize'
- 'parity'
- 'stopbits'
- 'timeout'
- 'xonxoff'
- 'rtscts'
- 'dsrdtr'
- 'write_timeout'
- 'inter_byte_timeout'
- 'data_read_timeout'(this property tells HAL to pause for specified timeout in seconds before reading data from buffer)
> Example: 
<pre>
    { 'port': '/dev/ttyUSB0' }
</pre>




