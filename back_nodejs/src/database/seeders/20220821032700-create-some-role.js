'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {

    //Se crean Roles
    await queryInterface.bulkInsert('roles', [{
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'manager',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
