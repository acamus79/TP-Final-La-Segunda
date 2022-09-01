'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {
      
      Role.hasOne(models.User, {
        foreignKey: 'role',
        as: 'users'
      });

    }
  }
  Role.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};
