'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      User.associate = function (models) {

        //un Usuario tiene un Rol
        User.belongsTo(models.Role, {
          foreignKey: 'role',
          as: "role"
        });

        //un Usuario Puede tener muchos Vehiculos
        User.hasMany(models.Vehicle, {
          foreignKey: 'user_id',
          as: 'vehicles'
        });
        
      };
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isAlpha: {
          msg: "El nombre solo debe contener letras"
        },
        len: {
          args: [3, 50],
          msg: "El nombre debe contener entre 3 a 50 letras"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Email requerido"
        },
        isEmail: {
          msg: "Formato de email invalido"
        },
        len: {
          args: [5, 100],
          msg: "El correo puede contener hasta 100 caracteres maximo"
        }
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        isNumeric: {
          msg: "El telefono solo debe contener numeros"
        },
        len: {
          args: [5, 20],
          msg: "El telefono debe contener entre 5 a 20 numeros"
        }
      }
    },
    resetToken: {
      type: DataTypes.STRING(1020),
      allowNull: true
    },
    refreshToken: {
      type: DataTypes.STRING(1020),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: "users"
  });
  return User;
};
