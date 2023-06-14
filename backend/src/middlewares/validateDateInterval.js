const validateDateInterval = (req, res, next) => {

  const {initial_date, final_date} = req.params
  
  const initDay = initial_date.slice(0,2)
  const initMonth = initial_date.slice(2,4)
  const initYear = initial_date.slice(4)

  const finalDay = final_date.slice(0,2)
  const finalMonth = final_date.slice(2,4)
  const finalYear = final_date.slice(4)

  if (Number(initDay+initMonth+initYear) * 0 === 0 && Number(finalDay+finalMonth+finalYear)) {
    return next()
  }
  return res.status(404).send({message: 'Invalid Date Format'})
}

module.exports = validateDateInterval;