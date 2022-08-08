const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const productValidation = require('./../validations/productValidation')
const productController = require('../controllers/productController')
const multer = require('../utils/multer')

router
  .route('/product')
  .post(multer.upload.single('myImage'), validate(productValidation.addProduct), productController.addProduct)
router.route('/products').get(productController.allProducts)
router.route('/product/:id').get(productController.getProduct).put(productController.updateProduct)
router.get('/search', productController.searchProduct)
router.route('/products').get((req, res) => {
  res.render('products')
})

router.route('/addProduct').get((req, res) => {
  res.render('addproducts')
})

router.route('/product').get((req, res) => {
  res.render('product')
})

module.exports = router
