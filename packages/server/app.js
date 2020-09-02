const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const { createHttpServer } = require('./server');
const { connectToDB, exitHandlerOptions } = require('./config');
const { closeServer } = require('./utils');
const { addListenersToProcess } = require('./utils/utils');

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

app.get('/api', (_req, res) => {
  res.json({ status: 200, message: 'success' });
});

// app.js: register the route. In our case, we don't want authorization for this route
// add authorization middleware if needed
app.use('/healthcheck', require('./routes/healthcheck.routes'));

app.use((_req, _res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

let server;
if (env !== 'test') {
  (async () => {
    try {
      await connectToDB();
      server = await createHttpServer(app, port);
      const exitHandler = closeServer(server, exitHandlerOptions);
      addListenersToProcess(exitHandler);
    } catch (err) {
      console.log('Mongo or Server connection error', err);
    }
  })();
}

module.exports = { app };
