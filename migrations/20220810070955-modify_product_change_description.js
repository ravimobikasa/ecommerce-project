'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('Products', 'descrption', 'description')
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
