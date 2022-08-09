const router = require('express').Router()

const { createOrder } = require('../controllers/orderController')
const verifySession = require('../middleware/verifySession')

// Protected to login user only
router.use(verifySession)
router.route('/create').all(createOrder)

module.exports = router
