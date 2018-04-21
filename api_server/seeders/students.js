"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Students",
      [
        {
          student_name: "Big Kahuna Burger",
          devoured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          burger_name: "Krusty Burger",
          devoured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          burger_name: "Krabby Patty",
          devoured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          burger_name: "Veggie Burger",
          devoured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          burger_name: "Pineapple Burger",
          devoured: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Burgers", null, { truncate: true });
  }
};
