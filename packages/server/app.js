const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const { appInit } = require('./config');
const { shouldConsoleLog } = require('./utils');

const app = express();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;

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

// temporary fake 500 internal server error
app.get('/api/error', (_req, _res, next) => {
  const err = new Error('This is fake error');
  next(err);
});
// temporary fake 501 internal server error
app.post('/api/error', (_req, _res) => {
  const err = new Error('This is fake throw error');
  err.status = 501;
  throw err;
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
  console.log(_req.status);
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error',
    },
  });
});

if (env !== 'test') {
  appInit()(app).catch(err => {
    shouldConsoleLog && console.log(err);
    const code = 1;
    shouldConsoleLog &&
      console.log(
        `Process pid ${process.pid} will be terminated with exit code: ${code}`
      );
    shouldConsoleLog && console.log('Closing DB connection');
    mongoose.connection.close().catch(err => {
      shouldConsoleLog &&
        console.log('Something went wrong during closing DB connection');
      shouldConsoleLog && console.log(err);
    });
    process.exit(code);
  });
}

module.exports = { app };
