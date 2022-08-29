'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fleet = sequelize.define('Fleet', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'fleets'
  });
  Fleet.associate = function(models) {
    // associations can be defined here
  };
  return Fleet;
};
