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
      
    }
  }
  Fleet.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fleet',
    tableName: 'fleets'
  });
  return Fleet;
};
