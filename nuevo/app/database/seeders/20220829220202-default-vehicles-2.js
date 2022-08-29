'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [
      {
      brand: 'Ferrari',
      model: '450',
      rto: new Date(),
      insurance: true,
      userId: 1,
      type_vehicle_id: 2

    }
  ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
