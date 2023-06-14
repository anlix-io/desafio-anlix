const express = require('express');
const { getPatientsByName, getPatientByNameAndDisease, getPatientAndDiseases, getAllCharByDate } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

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

const validateDate = (req, res, next) => {

    const paramDate = req.params.date
    
    const paramDay = paramDate.slice(0,2)
    const paramMonth = paramDate.slice(2,4)
    const paramYear = paramDate.slice(4)

    if (Number(paramDay+paramMonth+paramYear) * 0 === 0) {
      return next()
    }
    return res.status(404).send({message: 'Invalid Date Format'})
}

app.get('/patient/:name', validateName, (req, res) => {
  const result = getPatientsByName(req.params.name)

return res.status(200).json({result})
});

app.get('/patient/:name/:disease', validateName, validateDisease, async (req, res) => {
  const { name, disease } = req.params;

  const mostRecentCharacteristic = await getPatientByNameAndDisease(name.toLowerCase(), disease.toLowerCase())
  
  return res.status(200).json({mostRecentCharacteristic})
})

app.get('/patient/:name/diseases/info', validateName, async (req, res) => {
  const { name } = req.params;

  const latestPatientInformations = await getPatientAndDiseases(name.toLowerCase())
  
  return res.status(200).json({latestPatientInformations})
})

app.get('/date/:date', validateDate, async (req, res) => {
  const allCharByDate = await getAllCharByDate(req.params.date)

  if (allCharByDate.length === 0) return res.status(404).send({message: 'Specified Date Not Found'})
  return res.status(200).json({allCharByDate})

})


module.exports = app;