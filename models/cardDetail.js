const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class CardDetail extends Model {
  static associate(models) {
    // define association here
  }
}

CardDetail.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardLastFour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardExpiry: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardType: {
      type: DataTypes.STRING,
    },
    paymentMethodId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardFingerPrint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
  }
)

module.exports = CardDetail
