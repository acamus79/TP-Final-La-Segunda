'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('type_vehicles', [
      {
      description: 'Moto',
    },
    {
      description: 'Auto',
    },
    {
      description: 'Camion',
    },
    {
      description: 'Taxi',
    },
  ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
