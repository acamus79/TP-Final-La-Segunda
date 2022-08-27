'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vehicle.init({
    rto: DataTypes.DATEONLY,
    gnc: DataTypes.DATEONLY,
    insurance: DataTypes.BOOLEAN,
    service: DataTypes.DATEONLY,
    repairs: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};