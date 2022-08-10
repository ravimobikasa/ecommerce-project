const { orderService } = require('../services')
const { Cart, OrderDetail, Products, User } = require('../models')
const stripe = require('stripe')(
  'sk_test_51LUnlrSApwaIyK3wlHrf3Guid5dTNw5TvPydH5r4mVwjkkkmlS25Uis6UCBImO3SWTuehzNdVXOClXDog22OuTPd002sqXHvdZ'
)

const createOrder = async (userId, data) => {
  try {
    const orderResult = await orderService.createOrder(userId, data)

    res.json({
      key: orderResult,
    })
  } catch (err) {
    console.log(err)
    res.json({
      message: err,
    })
  }
}

const stripeWebHook = async (request, response) => {
  const endpointSecret = 'whsec_a6fe774e9a4aaeeecac7290539aee531a74fc3a1b8175041bf0f6d5ff4c45890'

  const sig = request.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
  } catch (err) {
    console.log(err.message)
    response.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle the event
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

      console.log(JSON.stringify(sessionDetail))

      return response.json({
        userId: customer.metadata.userId,
        session,
        sessionDetail,
      })
      await orderService.createOrder(customer.metadata.userId, session, sessionDetail)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  response.send()
}

const createCheckout = async (req, res) => {
  const currency = 'inr'
  const countryISOCode = 'IN'
  const userId = req.user.id

  const user = await User.findByPk(userId)
  const customer = await stripe.customers.create({
    email: user.email,
    metadata: {
      userId: userId,
    },
  })

  const cartItems = await Cart.findAll({ where: { userId }, include: [Products] })

  const stripeLineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: currency,
        product_data: {
          name: item.Product.title,
          images: [item.Product.imageUrl],
          description: item.Product.descrption,
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
      allowed_countries: [countryISOCode],
    },
    expand: ['line_items'],
    customer: customer.id,
    success_url: `http://localhost:3000/`,
    cancel_url: `http://localhost:3000/login`,
  })

  res.redirect(303, session.url)
}

module.exports = {
  createOrder,
  createCheckout,
  stripeWebHook,
}
