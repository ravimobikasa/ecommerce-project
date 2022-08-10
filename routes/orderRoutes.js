const router = require('express').Router()

const { createOrder, createCheckout } = require('../controllers/orderController')
const verifySession = require('../middleware/verifySession')

// Protected to login user only
router.use(verifySession)
router.route('/create').all(createOrder)
router.route('/checkout-session').get(createCheckout)

module.exports = router
