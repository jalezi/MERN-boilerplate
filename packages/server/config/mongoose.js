const mongoose = require('mongoose');
const { dbUri, dbUriTest, dbOptions } = require('.');
const { isNodeEnvTest } = require('../utils');

const env = process.env.NODE_ENV;
const dbURI = env !== 'test' ? dbUri : dbUriTest;
const shouldConsoleLog = isNodeEnvTest();

mongoose.connection.on('connecting', () => {
  shouldConsoleLog && console.log('DB Connection Establishing');
});

mongoose.connection.on('connected', () => {
  shouldConsoleLog && console.log('DB Connection Established');
});

mongoose.connection.on('reconnected', () => {
  shouldConsoleLog && console.log('DB Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  shouldConsoleLog && console.log('DB Connection Disconnected');
});

mongoose.connection.on('close', () => {
  shouldConsoleLog && console.log('DB Connection Closed');
});

mongoose.connection.on('error', error => {
  shouldConsoleLog && console.log('ERROR: ' + error);
});

module.exports = async (object = { url: dbURI, options: dbOptions }) => {
  const { url, options } = object;
  try {
    await mongoose.connect(url, options);
  } catch (err) {
    shouldConsoleLog && console.log('error: ' + err);
  }
};
