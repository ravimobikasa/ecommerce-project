const { orderService } = require('../services')
const { Cart, OrderDetail, Product, User, OrderItem } = require('../models')
const stripe = require('../payment/stripe')

const stripeWebHook = async (req, res) => {
  const endpointSecret = process.env.END_POINT_SECRET

  const signature = req.headers['stripe-signature']
  try {
    let event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)

    switch (event.type) {
      case 'payment_intent.succeeded':
        break

      case 'checkout.session.completed':
        const data = event.data.object
        const customer = await stripe.customers.retrieve(data.customer)
        const session = event.data.object

        const sessionDetail = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        })

        await orderService.createOrder(customer.metadata.userId, session, sessionDetail)

        await Cart.destroy({ where: { userId: customer.metadata.userId } })
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.send()
  } catch (err) {
    console.log(err?.message)
    res.status(400).send(`Webhook Error: ${err?.message}`)
  }
}

const createCheckoutSession = async (req, res) => {
  const currency = 'inr'
  const allowedCountryISOCodes = ['IN']
  const userId = req.user.id

  const successURL = `${req.protocol}://${req.get('host')}/order`
  const cancelURL = `${req.protocol}://${req.get('host')}/cart`

  try {
    const user = await User.findByPk(userId)

    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId },
    })

    const cartItems = await Cart.findAll({ where: { userId }, include: [Product] })

    const stripeLineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.Product.title,
            images: [item.Product.imageUrl],
            description: item.Product.description,
            metadata: {
              id: item.Product.id,
              price: item.Product.price,
            },
          },
          unit_amount: item.Product.price * 100,
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      currency: currency,
      line_items: stripeLineItems,
      shipping_address_collection: {
        allowed_countries: allowedCountryISOCodes,
      },
      expand: ['line_items'],
      customer: customer.id,
      success_url: successURL,
      cancel_url: cancelURL,
    })
    res.redirect(303, session.url)
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }
}

const getAllOrders = async (req, res) => {
  const orders = await OrderDetail.findAll({
    include: [OrderItem],
  })

  res.render('orders', { orders })
}

const getOrder = async (req, res) => {
  const { orderId } = req.params
  const order = await OrderDetail.findByPk(orderId, {
    include : [OrderItem]
  })

  if (!order) {
    return res.render('404error', { errorMessage: `Order Not Found` })
  }
  res.render('orderDetail', { order })
}

module.exports = {
  createCheckoutSession,
  stripeWebHook,
  getAllOrders,
  getOrder,
}
