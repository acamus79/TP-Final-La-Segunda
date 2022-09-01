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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "El rol es requerido"
        },
        len: {
          args: [3, 50],
          msg: "El rol debe contener entre 3 a 50 caracteres"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles'
  });
  return Role;
};
