"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Cart.init(
    {
      cartId: {
        primaryKey: true,
        require: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        require: true,
        type: DataTypes.INTEGER,
      },
      productId: {
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
      quantity: {
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
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cart",
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장되도록
    }
  );
  return Cart;
};
