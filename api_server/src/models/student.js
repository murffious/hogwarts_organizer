// Student model
// Join for courses? or add array here?
module.exports = function (sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    student_name: {
      type: DataTypes.STRING,
      // If a Student is to be created, they must have a name
      allowNull: false
    }
    //  {
    // classMethods: {
    //   associate: function(models) {
    //     Student.hasOne(models.Course);
    //   }
    // }
  });
  return Student;
};