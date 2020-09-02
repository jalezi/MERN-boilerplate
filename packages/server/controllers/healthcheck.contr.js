const mongoose = require('mongoose');

// eslint-disable-next-line no-unused-vars
const healthCheckController = async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  try {
    healthcheck.dbConnectionStatus = mongoose.connection.readyState;
    res.send(healthcheck);
  } catch (err) {
    healthcheck.message = err;
    res.status(503).send(healthcheck);
  }
};

exports.healthCheckController = healthCheckController;
