'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {

    static associate(models) {

      Vehicle.belongsTo(models.Type, {
        foreignKey: 'typeId',
        as: 'type'
      });

      Vehicle.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'owner'
      });
    }
  }
  Vehicle.init({
    
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: "La marca debe tener dos letras como minimo"
        }
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "El modelo debe tener tres letras como minimo"
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rto: DataTypes.DATEONLY,
    gnc: DataTypes.DATEONLY,
    insurance: DataTypes.STRING,
    service: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Vehicle',
    tableName: "vehicles"
  });
  return Vehicle;
};
