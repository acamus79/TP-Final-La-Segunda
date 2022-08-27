'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rto: {
        type: Sequelize.DATEONLY
      },
      gnc: {
        type: Sequelize.DATEONLY
      },
      insurance: {
        type: Sequelize.BOOLEAN
      },
      service: {
        type: Sequelize.DATEONLY
      },
      repairs: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('vehicles');
  }
};