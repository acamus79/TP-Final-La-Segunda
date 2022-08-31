'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {

    static associate(models) {
      Repair.belongsToMany(models.Vehicle, {through: 'repair_vehicle'});
    }
  }
  Repair.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Repair',
    tableName: 'repairs'
  });
  return Repair;
};



