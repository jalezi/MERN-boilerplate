exports.port = process.env.port || 4000; // port must match proxy settings in client package.json

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

const connectToDB = require('./mongoose.config');

const {
  createHttpServer,
  appInit,
  appListenCallback,
} = require('./server.config');

exports.connectToDB = connectToDB;

exports.appListenCallback = appListenCallback;

exports.createHttpServer = createHttpServer;

exports.appInit = appInit;
