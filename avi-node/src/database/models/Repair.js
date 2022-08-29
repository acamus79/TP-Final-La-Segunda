'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Repair extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Repair.belongsTo(models.Vehicle, {
        foreignKey: 'idVehicle',
        target_key: 'id'
      });
    }
  }
  Repair.init({
    description: DataTypes.STRING,
    idVehicle: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Repair',
  });
  return Repair;
};
