const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const productValidation = require('./../validations/productValidation')
const productController = require('../controllers/productController')
const multer = require('../utils/multer')

router.route('/product').post(multer.upload.single('myImage'), productController.addProduct)
router.route('/product').get(productController.allProducts)
router.route('/product/:id').get(productController.getProduct).put(productController.updateProduct)

router.route('/products').get((req, res) => {
  res.render('products')
})

router.route('/addProduct').get((req, res) => {
  res.render('addproducts')
})

module.exports = router
