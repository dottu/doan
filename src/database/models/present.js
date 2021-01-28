'use strict';
module.exports = (sequelize, DataTypes) => {
  const present = sequelize.define('present', {
    bookId: DataTypes.INTEGER,
    makmId: DataTypes.INTEGER
  }, {});
  present.associate = function(models) {
    // associations can be defined here
  };
  return present;
};