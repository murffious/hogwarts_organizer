// Grades model
module.exports = function(sequelize, DataTypes) {
  var Grades = sequelize.define(
    "Grades",
    // {
    //   grades: {
    //     type: DataTypes.ARRAY(sequelize.ENUM),
    //     defaultValue: []
    //   }
    // },
    {
      grades: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    }
    // {
    //   classMethods: {
    //     associate: function(models) {
    //       Grades.belongsToMany(Course, { foreignKey: "student_id" });
    //     }
    //   }
    // }
  );
  return Grades;
};
