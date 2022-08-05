const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')
const Cart=require('./cart')
const cartItem = require('./cart-item')


/**
 * Relationship mapping.
 * */

User.associate({ Address, OrderDetail })
Address.associate({ User, OrderDetail })
OrderDetail.associate({ User })

module.exports = {
  User,
  Address,
  OrderDetail,
  Cart,
  cartItem
}
