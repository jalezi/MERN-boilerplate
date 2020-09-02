const { connectToDB, exitHandlerOptions } = require('.');
const { createHttpServer } = require('../server');
const { addListenersToProcess, closeServer } = require('../utils');

const port = 4000; // port must match proxy settings in client package.json

const appInit = () => async app => {
  let server;
  try {
    await connectToDB();
    server = await createHttpServer(app, port);
    const exitHandler = closeServer(server, exitHandlerOptions);
    addListenersToProcess(exitHandler);
  } catch (err) {
    console.log('Mongo or Server connection error', err);
    return new Error(err.msg);
  }
  return server;
};

module.exports = appInit();
