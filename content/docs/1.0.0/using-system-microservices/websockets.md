# WebSockets

WS server listens on port 54332.

#### Get USB-to-Serial Web-socket Connection

This endpoint opens a message Web-socket connection to USB-to-Serial device. The messages and other commands sent
over this Web-socket are specified here. It is the responsibility of the container to establish this connection
and ensure it is running.

The PORT of USB-to-Serial device must be passed as part of the URL because otherwise it would have to be passed in
the Web-socket connection itself and that would make associated connections with different devices rather difficult.

##### Endpoint

```json
	ws://loocalhost:54332/hal/rs232/{PORT=dev/ttyusb0}
```

##### Response

```json
	None - the Websocket will simply be opened successfully
```

##### Querystring Parameters

```json
	PORT - the PORT of USB-to-Serial device to connect to via the Websocket connection
	(example shown here as '/dev/ttyusb0')
```

##### Signals from HAL to Client

```json
	- op code 4: (single byte command) indicates connection to device was opened (it's an answer to connection open op
	code signal sent with configuration for opening connection to physical device); at this point HAL starts
	listening on data from connected device.
	- op code 6: indicates that HAL recieved some data from physical device (op code single byte followed by pure bytes
	of data recieved from device)
	- standart close frame: indicates that current connection was closed.
	    > status code 1000 with close frame : means that device normally closed connection
	    > status code 4000 with close frame : there was an exception, error will be passed in reason.
```

##### Signals from Client to HAL

```json
       - op code 3: signals HAL to open connection to device with specified configuration in passed data (op code single
       byte followed by bytes of json configuration to open connection to device ); in case with USB-to-Serial: PORT
       property is required.
       - op code 5: signals HAL to send recieved data to connected device (op code single byte followed by pure bytes of
       data to send to device)
       - standart close frame: indicates that client wants to close current connection.
           > status code 1000 with close frame : means that device normally closed connection
           > status code 4000 with close frame : there was an exception, error will be passed in reason.
```

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
- 'data_read_timeout' (this property tells HAL to pause for specified timeout in seconds before reading data from buffer)

**Example:**

```json
{ "port": "/dev/ttyUSB0" }
```
