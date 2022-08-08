const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const multer = require('../utils/multer')

router.route('/product').post(multer.upload, productController.addProduct)
router.route('/products').get(productController.allProducts)
router.route('/product/:id').get(productController.getProduct).put(productController.updateProduct)

module.exports = router
