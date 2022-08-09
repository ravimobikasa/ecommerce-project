const { MulterError } = require('multer')
const multerErrorWrapper = (multer) => (req, res, next) => {
  multer(req, res, (err) => {
    if (err instanceof MulterError) {
      req.errors = 'Please enter valid file'
    } else if (err) {
      req.errors = err
    }

    next()
  })
}
module.exports = multerErrorWrapper
