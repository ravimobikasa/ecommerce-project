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

//Add product
router.post(
  '/',
  multerWrapper(multer.upload.single('myImage')),
  validate(productValidation.addProduct),
  productController.addProduct
)

// Get product Detail
router.get('/:id', validate(productValidation.getProduct), productController.getProduct)

// update product
router.post(
  '/:id',
  multerWrapper(multer.upload.single('myImage')),
  validate(productValidation.updateProduct),
  productController.updateProduct
)

router.get('/updateProduct/:id', productController.updateProductPage)

//delete a product
router.delete('/:id', productController.deleteProduct)

module.exports = router
