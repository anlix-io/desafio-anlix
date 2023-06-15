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

module.exports = validateDate;