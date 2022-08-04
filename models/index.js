const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')
const OrderItem = require('./orderItem')
const Product = require('./products')

/**
 * Relationship mapping.
 * */

User.associate({ Address, OrderDetail })
Address.associate({ User, OrderDetail })
OrderDetail.associate({ User })
OrderItem.associate({ OrderDetail, Product })

module.exports = {
  User,
  Address,
  OrderDetail,
}
