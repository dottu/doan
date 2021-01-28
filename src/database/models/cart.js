'use strict';

const bookcart = require("./bookcart");

module.exports = (sequelize, DataTypes) => {
  const carts = sequelize.define('carts', {
    // userId: {
    //   allowNull: false,
    //   type:DataTypes.INTEGER
    // },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    // soluongdat: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  carts.associate = function(models) {
    // associations can be defined here
    // carts.hasMany(models.books,{forginkey : 'bookId'})
    // carts.hasOne(models.ships,{forginkey : 'shipId'})4
    // carts.belongToMany(models.books,{through: bookcart})
  };
  return carts;
};