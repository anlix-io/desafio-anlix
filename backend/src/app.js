const express = require('express');
const { getPatientsByName } = require('./utils/fsUtils');

const app = express();

app.get('/patient/:name', (req, res) => {
  const result = getPatientsByName(req.params.name)

  if (result.length) return res.status(200).json({result})
  res.status(404).send({message: 'Patient Not Found'});
});


module.exports = app;