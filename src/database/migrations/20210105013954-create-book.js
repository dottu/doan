'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loaibookId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      masp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("publish", "review", "unpublish"),
        defaultValue: 'review'
      },
      author: {
        allowNull: false,
        type: Sequelize.STRING
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      // saleId: {
      //   allowNull: false,
      //   type: Sequelize.STRING
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('books');
  }
};