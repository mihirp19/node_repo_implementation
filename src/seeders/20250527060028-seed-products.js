"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        title: "Sample Product 1",
        description: "A great product",
        price: 19.99,
        category: "electronics",
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Sample Product 2",
        description: "Another great product",
        price: 29.99,
        category: "books",
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
