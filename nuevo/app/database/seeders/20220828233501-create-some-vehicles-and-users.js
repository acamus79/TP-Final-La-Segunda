'use strict';

const {
  User,
  Vehicle
} = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');


module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      User.create({
        name: 'Admin',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('1234567', 10),
        role: 'admin',
        resetToken: null,
        vehicles: [{
            brand: 'Toyota',
            model: 'Corolla',
            rto: new Date(),
            gnc: new Date(),
            service: new Date()
          },
          {
            brand: 'Honda',
            model: 'XR250',
            rto: new Date(),
            gnc: null,
            service: new Date()
          }
        ]

      }, {
        include: "vehicles"
      }),

      User.create({
        name: 'User',
        email: 'user@mail.com',
        password: bcrypt.hashSync('1234567', 10),
        vehicles: [{
          brand: 'VW',
          model: 'Golf',
          rto: new Date(),
          gnc: new Date(),
          insurance: true,
          service: new Date()
        }]
      }, {
        include: "vehicles"
      }),
    ]);

  },


  down: (queryInterface, Sequelize) => {

    return Promise.all([

      queryInterface.bulkDelete('vehicles', null, {}),
      queryInterface.bulkDelete('users', null, {}),

    ]);

  }
};
