require('dotenv').config();
// const app = require('express')();

const app = require('./application')(updateChat);

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
let cntr = 0;
let i = 1;
let roomNum = 0;
const makeNewRoom = () => {
  roomNum++;
  cntr = 0;
};

// Set the Identity of this token

// Serialize the token as a JWT

app.get('/token', (req, res) => {
  const accessToken = new AccessToken(
    ACCOUNT_SID,
    API_KEY_SID,
    API_KEY_SECRET
  );
  const id = `User ${i++}`;
  accessToken.identity = id;
  // Grant access to Video
  if (cntr >= 2)
    makeNewRoom();
  const grant = new VideoGrant({ room: `Room #${roomNum}` });
  // grant.room = 'cool room';
  accessToken.addGrant(grant);
  const jwt = accessToken.toJwt();
  // console.log(jwt);
  res.send({ jwt, cntr: cntr++ , rm:`Room #${roomNum}`});

});


function updateChat(username, msg, profile_pic, id, date ) {
  wss.clients.forEach(function eachClient(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "PUBLIC_CHAT",
          msg,
          username,
          profile_pic,
          id,
          date
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
    if (event.data === 'ping')
      socket.send(JSON.stringify("pong"));
    if (event.data.type === 'vid') {
      updateVideo(JSON.parse(event.data.data, socket));
    }
    // else if(event.data.type === ) 
  };
  socket.on('close', function close() {
    console.log('Connection closed');
  });
});


server.listen(8001, () => console.log('listening 8001'));