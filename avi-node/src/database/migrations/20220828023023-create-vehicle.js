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
      idRepair: {
        type: Sequelize.INTEGER,
        references: {
          model: 'repairs',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      idType: {
        type: Sequelize.INTEGER,
        references: {
          model: 'types',
          key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
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
