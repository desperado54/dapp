const express = require('express');
const router = express.Router({ mergeParams: true });
const account = require('../controllers/tokenController');

router.route('/balance/:_id')
    .get(account.balanceOf);

router.route('/transfer')
    .post(account.transfer);

module.exports = router;