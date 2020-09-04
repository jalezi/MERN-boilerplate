const utils = require('./utils');
const { terminateDbConnection, closeServer } = require('./terminate');

const {
  isNotNodeEnvTest,
  shouldConsoleLog,
  exitEvents,
  addListenersToProcess,
} = utils;

exports.isNotNodeEnvTest = isNotNodeEnvTest;
exports.shouldConsoleLog = shouldConsoleLog;
exports.exitEvents = exitEvents;
exports.addListenersToProcess = addListenersToProcess;

exports.terminateDbConnection = terminateDbConnection;
exports.closeServer = closeServer;
