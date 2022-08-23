'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class ResetToken extends Model {
  static associate(models) {
    // define association here
  }
}

ResetToken.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
)
module.exports = ResetToken
