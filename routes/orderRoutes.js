const router = require('express').Router()

const orderController = require('../controllers/orderController')
const verifySession = require('../middleware/verifySession')

// Protected to login user only
router.use(verifySession)
router.route('/myOrders').get(orderController.getMyOrders)
router.route('/').get(orderController.getAllOrders)
router.route('/checkout-session').get(orderController.createCheckoutSession)
router.route('/success').get(orderController.orderPaymentStatus)
router.route('/failure').get(orderController.orderPaymentStatus)

router.route('/:orderId').get(orderController.getOrder)

module.exports = router
