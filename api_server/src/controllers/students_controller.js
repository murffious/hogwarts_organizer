// Student controller
// =====================
// This file uses Sequelize to manage data manipulation

var express = require("express");

var db = require("../models");

var app = express();

// CRUD with sequelize
module.exports = function(app) {
  // get all students
  app.get("/students", function(req, res) {
    db.Student.findAll({
      // Maybe get courses as well with a join
      // include: [db.Course],

      // return our students in order by ascending student_name
      order: [["student_name", "ASC"]]
    }).then(function(dbStudents) {
      return res.send(dbStudents);
    });
  });

  // get one student maybe use maybe not
  app.get("/student/:id", function(req, res) {
    db.Student.findOne({
      // include: [db.Student],
    }).then(function(dbStudent) {
      // Maybe configure the return obj a bit
      // var hbsObject = {
      //   student: dbStudent
      // };
      return res.send(dbStudent);
    });
  });

  // post route to create students
  app.post("/students/create", function(req, res) {
    db.Student.create({
      student_name: req.body.student_name
    }).then(function(dbStudent) {
      res.send("OK");
    });
  });

  // put route to edit a student
  app.put("/students/edit", function(req, res) {
    if (req.body.student_name) {
      db.Student.update(
        {
          student_name: req.body.student_name
        },
        {
          where: {
            id: req.body.student_id
          }
        }
      ).then(function(dbStudent) {
        res.json("/");
      });
    }
    //   else {
    // Maybe handle stuff here not sure yet

    //   }
  });

  // delete route
  app.delete("/students/delete/:id", function(req, res) {
    db.Student.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStudent) {
      res.json(dbStudent);
    });
  });
};
