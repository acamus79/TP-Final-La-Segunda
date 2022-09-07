'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {

    //Se Crean Usuarios
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@mail.com',
      password: bcrypt.hashSync('1234567', 10),
      role: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'User',
      email: 'user@mail.com',
      password: bcrypt.hashSync('1234567', 10),
      role: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Manager',
      email: 'manager@mail.com',
      password: bcrypt.hashSync('1234567', 10),
      role: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
