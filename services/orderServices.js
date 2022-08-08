const { OrderDetail, OrderItem, User, Cart, Product } = require('../models')
const UserService = require('../services/userServices')

const createOrder = async (userId = 1) => {
  const userDetail = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [Product],
      },
    ],
  })

  const { userFirstName, userLastName, userMobileNo, carts } = userDetail

  let totalPrice, totalQuantity = 0

  carts.forEach((item) => {
    totalQuantity += item.quantity
    totalPrice += item.totalPrice
  })

  let addressDetail = null

  if (address.addressId) {
    addressDetail = {}
  } else {
    addressDetail = address
  }

  const orderDetail = await OrderDetail.create({
    userId,
    totalQuantity,
    totalPrice,
    userFirstName,
    userLastName,
    userMobileNo,
    ...addressDetail,
  })

  const orderItemsResult = await createOrderItem(orderDetail.orderId, carts)

  return orderDetail
}

const updateOrderStatus = async (orderStatus) => {
  const orderDetail = await OrderDetail.update()
}

const createOrderItem = async (orderId, cartItems) => {
  let cartItemsPromises = []

  cartItems.forEach((item) => {
    const orderItem = OrderItem.create({
      orderId: orderId,
      productId: item.productId,
      productPrice: item.productPrice,
      quantity: item.quantity,
      productTitle: item.productTitle,
      productImage: item.productImage,
      productDescription: item.productDescription,
    })
    cartItemsPromises.push(orderItem)
  })

  return await Promise.all(cartItemsPromises)
}

module.exports = {
  createOrder,
  updateOrderStatus,
}
