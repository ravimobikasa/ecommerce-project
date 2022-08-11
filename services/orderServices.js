const { OrderDetail, OrderItem, User, Cart, Product } = require('../models')
const UserService = require('../services/userServices')

const createOrder = async (userId, session, { data }) => {
  const userDetail = await User.findByPk(userId)

  const { firstName: userFirstName, lastName: userLastName, phoneNumber: userMobileNo } = userDetail

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

  let totalPrice = 0
  let totalQuantity = 0

  data.forEach((item) => {
    console.log(item.amount_total)
    totalPrice += item.amount_total
    totalQuantity += item.quantity

    productDetails.push({
      productId: parseInt(item.price.product.metadata.id),
      productPrice: item.price.unit_amount / 100,
      quantity: item.quantity,
      productTitle: item.price.product.name,
      productImage: item.price.product?.images[0] || '',
      productDescription: item.price.product.description,
    })
  })

  totalPrice /= 100

  const orderDetail = await OrderDetail.create({
    userId,
    totalQuantity,
    totalPrice,
    userFirstName,
    userLastName,
    userMobileNo,
    orderStatus: 'CONFIRMED',
    ...addressDetail,
  })

  const orderItemsResult = await createOrderItem(orderDetail.id, productDetails)

  return { orderDetail, orderItemsResult }
}

const createOrderItem = async (orderId, productDetails) => {
  const orderItems = productDetails.map((item) => {
    item.orderId = orderId
    return item
  })
  const result = await OrderItem.bulkCreate(orderItems)
  return result
}

module.exports = {
  createOrder,
}
