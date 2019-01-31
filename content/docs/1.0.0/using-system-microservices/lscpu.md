# LSCPU

### REST

REST server listens on port 54331.

#### LSCPU info (GET)

Returns parsed info of 'lscpu' command

```json
http://localhost:54331/hal/hwc/lscpu
```

**Response example**

```json 
     {
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
    }
```
