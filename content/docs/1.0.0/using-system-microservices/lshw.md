# LSHW info

### REST

REST server listens on port 54331.

#### LSHW info (GET)

Returns parsed info of 'lshw' command

```json
http://localhost:54331/hal/hwc/lshw
```

**Response example**

```json
{
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
}
```
