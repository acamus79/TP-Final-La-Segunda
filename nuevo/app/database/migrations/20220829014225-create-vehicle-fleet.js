'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('vehicle_fleet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicle_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "vehicles",
          key: "id"
        }
      },
      fleet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "fleets",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }

    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('vehicle_fleet');

  }
};
