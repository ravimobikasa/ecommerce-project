<<<<<<< HEAD
'use strict'
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/db')

class Product extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    const { OrderItem } = models
    Product.hasMany(OrderItem)
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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
)

module.exports = Product
=======
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
>>>>>>> 483db6f72e78b3b9fcb65d6f3bf71c143f558b53
