'use strict';

import {
  ENABLE_TEMPLATE_FULL
} from '../../config/constant'

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   const time = Sequelize.literal('CURRENT_TIMESTMP()');
   if(!ENABLE_TEMPLATE_FULL || !data(time).length){
     return;
   }
   await queryInterface.bulkInsert('bills', data(time), {});
  
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return await queryInterface.bulkDelete('bills', null, {});

  }
};
