const express = require('express');
const { getPatientsByName, getPatientsByNameAndDisease } = require('./utils/fsUtils');

const app = express();

const validateName = (req, res, next) => {
  const result = getPatientsByName(req.params.name)

  if (!result.length) {
    return res.status(404).send({message: 'Patient Not Found'});
  }
  return next();
}

const validateDisease = (req, res, next) => {
  const disease = req.params.disease.toLowerCase();

  if (disease === 'cardiaco' || disease === 'pulmonar') {
    return next();
  }
  return res.status(404).send({message: 'Disease Not Found'});
}

app.get('/patient/:name', validateName, (req, res) => {
  const result = getPatientsByName(req.params.name)

return res.status(200).json({result})
});

app.get('/patient/:name/:disease', validateName, validateDisease, (req, res) => {
  const { name, disease } = req.params;

  const result = getPatientsByNameAndDisease(name.toLowerCase(), disease.toLowerCase())

})


module.exports = app;