const { MulterError } = require('multer')
const multerErrorWrapper = (multer) => (req, res, next) => {
  multer(req, res, (err) => {
    if (err instanceof MulterError) {
      req.errors = err.split(':')[1]
    } else if (err) {
      req.errors = err
    }

    next()
  })
}
module.exports = multerErrorWrapper
