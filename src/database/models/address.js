'use strict';
module.exports = (sequelize, DataTypes) => {
  const addresses = sequelize.define('addresses', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phonenumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    address:{
      allowNull: false,
      type:DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {});
  addresses.associate = function(models) {
    // associations can be defined here
    addresses.hasMany(models.bills, {forginkey: 'addressId'})
  };
  return addresses;
};