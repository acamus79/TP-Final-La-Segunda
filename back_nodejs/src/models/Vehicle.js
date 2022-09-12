"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    
    static associate(models) {
      
      Vehicle.belongsTo(models.Type, {
        foreignKey: "type_id",
        as: "type",
      });

      Vehicle.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "owner",
      });

      Vehicle.belongsToMany(models.Repair, {
        as: "repairs",
        through: "repair_vehicle",
        foreignKey: "vehicle_id"
      });

      Vehicle.belongsToMany(models.Fleet, {
        as: "fleets",
        through: "fleet_vehicle",
        foreignKey: "vehicle_id"
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
          msg: "La marca debe tener dos letras como minimo",
        },
      },
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "El modelo debe tener tres letras como minimo",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "El seguro debe tener tres letras como minimo",
        }
      }
    },
    rto: DataTypes.DATEONLY,
    gnc: DataTypes.DATEONLY,
    service: DataTypes.DATEONLY,
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: "Vehicle",
    tableName: "vehicles",
  });
  return Vehicle;
};
