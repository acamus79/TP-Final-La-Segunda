'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fleet extends Model {

    static associate(models) {

      Fleet.belongsToMany(models.Vehicle, {
        through: 'fleet_vehicle',
        as: 'vehicles',
        foreignKey: 'fleet_id'
      });
      
      Fleet.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "manager",
      });

    }
  }
  Fleet.init({

    name: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "El nombre de la Flota es requerido"
        },
        len: {
          args: [3, 50],
          msg: "El nombre de la Flota debe contener entre 3 a 50 letras"
        }
    }
  }

  }, {
    sequelize,
    modelName: 'Fleet',
    tableName: 'fleets'
  });
  return Fleet;
};
