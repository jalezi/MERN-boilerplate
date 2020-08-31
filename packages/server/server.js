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
          console.log(`Server is listening on ${port}`);
        }
      });
      const exitHandler = closeServer(server, {
        coredump: false,
        timeout: 500,
      });

      process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
      process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
      process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
      process.on('SIGINT', exitHandler(0, 'SIGINT'));
    } catch (error) {
      console.log('Mongo connection error', error);
    }
  })();
}

module.exports = { app };
