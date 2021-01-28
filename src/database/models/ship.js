'use strict';
module.exports = (sequelize, DataTypes) => {
  const ships = sequelize.define('ships', {
    nameship: {
      allowNull: false,
      type: DataTypes.STRING
    },
    costship: {
      allowNull:false,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  ships.associate = function(models) {
    // associations can be defined here
    // ships.hasOne(models.carts)
    // ships.belongsTo(models.carts)
    // ships.hasMany(models.bookcarts,{forginkey : 'shipId'})
  };
  return ships;
};