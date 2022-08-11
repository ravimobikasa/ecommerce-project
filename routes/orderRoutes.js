const router = require('express').Router()

const orderController = require('../controllers/orderController')
const verifySession = require('../middleware/verifySession')

// Protected to login user only
router.use(verifySession)
router.route('/').get(orderController.getAllOrders)
router.route('/checkout-session').get(orderController.createCheckoutSession)

module.exports = router
