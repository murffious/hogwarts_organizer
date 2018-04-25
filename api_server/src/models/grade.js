// Grades model
module.exports = function(sequelize, DataTypes) {
  var Grades = sequelize.define("Grades", {
    grade: {
      type: DataTypes.STRING,
      // If a Student is to be created, they must have a name
      allowNull: false
    }
    //   courses[]: {
    //     type: DataTypes.STRING,
    //     // If a Student is to be created, they must have a name
    //     allowNull: false
    //   }
    //  {
    // classMethods: {
    //   associate: function(models) {
    //     Student.hasOne(models.Course);
    //   }
    // }
  });
  return Grades;
};
