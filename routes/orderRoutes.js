const router = require('express').Router()

const { createOrder } = require('../controllers/orderController')

router.route('/create').post(createOrder)

module.exports = router
