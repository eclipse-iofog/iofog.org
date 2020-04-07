# Create Your First Microservice

### JavaScript Edition

[Node.js](https://nodejs.org/) is a JavaScript runtime built on Google Chrome's V8 JavaScript engine. In this step we're going to build a simple microservice using Node.js and the [ioFog SDK](../developing-microservices/sdk.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> New to Node.js?</h3>
  <p>This tutorial assumes a working knowledge of Node.js and modern JavaScript.</p>
</aside>

## Use Case

To keep things fairly simple, we'll want to have your microservice do something interesting, but not particularly complex. To get a feel for the primary functions of the SDK, we want a microservice that:

1. Uses dynamic configuration variables at runtime
2. Takes input from another microservice
3. Does some processing on it
4. Outputs new data from the results

Let's build a microservice that computes a real-time [moving average](https://wikipedia.org/wiki/Moving_average) from the input, which will send the result to any other microservices that might be listening. We'll also set up a dynamic configuration of the rolling window size. We can later change the configuration without needing to restart anything.

If you're in a hurry, you can [skip ahead to the end](#the-final-moving-average-code).

## Project Setup

Since you're going to be writing a new microservice, you'll need to create a project directory. Let's create it inside your tutorial's previous working directory that you should already be in.

Let's name your project "moving-average" and create your service's `"main"` entry point.

```bash
mkdir moving-average
cd moving-average
touch index.js
```

You then run `npm init` to set up your default Node.js `package.json`, providing the answers to all its questions and setting `"main": "index.js"`

```sh
npm init
```

Now you need to install the ioFog SDK for Node.js, which is published to NPM as [@iofog/nodejs-sdk](https://www.npmjs.com/package/@iofog/nodejs-sdk):

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

Before we start writing the code for your microservice, lets take a look at the SDK's APIs.

The [ioFog Node.js SDK](https://github.com/ioFog/iofog-nodejs-sdk) has a number of APIs, but in this tutorial we're most interested in these ones:

- [`iofog.init()`](#iofoginit)
- [`iofog.getConfig()`](#iofoggetconfig)
- [`iofog.wsControlConnection()`](#iofogwscontrolconnection)
- [`iofog.wsMessageConnection()`](#iofogwsmessageconnection)
- [`iofog.ioMessage()`](#iofogiomessage--iofogwssendmessage)
- [`iofog.wsSendMessage()`](#iofogiomessage--iofogwssendmessage)

First, include the ioFog SDK in your index.js.

```js
const iofog = require('@iofog/nodejs-sdk');
```

#### iofog.init()

<aside class="notifications danger">
  <h3><img src="/images/icos/ico-danger.svg" alt=""> Use this as your entry point</h3>
  <p>The callback you provide should be treated for mostly as a pseudo entry point of your microservice. You have to make sure you don't call any SDK APIs before this function has been called!</p>
</aside>

You now have to register a callback for ioFog once the ioFog SDK has finished initializing. It accepts a number of arguments, but you'll most likely want to pass these defaults. Here we register `main()` function as the init callback.

```js
iofog.init('iofog', 54321, null, main);
});
```

For the curious, the first argument is the host name of the [Agent's Local API](../reference-agent/rest-api.html), the second is the port number of the SDK, and the third can be the container's ID, though it is not required.

#### iofog.getConfig()

Asynchronously fetch the microservice's current configuration (config). When it starts, the configuration of the microservice is only read once.

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

Therefore you have to connect the ioFog _control channel_ via WebSocket, which is used to receive notifications from the Controller that your microservice's config has changed.

Because a config can be any arbitrary JSON, including very large files, the change notifications themselves do not actually include the config. So if you would like to update your local cache of the config, you have to follow up a change notification with a call to `iofog.getConfig()`.

```js
iofog.wsControlConnection({
  onNewConfigSignal: () => updateConfig(),
  onError: err => console.error('Error with Control Connection: ', err)
});
```

#### iofog.wsMessageConnection()

Next, you have to connect to the ioFog _message channel_ via WebSocket. This is where you'll receive any messages routed to this microservice from another.

Under the hood, communication is brokered by your [Router](../getting-started/architecture.html#router) and messages are routed according to that microservice's route settings on the Controller.

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

Now that you can read control signals and message, you also need to send messages out with the actual moving average. We create and send ioMessages in JSON, which is the Node.js serialization format used for intercommunication between microservices.

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
  <p>ioMessages can contain a number of options and fields not described here. To learn more, check out the <a href="../reference-agent/rest-api.html#iomessages">Local API Reference</a>.</p>
</aside>

## Putting The Moving Average Together

You're ready to start writing some code! First, lets open (or create) the `index.js` file you set as your `package.json` "main". This is where you'll place all of your code.

Before we begin, let's review your goals for your moving average microservice:

1. Window size should be configurable
2. Take input from another microservice
3. Compute a moving average on that input
4. Output new data from the results

You'll want to have your microservice expect a custom config with a `maxWindowSize` field telling us what the max size of your rolling window should be.

To compute your real-time moving average, you can first create some utilities to compute an average from any array of numbers:

```js
const sum = values => values.reduce((a, b) => a + b, 0);
const average = values => sum(values) / (values.length || 1);

average([2, 6, 14, 53, 87]); // returns 32.4
```

In order to do a rolling window, you'll store incoming values in an array up until the point where a max window size is reached. After which you'll discard the oldest value, computing a new average each time.

```js
function getMovingAverage(arr, newValue) {
  // Evict the oldest values once you've reached your max window size.
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

What you'll do is produce an average for speed, acceleration, and rpm.

```js
onMessages: messages => {
  if (messages) {
    for (const msg of messages) {
      const input = JSON.parse(msg.contentdata.toString());

      // Produce moving averages for all the sensor values
      const result = {
        isAverage: true,
        time: input.time, // same time as
        speed: getMovingAverage(prevSpeeds, parseFloat(input.speed)),
        acceleration: getMovingAverage(
          prevAccelerations,
          parseFloat(input.acceleration)
        ),
        rpm: getMovingAverage(prevRpms, parseFloat(input.rpm))
      };

      const output = iofog.ioMessage({
        contentdata: Buffer.from(JSON.stringify(result)).toString(),
        infotype: 'application/json',
        infoformat: 'text/utf-8'
      });

      iofog.wsSendMessage(output);
    }
  }
};
```

## The Final Moving Average Code

You now have everything you need to complete your microservice!

```js
const iofog = require('@iofog/nodejs-sdk');

// Used as your in-memory cache of your configuration
// that will be provided by the Controller
let config = {
  maxWindowSize: 150 // Default value in case no config is provided
};
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
  // Evict the oldest values once you've reached your max window size.
  while (arr.length >= config.maxWindowSize) {
    // <------- config
    arr.shift();
  }
  arr.push(newValue);
  return average(arr);
}

// This is basically your "entry point", provided to iofog.init() below
function main() {
  updateConfig();

  iofog.wsControlConnection({
    onNewConfigSignal: () => updateConfig(),
    onError: err => console.error('Error with Control Connection: ', err)
  });

  const onMessageConnectionOpen = () => {
    console.log('Listening for incoming messages');
  };

  // Cache for your previous values received so you can compute your average
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
            speed: getMovingAverage(prevSpeeds, parseFloat(input.speed)),
            acceleration: getMovingAverage(
              prevAccelerations,
              parseFloat(input.acceleration)
            ),
            rpm: getMovingAverage(prevRpms, parseFloat(input.rpm))
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

You now need to package up your code as a Docker image, so that you can deploy it in the next step. Docker images are created from instructions written in a Dockerfile.

Like all build scripts, Dockerfiles can become a bit complex for advanced applications, but fortunately, ours is fairly simple:

```console
echo "FROM node:8
WORKDIR /moving-average
COPY ./package.json .
RUN npm install --only=production
COPY index.js .
CMD node ." > Dockerfile
```

In case you are not familiar with [Dockerfile](https://docs.docker.com/engine/reference/builder/), here is a quick run down of the building steps:

1. Use a [public base image](https://hub.docker.com/_/node) `node:8` to start with
2. Set the image current working directory to `/moving-average`
3. Copy `package.json` from the current local folder into `/moving-average` inside the image
4. Run `npm install --only=production`, which will install all required `node_modules` for production
5. Copy `index.js` from the current local folder into `/moving-average` inside the image
6. When a container is run using this image, start the container by running the following command `node .`

## Build Your Docker Image

With your Dockerfile setup, you can go ahead and build your image:

```console
docker build --tag iofog-tutorial/moving-average:v1 .

Sending build context to Docker daemon    7.8MB
Step 1/6 : FROM node:8
8: Pulling from library/node
092586df9206: Pull complete
ef599477fae0: Pull complete
4530c6472b5d: Pull complete
d34d61487075: Pull complete
87fc2710b63f: Pull complete
e83c771c5387: Pull complete
544e37709f92: Pull complete
3aaf6653b5f3: Pull complete
1fed50f6e111: Pull complete
Digest: sha256:c00557b8634c74012eda82ac95f1813c9ea8c152a82f53ad71c5c9611f6f8c3c
Status: Downloaded newer image for node:8
 ---> 7a9afc16a57f
Step 2/6 : WORKDIR /moving-average
 ---> Running in 640e44403abe
Removing intermediate container 640e44403abe
 ---> 9b9c5c8036d5
Step 3/6 : COPY ./package.json .
 ---> ebe7bf4fd2cf
Step 4/6 : RUN npm install --only=production
 ---> Running in d2cd4b22f27e
npm WARN moving-average@1.0.0 No description
npm WARN moving-average@1.0.0 No repository field.

audited 176 packages in 1.331s
found 9 vulnerabilities (6 moderate, 3 high)
  run `npm audit fix` to fix them, or `npm audit` for details
Removing intermediate container d2cd4b22f27e
 ---> 7818facf5c9c
Step 5/6 : COPY index.js .
 ---> da965f5084b9
Step 6/6 : CMD node .
 ---> Running in 91a726deaea4
Removing intermediate container 91a726deaea4
 ---> a1b78cc399d1
Successfully built a1b78cc399d1
Successfully tagged iofog-tutorial/moving-average:v1
```

We'll wait a few minutes while it downloads a default Node.js environment you're using as a base.

Let's double check the images were successfully created. The image name and tag are important in the next step of the tutorial, where you are going to deploy the moving average service.

```console
docker image ls --filter 'reference=*/moving-average'

REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
iofog-tutorial/moving-average   v1                  5bf0943c4cd2        2 minutes ago       904MB
```

## Deploy Your Microservice

We now want to see this code in action, so let's go ahead and learn how to deploy this microservice to your ioFog tutorial environment.

[Continue To Next Step: Deploy Your Microservice](deploy-your-microservice.html).

<aside class="notifications note">
  <h3><img src="/images/icos/ico-note.svg" alt=""> Questions? Run into issues?</h3>
  <p>If you ran into an issue, have a question, or just want to get plugged into the community, head over to your <a href="https://discuss.iofog.org/">Discussion Forum</a>. We'd love to have you!</p>
</aside>

<aside class="notifications contribute">
  <h3><img src="/images/icos/ico-github.svg" alt="">See anything wrong with the document? Help us improve it!</h3>
  <a href="https://github.com/eclipse-iofog/iofog.org/edit/develop/content/docs/2.0.0/tutorial/create-your-first-microservice-javascript.md"
    target="_blank">
    <p>Edit this page on Github!</p>
  </a>
</aside>
