const { OrderDetail, OrderItem, User, Cart, Products } = require('../models')
const UserService = require('../services/userServices')

const createOrder = async (userId, session, { data }) => {

  
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

  const address = session.shipping_details.address

  let addressDetail = {
    shippingAddressLine1: address.line1,
    shippingLandmark: '',
    shippingCountry: address.country,
    shippingState: address.state,
    shippingCity: address.city,
    shippingPincode: address.postal_code,
  }
  const productDetails = []

  let totalPrice,
    totalQuantity = 0

  data.forEach((item) => {
    totalPrice += item.price
    totalQuantity += item.quantity

    productDetails.push({
      productId: item.metadata.id,
      productPrice: item.metadata.price,
      quantity: item.quantity,
      productTitle: item.name.title,
      productImage: '',
      productDescription: item.description,
    })
  })

  const orderDetail = await OrderDetail.create({
    userId,
    totalQuantity,
    totalPrice,
    userFirstName,
    userLastName,
    userMobileNo,
    ...addressDetail,
  })

  const orderItemsResult = await createOrderItem(orderDetail.id, productDetails)

  return { orderDetail, orderItemsResult }
}

const updateOrderStatus = async (orderStatus) => {
  const orderDetail = await OrderDetail.update()
}

const createOrderItem = async (orderId, cartItems) => {
  const cartItemsPromises = cartItems.map((item) => {
    item.orderId = orderId
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
