const mongoose = require('mongoose');
const { dbUri, dbUriTest, dbOptions } = require('.');

const env = process.env.NODE_ENV;
const dbURI = env !== 'test' ? dbUri : dbUriTest;

mongoose.connection.on('connecting', () => {
  console.log('Connection Establishing');
});

mongoose.connection.on('connected', () => {
  console.log('Connection Established');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed');
});

mongoose.connection.on('error', error => {
  console.log('ERROR: ' + error);
});

module.exports = async () => {
  try {
    await mongoose.connect(dbURI, dbOptions);
  } catch (err) {
    console.log('error: ' + err);
  }
};
