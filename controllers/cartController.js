const { Cart, Product } = require('../models')

const addToCart = async (req, res) => {
  const { id: userId } = req.user
  const { productId } = req.body

  const cart = await Cart.findOne({ where: { userId, productId } })

  if (!cart) {
    const newCart = await Cart.create({ userId, productId })
    return res.redirect('/cart')
  }

  const newCart = await cart.increment('quantity', { by: 1 })

  return res.redirect('/cart')
}

const getCartProducts = async (req, res) => {
  const { id: userId } = req.user
  const products = await Cart.findAll({ where: { userId }, include: [Product] })

  let totalItem = 0
  let totalPrice = 0

  products.forEach((item) => {
    totalItem += item.quantity
    totalPrice += item.Product.price * item.quantity
  })

  res.render('cart', { products: products, totalItem, totalPrice })
}

const deleteCartItem = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { productId } = req.body

    const cart = await Cart.findOne({ where: { userId, productId } })

    if (!cart) {
      return res.json({
        message: 'Product No longer exists',
      })
    }

    if (cart.quantity === 1) {
      await cart.destroy()
    } else {
      const newCart = await cart.decrement('quantity')
    }

    return res.redirect('/cart')
  } catch (err) {
    console.log('Error Logs')
    console.log(err)
  }
}
const removeCartProduct = async (req, res) => {
  try {
    const { id: userId } = req.user
    const { productId } = req.params

    const cart = await Cart.destroy({ where: { userId, productId } })

    return res.redirect('/cart')
  } catch (err) {
    console.log('error', err)
  }
}

module.exports = {
  addToCart,
  deleteCartItem,
  getCartProducts,
  removeCartProduct,
}
