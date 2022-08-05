'use strict'
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('order_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      userFirstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userLastName: {
        type: Sequelize.STRING,
      },
      userMobileNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      shippingAddressLine1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingAddressLine2: {
        type: Sequelize.STRING,
      },
      shippingLandmark: {
        type: Sequelize.STRING,
      },
      shippingCity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingState: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingCountry: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      shippingPincode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      orderStatus: {
        type: Sequelize.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'SHIPPED', 'DELIVERED'),
        defaultValue: 'PENDING',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details')
  },
}
