const express = require('express');
const { healthCheckController } = require('../controllers/healthcheck.contr');

const router = express.Router();

router.get('/', healthCheckController);

module.exports = router;
