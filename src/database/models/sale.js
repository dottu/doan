'use strict';
module.exports = (sequelize, DataTypes) => {
  const sale = sequelize.define('sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    bookId:{
      allowNull: false,
      type: DataTypes.INTEGER
    },
    // namesale: {
    //   allowNull: true,
    //   type: DataTypes.STRING
    // },
    sale: {
      allowNull: false,
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
  sale.associate = function(models) {
    // associations can be defined heres
    // sale.hasMany(models.books,{forginkey : 'bookId'})
  };
  return sale;
};