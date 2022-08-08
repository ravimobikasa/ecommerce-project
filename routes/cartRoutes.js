const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cartController')

// Routes

// router.route('/addToCart/:productId').post(cartController.addToCart)
router.get('/getUserCart', cartController.getUserCart)
router.post('/addToCart/:productId', cartController.addToCart)
router.post('/removeProductFromCart/:productId', cartController.removeProductFromCart)
router.post('/increaseQuantity/:productId', cartController.increaseQuantity)
router.post('/decreaseQuantity/:productId', cartController.decreaseQuantity)

module.exports = router
