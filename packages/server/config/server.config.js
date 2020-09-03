const connectToDB = require('./mongoose.config');
const { port, exitHandlerOptions } = require('.');
const { addListenersToProcess, closeServer } = require('../utils');

const { isNotNodeEnvTest } = require('../utils');
const shouldConsoleLog = isNotNodeEnvTest();

const appListenCallback = (port = 3000) => err => {
  if (err) {
    shouldConsoleLog && console.log('something bad happened', err);
    throw new Error(err.message);
  } else {
    process.send = process.send || function () {};
    process.send && process.send('online');
    shouldConsoleLog && console.log(`Server is listening on ${port}`);
  }
};

exports.appListenCallback = appListenCallback;

const createHttpServer = async (app, port = 3000) => {
  let cb;
  try {
    const isPortNotNumber = typeof port !== 'number';
    if (isPortNotNumber) {
      throw new Error('Port is not a number');
    }
    cb = appListenCallback(port);
  } catch (err) {
    throw new Error(err.message);
  }

  let server;
  try {
    server = app.listen(port, cb);
    return server;
  } catch (err) {
    console.log(err.message);
    // throw new Error(err.message);
    return new Error(err.message);
  }
};

exports.createHttpServer = createHttpServer;

const appInit = () => async app => {
  let server;
  try {
    await connectToDB();
    server = await createHttpServer(app, port);
    const exitHandler = closeServer(server, exitHandlerOptions);
    addListenersToProcess(exitHandler);
  } catch (err) {
    console.log('Mongo or Server connection error', err);
    throw new Error(err.msg);
  }
  return server;
};

exports.appInit = appInit;
