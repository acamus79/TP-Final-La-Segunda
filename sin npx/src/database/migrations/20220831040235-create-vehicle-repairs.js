'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('vehicle_repair', {
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
      repair_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "repairs",
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

  async down(queryInterface, Sequelize) {

    return queryInterface.dropTable('vehicle_repair');
  }
};
