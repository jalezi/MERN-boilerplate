const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { connectToDB } = require('./config');
const { closeServer } = require('./utils');

const app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;
const port = 4000; // port must match proxy settings in client package.json

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());

app.get('/api', (req, res) => {
  res.json({ status: 200, message: 'GET /api' });
});

let server;
if (env !== 'test') {
  (async () => {
    try {
      await connectToDB();
      server = app.listen(port, err => {
        if (err) {
          console.log('something bad happened', err);
        } else {
          process.send = process.send || function () {};
          process.send('ready');
          console.log(`server is listening on ${port}`);
        }
      });
    } catch (error) {
      console.log('Mongo connection error', error);
    }
  })();
}

process.on('uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${reason}`);
  process.exit(1);
});

process.on('SIGTERM', () => closeServer(server, 'SIGTERM'));

process.on('SIGINT', () => closeServer(server, 'SIGINT'));

module.exports = { app, server };
