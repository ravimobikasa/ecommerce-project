'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class Products extends Model {
  static associate(models) {
    // define association here
  }
}
Products.init(
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
    descrption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Products',
  }
)
module.exports = Products
