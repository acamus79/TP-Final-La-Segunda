'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {

    static associate(models) {
      Type.hasOne(models.Vehicle, {
        foreignKey: 'typeId',
        as: 'vehicles'
      });
    }
  }
  Type.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'types'
  });
  return Type;
};