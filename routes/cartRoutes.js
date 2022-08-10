const router = require('express').Router()
const cart = require('../controllers/cartController')
const verifySession = require('./../middleware/verifySession')

router.use(verifySession)

router.route('/').get(cart.getCartProducts).post(cart.addToCart).delete(cart.deleteCartItem)

router.post('/remove/:productId', cart.removeCartProduct)

module.exports = router
