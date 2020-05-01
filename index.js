//Load express module with `require` directive
var express = require('express')
var Particle = require('particle-api-js')
var particle = new Particle();
var token;
var app = express()

// Imports the Google Cloud client library
const {PubSub} = require('@google-cloud/pubsub');

// Creates a client; cache this for further use
const pubSubClient = new PubSub();

app.use(express.json());

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/turn-on', function(req, res){
  loginAndPublishEvent('turn-on');
  res.send('all done');
})

app.get('/turn-off', function(req, res){
  loginAndPublishEvent('turn-off');
  res.send('all done');
})

app.get('/start-listening-pubsub', function(req, res){
  listenForMessages();
  res.send('Starting to listen');
})
//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})

const subscriptionName = 'projects/custom-cycling-275818/subscriptions/iot-moisture-sensor-reading';
const timeout = 60;

// Uses Google Application Default Credentials (ADC) - Have fun learning about this lol
function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

function loginAndPublishEvent(eventName){
  particle.login({username: 'USERNAME', password: 'PASSWORD'}).then(
    function(data){
      token = data.body.access_token;
      return token;
    },
    function(err){
      console.log('Could not log in.', err);
    }
  ).then(
    function(result){
      return particle.publishEvent({ name: 'toggle-water-pump', data: 'turn-off', auth: token});
    },
    function(err){
      console.log('Error when publishing event.', err);
    }
  ).then(
    function(data){
      if(data.body.ok){
        console.log("Event published successfully");
      }
    },
      function(err){
        console.log("Failed to publish event: " + err);
      }
  );
}
