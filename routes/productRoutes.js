const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './public/images/products',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// }).single('myImage')

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

router.route('/product').post(
  multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  }).single('myImage'),
  productController.addProduct
)

module.exports = router
