'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class Product extends Model {
  static associate(models) {
    // define association here
  }
}
Product.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Products',
  }
)
module.exports = Product
