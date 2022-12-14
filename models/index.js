const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')
const OrderItem = require('./orderItem')
const Product = require('./product')
const ResetToken = require('./resetToken')

/**
 * Relationship mapping.
 * */
const Cart = require('./cart')

User.hasMany(OrderDetail, {
  foreignKey: 'userId',
})

User.hasMany(Address, {
  foreignKey: 'userId',
})

User.hasMany(Cart, {
  foreignKey: 'userId',
})

User.hasOne(ResetToken, {
  foreignKey: 'userId',
})

Product.hasMany(Cart, {
  foreignKey: 'productId',
})

Address.belongsTo(User, {
  foreignKey: 'userId',
})

OrderDetail.belongsTo(User, {
  foreignKey: 'userId',
})

OrderDetail.hasMany(OrderItem, {
  foreignKey: 'orderId',
})

OrderItem.belongsTo(OrderDetail, {
  foreignKey: 'orderId',
})

OrderItem.belongsTo(Product, {
  foreignKey: {
    name: 'productId',
    allowNull: true,
  },
  onDelete: 'SET NULL',
})

Cart.belongsTo(User, {
  foreignKey: 'userId',
})

Cart.belongsTo(Product, {
  foreignKey: 'productId',
})

ResetToken.belongsTo(ResetToken, {
  foreignKey: 'userId',
})

module.exports = {
  User,
  Address,
  OrderDetail,
  OrderItem,
  Cart,
  Product,
  ResetToken,
}
