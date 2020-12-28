const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const db = new Pool({
  host: process.env.NODE_DB_HOST,
  user: process.env.NODE_DB_USER,
  port: process.env.NODE_DB_PORT,
  password: process.env.NODE_DB_PASS,
  database: process.env.NODE_DB_NAME
});
const helpers = require('./helpers/dbHelpers')(db);

module.exports = (updateChat) => {
  app.use(bodyParser.json());
  app.use(cors());
  app.get('/api/chat', async (req, res) => {
    try {
      const data = await helpers.getPublic();
      res.json(data);
    } catch (er) {
      console.log(er);
    }
    // res.json(data);
  });

  app.post('/api/users', async (req, res) => {
    try {
      const { name } = req.body.data;
      const data = await helpers.newUser(name);
      res.send(data);
    } catch (er) {
      console.log(er);
    }
  });

  app.post('/api/public', async (req, res) => {
    try {
      const { msg, id } = req.body.data;
      const data = await helpers.postPublic(id, msg);
      const user = await helpers.getUserById(id);

      updateChat(user[0].username, msg, user[0].profile_pic, id,  data[0].time)
      res.send(data);
    } catch (er) {
      console.log(er);
    }
  })


  return app
}