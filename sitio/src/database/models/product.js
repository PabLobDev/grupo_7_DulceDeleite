'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category,{
        as : 'category'
      })
    }
  };
  Product.init({
    name: DataTypes.STRING(50),
    price: DataTypes.DECIMAL(8,2),
    description: DataTypes.STRING(500),
    discount: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    diabetic: DataTypes.INTEGER,
    celiac: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};