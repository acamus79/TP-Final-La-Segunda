'use strict';


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('vehicles', [{
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019,
      insurance: 'La Segunda',
      service: new Date(),
      tag: 'AD123KJ',
      createdAt: new Date(),
      updatedAt: new Date(),
      type_id: 2,
      user_id: 1
    },
    {
      brand: 'Honda',
      model: 'XR250',
      year: 2013,
      insurance: 'La Segunda',
      service: new Date(),
      tag: 'CD138JD',
      createdAt: new Date(),
      updatedAt: new Date(),
      type_id: 1,
      user_id: 1
    },
    {
      brand: 'Fiat',
      model: 'Uno',
      year: 2015,
      insurance: 'La Segunda',
      service: new Date(),
      tag: 'OMZ1234',
      createdAt: new Date(),
      updatedAt: new Date(),
      type_id: 2,
      user_id: 2
    },
    {
      brand: 'Yamaha',
      model: 'R1',
      year: 2018,
      insurance: 'La Segunda',
      createdAt: new Date(),
      updatedAt: new Date(),
      service: new Date(),
      tag: 'AC123LK',
      type_id: 1,
      user_id: 3
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('vehicles', null, {});

  }
};
