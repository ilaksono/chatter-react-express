const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const db = new Pool({
  host: 'localhost',
  user: 'postgres',
  port: 5433,
  password: 123,
  database: 'chatter'
});
const helpers = require('./helpers/dbHelpers')(db);

module.exports = () => {
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
      console.log(msg, id);
      const data = await helpers.postPublic(id, msg);
      res.send(data);
    } catch (er) {
      console.log(er);
    }
  })


  return app
}