# Connector API

Connector exposes API and it’s API where you have a set of identities. Fog Controller has the proper identity and it’s able to tell Connector “I want you to open up some connections”. Fog Controller uses Connector API to tell it to do and Connector simply replies whether it is successful or not successful.

ioFog Agent connects to Connectors and through connecting Connectors traffic is able to move between fog nodes. In addition Connector has the capability to open traffic to the outside world so the outside users can get route into fog node.

### Connector offers two connectivity types:

**1) The first type, called a public pipe, provides a way to securely access Fog software and data from anywhere on in the world. Connector punches through firewalls and NATed networks to perform automatic internetworking of the Fog.**

Let’s describe what mapping is. Mapping is a way for describing a port opening, no matter whether you create a public or private pipe. It is an object that has an internal and an external port.

**The Endpoint and Response (below) of a public pipe connection is displayed below (Add functionality):**

**Request**

```json
Endpoint: /api/v2/mapping/add
Method: POST
Header Content-Type: application/x-www-form-urlencoded
Parameters: mapping={"type":"public","maxconnections":60,"heartbeatabsencethreshold":200000}
```

"maxconnections" means how many connection threads the ioFog agent will make with the Connector. You can have many users at the same time.

"heartbeatabsencethreshold" means if we don’t have a heartbeat signal from the ioFog agent within 20 sec, we kill that connection thread.

**Response:**

```json
{
  "status": "ok",
  "id": "2ae8ff72-7447-47de-a4ec-123eb214d63e",
  "port1": 32768,
  "port2": 32769,
  "passcode1": "0b403b65-c5a0-476f-92f5-ffc7ca0f85ef",
  "passcode2": "",
  "timestamp": 1542719018626
}
```

“id” is your ID for the mapping

"port1" - port that will be used by the ioFog agent

"port2" - port that will be by the Connector for public URL access

"passcode1” is used by the ioFog agent to establish a secure connection to the Connector. The Fog agent will receive the information through the Fog controller and tell you that you need to connect.

**The Endpoint of public pipe connection is displayed below (Remove):**

**Request**

```json
Endpoint: /api/v2/mapping/remove
Method: POST
Header Content-Type: application/x-www-form-urlencoded
Parameters: mappingid=e2454159-ed8c-4d00-a885-fdd87de811de
```

**Response:**

```json
{
  "status": "ok",
  "id": "2ae8ff72-7447-47de-a4ec-123eb214d63e",
  "timestamp": 1542719354334
}
```

**2) The second type, called a private pipe, consumes bandwidth on the Connector but stabilizes connectivity between Fog nodes that can’t normally see each other.**

Connector is available for 2 different ioFog agents talking to each other.

**The Endpoint and Response (below) of a private pipe connection is displayed below (Add functionality):**

**Request**

```json
Endpoint: /api/v2/mapping/add
Method: POST
Header Content-Type: application/x-www-form-urlencoded
Parameters: {"type":"private","maxconnectionsport1":1, "maxconnectionsport2":1, "heartbeatabsencethresholdport1":200000, "heartbeatabsencethresholdport2":200000}
```

**Response:**

```json
{
  "status": "ok",
  "id": "e2454159-ed8c-4d00-a885-fdd87de811de",
  "port1": 32770,
  "port2": 32771,
  "passcode1": "3dbd413c-10e9-4e40-a9cb-f4b8fb2b8b56",
  "passcode2": "7f4eb783-c2ab-4517-8aaf-c8395054193e",
  "timestamp": 1542719231127
}
```

The parameters description is the same as is described above for a public pipe.

Here “port1" will come out in "port2", and vice versa. Without the passcodes you will be immediately rejected.

**The Endpoint of private pipe connection is displayed below (Remove):**

**Request**

```json
Endpoint: /api/v2/mapping/remove
Method: POST
Header Content-Type: application/x-www-form-urlencoded
Parameters: mappingid=e2454159-ed8c-4d00-a885-fdd87de811de
```

**Response:**

```json
{
  "status": "ok",
  "id": "2ae8ff72-7447-47de-a4ec-123eb214d63e",
  "timestamp": 1542719354334
}
```

---

**In Public mode the URL is generated as follows:**

Example: ${protocol}://${address}\${port2}

where

{protocol} is either http:// or https://

{address} is either IP address or domain name

---

In iofog-connector.config file

When "dev": true, it's http connection.

When "dev": false, it's https connection.
