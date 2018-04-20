// Course model
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define("Course", {
    course_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
    //  {
    // classMethods: {
    //   associate: function(models) {
    //     Student.hasOne(models.Course);
    //   }
    // }
  });
  return Course;
};
