import axios from "axios";

export default {
  // Get courses from the API
  getCourses: function(params) {
    return axios.get("/Courses");
  },
  getCourse: function() {
    return axios.get("/Courses");
  },
  // Deletes the Course with the given id
  deleteCourse: function(id) {
    return axios.delete("/Courses/" + id);
  },
  // Saves an edit to the database
  updateCourse: function(CourseData) {
    return axios.put("/Courses", CourseData);
  },
  // Creates a Course to the database
  createCourse: function(CourseData) {
    return axios.post("/Courses", CourseData);
  },
  // Get Courses from the API
  getCourses: function(params) {
    return axios.get("/Courses");
  },
  getCourse: function() {
    return axios.get("/Courses");
  },
  // Deletes the Course with the given id
  deleteCourse: function(id) {
    return axios.delete("/courses/" + id);
  },
  // Saves an edit to the database
  updateCourse: function(courseData) {
    return axios.put("/courses", courseData);
  },
  // Creates a Course to the database
  createCourse: function(courseData) {
    return axios.post("/course/create", courseData);
  }
};
