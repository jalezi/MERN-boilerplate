const express = require('express');
const { healthcheckController } = require('../controllers/healthcheck.contr');

const router = express.Router();

router.get('/', healthcheckController);

module.exports = router;
