require('dotenv');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const { Pool } = require('pg');
const server = require("http").Server(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 123,
  database: 'chatter'
});

const helpers = require('./helpers/dbHelpers')(db);

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
    if (event.data === 'ping')
      socket.send(JSON.stringify("pong"));
  };
  socket.on('close', function close() {
    console.log('it died');
  });
});

app.get('/api/chat', async (req, res) => {
  try {
    const data = await helpers.getPublic();
    res.json(data);
  } catch(er) {
    console.log(er);
  }
  // res.json(data);
})

app.post('/api/users', async(req, res) => {
  try {
    const {name} = req.body.data
    const data = await helpers.newUser(name);
    res.send(data);
  } catch(er) {
    console.log(er);
  }
})

app.post('/api/public', async(req, res) => {
  try {
    const {msg, id} = req.body.data;
    console.log(msg, id);
    const data = await helpers.postPublic(id, msg);
    res.send(data);
  } catch(er) {
    console.log(er);
  }
})

app.listen(8001, () => console.log('listening 8001'));