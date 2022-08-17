const { MulterError } = require('multer')
const multerErrorWrapper = (multer) => (req, res, next) => {
  multer(req, res, (err) => {
    if (err instanceof MulterError) {
      if (err.code == 'LIMIT_FILE_SIZE') {
        req.errors = 'Please add file of size less than 2 MB '
      }
      if (err.code == 'LIMIT_UNEXPECTED_FILE') {
        req.errors = 'Please add single image .'
      }
    } else if (err) {
      req.errors = err
    }
    next()
  })
}

module.exports = multerErrorWrapper
