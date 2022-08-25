'use strict'
const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class StripeCustomer extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}

StripeCustomer.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
  }
)

module.exports = StripeCustomer
