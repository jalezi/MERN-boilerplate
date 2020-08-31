const utils = require('./utils');

const { isNodeEnvTest } = utils;
const { terminateDbConnection, closeServer } = require('./terminate');

exports.isNodeEnvTest = isNodeEnvTest;
exports.terminateDbConnection = terminateDbConnection;
exports.closeServer = closeServer;
