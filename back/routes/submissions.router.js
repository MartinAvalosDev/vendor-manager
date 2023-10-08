var express = require('express');
var router = express.Router();
const submissionController = require('../controllers/submissions.controller.js')

//GET requests
router.get('/', submissionController.getAllSubmissions);
router.get('/unpaid', submissionController.getUnpaidSubmissions);

//POST request
router.post('/:submission_id/pay', submissionController.paySubmissionById);

module.exports = router;