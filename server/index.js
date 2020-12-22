const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const Pool = require('pg');


app.use(bodyParser.json());
app.use(cors());


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

wss.on("connection", socket => {
  socket.onmessage = event => {
    console.log(`Message Received: ${event.data}`);
    if(event.data === 'ping')
      socket.send(JSON.stringify("pong"));
  };
  socket.on('close', function close() {
    console.log('it died');
  });
});


app.listen(8001, () => console.log('listening 8001'));