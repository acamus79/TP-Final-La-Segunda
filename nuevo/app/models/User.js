'use strict';

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "El nombre solo puede contener letras"
        },
        len: {
          args: [3, 255],
          msg: "El nombre debe tener tres letras como minimo"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "El email tiene que ser un correo valido"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "La contraseña debe contener 6 caracteres como"
        }
      }
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "user"
    },
    resetToken: {
      type: DataTypes.STRING(1020),
      allowNull: true
    }
  }, {
    tableName: "users"
  });

  User.associate = function(models) {
    User.hasMany(models.Vehicle, {
      foreignKey: 'userId',
      as: 'vehicles'
    });
  };

  return User;
};
