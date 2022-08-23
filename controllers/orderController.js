const { orderService } = require('../services')
const { Cart, OrderDetail, Product, User, OrderItem } = require('../models')
const stripe = require('../payment/stripe')
const { Op } = require('sequelize')

const stripeWebHook = async (req, res) => {
  const endpointSecret = process.env.END_POINT_SECRET

  const signature = req.headers['stripe-signature']
  try {
    // verifying  stripe payload with endpointSecret
    let event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const session = event.data.object
        await orderService.updateOrderPaymentStatus(session, 'CONFIRMED')
        break
      }

      case 'payment_intent.payment_failed': {
        const session = event.data.object
        console.log('payment_intent.payment_failed', session)
        await orderService.updateOrderPaymentStatus(session, 'FAILED')
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object
        const customer = await stripe.customers.retrieve(session.customer)

        await orderService.updateOrderBySession(session)

        // clearing the cart when order  success.
        await Cart.destroy({ where: { userId: customer.metadata.userId } })
      }

      // handling expired session when user has not made any payment until 24 hours.
      case 'checkout.session.expired': {
        const session = event.data.object
        const order = await OrderDetail.findOne({ where: { stripeSessionId: session.id } })

        if (order && order.orderStatus === 'PENDING') {
          await order.update({ orderStatus: 'FAILED' })
        }
        break
      }
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.send()
  } catch (err) {
    console.log(err)
    res.status(400).send(`Webhook Error: ${err?.message}`)
  }
}

const createCheckoutSession = async (req, res) => {
  const currency = 'inr'
  const allowedCountryISOCodes = ['IN']
  const userId = req.user.id
  try {
    const user = await User.findByPk(userId)
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId },
    })

    const { orderDetail, orderItemsResult } = await orderService.createOrder(userId)

    const stripeLineItems = orderItemsResult.map((item) => {
      return {
        price_data: {
          currency: currency,
          product_data: {
            name: item.productPrice,
            images: [item.productImage || ''],
            // description: item.productDescription || 'N/A',
            metadata: {
              id: item.productId,
              price: item.productPrice,
            },
          },
          unit_amount: item.productPrice * 100,
        },
        quantity: item.quantity,
      }
    })

    const successURL = `${req.protocol}://${req.get('host')}/order/success?session_id={CHECKOUT_SESSION_ID}&orderId=${
      orderDetail.id
    }&paymentStatus=SUCCESS`

    const cancelURL = `${req.protocol}://${req.get('host')}/order/failure?session_id={CHECKOUT_SESSION_ID}&orderId=${
      orderDetail.id
    }&paymentStatus=FAILED`

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

    await orderDetail.update({ stripeSessionId: session.id })

    res.redirect(303, session.url)
  } catch (err) {
    console.log(err)
    res.json({ error: err })
  }
}

const getAllOrders = async (req, res) => {
  let { limit, page, search } = req.query

  try {
    limit = parseInt(limit) || 12
    page = parseInt(page) || 1
    let _search = search || ''
    page = Math.abs(page)
    let offset = page * limit - limit
    let query
    let count
    if (!search) {
      query = {
        order: [['createdAt', 'DESC']],
        limit: Math.abs(limit),
        offset: offset,
      }
      count = await OrderDetail.count()
    }
    if (search) {
      query = {
        where: {
          [Op.or]: {
            userFirstName: {
              [Op.substring]: `${_search}`,
            },
            userLastName: {
              [Op.substring]: `${_search}`,
            },
            id: `${_search}`,
            orderStatus: `${_search}`,
          },
        },
        limit: Math.abs(limit),
        offset: offset,
        order: [['createdAt', 'DESC']],
      }
    }
    count = await OrderDetail.count({
      where: {
        [Op.or]: {
          userFirstName: {
            [Op.substring]: `${_search}`,
          },
          userLastName: {
            [Op.substring]: `${_search}`,
          },
          id: `${_search}`,
          orderStatus: `${_search}`,
        },
      },
    })

    const orders = await OrderDetail.findAll(query)
    res.render('orders', { orders, pagination: { count, limit, page, search } })
  } catch (err) {
    console.log(err)
    res.render('500error')
  }
}

const getOrder = async (req, res) => {
  const { orderId } = req.params

  const order = await OrderDetail.findByPk(orderId, {
    include: [OrderItem],
  })

  if (!order) {
    return res.render('404error', { errorMessage: `Order Not Found` })
  }
  res.render('orderDetail', { order })
}

const orderPaymentStatus = async (req, res) => {
  const { paymentStatus, session_id } = req.query

  let order = await OrderDetail.findOne({ where: { stripeSessionId: session_id }, include: [OrderItem] })

  if (!order) {
    return res.redirect('/cart')
  }

  let message

  if (paymentStatus.toLowerCase() === 'success') {
    message = 'Your order has been placed successfully'
  } else if (paymentStatus.toLowerCase() === 'failed') {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (order && session && session.status === 'open') {
      await stripe.checkout.sessions.expire(session_id)
      order = await order.update({ orderStatus: 'FAILED' })
    }
    message = 'Your order has been failed'
  }

  res.render('orderDetail', { order, message })
}

const getMyOrders = async (req, res) => {
  let { limit, page, search } = req.query

  try {
    const userId = req.user.id
    limit = parseInt(limit) || 12
    page = parseInt(page) || 1
    let _search = search || ''
    page = Math.abs(page)
    let offset = page * limit - limit
    let query
    let count
    if (!search) {
      query = {
        where: {
          userId,
        },
        limit: Math.abs(limit),
        offset: offset,
      }
      count = await OrderDetail.count({
        where: {
          userId,
        },
      })
    }
    if (search) {
      query = {
        where: {
          userId,
          [Op.or]: {
            id: `${_search}`,
            orderStatus: {
              [Op.substring]: `${_search}`,
            },
          },
        },
        limit: Math.abs(limit),
        offset: offset,
      }
    }
    count = await OrderDetail.count({
      where: {
        userId,
        [Op.or]: {
          id: {
            [Op.substring]: `${_search}`,
          },
          orderStatus: {
            [Op.substring]: `${_search}`,
          },
        },
      },
    })
    const orders = await OrderDetail.findAll(query)
    res.render('orders', { orders, origin: 'myOrder', pagination: { count, limit, page, search } })
  } catch (err) {
    res.render('500error')
  }
}

const getMyOrder = async (req, res) => {
  const { orderId } = req.params

  const userId = req.user.id

  const order = await OrderDetail.findOne({
    where: { id: orderId, userId },
    include: [OrderItem],
  })

  if (!order) {
    return res.render('404error', { errorMessage: `Order Not Found` })
  }
  res.render('orderDetail', { order })
}

// using stripe line items for storing the carts product details. Creating order after successful payment
const stripeWebHookOld = async (req, res) => {
  const endpointSecret = process.env.END_POINT_SECRET

  const signature = req.headers['stripe-signature']
  try {
    let event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret)
    console.log(`Unhandled event type ${event.type}`)

    switch (event.type) {
      case 'payment_intent.succeeded':
        const session = event.data.object
        await orderService.updateOrderPaymentStatus(session, 'CONFIRMED')
        break

      case 'checkout.session.completed': {
        const session = event.data.object

        const customer = await stripe.customers.retrieve(session.customer)

        const sessionDetail = await stripe.checkout.sessions.listLineItems(session.id, {
          expand: ['data.price.product'],
        })

        await orderService.createOrder(customer.metadata.userId, session, sessionDetail)

        await Cart.destroy({ where: { userId: customer.metadata.userId } })

        break
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object
        await orderService.updateOrderPaymentStatus(session, 'FAILED')
        break
      }
    }

    res.send()
  } catch (err) {
    console.log(err)
    res.status(400).send(`Webhook Error: ${err?.message}`)
  }
}

const createCheckoutSessionOld = async (req, res) => {
  const currency = 'inr'
  const allowedCountryISOCodes = ['IN']
  const userId = req.user.id

  const successURL = `${req.protocol}://${req.get(
    'host'
  )}/order/success?session_id={CHECKOUT_SESSION_ID}&paymentStatus=SUCCESS`
  const cancelURL = `${req.protocol}://${req.get(
    'host'
  )}/order/failure?session_id={CHECKOUT_SESSION_ID}&paymentStatus=FAILED`

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
            images: [item.Product.imageUrl || ''],
            description: item.Product.description || 'N/A',
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

module.exports = {
  createCheckoutSession,
  stripeWebHook,
  getAllOrders,
  getOrder,
  orderPaymentStatus,
  getMyOrders,
  getMyOrder,
}
