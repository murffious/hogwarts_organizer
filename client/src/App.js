import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon, Navbar, NavItem } from "react-materialize";
import Students from "./components/students/Students";
import Courses from "./components/courses/Courses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar brand="Hogwarts Organizer" right>
          <NavItem onClick={() => console.log("test click")}>Students</NavItem>
          <NavItem>Courses</NavItem>
        </Navbar>
        <Router>
          <div>
            <Route exact path="/" component={Students} />
            <Route exact path="/courses" component={Courses} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
