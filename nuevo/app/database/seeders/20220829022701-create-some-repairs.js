'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return Promise.all([

      queryInterface.bulkInsert('repairs', [{
          description: 'Cambio de Homocinetica derecha',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          description: 'Bomba de agua',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}),

      queryInterface.bulkInsert('vehicle_repair', [{
          vehicle_id: 3,
          repair_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          vehicle_id: 3,
          repair_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },

      ], {})

    ]);


  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('repairs', null, {});

  }
};
