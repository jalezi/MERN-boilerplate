const { isNotNodeEnvTest } = require('./utils');
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
  return app.listen(port, cb);
};

exports.createHttpServer = createHttpServer;
