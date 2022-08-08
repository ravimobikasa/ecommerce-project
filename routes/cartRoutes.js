const router = require('express').Router()
const cart = require('../controllers/cartController')

router.route('/').get(cart.getCartProducts).post(cart.addToCart).delete(cart.deleteCartItem)

module.exports = router
