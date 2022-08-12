const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/images/products',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

function checkFileType(req, file, cb) {
  if (!file.originalname.match(/jpeg|jpg|png|gif/)) {
    // upload only png and jpg format
    req.errors = 'please upload valid image'
  }
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage,

  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(req, file, cb)
  },
})
// .single('myImage')
module.exports = {
  upload,
}
