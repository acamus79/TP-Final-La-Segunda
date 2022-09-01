'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('types', [{
        description: 'Moto',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        description: 'Auto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Camioneta',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Camion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        description: 'Taxi/Remis',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('types', null, {});
  }
};
