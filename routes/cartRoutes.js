const router = require('express').Router()
const cart = require('../controllers/cartController')
const verifySession = require('./../middleware/verifySession')

router.use(verifySession)

router.route('/').get(cart.getCartProducts).post(cart.addToCart).delete(cart.deleteCartItem)

module.exports = router
