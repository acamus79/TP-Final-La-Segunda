'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type_Vehicles = sequelize.define('Type_Vehicles', {

    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:{
          args: [3, 50],
          msg: 'La descripción debe tener entre 3 y 50 caracteres'
        }
      }
    }
  }, {
    tableName: 'type_vehicles',
  });
  Type_Vehicles.associate = function(models) {

    Type_Vehicles.hasOne(models.Vehicle, {
      foreignKey: 'typeId',
    });

  };
  return Type_Vehicles;
};
