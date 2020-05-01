//Load express module with `require` directive
var express = require('express')
var Particle = require('particle-api-js')
var particle = new Particle();
var token;
var app = express()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

//Launch listening server on port 8081
app.listen(8081, function () {
  console.log('app listening on port 8081!')
})


particle.login({username: 'USERNAME', password: 'PASSWORD'}).then(
  function(data){
    token = data.body.access_token;
  },
  function(err){
    console.log('Could not log in.', err);
  }
);