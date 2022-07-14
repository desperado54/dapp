const express = require('express');
const router = express.Router({ mergeParams: true });
const contract = require('../controllers/tokenController');

router.route('/events')
    .get(contract.getEvents);

module.exports = router;