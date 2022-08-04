<<<<<<< HEAD
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class User extends Model {
  static associate(models) {}

  toJSON() {
    const user = this.get()
    delete user.password
    return user
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email Must be unique',
      },
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Phone Number Must be unique',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
  }
)

module.exports = User
=======
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class User extends Model {
  static associate(models) {
    const { OrderDetail, Address } = models
    User.hasMany(OrderDetail)
    User.hasMany(Address)
  }

  toJSON() {
    const user = this.get()
    delete user.password
    return user
  }
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email Must be unique',
      },
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Phone Number Must be unique',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
  }
)

module.exports = User
>>>>>>> b496be9f4ebbc1171d60c9341ad2e87aa0957a8d
