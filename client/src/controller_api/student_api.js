import axios from "axios";
// const API_URL = process.env.REACT_APP_API
const API_URL = "http://localhost:3000";
export default {
  // Get students from the API
  // { params: filterParams(params) }
  getStudents: function(params) {
    return axios.get(`${API_URL}/students`);
  },
  getStudent: function() {
    return axios.get(`${API_URL}/student/:id`);
  },
  // Deletes the student with the given id
  deleteStudent: function(id) {
    return axios.delete(`${API_URL}/students/delete/${id}`);
  },
  // Saves an edit to the database
  updateStudent: function(studentData) {
    return axios.put(`${API_URL}/students/edit`, studentData);
  },
  // Creates a student to the database
  createStudent: function(studentData) {
    return axios.post(`${API_URL}/students/create`, studentData);
  }
};
