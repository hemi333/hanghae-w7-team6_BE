"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Cart);
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        require: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        require: true,
        type: DataTypes.STRING,
      },
      nickName: {
        require: true,
        type: DataTypes.STRING,
      },
      password: {
        require: true,
        type: DataTypes.STRING,
      },
      email: {
        require: true,
        type: DataTypes.STRING,
      },
      address: {
        require: true,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    }
  );
  return User;
};
