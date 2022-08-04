<<<<<<< HEAD
const User = require('./user')
const Address = require('./address')
const Products = require('./products')

module.exports = {
  User,
  Address,
  Products,
}
=======
const User = require('./user')
const Address = require('./address')
const OrderDetail = require('./orderDetail')

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
}
>>>>>>> b496be9f4ebbc1171d60c9341ad2e87aa0957a8d
