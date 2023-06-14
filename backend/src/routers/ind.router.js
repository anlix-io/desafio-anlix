const express = require('express');
const { getLatestCharByPatientAndIndAndDisease } = require('../utils/fsUtils');
const { validateDisease, validateName } = require('../middlewares/index');

const router = express.Router();

router.get('/ind/:name/:disease/:initial_ind/:final_ind', validateName, validateDisease, async (req, res) => {

  const latestCharEqualToSpecifiedIndAndDisease = await getLatestCharByPatientAndIndAndDisease(req.params);

  if (latestCharEqualToSpecifiedIndAndDisease?.length === 0) return res.status(404).send({message: 'Specified Index Not Found'})

  return res.status(200).json({latestCharEqualToSpecifiedIndAndDisease})
})

module.exports = router;
