const { OrderDetail, OrderItem, User, Cart, Products } = require('../models')
const UserService = require('../services/userServices')

const createOrder = async (userId, address) => {
  const userDetail = await User.findByPk(userId, {
    include: [
      {
        model: Cart,
        include: [
          {
            model: Products,
          },
        ],
      },
    ],
  })

  const { firstName: userFirstName, lastName: userLastName, phoneNumber: userMobileNo, Carts } = userDetail

  let totalPrice = 0
  let totalQuantity = 0

  Carts.forEach((item) => {
    totalQuantity += item.quantity
    totalPrice += item.Product.price * item.quantity
  })

  let addressDetail = null

  if (address?.addressId) {
    addressDetail = {}
  } else {
    addressDetail = {
      shippingAddressLine1: 'test',
      shippingLandmark: 'test',
      shippingCountry: 'test',
      shippingState: 'test',
      shippingCity: 'test',
      shippingPincode: 110011,
    }
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

  const orderItemsResult = await createOrderItem(orderDetail.id, Carts)

  return { orderDetail, orderItemsResult }
}

const updateOrderStatus = async (orderStatus) => {
  const orderDetail = await OrderDetail.update()
}

const createOrderItem = async (orderId, cartItems) => {
  let cartItemsPromises = []

  cartItems.forEach((item) => {
    const orderItem = {
      orderId: orderId,
      productId: item.productId,
      productPrice: item.Product.price,
      quantity: item.quantity,
      productTitle: item.Product.title,
      productImage: item.Product.imageUrl,
      productDescription: item.descption,
    }

    cartItemsPromises.push(orderItem)
  })
  const result = await OrderItem.bulkCreate(cartItemsPromises)

  console.log(result)
  return result
}

// const createOrderItem = async (orderId, cartItems) => {

//   let cartItemsPromises = []

//   cartItems.forEach((item) => {

//     const orderItem = OrderItem.create({
//       orderId: orderId,
//       productId: item.productId,
//       productPrice: item.Product.price,
//       quantity: item.quantity,
//       productTitle: item.Product.title,
//       productImage: item.Product.imageUrl,
//       productDescription: item.descption,
//     })

//     cartItemsPromises.push(orderItem)
//   })

//   return await Promise.all(cartItemsPromises)
// }

module.exports = {
  createOrder,
  updateOrderStatus,
}
