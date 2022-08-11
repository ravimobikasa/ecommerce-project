const { MulterError } = require('multer')
const multerErrorWrapper = (multer) => (req, res, next) => {
  multer(req, res, (err) => {
    if (err instanceof MulterError) {
      req.errors = err.code
    } else if (err) {
      req.errors = err
    }
    next()
  })
}

module.exports = multerErrorWrapper
