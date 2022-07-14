const express = require('express');
const account = require('./accountRoute');
const contract = require('./contractRoute');

const router = express.Router();

router.use('/account', account);
router.use('/contract', contract);

router.get('/', (req, res) => res.send('Sample Node API Version1'));
router.get('/health', (req, res) => {
  const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
  };
  res.send(JSON.stringify(healthcheck));
});

module.exports = router;