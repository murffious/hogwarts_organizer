"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Courses",
      [
        {
          course_name: "Charms",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Care of Magical Creatures",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Flying",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Transfiguration",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Potions",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Defense Against the Dark Arts",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Courses", null, { truncate: true });
  }
};
