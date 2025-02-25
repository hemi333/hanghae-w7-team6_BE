"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "Carts",
      {
        cartId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        productId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        productImage: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        productName: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        price: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        quantity: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        desc: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        category: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        delivery: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Carts");
  },
};

//