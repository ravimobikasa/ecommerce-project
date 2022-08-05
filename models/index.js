const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')
<<<<<<< HEAD
const OrderItem = require('./orderItem')
const Product = require('./products')

/**
 * Relationship mapping.
 * */
=======
const Cart = require('./cart')
const Products = require('./products')
>>>>>>> 483db6f72e78b3b9fcb65d6f3bf71c143f558b53

User.hasMany(OrderDetail)
User.hasMany(Address)

Address.belongsTo(User, {
  foreignKey: 'userId',
})

OrderDetail.belongsTo(User, {
  foreignKey: 'userId',
})
OrderDetail.hasMany(OrderItem)

OrderItem.belongsTo(OrderDetail, {
  foreignKey: 'orderId',
})

OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
})

module.exports = {
  User,
  Address,
  OrderDetail,
  Cart,
  Products,
}
