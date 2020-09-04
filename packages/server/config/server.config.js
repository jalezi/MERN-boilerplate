const connectToDB = require('./mongoose.config');
const { port, exitHandlerOptions } = require('.');
const { addListenersToProcess, closeServer } = require('../utils');

const { isNotNodeEnvTest } = require('../utils');
const shouldConsoleLog = isNotNodeEnvTest();

const appListenCallback = (port = 3000) => err => {
  if (err) {
    shouldConsoleLog && console.log('something bad happened', err);
    return Promise.reject(
      new Error('Something went wrong in appListenCallback ')
    );
  } else {
    process.send = process.send || function () {};
    process.send && process.send('online');
    shouldConsoleLog && console.log(`Server is listening on ${port}`);
  }
};

exports.appListenCallback = appListenCallback;

const createHttpServer = async (app, port = 3000) => {
  let cb;
  const isPortNotNumber = typeof port !== 'number';
  if (isPortNotNumber) {
    return Promise.reject(new Error('Port is not a number'));
  }

  cb = appListenCallback(port);

  return app.listen(port, cb);
};

exports.createHttpServer = createHttpServer;

const appInit = () => async app => {
  let server;
  try {
    await connectToDB();
    server = await createHttpServer(app, port);
    const exitHandler = closeServer(server, exitHandlerOptions);
    addListenersToProcess(exitHandler);
    if (server instanceof Error) {
      console.log(server);
    }
    return server;
  } catch (err) {
    shouldConsoleLog && console.log(err);
    return Promise.reject(
      new Error('Something went wrong during app initialization')
    );
  }
};

exports.appInit = appInit;
