'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // cartId : {
    //   allowNull:false,
    //   type: DataTypes.INTEGER
    // },
    // billId:{
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    // userId:{
    //   allowNull: false,
    //   type: DataTypes.INTEGER
    // },
    phonenumber: {
      allowNull: false,
      type :DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    confirmpassword: {
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
  users.associate = function(models) {
    // associations can be defined here
    // users.hasOne(models.carts)
    // users.hasMany(models.users)
  };
  return users;
};