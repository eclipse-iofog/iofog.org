

# Controller Configuration

The Controller is configured via **YAML**. Configuration can be overridden or supplemented by **environment variables** so you can tune the Controller without editing the config file (e.g. in containers or systemd).

Config files are typically located in the Controller installation or deployment directory; the exact path depends on how you deploy (iofogctl, Helm, or manual).

## Main configuration sections

The Controller config typically includes sections such as:

```yaml
# Application Configuration
app:
  name: iofog  # Application name
  uuid: ""
  controlPlane: Remote        # Control plane type: Remote or Kubernetes or Local
  namespace: iofog  # Namespace for the application

# Server Configuration
server:
  port: 51121             # Server port number
  devMode: true   
  webSocket:
    perMessageDeflate: false
    allowExtensions: false        # Disable all extensions
    pingInterval: 30000             # Ping interval in milliseconds (30 seconds)
    pongTimeout: 10000             # Pong timeout in milliseconds (10 seconds)
    handshakeTimeout: 10000      # 10 seconds
    maxPayload: 1048576          # 1MB
    maxFrameSize: 65536          # 64KB
    session:
      timeout: 3600000             # Session timeout in milliseconds (1 hour)
      maxConnections: 100          # Maximum connections per session
      cleanupInterval: 30000       # Session cleanup interval (30 seconds)
    security:
      maxConnectionsPerIp: 10
      maxRequestsPerMinute: 60
      maxPayload: 1048576  # 1MB
  # ssl:
  #   path:
  #     key: ""              # SSL key file path
  #     cert: ""             # SSL certificate file path
  #     intermediateCert: "" # Intermediate certificate file path
  #   base64:
  #     key:  # SSL key in base64 format
  #     cert:  # SSL certificate in base64 format
  #     intermediateCert: # Intermediate certificate in base64 format

# Viewer Configuration
viewer:
  port: 8008             # Viewer port number
  url: ""                # Viewer URL

# Logging Configuration
log:
  level: info
  directory: /var/log/iofog-controller  # Log directory
  fileSize: 1073741824                   # Maximum log file size in bytes (1GB)
  fileCount: 10                          # Maximum number of log files

# Settings Configuration
settings:
  # defaultJobInterval: 120                 # Default job interval in seconds
  fogStatusUpdateInterval: 30             # Fog status update interval in seconds
  fogStatusUpdateTolerance: 3             # Fog status update tolerance
  fogExpiredTokenCleanupInterval: 300     # Fog expired token cleanup interval in seconds
  eventRetentionDays: 7                 # Days to retain events (default: 7)
  eventCleanupInterval: 86400            # Cleanup job interval in seconds (default: 24 hours)
  eventAuditEnabled: true                # Enable/disable event auditing
  eventCaptureIpAddress: true             # Capture IP address (default: true, set false for privacy compliance)
  controllerHeartbeatInterval: 30        # Controller heartbeat interval in seconds (default: 30)
  controllerInactiveThreshold: 300       # Mark controller inactive after N seconds without heartbeat (default: 300 = 5 minutes)
  controllerCleanupInterval: 600         # Controller cleanup job interval in seconds (default: 600 = 10 minutes)
  natsReconcileChunkSize: 1              # NATS reconcile task chunk size in fogs per task (default: 1)
  natsReconcileTaskStalenessSeconds: 900 # NATS reconcile task staleness for reclaim (default: 900 = 15 minutes)
  natsReconcileWorkerIntervalSeconds: 3 # NATS reconcile worker poll interval in seconds (default: 3)

# Database Configuration
database:
  provider: sqlite     # Database provider (sqlite/mysql/postgres)
  # mysql:
  #   host: ""    # MySQL host
  #   port: 3306          # MySQL port
  #   username: ""        # MySQL username
  #   password: ""        # MySQL password
  #   databaseName: ""   # MySQL database name
  #   useSSL: false       # Use SSL for MySQL connection
  #   sslCA: ""           # MySQL SSL CA in base64 encoded string
  # postgres:
  #   host: ""   # PostgreSQL host
  #   port: 5432         # PostgreSQL port
  #   username: ""       # PostgreSQL username
  #   password: ""       # PostgreSQL password
  #   databaseName: ""  # PostgreSQL database name
  #   useSSL: false       # Use SSL for PostgreSQL connection
  #   sslCA: ""           # PostgreSQL SSL CA in base64 encoded string
  sqlite:
    databaseName: controller_db.sqlite  # SQLite database file name
    logging: false     # Enable SQLite query logging
    transactionType: IMMEDIATE      # SQLite transaction type
    pool:
      maxActive: 1     # Maximum active connections
      max: 1          # Maximum total connections
      min: 0          # Minimum connections
      idle: 20000     # Idle timeout in milliseconds

# Auth Configuration
# auth:
#   realm:           # Keycloak realm
#   realmKey:        # Realm public key
#   url:       # Keycloak authentication server URL
#   sslRequired:   # SSL requirement level
#   client:
#     id:           # ControllerClient ID
#     secret:        # ControllerClient Client secret
#   viewerClient:   # Viewer client ID

# Bridge Ports Configuration for Services
bridgePorts:
  range: "10024-65535"  # Bridge ports range

# System Images Configuration
systemImages:
  router:
    "1": "ghcr.io/eclipse-iofog/router:latest"
    "2": "ghcr.io/eclipse-iofog/router:latest"
  debug:
    "1": "ghcr.io/eclipse-iofog/node-debugger:latest"
    "2": "ghcr.io/eclipse-iofog/node-debugger:latest"
  nats:
    "1": "ghcr.io/eclipse-iofog/nats:latest"
    "2": "ghcr.io/eclipse-iofog/nats:latest"

# NATS Configuration
nats:
  enabled: true

# Diagnostics Configuration
diagnostics:
  directory: "diagnostic"  # Diagnostics directory


# Vault Configuration (for compliance with NIST, ISO 27001, NATO, IEC 62443)
# When enabled, sensitive data (secrets, certificates, private keys) will be stored
# in the configured vault provider instead of encrypted in the database
# vault:
#   enabled: false         # Enable/disable vault integration
#   provider: hashicorp  # Provider: hashicorp, openbao, vault, aws, aws-secrets-manager, azure, azure-key-vault, google, google-secret-manager
#   basePath: "pot/$namespace/secrets"  # Base path for secrets in vault ($namespace will be replaced with app.namespace)
#   # HashiCorp Vault configuration
#   hashicorp:
#     address: "http://localhost:8200"  # Vault server address (can also be set via VAULT_HASHICORP_ADDRESS env var)
#     token: ""  # Vault token (can also be set via VAULT_HASHICORP_TOKEN env var)
#     mount: "kv"  # Vault mount point (can also be set via VAULT_HASHICORP_MOUNT env var)
#   # AWS Secrets Manager configuration
#   aws:
#     region: "us-east-1"  # AWS region (can also be set via VAULT_AWS_REGION or AWS_REGION env var)
#     accessKeyId: ""  # AWS access key ID (can also be set via VAULT_AWS_ACCESS_KEY_ID or AWS_ACCESS_KEY_ID env var)
#     accessKey: ""  # AWS secret access key (can also be set via VAULT_AWS_ACCESS_KEY or AWS_SECRET_ACCESS_KEY env var)
#   # Azure Key Vault configuration
#   azure:
#     url: "https://your-vault.vault.azure.net"  # Azure Key Vault URL (can also be set via VAULT_AZURE_URL env var)
#     tenantId: ""  # Azure tenant ID (can also be set via VAULT_AZURE_TENANT_ID or AZURE_TENANT_ID env var)
#     clientId: ""  # Azure client ID (can also be set via VAULT_AZURE_CLIENT_ID or AZURE_CLIENT_ID env var)
#     clientSecret: ""  # Azure client secret (can also be set via VAULT_AZURE_CLIENT_SECRET or AZURE_CLIENT_SECRET env var)
#   # Google Secret Manager configuration
#   google:
#     projectId: ""  # Google Cloud project ID (required, can also be set via VAULT_GOOGLE_PROJECT_ID env var)
#     credentials: ""  # Path to service account key file (can also be set via VAULT_GOOGLE_CREDENTIALS or GOOGLE_APPLICATION_CREDENTIALS env var)

# OpenTelemetry Configuration
# otel:
#   enabled: false         # true/disable OpenTelemetry
#   serviceName: "iofog-controller"  # Service name for traces
#   endpoint: "http://localhost:4318/v1/traces"  # OTel endpoint
#   protocol: http/protobuf       # Exporter OTLP Protocol (grpc or http/protobuf)
#   headers: ""  # A list of headers to apply to all outgoing data (traces, metrics, and logs).
#   resourceAttributes: "service.version=3.5.0,deployment.environment=production,team=devops"  # Resource attributes
#   metrics:
#     exporter: otlp      # Otel metrics exporter
#     interval: 1000      # Metrics collection interval in ms
#   logs:
#     level: info       # Log level
#   propagators: "tracecontext,baggage"  # Context propagation
#   traces:
#     sampler: "parentbased_traceidratio"       # Sampler to be used for traces
#     samplerArg: 0.1
#   batch: # Batch size and timeout for telemetry data
#     size: 512      # Maximum batch size
#     delay: 1000    # Delay interval (in milliseconds) between two consecutive exports

```

If you building custom Controller image, or you would like mount custom configuration yaml you can set environment variable `CONFIG_PATH`to set configuration yaml path. 

## Environment variables

Environment variables can override or complement config file values. The Controller typically maps env vars to config keys (e.g. `CONTROLLER_LOG_LEVEL`, `DATABASE_HOST`). Check the Controller documentation or `src/config` in the repository for the full list of supported environment variables and their mapping.

```bash

// Application Configuration
'CONTROLLER_NAME': 'app.name',
'CONTROLLER_UUID': 'app.uuid',
'CONTROL_PLANE': 'app.controlPlane',
'CONTROLLER_NAMESPACE': 'app.namespace',

// Server Configuration
'SERVER_PORT': 'server.port',
'SERVER_DEV_MODE': 'server.devMode',

'WS_PING_INTERVAL': 'server.webSocket.pingInterval',
'WS_PONG_TIMEOUT': 'server.webSocket.pongTimeout',
'WS_MAX_PAYLOAD': 'server.webSocket.maxPayload',
'WS_SESSION_TIMEOUT': 'server.webSocket.session.timeout',
'WS_SESSION_MAX_CONNECTIONS': 'server.webSocket.session.maxConnections',
'WS_CLEANUP_INTERVAL': 'server.webSocket.session.cleanupInterval',
'WS_SECURITY_MAX_CONNECTIONS_PER_IP': 'server.webSocket.security.maxConnectionsPerIp',
'WS_SECURITY_MAX_REQUESTS_PER_MINUTE': 'server.webSocket.security.maxRequestsPerMinute',
'WS_SECURITY_MAX_PAYLOAD': 'server.webSocket.security.maxPayload',

// SSL Configuration
'SSL_PATH_KEY': 'server.ssl.path.key',
'SSL_PATH_CERT': 'server.ssl.path.cert',
'SSL_PATH_INTERMEDIATE_CERT': 'server.ssl.path.intermediateCert',
'SSL_BASE64_KEY': 'server.ssl.base64.key',
'SSL_BASE64_CERT': 'server.ssl.base64.cert',
'SSL_BASE64_INTERMEDIATE_CERT': 'server.ssl.base64.intermediateCert',

// Viewer Configuration
'VIEWER_PORT': 'viewer.port',
'VIEWER_URL': 'viewer.url',

// Logging Configuration
'LOG_LEVEL': 'log.level',
'LOG_DIRECTORY': 'log.directory',
'LOG_FILE_SIZE': 'log.fileSize',
'LOG_FILE_COUNT': 'log.fileCount',

// Settings Configuration
'FOG_STATUS_UPDATE_INTERVAL': 'settings.fogStatusUpdateInterval',
'FOG_STATUS_UPDATE_TOLERANCE': 'settings.fogStatusUpdateTolerance',
'FOG_EXPIRED_TOKEN_CLEANUP_INTERVAL': 'settings.fogExpiredTokenCleanupInterval',
'EVENT_RETENTION_DAYS': 'settings.eventRetentionDays',
'EVENT_CLEANUP_INTERVAL': 'settings.eventCleanupInterval',
'EVENT_AUDIT_ENABLED': 'settings.eventAuditEnabled',
'EVENT_CAPTURE_IP_ADDRESS': 'settings.eventCaptureIpAddress',
'CONTROLLER_HEARTBEAT_INTERVAL': 'settings.controllerHeartbeatInterval',
'CONTROLLER_INACTIVE_THRESHOLD': 'settings.controllerInactiveThreshold',
'CONTROLLER_CLEANUP_INTERVAL': 'settings.controllerCleanupInterval',

// Database Configuration
'DB_PROVIDER': 'database.provider',
// These will map to the appropriate provider based on DB_PROVIDER
'DB_HOST': `database.${provider}.host`
'DB_PORT': `database.${provider}.port`
'DB_USERNAME': `database.${provider}.username`
'DB_PASSWORD': `database.${provider}.password`
'DB_NAME':`database.${provider}.databaseName`
'DB_USE_SSL': `database.${provider}.useSSL`
'DB_SSL_CA': `database.${provider}.sslCA

// Auth Configuration
'KC_REALM': 'auth.realm',
'KC_REALM_KEY': 'auth.realmKey',
'KC_URL': 'auth.url',
'KC_SSL_REQ': 'auth.sslRequired',
'KC_CLIENT': 'auth.client.id',
'KC_CLIENT_SECRET': 'auth.client.secret',
'KC_VIEWER_CLIENT': 'auth.viewerClient',

// Bridge Ports Configuration
'BRIDGE_PORTS_RANGE': 'bridgePorts.range',

// System Images Configuration
'ROUTER_IMAGE_1': 'systemImages.router.1',
'ROUTER_IMAGE_2': 'systemImages.router.2',
'DEBUG_IMAGE_1': 'systemImages.debug.1',
'DEBUG_IMAGE_2': 'systemImages.debug.2',
'NATS_IMAGE_1': 'systemImages.nats.1',
'NATS_IMAGE_2': 'systemImages.nats.2',

// NATS Configuration
'NATS_ENABLED': 'nats.enabled',

// Diagnostics Configuration
'DIAGNOSTICS_DIRECTORY': 'diagnostics.directory',

// Vault Configuration
'VAULT_ENABLED': 'vault.enabled',
'VAULT_PROVIDER': 'vault.provider',
'VAULT_BASE_PATH': 'vault.basePath',
// HashiCorp Vault
'VAULT_HASHICORP_ADDRESS': 'vault.hashicorp.address',
'VAULT_HASHICORP_TOKEN': 'vault.hashicorp.token',
'VAULT_HASHICORP_MOUNT': 'vault.hashicorp.mount',
// AWS Secrets Manager
'VAULT_AWS_REGION': 'vault.aws.region',
'VAULT_AWS_ACCESS_KEY_ID': 'vault.aws.accessKeyId',
'VAULT_AWS_ACCESS_KEY': 'vault.aws.accessKey',
// Azure Key Vault
'VAULT_AZURE_URL': 'vault.azure.url',
'VAULT_AZURE_TENANT_ID': 'vault.azure.tenantId',
'VAULT_AZURE_CLIENT_ID': 'vault.azure.clientId',
'VAULT_AZURE_CLIENT_SECRET': 'vault.azure.clientSecret',
// Google Secret Manager
'VAULT_GOOGLE_PROJECT_ID': 'vault.google.projectId',
'VAULT_GOOGLE_CREDENTIALS': 'vault.google.credentials',

// OpenTelemetry Configuration
'ENABLE_TELEMETRY': 'otel.enabled',
'OTEL_SERVICE_NAME': 'otel.serviceName',
'OTEL_EXPORTER_OTLP_ENDPOINT': 'otel.endpoint',
'OTEL_EXPORTER_OTLP_PROTOCOL': 'otel.protocol',
'OTEL_EXPORTER_OTLP_HEADERS': 'otel.headers',
'OTEL_RESOURCE_ATTRIBUTES': 'otel.resourceAttributes',
'OTEL_METRICS_EXPORTER': 'otel.metrics.exporter',
'OTEL_METRICS_INTERVAL': 'otel.metrics.interval',
'OTEL_LOG_LEVEL': 'otel.logs.level',
'OTEL_PROPAGATORS': 'otel.propagators',
'OTEL_TRACES_SAMPLER': 'otel.traces.sampler',
'OTEL_TRACES_SAMPLER_ARG': 'otel.traces.samplerArg',
'OTEL_BATCH_SIZE': 'otel.batch.size',
'OTEL_BATCH_DELAY': 'otel.batch.delay'

```


## Control plane deployment

When you deploy the Controller via iofogctl or Helm, many of these options are set through the **Control Plane YAML** (e.g. [KubernetesControlPlane](../yaml-references/reference-control-plane.html)) or Helm values—for example `auth`, `database`, and `controller` settings such as `ecnViewerUrl`, `https`, `secretName`, and `logLevel`. The Operator or iofogctl translates those into the Controller’s config or environment.

For deployment options, see [Control Plane YAML Specification](../yaml-references/reference-control-plane.html) and [Platform Deployment](../platform-deployment/introduction.html).


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/reference-controller/configuration.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
