const { getPatientsByName } = require('../utils/fsUtils');

const validateName = (req, res, next) => {
  const result = getPatientsByName(req.params.name)

  if (!result.length) {
    return res.status(404).send({message: 'Patient Not Found'});
  }
  return next();
}

module.exports = validateName;