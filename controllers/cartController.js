const { Cart, Products } = require('../models')

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
  const products = await Cart.findAll({ where: { userId }, include: [Products] })

  res.render('cart', { products: products })
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

    const newCart = await cart.decrement('quantity')

    return res.json({
      cart: newCart,
    })
  } catch (err) {
    console.log('Error Logs')
    console.log(err)
  }
}

module.exports = {
  addToCart,
  deleteCartItem,
  getCartProducts,
}
