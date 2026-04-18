

# NATS JWT Authentication

When NATS is enabled on a control plane, Eclipse ioFog uses **NATS JWT authentication** so that microservices and system components connect to NATS with cryptographically signed identities. The Controller (and optionally iofogctl) generates or distributes these credentials so you can deploy microservices with NATS access without manually creating or rotating JWTs.

## JWT hierarchy

NATS uses a three-level JWT model:

1. **Operator JWT** – Identifies the NATS operator (the ioFog deployment). The Controller manages the operator identity.
2. **Account JWT** – Identifies a NATS account. Each account has limits and import/export rules. In ioFog, an account is represented by a [NATS Account Rule](nats-account-rule.html); the Controller creates the account JWT from that rule.
3. **User JWT** – Identifies a user within an account (e.g. a microservice). In ioFog, a user is represented by a [NATS User Rule](nats-user-rule.html); the Controller creates the user JWT (or a creds file containing it) from that rule.

The Controller stores operator and account JWTs and generates user credentials when a microservice is deployed with `natsAccess: true` and a valid `natsRule` reference.

```bash
iofogctl nats operator describe
name: pot-operator
publickey: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
jwt: eyJ0eXAiOiJKV1QiLCJhbGciOiJlZDI1NTE5LW5rZXkifQ.eyJhdWQiOiJOQVRTIiwibmFtZSI6InBvdC1vcGVyYXRvciIsInN1YiI6Ik9DUlFTUkZCWkVCSFFRTVE2TjM3S0NCU1pDUUkyV0VHN0RRWEhSWFVVVzNGU0JCTjVUUDJaRExWIiwibmF0cyI6eyJ0eXBlIjoib3BlcmF0b3IiLCJ2ZXJzaW9uIjoyfSwiaXNzIjoiT0NSUVNSRkJaRUJIUVFNUTZOMzdLQ0JTWkNRSTJXRUc3RFFYSFJYVVVXM0ZTQkJONVRQMlpETFYiLCJpYXQiOjE3NzI3MDYxOTUsImp0aSI6IlRWbjFVNGVadG00ZzAvcEU0Tlo5NFZleGlURmRwMEg2ZkhROFpqKysxUUVQWVJqaFppSUE1L1JWN25icDMyYjhSSDFFdXVMV1l4eEt2bnc4dkdpL1pBPT0ifQ.BxbgFYGCE0pGQsRu08VQI8DsrC0RIKkZm7-DfcmYRsano4PShIfYppBmtSYZxwP_GZYgZIcFUdnmMqsUWQ-2DA
```

```bash
iofogctl nats operator describe --jwt
aud: NATS
iat: 1.772706195e+09
iss: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
jti: TVn1U4eZtm4g0/pE4NZ94VexiTFdp0H6fHQ8Zj++1QEPYRjhZiIA5/RV7nbp32b8RH1EuuLWYxxKvnw8vGi/ZA==
name: pot-operator
nats:
  type: operator
  version: 2
sub: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
```


## How microservices get credentials

1. You define a [NATS Account Rule](nats-account-rule.html) and one or more [NATS User Rules](nats-user-rule.html) (via the Controller REST API or YAML).
2. In your Application YAML you set `spec.natsConfig.natsAccess: true` and `spec.natsConfig.natsRule` to the **Account Rule** name.
3. For each microservice that needs NATS, you set `natsConfig.natsAccess: true` and `natsConfig.natsRule` to a **User Rule** name.
4. When you deploy the application, the Controller provisions NATS credentials for each such microservice: it generates a user JWT (or creds file) that conforms to the User Rule and the account defined by the Account Rule. Those credentials are delivered to the Agent, and the microservice container can connect to NATS via automatically mounted secrets.

Using **NatsAccountRule** and **NatsUserRule** in this way makes it easy to deploy microservices with NATS access without manual JWT handling. You do not need to run `nsc` or manage JWT files yourself; the Controller keeps operator and account state and issues user credentials per microservice.

```bash
echo "---
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: test-export
spec:
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  maxAckPending: -1
  memMaxStreamBytes: -1
  diskMaxStreamBytes: -1
  exports:
    - name: orders-stream
      subject: foo.>
      type: stream
      description: Orders event stream
" > /tmp/account-export.yaml
iofogctl deploy -f /tmp/account-export.yaml
```

```bash
echo "---
apiVersion: iofog.org/v3
kind: NatsAccountRule
metadata:
  name: test-import
spec:
  maxConnections: -1
  maxLeafNodeConnections: -1
  maxData: -1
  maxExports: -1
  maxImports: -1
  maxMsgPayload: -1
  maxSubscriptions: -1
  exportsAllowWildcards: true
  memStorage: -1
  diskStorage: -1
  streams: -1
  consumer: -1
  maxAckPending: -1
  memMaxStreamBytes: -1
  diskMaxStreamBytes: -1
  imports:
    - name: import-stream
      subject: export.>
      type: stream
      account: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
      local_subject: import.>
" > /tmp/account-import.yaml
iofogctl deploy -f /tmp/account-import.yaml
```

```bash
echo "---
apiVersion: iofog.org/v3
kind: Application
metadata:
  name: nats-test
spec:
  natsConfig:
    natsAccess: true
    natsRule: test-export
  microservices:
    - name: box-1
      natsConfig:
        natsAccess: true
        natsRule: default-user
      agent:
        name: edge-1
      images:
        registry: 1
        x86: natsio/nats-box:latest
        arm: natsio/nats-box:latest
      container:
        hostNetworkMode: false
        isPrivileged: false
        extraHosts: []
        commands:
          - /bin/sh
          - -c
          - trap true INT TERM; sleep infinity & wait

---
apiVersion: iofog.org/v3
kind: Application
metadata:
  name: nats-test2
spec:
  natsConfig:
    natsAccess: true
    natsRule: test-import
  microservices:
    - name: box-1
      natsConfig:
        natsAccess: true
        natsRule: default-user
      agent:
        name: edge-2
      images:
        registry: 1
        x86: natsio/nats-box:latest
        arm: natsio/nats-box:latest
      container:
        hostNetworkMode: false
        isPrivileged: false
        extraHosts: []
        commands:
          - /bin/sh
          - -c
          - trap true INT TERM; sleep infinity & wait

---
apiVersion: iofog.org/v3
kind: Application
metadata:
  name: nats-test3
spec:
  natsConfig:
    natsAccess: true
    natsRule: default-account
  microservices: []

---
apiVersion: iofog.org/v3
kind: Microservice
metadata:
  name: box-1
spec:
  agent:
    name: edge-2
  images:
    registry: 1
    x86: natsio/nats-box:latest
    arm: natsio/nats-box:latest
  container:
    extraHosts: []
    ports: []
    cpuSetCpus: ''
    commands:
      - /bin/sh
      - '-c'
      - trap true INT TERM; sleep infinity & wait
    healthCheck: {}
  natsConfig:
    natsAccess: true
    natsRule: default-user
  config: {}
  application: nats-test3

" > /tmp/apps.yaml
iofogctl deploy -f /tmp/apps.yaml

```

```bash
iofogctl get nats-accounts
NAMESPACE
pot-local

NAME		APP ID		SYSTEM		PUBLIC KEY							
SYS		0		true		ACXO6737ASXEGXI57MJPUJOIPV7OMBIDA77ACHYM57BQ4SFPIMSWQ5E3	
SYS-leaf-edge-1	0		false		ACJH4C3VC6SSHO42LZ6TR54AYKTOT3YCRPHYKU7IV7ZLO3TRXG4IPCOT	
nats-test2	5		false		ABGYBCTHOIT6OBJ2AVGPKLW4JEL44DCJYMTOUZ7SY4TRSKWXX6UKZX7H	
nats-test3	4		false		ABHYIEGCJ4XT3FL34BBO4IQPYO56TB3SNNBFRHWXPR7M5HSEPUCYWBLS	
nats-test	3		false		ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX	
```

```bash
iofogctl describe nats-account nats-test
id: 5
name: nats-test
publickey: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
jwt: eyJ0eXAiOiJKV1QiLCJhbGciOiJlZDI1NTE5LW5rZXkifQ.eyJhdWQiOiJOQVRTIiwibmFtZSI6Im5hdHMtdGVzdCIsInN1YiI6IkFDWkQyVUlDSExHVkM2N0w0STZOQ1czU0NaMlk0V0lHU1FGWE9VNVFWSTJHVERDU0VNR1Y1R1hYIiwibmF0cyI6eyJsaW1pdHMiOnsiY29ubiI6LTEsImxlYWYiOi0xLCJkYXRhIjotMSwiZXhwb3J0cyI6LTEsImltcG9ydHMiOi0xLCJwYXlsb2FkIjotMSwic3VicyI6LTEsIndpbGRjYXJkcyI6dHJ1ZSwiZGlzYWxsb3dfYmVhcmVyIjpudWxsLCJtZW1fc3RvcmFnZSI6LTEsImRpc2tfc3RvcmFnZSI6LTEsInN0cmVhbXMiOi0xLCJjb25zdW1lciI6LTEsIm1heF9hY2tfcGVuZGluZyI6LTEsIm1lbV9tYXhfc3RyZWFtX2J5dGVzIjotMSwiZGlza19tYXhfc3RyZWFtX2J5dGVzIjotMSwibWF4X2J5dGVzX3JlcXVpcmVkIjpudWxsfSwiZGVmYXVsdF9wZXJtaXNzaW9ucyI6eyJwdWIiOnt9LCJzdWIiOnt9fSwiZXhwb3J0cyI6W3siZGVzY3JpcHRpb24iOiJFeHBvcnQgZXZlbnQgc3RyZWFtIiwibmFtZSI6ImV4cG9ydC1zdHJlYW0iLCJzdWJqZWN0IjoiZXhwb3J0Lj4iLCJ0eXBlIjoic3RyZWFtIn1dLCJyZXZvY2F0aW9ucyI6e30sInR5cGUiOiJhY2NvdW50IiwidmVyc2lvbiI6Mn0sImlzcyI6Ik9DUlFTUkZCWkVCSFFRTVE2TjM3S0NCU1pDUUkyV0VHN0RRWEhSWFVVVzNGU0JCTjVUUDJaRExWIiwiaWF0IjoxNzcyNzA2NzIxLCJqdGkiOiIvQkF6UE0ySTdsZWZBQUhEUFJkdWNnSGt2dHUxVDJhb0lGdjc0Uzh0Ykxrc3VuZWIzSFJ0bGJGaDVEZ1IxckgxMklwRjRxMzE4NmN6eEJLTkszdVJNdz09In0.oLLdkrTmkDw8Xg_RedFegd8C9qctVB_pQg8XtI7ZdSqh_c6S3UzlZNLAF6HUOLd52_sQvSKPK2UmoujVQ9z9Aw
issystem: false
isleafsystem: false
applicationid: 3
```

```bash
iofogctl describe nats-account nats-test3 --jwt
aud: NATS
iat: 1.772706624e+09
iss: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
jti: 7N89IbSaB4D4dzCvirLN3xyB1VG7dZy6FJcTeuURWqY+P9g+YnOV2hamdD4HwZ+k44qr5vU51CQxthNZf1LfVQ==
name: nats-test3
nats:
  default_permissions:
    pub: {}
    sub: {}
  description: Default application account rule
  limits:
    conn: -1
    consumer: -1
    data: -1
    disallow_bearer: null
    disk_max_stream_bytes: -1
    disk_storage: -1
    exports: -1
    imports: -1
    leaf: -1
    max_ack_pending: -1
    max_bytes_required: null
    mem_max_stream_bytes: -1
    mem_storage: -1
    payload: -1
    streams: -1
    subs: -1
    wildcards: true
  revocations: {}
  type: account
  version: 2
sub: ABHYIEGCJ4XT3FL34BBO4IQPYO56TB3SNNBFRHWXPR7M5HSEPUCYWBLS
```

```bash
iofogctl describe nats-account nats-test2 --jwt
aud: NATS
iat: 1.772706721e+09
iss: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
jti: KVtjkd7sQ7n7rvFZ02pNd3wZQx80hO5OlsEB9+yncaG8f+QZH2uhx7SdFfeWSo1xecR2GhMQ/k+p5bBF6qMmsw==
name: nats-test2
nats:
  default_permissions:
    pub: {}
    sub: {}
  imports:
  - account: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
    local_subject: import.>
    name: import-stream
    subject: export.>
    type: stream
  limits:
    conn: -1
    consumer: -1
    data: -1
    disallow_bearer: null
    disk_max_stream_bytes: -1
    disk_storage: -1
    exports: -1
    imports: -1
    leaf: -1
    max_ack_pending: -1
    max_bytes_required: null
    mem_max_stream_bytes: -1
    mem_storage: -1
    payload: -1
    streams: -1
    subs: -1
    wildcards: true
  revocations: {}
  type: account
  version: 2
sub: ABGYBCTHOIT6OBJ2AVGPKLW4JEL44DCJYMTOUZ7SY4TRSKWXX6UKZX7H
```

```bash
iofogctl describe nats-account nats-test --jwt
aud: NATS
iat: 1.772706721e+09
iss: OCRQSRFBZEBHQQMQ6N37KCBSZCQI2WEG7DQXHRXUUW3FSBBN5TP2ZDLV
jti: /BAzPM2I7lefAAHDPRducgHkvtu1T2aoIFv74S8tbLksuneb3HRtlbFh5DgR1rH12IpF4q3186czxBKNK3uRMw==
name: nats-test
nats:
  default_permissions:
    pub: {}
    sub: {}
  exports:
  - description: Export event stream
    name: export-stream
    subject: export.>
    type: stream
  limits:
    conn: -1
    consumer: -1
    data: -1
    disallow_bearer: null
    disk_max_stream_bytes: -1
    disk_storage: -1
    exports: -1
    imports: -1
    leaf: -1
    max_ack_pending: -1
    max_bytes_required: null
    mem_max_stream_bytes: -1
    mem_storage: -1
    payload: -1
    streams: -1
    subs: -1
    wildcards: true
  revocations: {}
  type: account
  version: 2
sub: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
```

```bash
iofogctl describe microservice nats-test/box-1
apiVersion: iofog.org/v3
kind: Microservice
metadata:
  name: nats-test/box-1
  namespace: pot-local
spec:
  uuid: 2bc86457-b7a3-4886-b1bf-4a5725cf0bb0
  name: box-1
  agent:
    name: edge-1
    config: {}
  images:
    catalogId: 0
    x86: natsio/nats-box:latest
    arm: natsio/nats-box:latest
    registry: remote
  container:
    commands:
    - /bin/sh
    - -c
    - trap true INT TERM; sleep infinity & wait
    volumes:
    - hostDestination: nats-creds-nats-test-box-1
      containerDestination: /etc/nats/creds
      accessMode: ro
      type: volumeMount
    env:
    - key: NATS_CREDS_PATH
      value: /etc/nats/creds/nats-test/box-1.creds
    extraHosts: []
    ports: []
    hostNetworkMode: false
    isPrivileged: false
    annotations: {}
    memoryLimit: 0
  natsConfig:
    natsAccess: true
    natsRule: default-user
  schedule: 50
  config: {}
  application: nats-test
```

```bash
iofogctl nats user creds nats-test box-1
-----BEGIN NATS USER JWT-----
eyJ0eXAiOiJKV1QiLCJhbGciOiJlZDI1NTE5LW5rZXkifQ.eyJhdWQiOiJOQVRTIiwibmFtZSI6ImJveC0xIiwic3ViIjoiVUE2U0dORlNKMjRGSTY0RU9QM0hKTkdIUjJCVVBWM0E2TVQ1VllTNktIUkJVS0FSVjI2SFRLUlQiLCJuYXRzIjp7ImRhdGEiOi0xLCJwYXlsb2FkIjotMSwic3VicyI6LTEsImFsbG93ZWRfY29ubmVjdGlvbl90eXBlcyI6WyJTVEFOREFSRCIsIldFQlNPQ0tFVCJdLCJwdWIiOnt9LCJzdWIiOnt9LCJ0eXBlIjoidXNlciIsInZlcnNpb24iOjJ9LCJpc3MiOiJBQ1pEMlVJQ0hMR1ZDNjdMNEk2TkNXM1NDWjJZNFdJR1NRRlhPVTVRVkkyR1REQ1NFTUdWNUdYWCIsImlhdCI6MTc3MjcwNjczOCwianRpIjoiTFY1UTBSV2RDaElrQ0svV0VBT1ZZK0w0dlNOdHVxSGl1c1E5SUJ4UEF4aXRUVVpUeGdobHVQSzhXWnJES0JsK0xQdEVPKzgxTGxqcnJqOW05RnRib3c9PSJ9.WpKm5Aef9UgeFgz06htWTRvyOBhBb73URT0cGrUCaz3fOcXHg2xZs__2SgdIAc0LJ_clB5yTv2RENr5H9ccWCQ
------END NATS USER JWT------

************************* IMPORTANT *************************
NKEY Seed printed below can be used sign and prove identity.
NKEYs are sensitive and should be treated as secrets.

-----BEGIN USER NKEY SEED-----
SUAATMAA7T7DRPKBR4GSBRNSHPP56NISI4BTAKD2SEPUQJF5RCKLSOIXDA
------END USER NKEY SEED------
```

```bash
iofogctl describe nats-user nats-test box-1 --jwt
aud: NATS
iat: 1.772706738e+09
iss: ACZD2UICHLGVC67L4I6NCW3SCZ2Y4WIGSQFXOU5QVI2GTDCSEMGV5GXX
jti: LV5Q0RWdChIkCK/WEAOVY+L4vSNtuqHiusQ9IBxPAxitTUZTxghluPK8WZrDKBl+LPtEO+81Lljrrj9m9Ftbow==
name: box-1
nats:
  allowed_connection_types:
  - STANDARD
  - WEBSOCKET
  data: -1
  payload: -1
  pub: {}
  sub: {}
  subs: -1
  type: user
  version: 2
sub: UA6SGNFSJ24FI64EOP3HJNGHR2BUPV3A6MT5VYS6KHRBUKARV26HTKRT
```

As you can see from the example above, once a microservice is deployed with NATS access enabled, the Controller automatically generates creds for it. The microservice's NATS user JWT is signed by its application's NATS account private key, and the creds file is mounted into the microservice container.

ioFog handles infrastructure and security for you so you can focus on the innovation and intelligence you bring to the edge.

## TLS for NATS connections

NATS client and leaf connections are secured with TLS. ioFog provides secure NATS clusters by default, so you do not need to configure TLS between NATS instances yourself.

## Related documentation

- [NATS Account Rule](nats-account-rule.html) – Account-level policy and limits. YAML spec: [NatsAccountRule YAML](../yaml-references/reference-nats-account-rule.html).
- [NATS User Rule](nats-user-rule.html) – User-level policy for microservices. YAML spec: [NatsUserRule YAML](../yaml-references/reference-nats-user-rule.html).
- [Application YAML – NATS access](../yaml-references/reference-application.html#nats-access-natsconfig) – Enabling NATS on applications and microservices.
- [Control Plane YAML](../yaml-references/reference-control-plane.html) – Enabling NATS on the control plane.
