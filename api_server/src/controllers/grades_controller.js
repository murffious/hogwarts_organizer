// Grades controller
// =====================
// This file uses Sequelize to manage data manipulation

var express = require("express");

var db = require("../models");

var app = express();

module.exports = function(app) {
  app.put("/grades/edit", function(req, res) {
    if (req.body.student_name) {
      db.Grades.update(
        {
          grades: req.body.grades
        },
        {
          where: {
            // id: req.body.student_id some type of JOIN here?
          }
        }
      ).then(function(dbGrades) {
        res.json(dbGrades);
      });
    }
  });
};
