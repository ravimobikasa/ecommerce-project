const { orderService } = require('../services')

const createOrder = async (req, res) => {
  try {
    const { id: userId } = req.user

    const { address, cart } = req.body

    const orderResult = await orderService.createOrder(userId, cart, address)

    res.json({
      orderResult,
    })
  } catch (err) {
    res.json({
      message: err,
    })
  }
}

module.exports = {
  createOrder,
}
