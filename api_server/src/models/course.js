// Course model
module.exports = function(sequelize, DataTypes) {
  var Course = sequelize.define(
    "Course",
    {
      course_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: function(models) {
          Course.belongsToMany(models.Student, { foreignKey: "student_id" });
        }
      }
    }
  );
  return Course;
};
