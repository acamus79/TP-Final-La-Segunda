'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repairs = sequelize.define('Repairs', {

    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'repairs'
  });
  Repairs.associate = function(models) {
    // associations can be defined here
  };
  return Repairs;
};
