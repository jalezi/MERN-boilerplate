const mongoose = require('mongoose');

const isNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNodeEnvTest = isNodeEnvTest;

const abortOrExit = (code = 0, coredump = false) => () => {
  coredump ? process.abort() : process.exit(code);
};

const terminateDbConnection = () => async cb => {
  // boolean means [force], see in mongoose doc
  console.log('Terminating DB');
  await mongoose.connection.close(false, () => {
    console.log('MongoDb connection closed.');
    cb ? cb() : null;
  });
};

const logExitEvents = {
  SIGTERM: () =>
    console.log(`Process ${process.pid} received a SIGTERM signal`),
  SIGINT: () => console.log(`Process ${process.pid} has been interrupted`),
};

const logError = err => console.log(err.message, err.stack);

exports.terminateDbConnection = terminateDbConnection;

// based on https://blog.heroku.com/best-practices-nodejs-errors
const closeServer = (server, options = { coredump: false, timeout: 500 }) => {
  const { coredump, timeout } = options;

  // eslint-disable-next-line no-unused-vars
  return (code, reason) => async (err, promise) => {
    process.send('offline');

    // Log error information, use a proper logging library here :)
    err && err instanceof Error && logError(err);

    const closeDbConnection = terminateDbConnection();
    const exit = abortOrExit(code, coredump);
    const logExitEvent = logExitEvents[reason];

    // Attempt a graceful shutdown
    console.info(`${reason} signal received.`);
    logExitEvent && logExitEvent();
    console.log('Closing http server.');
    try {
      await server.close();
      console.log('Http server closed.');
      await closeDbConnection(exit);
    } catch (error) {
      console.log(error);
    }
    setTimeout(closeDbConnection, timeout).unref();
  };
};

exports.closeServer = closeServer;
