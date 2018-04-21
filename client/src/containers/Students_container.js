import React, { Component } from "react";
import API from "../controller_api/api";
import Students from "../components/students/Students";

class StudentContainer extends Component {
  state = {
    students: [],
    courses: [],
    message: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // CRUD HERE

  getStudents = () => {
    API.getStudents()
      .then(res =>
        this.setState({
          students: res.data,
          message: !res.data.length
            ? "No Students Found, Try a Adding Some"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  getStudent = () => {
    API.getStudent()
      .then(res =>
        this.setState({
          students: res.data,
          message: !res.data.length
            ? "No Students Found, Try a Adding Some"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteStudent = () => {
    API.deleteStudent()
      .then(res =>
        this.setState({
          students: res.data,
          message: !res.data.length
            ? "No Students Found, Try a Adding Some"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  updateStudent = () => {
    API.updateStudent()
      .then(res =>
        this.setState({
          students: res.data,
          message: !res.data.length
            ? "No Students Found, Try a Adding Some"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  createStudent = () => {
    API.createStudent()
      .then(res =>
        this.setState({
          students: res.data,
          message: !res.data.length
            ? "No Students Found, Try a Adding Some"
            : ""
        })
      )
      .catch(err => console.log(err));
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  // };

  render() {
    return (
      <div>
        <Students students={this.state.students} />
      </div>
    );
  }
}

export default Home;
