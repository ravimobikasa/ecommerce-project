const { REQUEST_TIMEOUT } = require('http-status-codes')

const fileCheck = (req, res, next) => {
  console.log(req.file)

  next()
}

module.exports = fileCheck
