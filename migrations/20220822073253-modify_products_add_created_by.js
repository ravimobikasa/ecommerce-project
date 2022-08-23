'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'createdBy', {
      type: Sequelize.TEXT,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'createdBy', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}
