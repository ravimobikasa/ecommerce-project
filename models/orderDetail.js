'use strict'

const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class OrderDetail extends Model {}

OrderDetail.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'SHIPPED', 'DELIVERED'),
      defaultValue: 'PENDING',
    },
    userFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userMobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingAddressLine2: {
      type: DataTypes.STRING,
    },
    shippingLandmark: {
      type: DataTypes.STRING,
    },
    shippingCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingCountry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingPincode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'OrderDetail',
  }
)
module.exports = OrderDetail
