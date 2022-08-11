const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class Cart extends Model {
  static associate(models) {
    // define association here
  }
}
Cart.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
  }
)

module.exports = Cart
