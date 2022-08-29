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
      Vehicle.belongsTo(models.type, {
        foreignKey: 'id',
        target_key: 'idType'
      });
      Vehicle.hasMany(models.repair, {
        foreignKey: 'idVehicle',
      });
    }
  }
  vehicle.init({
    rto: DataTypes.DATEONLY,
    gnc: DataTypes.DATEONLY,
    insurance: DataTypes.BOOLEAN,
    service: DataTypes.DATEONLY,
    idRepair: DataTypes.INTEGER,
    idType: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};
