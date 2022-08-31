'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      queryInterface.bulkInsert('type_vehicles', [{
        description: 'Moto',
        createdAt: new Date(),
        updatedAt: new Date()
      }, ], {}),
      queryInterface.bulkInsert('type_vehicles', [{
        description: 'Auto',
        createdAt: new Date(),
        updatedAt: new Date()
      }, ], {}),
      queryInterface.bulkInsert('type_vehicles', [{
        description: 'Camioneta',
        createdAt: new Date(),
        updatedAt: new Date()
      }, ], {}),
      queryInterface.bulkInsert('type_vehicles', [{
        description: 'Camion',
        createdAt: new Date(),
        updatedAt: new Date()
      }, ], {}),
      queryInterface.bulkInsert('type_vehicles', [{
        description: 'Taxi/Remis',
        createdAt: new Date(),
        updatedAt: new Date()
      }, ], {}),


    ]);


  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('type_vehicles', null, {});

  }
};
