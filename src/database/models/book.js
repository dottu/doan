'use strict';

const { bookcart } = require("../../config/constant");

module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    loaibookId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    masp: {
      allowNull: false,
      type: DataTypes.STRING
    },
    image: {
      allowNull: false,
      type:DataTypes.STRING
    },
    title: {
      allowNull: false,
      type:DataTypes.STRING},
    status: {
      type: DataTypes.ENUM("publish", "review", "unpublish"),
      defaultValue: 'publish'
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING
    },
    cost: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    // saleId: {
    //   allowNull: false,
    //   type: DataTypes.STRING
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
  books.associate = function(models) {
    // associations can be defined here
    books.hasMany(models.bookcarts,{forginkey : 'bookId'})
    books.hasMany(models.bills,{forginkey: 'bookId'})
    // books.hasMany(models.booksales, {forginkey: 'bookId'})
    books.hasMany(models.sales, {forginkey: 'bookId'})
    // books.belongsTo(models.carts)
    // books.belongsToMany(models.carts,{through: bookcart})
  };
  return books;
};