exports.dbUri = 'mongodb://localhost:27017/mern';
exports.dbUriTest = 'mongodb://localhost:27017/mernTest';
exports.dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
exports.exitHandlerOptions = {
  coredump: false,
  timeout: 500,
};

exports.connectToDB = require('./mongoose.config');

exports.appInit = require('./server.config');
