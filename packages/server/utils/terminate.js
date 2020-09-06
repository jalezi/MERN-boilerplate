const mongoose = require('mongoose');
const { shouldConsoleLog } = require('.');

const abortOrExit = (code = 0, coredump = false) => () => {
  coredump ? process.abort() : process.exit(code);
};

const terminateDbConnection = () => async cb => {
  // boolean means [force], see in mongoose doc
  await mongoose.connection.close(false, () => {
    cb || cb();
  });
};

const logExitEvents = {
  unhandledRejection: () =>
    console.log(`Process ${process.pid} received a unhandledRejection signal`),
  uncaughtException: () =>
    console.log(`Process ${process.pid} received a uncaughtException signal`),
  SIGTERM: () =>
    console.log(`Process ${process.pid} received a SIGTERM signal`),
  SIGINT: () => console.log(`Process ${process.pid} received a SIGINT signal`),
  SIGQUIT: () =>
    console.log(`Process ${process.pid} received a SIGQUIT signal`),
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
    const logExitEvent = logExitEvents[reason];
    logExitEvent && logExitEvent();

    const closeDbConnection = terminateDbConnection();
    const exit = abortOrExit(code, coredump);

    // Attempt a graceful shutdown
    shouldConsoleLog && console.log('Closing HTTP Server.');
    try {
      await server.close();
      console.log('HTTP Server Closed.');
      await closeDbConnection(exit);
    } catch (err) {
      console.log(err);
    }

    setTimeout(closeDbConnection, timeout).unref();
  };
};

exports.closeServer = closeServer;
