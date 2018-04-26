// Course controller
// =====================

var express = require("express");

// grabbing our models
var db = require("../models");

// initialize express
var app = express();

// CRUD with sequelize
module.exports = function(app) {
  // get all courses
  app.get("/courses", function(req, res) {
    db.Course.findAll({
      // include: [db.Course],
      order: [["course_name", "ASC"]]
    }).then(function(dbCourse) {
      return res.send();
    });
  });

  // get one course
  app.get("/course/:id", function(req, res) {
    db.Course.findOne({
      include: [db.Course]
    }).then(function(dbCourse) {
      return res.send();
    });
  });

  // post route to create courses
  app.post("/course/create", function(req, res) {
    db.Course.create({
      course_name: req.body.course_name
    }).then(function(dbCourse) {
      res.send("OK");
    });
  });

  // put route to edit course
  app.put("/courses/edit", function(req, res) {
    if (req.body.course) {
      db.Course.update(
        {
          course_name: req.body.course_name
        },
        {
          where: {
            id: req.body.course_id
          }
        }
      ).then(function(dbCourse) {
        res.json("/");
      });
    }
  });

  // delete route
  app.delete("/courses/delete/:id", function(req, res) {
    db.Course.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCourse) {
      res.json(dbCourse);
    });
  });
};
