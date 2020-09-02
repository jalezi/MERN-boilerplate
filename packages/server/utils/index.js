const utils = require('./utils');

const { isNotNodeEnvTest } = utils;
const { terminateDbConnection, closeServer } = require('./terminate');

exports.isNotNodeEnvTest = isNotNodeEnvTest;
exports.terminateDbConnection = terminateDbConnection;
exports.closeServer = closeServer;
