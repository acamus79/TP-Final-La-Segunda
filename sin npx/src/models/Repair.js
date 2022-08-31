'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {

    static associate(models) {
      // define association here
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
