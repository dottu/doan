'use strict';
module.exports = (sequelize, DataTypes) => {
  const bills = sequelize.define('bills', {
    userId: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
    bookId: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
    soluongdat: {
      allowNull: false,
      type:DataTypes.INTEGER
    },
    addressId: {
      allowNull: false,
      type:DataTypes.INTEGER
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
  bills.associate = function(models) {
    // bills.hasMany(models.bill)
    // bills.hasMany(models.users)
    // bills.hasOne(models.carts,{forginkey: 'cartId'})
    // bills.hasMany(models.books, {forginkey : ' bookId'})
  };
  return bills;
};