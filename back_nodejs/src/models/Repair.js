'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Repair extends Model {

      static associate(models) {

        Repair.belongsToMany(models.Vehicle, {
          through: 'repair_vehicle',
          as: 'vehicles',
          foreignKey: 'repair_id'
        });

      }
    }
    Repair.init({

        description: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notNull: {
              msg: "La descripcion de la Reparacion es requerida"
            },
            len: {
              args: [5, 255],
              msg: "La descripcion de la Reparacion debe contener entre 3 a 255 caracteres"
            }
          }
        }
        },{
          sequelize,
          modelName: 'Repair',
          tableName: 'repairs'
        });
      return Repair;
    };
