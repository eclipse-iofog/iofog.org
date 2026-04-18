# Prepare Realm and OIDC Client

Eclipse ioFog integrates Keycloak as its identity and access management (IAM) solution to provide secure authentication and authorization across the platform. By leveraging Keycloak, ioFog ensures a centralized and scalable approach to manage user identities, roles, and permissions. This integration enables robust Role-Based Access Control (RBAC) for users, ensuring secure access to critical edge infrastructure and applications. With Keycloak, Eclipse ioFog supports Single Sign-On (SSO) and identity federation, streamlining user management while enhancing security, making it an ideal solution for enterprises operating in dynamic and distributed environments.

## Roles and permissions

By default preconfigured Eclipse ioFog realm comes with below Realm level roles:
- pot-Admin
- pot-SRE
- pot-Developer
- pot-Viewer

By default preconfigured Eclipse ioFog realm comes with  two client `pot-controller` and `ecn-viewer`. 
`ecn-viewer`client comes with `Standard Flow` , `pot-controller` client comes with `Direct access grants` and `Service accounts roles`

Both `pot-controller` and `ecn-viewer` client has tree roles: `SRE`, `Developer` and `Viewer`

Below you can find how realm Level roles are associated with Client level roles. 

| Realm Role | pot-controller | ecn-viewer |
|------------| --------------| ------------|
| pot-Admin | Admin | Admin |
| pot-SRE | SRE | SRE |
| pot-Developer | Developer | Developer |
| pot-Viewer | Viewer | Viewer |

Only users with `pot-Admin` roles can access Keycloak console and add or remove users, configure realm settings.

<aside class="notifications danger">
  <h3><img src="../../../images/icos/ico-danger.svg" alt=""> Don't change client level roles</h3>
  <p>It is important to note that you have never change the client level roles as `Controller`'s REST-API endpoints protected against user's associated client level roles.</p>
</aside>

- `SRE`'s can deploy, manage and configure both Agents, System Applications, Applications and Microservices.
- `Developer`'s can deploy, manage and configure Applications and Microservices.
- `Viewer`'s can only view the cluster resources.

By default users with `Developer` and `Viewer` roles need to configure 2FA. If you want to force `SRE`'s to 2FA you need to configure settings on `browser dynamic otp` flow on Authentication section.

<aside class="notifications danger">
  <h3><img src="../../../images/icos/ico-danger.svg" alt=""> Don't have Keycloak Instance?</h3>
  <p>We recommended going through the <a href="../platform-deployment/keycloak-deployment.html">Keycloak Deployment Guide</a> before continuing on here.</p>
</aside>

## Download PreConfigured Realm Configuration for Eclipse ioFog

You can download preconfigured realm import json for Eclipse ioFog with below command. Replace `newRealmValue` with the you would like to give for your realm.

```bash
wget -q -O - "https://iofog.org/iofog-realm-template.json" | sed 's/\$realm/newRealmValue/g' > datasance-pot-ralm.json
```
##### Example

```bash title="Download preconfigured Eclipse ioFog realm configuration and assign realm-name: test "
wget -q -O - "https://iofog.org/iofog-realm-template.json" | sed 's/\$realm/test/g' > datasance-pot-realm.json
```

## Import Realm

Import the preconfigured realm json you download in previous step. 

<img src="../../../images/keycloak/keycloak-2.png" />

<img src="../../../images/keycloak/keycloak-3.png" />

<img src="../../../images/keycloak/keycloak-4.png" />

## Create User

Create user inside imported realm. Create user's password and assign role.

<img src="../../../images/keycloak/keycloak-5.png" />
<img src="../../../images/keycloak/keycloak-6.png" />
<img src="../../../images/keycloak/keycloak-7.png" />
<img src="../../../images/keycloak/keycloak-8.png" />

## Generate Client Secret

Generate client secret for `pot-controller` client. Copy and save it, you wil use it while preparing `ControlPlane` yaml.

<img src="../../../images/keycloak/keycloak-9.png" />
<img src="../../../images/keycloak/keycloak-10.png" />


## Get RealmKey

Get your realKey. Copy and save it, you wil use it while preparing `ControlPlane` yaml.

<img src="../../../images/keycloak/keycloak-11.png" />

## Prepare ControlPlane yaml

Now you are ready to deploy `ControlPlane` with the auth configuration generated on previous steps.

```yaml
echo "---
apiVersion: iofog.org/v3
kind: KubernetesControlPlane
metadata:
  name: albatros-1
spec:
  iofogUser:
    name: Foo
    surname: Bar
    email: foo@bar.com
    password: testPasword12xlj
  auth:
    url: https://kc-url/
    realm: $realm-name
    realmKey: $realm-key
    ssl: external
    controllerClient: pot-controller
    controllerSecret: $controller-client-secret
    viewerClient: ecn-viewer

```


## Configure ECN-Viewer URL

<aside class="notifications danger">
  <h3><img src="../../../images/icos/ico-danger.svg" alt=""> Configure ECN-Viewer Redirect URL</h3>
  <p>When deploying `ControlPlnae` via `iofogctl` or `Helm, both `iofogctl` and our kubernetes operator updates ECN-Viewer client's redirect URL. But if you deploy your Eclipse ioFog `ControlPlane` manually, you need to configure ECN-Viewer redirect URL on Keycloak client setting. Follow instructions on below images. Only configure `Root URL`and do not put `/` at the end of `Root URL`</p>
</aside>

<img src="../../../images/keycloak/keycloak-12.png" />
<img src="../../../images/keycloak/keycloak-13.png" />


<aside class="notifications contribute">
  <h3><img src="../../../images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/3.7/platform-deployment/prepare-realm.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>