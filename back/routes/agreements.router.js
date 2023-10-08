var express = require('express');
var router = express.Router();
const agreementController = require('../controllers/agreement.controller.js')

/* GET agreements listing. */
router.get('/', agreementController.getAllAgreements);

/* GET agreements by id listing. */
router.get('/:id', agreementController.getAgreementByAccount);

module.exports = router;
