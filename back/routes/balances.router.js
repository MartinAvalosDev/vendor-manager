var express = require('express');
var router = express.Router();
const balanceController = require('../controllers/balances.controller')

//POST request
router.post('/deposit/:accountId', balanceController.depositIntoBalance);

module.exports = router;