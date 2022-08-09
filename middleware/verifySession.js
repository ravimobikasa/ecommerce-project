const { REQUEST_TIMEOUT } = require('http-status-codes')

const verifySession = (req, res, next) => {
  if (!req.session || !req.session?.user?.id) {
    return res.redirect('/login')
  }

  req.user = req.session.user

  next()
}

module.exports = verifySession
