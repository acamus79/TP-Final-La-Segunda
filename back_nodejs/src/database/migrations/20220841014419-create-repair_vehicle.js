'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('repair_vehicle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      repair_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'repairs',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      vehicle_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'vehicles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('repair_vehicle');

  }
};
