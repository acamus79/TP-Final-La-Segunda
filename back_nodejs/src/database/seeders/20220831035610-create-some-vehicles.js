'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [{
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
      insurance: 'La segunda',
      service: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      type_id: 2,
      user_id: 1
    },
    {
      brand: 'Honda',
      model: 'XR250',
      year: 2013,
      insurance: 'La segunda',
      service: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      type_id: 1,
      user_id: 1
    },
    {
      brand: 'Fiat',
      model: 'Uno',
      year: 2015,
      insurance: 'La segunda',
      createdAt: new Date(),
      updatedAt: new Date(),
      service: new Date(),
      type_id: 2,
      user_id: 2
    },
    {
      brand: 'Yamaha',
      model: 'R1',
      year: 2018,
      insurance: 'La segunda',
      createdAt: new Date(),
      updatedAt: new Date(),
      service: new Date(),
      type_id: 1,
      user_id: 3
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {});

  }
};
