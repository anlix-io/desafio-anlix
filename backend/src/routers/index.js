const express = require('express');

const router = express.Router();

const patientRouter = require('./patient.router')
const dateRouter = require('./date.router')
const indRouter = require('./ind.router')

router.use(patientRouter)
router.use(dateRouter)
router.use(indRouter)

module.exports = router;