'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING
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
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      typeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "type_vehicles",
          key: "id"
        },
        onDelete: 'CASCADE'
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
    return queryInterface.dropTable('vehicles');
  }
};
