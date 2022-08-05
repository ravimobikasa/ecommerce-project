'use strict';
const { DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db')

  class cartitem extends Model {
    static associate(models) {}
  }
  cart-item.init({
    cartId: {
      type:DataTypes.INTEGER,
    allowNull: false,
    },

    productId:{
      type: DataTypes.INTEGER,
    allowNull: false,
    },
    quantity: DataTypes.INTEGER
  },
    cartitem.associate = function(models) {
  cartitem.belongsTo(models.Cart);
  cartitem.belongsTo(models.products);
},
{
    sequelize,
    modelName: 'cart-item'
  }
  )

module.exports=cart-item
module.exports=cart
