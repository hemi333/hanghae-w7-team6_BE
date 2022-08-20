"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  User.init(
    {
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
    },
    {
      sequelize,
      modelName: "User",
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장되도록
    }
  );
  return User;
};
