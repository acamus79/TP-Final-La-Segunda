'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      queryInterface.bulkInsert('fleets', [{
          name: 'Flota 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Flota 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}),

      queryInterface.bulkInsert('vehicle_fleet', [{
          vehicle_id: 1,
          fleet_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          vehicle_id: 2,
          fleet_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {})

    ]);
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('fleets', null, {});

  }
};
