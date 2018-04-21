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
          course_name: "Course",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Draco Malfoy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Seamus Finniganr",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Neville Longbottom",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Seamus Finniganr",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Luna Lovegood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Oliver Wood",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Fred Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "George Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Ginny Weasley",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Ernie MacMillan",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          course_name: "Percy Weasley",
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
