const mongoose = require('mongoose');

const isNodeEnvTest = () => {
  return !(process.env.NODE_ENV === 'test');
};

exports.isNodeEnvTest = isNodeEnvTest;

const terminateDbConnection = async () => {
  console.log('Http server closed.');
  // boolean means [force], see in mongoose doc
  await mongoose.connection.close(false, () => {
    console.log('MongoDb connection closed.');
    process.exit(0);
  });
};

const exitEvents = {
  SIGTERM: () =>
    console.log(`Process ${process.pid} received a SIGTERM signal`),
  SIGINT: () => console.log(`Process ${process.pid} has been interrupted`),
};

exports.terminateDbConnection = terminateDbConnection;

const closeServer = (server, infoText) => {
  exitEvents[infoText]();
  console.info(`${infoText} signal received.`);
  console.log('Closing http server.');
  server.close(terminateDbConnection);
};

exports.closeServer = closeServer;
