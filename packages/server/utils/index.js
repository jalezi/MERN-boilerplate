const utils = require('./utils');
const { terminateDbConnection, closeServer } = require('./terminate');

const { isNotNodeEnvTest, exitEvents, addListenersToProcess } = utils;

exports.isNotNodeEnvTest = isNotNodeEnvTest;
exports.exitEvents = exitEvents;
exports.addListenersToProcess = addListenersToProcess;

exports.terminateDbConnection = terminateDbConnection;
exports.closeServer = closeServer;
