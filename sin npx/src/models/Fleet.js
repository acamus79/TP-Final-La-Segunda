'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fleet extends Model {

    static associate(models) {
      // define association here
    }
  }
  Fleet.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fleet',
  });
  return Fleet;
};
