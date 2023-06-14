const express = require('express');
const { getAllCharByDate, getPatientCharByDateInterval } = require('../utils/fsUtils');
const { validateDisease, validateName, validateDate, validateDateInterval } = require('../middlewares/index');


const router = express.Router();

router.get('/date/date=:date', validateDate, async (req, res) => {
  const allCharByDate = await getAllCharByDate(req.params.date)

  if (allCharByDate.length === 0) return res.status(404).send({message: 'Specified Dates Not Found'})
  return res.status(200).json({allCharByDate})
})

router.get('/date/name=:name/disease=:disease/initial_date=:initial_date/final_date=:final_date', validateName, validateDisease, validateDateInterval, async (req, res) => {

  const patientCharByDateInterval = await getPatientCharByDateInterval(req.params);

  if (patientCharByDateInterval?.length === 0) return res.status(404).send({message: 'Date Range that does Not Exist in the Database.'})

  return res.status(200).json({patientCharByDateInterval})
})

module.exports = router;
