const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const productValidation = require('./../validations/productValidation')
const productController = require('../controllers/productController')
const multer = require('../utils/multer')
const verifySession = require('./../middleware/verifySession')
const multerWrapper = require('../middleware/multerWrapper')
// Protected to login user only
router.use(verifySession)

// Get All product
router.get('/', productController.allProducts)

//Add product Page
router.get('/addProduct', productController.getAddProductPage)

// Post Add product
router.post(
  '/',
  multerWrapper(multer.upload.single('myImage')),
  validate(productValidation.addProduct),
  productController.addProduct
)

// Get product Detail
router.get('/:id', validate(productValidation.getProduct), productController.getProduct)

// update product
router.get('/updateProduct/:id', productController.updateProductPage)
router.patch('/:id', validate(productValidation.updateProduct), productController.updateProduct)

//delete a product
router.delete('/:id', productController.deleteProduct)

//Search Api
router.get('/search', productController.searchProduct)

module.exports = router
