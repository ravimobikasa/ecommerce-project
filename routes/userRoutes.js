const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: 'public',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('myImage')

console.log(upload)
router.route('/product').post(
  multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  }).single('myImage'),
  (req, res) => {
    res.json(upload)
  }
)

// router.route('/login').post(validate(userValidation.login), userController.loginUser)

module.exports = router
