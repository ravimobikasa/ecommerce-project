'use strict'

const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class OrderDetail extends Model {}

OrderDetail.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    stripeSessionId: {
      type: DataTypes.STRING,
    },
    paymentIntentId: {
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'FAILED', 'SHIPPED', 'DELIVERED'),
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
      allowNull: true,
    },
    shippingAddressLine2: {
      type: DataTypes.STRING,
    },
    shippingLandmark: {
      type: DataTypes.STRING,
    },
    shippingCity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingCountry: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shippingPincode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'OrderDetail',
  }
)
module.exports = OrderDetail
