'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {

    static associate(models) {
      Type.hasOne(models.Vehicle, {
        foreignKey: 'type_id',
        as: 'vehicles'
      });
    }
  }
  Type.init({

    description:{
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "La descripcion del Tipo es requerida"
        },
        len: {
          args: [3, 50],
          msg: "La descripcion del Tipo debe contener entre 3 a 50 letras"
        }
    } 
  }
  }, {
    sequelize,
    modelName: 'Type',
    tableName: 'types'
  });
  return Type;
};
