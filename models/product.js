"use strict";
const { Model } = require("sequelize");
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
  Product.init(
    {
      productId: {
        primaryKey: true,
        require: true,
        type: DataTypes.INTEGER,
      },
      productImage: {
        require: true,
        type: DataTypes.STRING,
      },
      productName: {
        require: true,
        type: DataTypes.STRING,
      },
      price: {
        require: true,
        type: DataTypes.INTEGER,
      },
      desc: {
        require: true,
        type: DataTypes.STRING,
      },
      category: {
        require: true,
        type: DataTypes.STRING,
      },
      delivery: {
        require: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Product",
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장되도록
    }
  );
  return Product;
};
