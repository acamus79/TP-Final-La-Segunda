'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 255],
          msg: "La marca debe tener dos letras como minimo"
        }
      }
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 255],
          msg: "El modelo debe tener tres letras como minimo"
        }
      }
    },
    rto: DataTypes.DATEONLY,
    gnc: DataTypes.DATEONLY,
    insurance: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    service: DataTypes.DATEONLY
  }, {
    tableName: 'vehicles'
  });

  Vehicle.associate = function (models) {

    Vehicle.belongsTo(models.Type_vehicles, {
      foreignKey: 'typeId',
      as: 'type'
    });
    Vehicle.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner'
    });
    
  };
  return Vehicle;
};
