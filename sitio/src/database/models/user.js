'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Rol,{
        as : "rol"
      })
    }
  };
  User.init({
    name: DataTypes.STRING(50),
    surname : DataTypes.STRING(50),
    age : DataTypes.INTEGER,
    city : DataTypes.STRING(100),
    email: DataTypes.STRING(100),
    pass: DataTypes.STRING(100),
    avatar: DataTypes.STRING,
    rolId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};