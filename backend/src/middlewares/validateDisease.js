const validateDisease = (req, res, next) => {
  const disease = req.params.disease.toLowerCase();

  if (disease === 'cardiaco' || disease === 'pulmonar') {
    return next();
  }
  return res.status(404).send({message: 'Disease Not Found'});
}

module.exports = validateDisease;