'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepairVehicle extends Model {

    static associate(models) {
      
    }
  }
  RepairVehicle.init({
    
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    repairId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'RepairVehicle',
    tableName: 'repair_vehicle'
  });
  return RepairVehicle;
};
