const express = require('express');
const { getPatientsByName, getPatientByNameAndDisease, getPatientAndDiseases } = require('../utils/fsUtils');
const { validateDisease, validateName } = require('../middlewares/index');

const router = express.Router();

router.get('/patient/name=:name', validateName, (req, res) => {
  const result = getPatientsByName(req.params.name)

return res.status(200).json({result})
});

router.get('/patient/name=:name/disease=:disease', validateName, validateDisease, async (req, res) => {
  const { name, disease } = req.params;

  const mostRecentCharacteristic = await getPatientByNameAndDisease(name.toLowerCase(), disease.toLowerCase())
  
  return res.status(200).json({mostRecentCharacteristic})
})

router.get('/patient/name=:name/diseases/info', validateName, async (req, res) => {
  const { name } = req.params;

  const latestPatientInformations = await getPatientAndDiseases(name.toLowerCase())
  
  return res.status(200).json({latestPatientInformations})
})

module.exports = router;