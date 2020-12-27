require('dotenv').config();
// const app = require('express')();

const app = require('./application')();

const server = require("http").Server(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

// Substitute your Twilio AccountSid and ApiKey details
var ACCOUNT_SID = process.env.NODE_TWILIO_SID;
var API_KEY_SID = process.env.NODE_VIDEO_KEY;
var API_KEY_SECRET = process.env.NODE_VIDEO_SECRET;

// Create an Access Token
var accessToken = new AccessToken(
  ACCOUNT_SID,
  API_KEY_SID,
  API_KEY_SECRET
);
let i = 1;
// Set the Identity of this token

// Serialize the token as a JWT

app.get('/token', (req, res) => {
  accessToken.identity = `User ${i++}`;

  // Grant access to Video
  var grant = new VideoGrant();
  grant.room = 'cool room';
  accessToken.addGrant(grant);
  var jwt = accessToken.toJwt();
  console.log(jwt);
  res.send(jwt);

})


function updateChat(user, msg) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "PUBLIC_CHAT",
          msg,
          user
        })
      );
    }
  });
}
function updateVideo(data, ws) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(
        JSON.stringify({
          data
        })
      );
    }
  });
}

wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);
    
    if (event.data === 'ping')
      socket.send(JSON.stringify("pong"));
    if(event.data.type === 'vid') {
      updateVideo(JSON.parse(event.data.data, socket));
    } 
    // else if(event.data.type === ) 
  };
  socket.on('close', function close() {
    console.log('it died');
  });
});


app.listen(8001, () => console.log('listening 8001'));