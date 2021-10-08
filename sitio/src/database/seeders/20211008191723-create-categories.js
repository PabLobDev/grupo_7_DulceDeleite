'use strict';

const categories = [
  {
    name : 'postres',
    createdAt : new Date,
    updatedAt : new Date
  },
  {
    name : 'tortas',
    createdAt : new Date,
    updatedAt : new Date
  },
  {
    name : 'muffins cupcakes',
    createdAt : new Date,
    updatedAt : new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('categories', categories, {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('categories', null, {});
     
  }
};
