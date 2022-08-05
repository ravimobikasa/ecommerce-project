const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')
const OrderItem = require('./orderItem')
const Product = require('./products')

/**
 * Relationship mapping.
 * */
const Cart = require('./cart')
const Products = require('./products')

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
