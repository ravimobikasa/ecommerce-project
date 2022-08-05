'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')
class Cart extends Model {
  static associate(models) {}
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
  Cart.associate = function(models) {
    Cart.hasMany(models.CartItem);
  },
  {
    sequelize,
  }
)
module.exports = Cart
