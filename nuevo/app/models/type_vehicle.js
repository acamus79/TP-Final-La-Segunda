'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class type_vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      type_vehicle.hasMany(models.Vehicle, {
        foreignKey: 'type_vehicle_id'
      })
    }
  }
  type_vehicle.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'type_vehicle',
  });
  return type_vehicle;
};