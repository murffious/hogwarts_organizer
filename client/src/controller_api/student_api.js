import axios from "axios";

export default {
  // Get students from the API
  getStudents: function(params) {
    return axios.get("/students", { params: filterParams(params) });
  },
  getStudent: function() {
    return axios.get("/students");
  },
  // Deletes the student with the given id
  deleteStudent: function(id) {
    return axios.delete("/students/" + id);
  },
  // Saves an edit to the database
  updateStudent: function(studentData) {
    return axios.put("/students", studentData);
  },
  // Creates a student to the database
  createStudent: function(studentData) {
    return axios.post("/students", studentData);
  }
};
