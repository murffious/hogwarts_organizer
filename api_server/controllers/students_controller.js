// Student controller
// =====================
// This file uses Sequelize to manage data manipulation

var express = require("express");

// grabbing our models
var db = require("../models");

// initialize express
var app = express();

// CRUD with sequelize

// get all students
app.get("/students", function(req, res) {
  // replace old function with sequelize function
  db.Student.findAll({
    include: [db.Student],
    // Here we specify we want to return our students in order by ascending student_name
    order: [["student_name", "ASC"]]
  }).then(function(dbStudent) {
    // into the main index, updating the page
    // var hbsObject = {
    //   student: dbStudent
    // };
    return res.send();
  });
});

// get one student maybe use maybe not
app.get("/student/:id", function(req, res) {
  // replace old function with sequelize function
  db.Student.findOne({
    include: [db.Student],
    // Here we specify we want to return our students in order by ascending student_name
    order: [["student_name", "ASC"]]
  }).then(function(dbStudent) {
    // into the main index, updating the page
    var hbsObject = {
      student: dbStudent
    };
    return res.send();
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
  if (req.body.student) {
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
app.delete("/student/delete/:id", function(req, res) {
  db.Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbStudent) {
    res.json(dbStudent);
  });
});
