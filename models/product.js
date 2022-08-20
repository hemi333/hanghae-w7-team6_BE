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
    }
  }
  Product.init({
    productId: {
      primaryKey: true, 
      type: DataTypes.INTEGER,
    },
    productImage: DataTypes.STRING,
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    desc: DataTypes.STRING,
    category: DataTypes.STRING,
    delivery: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};