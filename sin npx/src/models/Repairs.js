'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repairs extends Model {

    static associate(models) {
      // define association here
    }
  }
  Repairs.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Repairs',
    tableName: 'repairs'
  });
  return Repairs;
};
