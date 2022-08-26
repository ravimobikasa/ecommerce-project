const router = require('express').Router()

const orderController = require('../controllers/orderController')
const verifySession = require('../middleware/verifySession')
const { stripePaymentCheckoutPage } = require('../controllers/orderController')

// Protected to login user only
router.use(verifySession)
router.route('/').get(orderController.getMyOrders)
// router.route('/').get(orderController.getAllOrders)
router.route('/checkoutSession').get(orderController.checkoutSessionPage).post(orderController.createCheckoutSession)
router.route('/stripePaymentCheckout').get(orderController.stripePaymentCheckoutPage)
router.route('/success').get(orderController.orderPaymentStatus)
router.route('/failure').get(orderController.orderPaymentStatus)

// router.route('/:orderId').get(orderController.getOrder)
router.route('/:orderId').get(orderController.getMyOrder)

module.exports = router
