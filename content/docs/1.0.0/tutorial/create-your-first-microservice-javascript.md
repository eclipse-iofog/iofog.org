# Create Your First Microservice

### JavaScript Edition

[Node.js](https://nodejs.org/) is a JavaScript runtime built on Google Chrome's V8 JavaScript engine. In this step we're going to build a simple microservice using Node.js and the [ioFog SDK](../writing-microservices/sdk.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Node.js?</h3>
  <p>This tutorial assumes a working knowledge of Node.js and modern JavaScript.</p>
</aside>

## Use Case

To keep things fairly simple, we'll want to have our microservice do something interesting, but not particularly complex. The give you a feel for the primary functions of the SDK, we want a microservice that:

1. Uses dynamic configuration variables at runtime
2. Takes input from another microservice
3. Does some processing on it
4. Outputs new data from the results

So let's build a microservice that computes a real-time [moving average](https://wikipedia.org/wiki/Moving_average) from the input, sending the result to any other microservices that might be listening. We'll also set it up to use dynamic configuration for how long the rolling window should be for, so that we can change it later without needing to restart anything.

If you're in a hurry, you can [skip ahead to the end if you'd like](#the-final-moving-average-code).

## Project Setup

Since we're going to be writing a new microservice, we'll need to create a project directory. Let's create it inside our tutorial's previous working directory we should already be in.

Let's name our project "moving-average" and create our service's `"main"` entry point.

```bash
mkdir moving-average
cd moving-average
touch index.js
```

Then run `npm init` to setup your default Node.js `package.json`, providing the answers to all its questions and setting `"main": "index.js"`

```sh
npm init
```

Now we need to install the ioFog SDK for Node.js, which is published to NPM as [@iofog/nodejs-sdk](https://www.npmjs.com/package/@iofog/nodejs-sdk):

```sh
npm install --save @iofog/nodejs-sdk
```

The `package.json` file should look something like this now:
```json
{
  "name": "moving-average",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@iofog/nodejs-sdk": "0.0.1"
  }
}
```

## Using ioFog SDK

The [ioFog Node.js SDK](https://github.com/ioFog/iofog-nodejs-sdk) has a number of APIs, but in this tutorial we're most interested in these:

- [`iofog.init()`](#iofoginit)
- [`iofog.getConfig()`](#iofoggetconfig)
- [`iofog.wsControlConnection()`](#iofogwscontrolconnection)
- [`iofog.wsMessageConnection()`](#iofogwsmessageconnection)
- [`iofog.ioMessage()`](#iofogiomessage--iofogwssendmessage)
- [`iofog.wsSendMessage()`](#iofogiomessage--iofogwssendmessage)

First, include the ioFog SDK in our index.js.

```js
const iofog = require('@iofog/nodejs-sdk');
```

#### iofog.init()

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Use this as your entry point</h3>
  <p>The callback you provide should be treated for the most part as a pseudo entry point of your microservice. Make sure you don't call any SDK APIs before this function has been called!</p>
</aside>

We now have to register a callback for ioFog once the ioFog SDK has finished initializing. It accepts a number of arguments, but you'll most likely want to pass these defaults. Here we register `main()` function as the init callback.

```js
iofog.init('iofog', 54321, null, main);
});
```

For the curious, the first argument is the host name of the [Agent's Local API](../agents/local-api.html), the second is the port number of the SDK, and the third can be the container's ID, though it is not required.

#### iofog.getConfig()

Asynchronously fetch the microservice's current configuration (config). The configuration of the microservice is only read once when it starts.

```js
function updateConfig() {
    iofog.getConfig({
        onNewConfig: newConfig => {
            config = newConfig;
        },
        onBadRequest: err => console.error('updateConfig failed: ', err),
        onError: err => console.error('updateConfig failed: ', err)
    });
}
```

#### iofog.wsControlConnection()

Note that when a configuration of a microservice changes, the Controller will send a message to the involved microservice.

Therefore we have to connect the ioFog *control channel* via WebSocket, which is used to receive notifications from the Controller that our microservice's config has changed.

Because a config can be any arbitrary JSON, including very large files, the change notifications themselves do not actually include the config. So if you do in fact want to update your local cache of the config, you have to follow up a change notification with a call to `iofog.getConfig()`.

```js
iofog.wsControlConnection({
    onNewConfigSignal: () => updateConfig(),
    onError: err => console.error('Error with Control Connection: ', err)
});
```

#### iofog.wsMessageConnection()

Next, we have to connect to the ioFog *message channel* via WebSocket. This is where you'll receive any messages routed to this microservice from another.

Under the hood, communication is brokered by your [Connector](../connectors/overview.html) and messages are routed according to that microservice's route settings on the Controller.

```js
iofog.wsMessageConnection(onMessageConnectionOpen, {
    onMessages: messages => {
        // Do something with messages... 
    },
    onMessageReceipt: (messageId, timestamp) => {
        console.log('message receipt: ', {
            messageId,
            timestamp
        });
    },
    onError: err => console.error('Message WebSocket error: ', err)
});
```

#### iofog.ioMessage() / iofog.wsSendMessage()

Now that we can read control signals and message, we also need to send messages out with the actual moving average. We create and send ioMessages in JSON, which is the Node.js serialization format used for intercommunication between microservices.

When your code wants to publish a message to any other microservice, these are what you'll be sending.

There are a number of optional fields, but the most common are: `contentdata`, `infotype`, and `infoformat`. The `contentdata` field is the actual data payload you want to send, which needs to be provided as a string.

```js
const output = iofog.ioMessage({
    contentdata: Buffer.from(JSON.stringify(result)).toString(),
    infotype: 'application/json',
    infoformat: 'text/utf-8'
});

iofog.wsSendMessage(output);
```

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> More about ioMessages?</h3>
  <p>ioMessages can contain a number of options and fields not described here. If you'd like to learn more, checkout the <a href="../agents/local-api.html#iomessages">Local API Reference</a>.</p>
</aside>

## Putting The Moving Average Together

We're ready to start writing some code! Fire up your [favorite editor](https://vim-adventures.com/) and open (or create) the `index.js` file we set as our `package.json` "main". This is where we'll place all our code.

Before we begin, let's review our goals for our moving average microservice:

1. Window size should be configurable
2. Take input from another microservice
3. Compute a moving average on that input
4. Output new data from the results

We'll want to have our microservice expect a custom config with a `maxWindowSize` field telling us what the max size of our rolling window should be.

To compute our real-time moving average, we can first create some utilities to compute an average from any array of numbers:

```js
const sum = values => values.reduce((a, b) => a + b, 0);
const average = values => sum(values) / (values.length || 1);

average([2, 6, 14, 53, 87]); // returns 32.4
```

So to do a rolling window, we'll store incoming values in an array up until the point where a max window size is reached, after which we'll discard the oldest value, each time computing a new average.

```js
function getMovingAverage(arr, newValue) {
    // Evict the oldest values once we've reached our max window size.
    while (arr.length >= config.maxWindowSize) {
        // <------- config
        arr.shift();
    }
    arr.push(newValue);
    return average(arr);
}
```

The Sensors microservice produces objects that look like this:

```json
{
  "time": 1540855847710,
  "speed": 41.71445712,
  "acceleration": "0.52431",
  "rpm": "2078.3"
}
```

What we'll do is produce an average for speed, acceleration, and rpm.

```js
onMessages: messages => {
    if (messages) {
        for (const msg of messages) {
            const input = JSON.parse(msg.contentdata.toString());

            // Produce moving averages for all the sensor values
            const result = {
                isAverage: true,
                time: input.time, // same time as
                speed: getMovingAverage(prevSpeeds,
                    parseFloat(input.speed)),
                acceleration: getMovingAverage(prevAccelerations,
                    parseFloat(input.acceleration)),
                rpm: getMovingAverage(prevRpms,
                    parseFloat(input.rpm))
            };

            const output = iofog.ioMessage({
                contentdata: Buffer.from(JSON.stringify(result)).toString(),
                infotype: 'application/json',
                infoformat: 'text/utf-8'
            });

            iofog.wsSendMessage(output);
        }
    }
}
```

## The Final Moving Average Code

We now have everything we need to complete our microservice!

```js
const iofog = require('@iofog/nodejs-sdk');

// Used as our in-memory cache of our configuration
// that will be provided by the Controller
let config = null;

function updateConfig() {
    iofog.getConfig({
        onNewConfig: newConfig => {
            config = newConfig;
        },
        onBadRequest: err => console.error('updateConfig failed: ', err),
        onError: err => console.error('updateConfig failed: ', err)
    });
}

const sum = values => values.reduce((a, b) => a + b, 0);
const average = values => sum(values) / (values.length || 1);

function getMovingAverage(arr, newValue) {
    // Evict the oldest values once we've reached our max window size.
    while (arr.length >= config.maxWindowSize) {
        // <------- config
        arr.shift();
    }
    arr.push(newValue);
    return average(arr);
}

// This is basically our "entry point", provided to iofog.init() below
function main() {
    updateConfig();

    iofog.wsControlConnection({
        onNewConfigSignal: () => updateConfig(),
        onError: err => console.error('Error with Control Connection: ', err)
    });

    const onMessageConnectionOpen = () => {
        console.log('Listening for incoming messages');
    };

    // Cache for our previous values received so we can compute our average
    const prevSpeeds = [];
    const prevAccelerations = [];
    const prevRpms = [];

    iofog.wsMessageConnection(onMessageConnectionOpen, {
        onMessages: messages => {
            if (messages) {
                for (const msg of messages) {
                    const input = JSON.parse(msg.contentdata.toString());

                    // Produce moving averages for all the sensor values
                    const result = {
                        isAverage: true,
                        time: input.time, // same time as
                        speed: getMovingAverage(prevSpeeds,
                            parseFloat(input.speed)),
                        acceleration: getMovingAverage(prevAccelerations,
                            parseFloat(input.acceleration)),
                        rpm: getMovingAverage(prevRpms,
                            parseFloat(input.rpm))
                    };

                    const output = iofog.ioMessage({
                        contentdata: Buffer.from(JSON.stringify(result)).toString(),
                        infotype: 'application/json',
                        infoformat: 'text/utf-8'
                    });

                    iofog.wsSendMessage(output);
                }
            }
        },
        onMessageReceipt: (messageId, timestamp) => {
            console.log('message receipt: ', {
                messageId,
                timestamp
            });
        },
        onError: err => console.error('Message WebSocket error: ', err)
    });
}

iofog.init('iofog', 54321, null, main);
```

## Create Dockerfile

We now to need to package up our code as a Docker image, so that we can deploy it in the next step. Docker images are created from instructions written in a Dockerfile.

Like all build scripts, Dockerfiles can become a bit complex for advanced applications, but fortunately for our simple microservice, ours is pretty simple:

```dockerfile
FROM node:8
COPY . /moving-average
WORKDIR /moving-average
RUN npm install --only=production
CMD node .
```

## Build Your Docker Image

With our Dockerfile setup, we can go ahead and build our image:

```bash
docker build --tag iofog-tutorial/moving-average:v1 .
```

This might take a few minutes, as it needs to download a default Node.js environment we're using as a base with `FROM node:8`.

You can check the images was successfully created. The image name and tag are important in the next step of the tutorial, where we are going to deploy the moving average service.

```bash
docker image ls --filter 'reference=*/moving-average'
```

## Deploy Your Microservice

We now want to see this code in action, so let's go ahead and learn how to deploy this microservice to our ioFog tutorial environment.

[Continue To Next Step](deploy-your-microservice.html).
