# Deploy External Database

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Setup your db for production environment</h3>
  <p>Eclipse ioFog support both `mysql` and `postgres` as an external databases. Below you can find how to deploy MySQL or Postgres on Kubernetes. You can use same database deployment for both `IAM`and `ControlPlane`</p>
</aside>

### Deploy PostgreSQL on Kubernetes

```yaml title="example-postgre.yaml"
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: iofog-db-volume
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName:
  resources:
    requests:
      storage: 10Gi
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql-db
spec:
  serviceName: postgresql-db-service
  selector:
    matchLabels:
      app: postgresql-db
  replicas: 1
  template:
    metadata:
      labels:
        app: postgresql-db
    spec:
      containers:
        - name: postgresql-db
          image: postgres:16
          volumeMounts:
            - mountPath: /data
              name: cache-volume
          env:
            - name: POSTGRES_USER
              value: testuser
            - name: POSTGRES_PASSWORD
              value: testpassword
            - name: PGDATA
              value: /data/pgdata
            - name: POSTGRES_DB
              value: keycloak
          ports:
            - containerPort: 5432
              hostPort: 5432
              protocol: TCP
          volumeMounts:
            - mountPath: /home/postgres/pgdata/data
              name: iofog-db-volume
              readOnly: false
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000
      restartPolicy: Always
      volumes:
        - name: iofog-db-volume
          persistentVolumeClaim:
            claimName: iofog-db-volume
---
apiVersion: v1
kind: Service
metadata:
  name: postgres-db
spec:
  selector:
    app: postgresql-db
  type: LoadBalancer
  ports:
  - port: 5432
    targetPort: 5432
```

```bash
kubectl apply -f example-postgre.yaml -n $namespace
```

### Deploy MySQL on Kubernetes

```yaml title="example-mysql.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: iofog-mysql-secret
stringData:
  rootHost: "%"
  rootPassword: "password"
  rootUser: "root"

---
apiVersion: v1
kind: Service
metadata:
  name: mysql
  annotations:
  labels:
    app: mysql
spec:
  type: LoadBalancer
  selector:
    app: mysql
  ports:
    - name: tcp
      protocol: TCP
      port: 3306

---

apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  replicas: 1
  serviceName: mysql
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      terminationGracePeriodSeconds: 10
      containers:
        - name: mysql
          image: mysql:latest
          ports:
            - name: tpc
              protocol: TCP
              containerPort: 3306
          env:
            - name: MYSQL_ROOT_PASSWORD
              valueFrom: 
               secretKeyRef: 
                key: rootPassword
                name: iofog-mysql-secret
          volumeMounts:
            - name: iofog-db
              mountPath: /var/lib/mysql
  volumeClaimTemplates:
    - metadata:
        name: iofog-db
      spec:
        storageClassName: default
        accessModes:
          - ReadWriteOnce
        resources:
          requests:
            storage: 30Gi
```

```bash
kubectl apply -f example-mysql.yaml -n $namespace
```


<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/database.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>