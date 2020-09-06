const mongoose = require('mongoose');

const DB_CONNECTION_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

// eslint-disable-next-line no-unused-vars
const healthcheckController = async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    const dbConnectiouStatus = mongoose.connection.readyState;
    healthcheck.dbConnectionStatus = dbConnectiouStatus;
    if (healthcheck.dbConnectionStatus !== 1) {
      const state = DB_CONNECTION_STATES[dbConnectiouStatus];
      throw new Error(`DB not connected. DB connection state is: ${state}`);
    }
    res.send(healthcheck);
  } catch (err) {
    healthcheck.errorCode = err.code || 'no code';
    healthcheck.errorName = err.name;
    healthcheck.message = err.message;
    res.status(503).send(healthcheck);
  }
};

exports.healthcheckController = healthcheckController;
