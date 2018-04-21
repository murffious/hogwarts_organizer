"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Students",
      [
        {
          student_name: " Harry Potter",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Hermione Granger",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Draco Malfoy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Seamus Finniganr",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Neville Longbottom",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Seamus Finniganr",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Luna Lovegood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Oliver Wood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Fred Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "George Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Ginny Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Ernie MacMillan",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          student_name: "Percy Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Students", null, { truncate: true });
  }
};
