'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [{
      brand: 'Uno',
      model: 'Fiat',
      year: 2015,
      insurance: 'La segunda',
      service: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      typeId: 18
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {});

  }
};
