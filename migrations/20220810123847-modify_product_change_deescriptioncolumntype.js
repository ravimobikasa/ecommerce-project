'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'description', {
      type: Sequelize.TEXT,
      allowNull: false,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Products', 'description', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },
}
