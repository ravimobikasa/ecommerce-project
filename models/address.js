const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class Address extends Model {
  static associate(models) {
    const { User } = models
    Address.belongsTo(User)
  }
}

Address.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    line2: {
      type: DataTypes.STRING,
    },
    landmark: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
)

module.exports = Address
