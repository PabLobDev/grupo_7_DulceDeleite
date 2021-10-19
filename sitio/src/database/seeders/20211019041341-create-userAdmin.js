'use strict';

const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('users', [
        {
          name: 'admin',
          surname: "admin",
          age: null,
          city: null,
          email:'admin@admin.com',
          pass: bcrypt.hashSync('1951',10),
          avatar: 'avatar_default.png',
          rolId: 1,
          createdAt : new Date,
        updatedAt : new Date

      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('rols', null, {});
     
  }
};


