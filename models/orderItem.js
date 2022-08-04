'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class OrderItem extends Model {
  static associate(models) {
    const { OrderDetail, Product } = models
    OrderItem.belongsTo(OrderDetail)
    OrderItem.belongsTo(Product)
  }
}

OrderItem.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    productTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImage: {
      type: DataTypes.STRING,
    },
    productDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'OrderItem',
  }
)
module.exports = OrderItem
