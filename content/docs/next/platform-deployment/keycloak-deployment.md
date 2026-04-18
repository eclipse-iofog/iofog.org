# Deploy Keycloak


## Get started with Keycloak on Docker for dev environment

```bash
docker run -p 8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:26.0.5 start-dev
```
This command starts Keycloak exposed on the local port 8080 and creates an initial admin user with the username `admin` and password `admin`.


## Kubernetes Production Deployment 

For production environments it is highly recommended to deploy Keycloak via Operator. 

### Install the CRDs by entering the following commands:

```bash
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.0.5/kubernetes/keycloaks.k8s.keycloak.org-v1.yml
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.0.5/kubernetes/keycloakrealmimports.k8s.keycloak.org-v1.yml
```

### Install the Keycloak Operator deployment by entering the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/keycloak/keycloak-k8s-resources/26.0.5/kubernetes/kubernetes.yml
```

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Warning</h3>
  <p>The Keycloak Operator will watch the namespace where it is installed. You may optionally select a namespace with the `--namespace or -n` option.</p>
</aside>

### Preparing for deployment

Once the Keycloak Operator is installed and running in the cluster namespace, you can set up the other deployment prerequisites.

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Setup your db for production environment</h3>
  <p>We recommended going through the <a href="../platform-deployment/database.html">Database Installation Guide</a> before continuing on here.</p>
</aside>

- Database
- Hostname
- TLS Certificate and associated keys

#### TLS Certificate and key

For development purposes, you can enter this command to obtain a self-signed certificate:

```bash
openssl req -subj '/CN=test.keycloak.org/O=Test Keycloak./C=US' -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```

```bash
kubectl create secret tls example-tls-secret --cert certificate.pem --key key.pem -n $namespace
```

#### Deploying Keycloak

To deploy Keycloak, you create a Custom Resource (CR) based on the Keycloak Custom Resource Definition (CRD).

Consider storing the Database credentials in a separate Secret. Enter the following commands:

```bash
kubectl create secret generic keycloak-db-secret \
  --from-literal=username=[your_database_username] \
  --from-literal=password=[your_database_password] -n $namespace
```

```yaml title="example-keycloak.yaml"
apiVersion: k8s.keycloak.org/v2alpha1
kind: Keycloak
metadata:
  name: example-kc
spec:
  instances: 1
  db:
    vendor: postgres
    host: postgres-db
    usernameSecret:
      name: keycloak-db-secret
      key: username
    passwordSecret:
      name: keycloak-db-secret
      key: password
  http:
    tlsSecret: example-tls-secret
  hostname:
    hostname: test.keycloak.org
  proxy:
    headers: xforwarded # double check your reverse proxy sets and overwrites the X-Forwarded-* headers

```

```bash
 kubectl apply -f example-keycloak.yaml -n $namespace
```


### Deploy with Ingress Configuration

```yaml
apiVersion: k8s.keycloak.org/v2alpha1
kind: Keycloak
metadata:
  name: pot-auth
spec:
  instances: 1
  image: ghcr.io/eclipse-iofog/keycloak:25.0.0
  startOptimized: false
  db:
    vendor: 
    usernameSecret:
      name: 
      key: 
    passwordSecret:
      name: 
      key: 
    host:
    database: 
    port: 
  http:
    httpEnabled: false
    httpsPort: 8443
    tlsSecret: kc-auth
  hostname:
    hostname: kc.example.com
  ingress:
    enabled: false
  additionalOptions:
    - name: proxy
      value: reencrypt
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: pot-auth-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt
    nginx.ingress.kubernetes.io/backend-protocol: "https"
    nginx.ingress.kubernetes.io/proxy-buffer-size: "128k"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - kc.example.com
    secretName: kc-auth
  rules:
  - host: kc.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: pot-auth
            port:
              number: 8443

```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/keycloak-deployment.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>