const { orderService } = require('../services')
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u')

const createOrder = async (req, res) => {
  try {
    const { id: userId } = req.user

    const { address } = req.body

    const orderResult = await orderService.createOrder(userId, address)

    res.json({
      key : orderResult,
    })
  } catch (err) {
    console.log(err)
    res.json({
      message: err,
    })
  }
}

const createCheckout = async (req, res) => {
  const order = await stripe.orders.create({
    currency: 'usd',
    line_items: [
      {
        product_data: { id: 'trinket_club_hat', name: 'Trinket Club hat' },
        price_data: { unit_amount: 1000 },
        quantity: 3,
      },
    ],
    expand: ['line_items'],
  })
}

module.exports = {
  createOrder,
  createCheckout,
}
