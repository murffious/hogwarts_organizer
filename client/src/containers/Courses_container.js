import React, { Component } from "react";
import API from "../controller_api/api";
import Courses from "../components/students/Courses";

class CoursesContainer extends Component {
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

  getStudents = () => {
    API.getCourses()
      .then(res =>
        this.setState({
          courses: res.data,
          message: !res.data.length ? "No Courses Found, Try a Adding Some" : ""
        })
      )
      .catch(err => console.log(err));
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   this.getCourses();
  // };

  // handleCoursesave = id => {
  //   API.saveCourse(course).then(res => this.getCourses());
  // };

  render() {
    return (
      <div>
        <Courses courses={this.state.courses} />
      </div>
    );
  }
}

export default Home;
