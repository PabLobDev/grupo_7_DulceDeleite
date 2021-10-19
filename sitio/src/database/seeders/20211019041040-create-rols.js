'use strict';

const rols = [
  {
    name : 'user',
    createdAt : new Date,
    updatedAt : new Date
  },
  {
    name : 'admin',
    createdAt : new Date,
    updatedAt : new Date
  },
  
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('rols', rols, {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('rols', null, {});
     
  }
};

