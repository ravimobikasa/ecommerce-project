const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const productValidation = require('./../validations/productValidation')
const productController = require('../controllers/productController')
const multer = require('../utils/multer')
const verifySession = require('./../middleware/verifySession')

// Protected to login user only
router.use(verifySession)

// Get All product
router.get('/', productController.allProducts)

//Add product Page
router.get('/addProduct', productController.getAddProductPage)

// Post Add product
router.post('/', multer.upload.single('myImage'), validate(productValidation.addProduct), productController.addProduct)

// Get product Detail
router.get('/:id', productController.getProduct)

// update product
router.patch('/:id', productController.updateProduct)

//Search Api
router.get('/search', productController.searchProduct)

module.exports = router
