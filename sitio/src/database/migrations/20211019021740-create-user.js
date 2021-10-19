'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      surname: {
        type: Sequelize.STRING(50)
      },
      age: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(100)
      },
      pass: {
        type: Sequelize.STRING(100)
      },
      avatar: {
        type: Sequelize.STRING
      },
      rolID: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Rols'
          },
          key : 'id'
        }
      },
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};