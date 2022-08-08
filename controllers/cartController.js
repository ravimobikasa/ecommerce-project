const { Cart } = require('../models')

const addToCart = async (req, res) => {
  const { productId } = req.params

  console.log('cart', productId)

  const userId = 10

  const result = await Cart.create({ userId, productId })

  console.log('cart,', result)
}

const removeProductFromCart = async (req, res) => {
  const { productId } = req.params

  const userId = req.sessions

  const result = await Cart.destroy({
    where: {
      userId,
      productId,
    },
  })

  console.log('cart,', result)
}

const getUserCart = async (req, res) => {
  const userId = 10

  const result = await Cart.findAll({
    where: {
      userId,
    },
  })

  console.log('cart,', result)
  res.json(result)
}

const increaseQuantity = async (req, res) => {
  const userId = req.sessions

  const result = await Cart.update(
    { quantity: sequelize.literal('quantity + 1') },
    {
      where: {
        userId,
        productId,
      },
    }
  )

  console.log('cart,', result)
}

const decreaseQuantity = async (req, res) => {
  const userId = req.sessions

  const result = await Cart.update(
    { quantity: sequelize.literal('quantity - 1') },
    {
      where: {
        userId,
        productId,
      },
    }
  )

  console.log('cart,', result)
}

module.exports = {
  addToCart,
  removeProductFromCart,
  getUserCart,
  increaseQuantity,
  decreaseQuantity,
}
