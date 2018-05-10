import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Icon, Navbar, NavItem } from "react-materialize";
import Students from "./components/students/Students";
import Courses from "./components/courses/Courses";
import Dashboard_Container from "./containers/Dashboard_Container";
import Edit_Student_Container from "./containers/Edit_Student_Container";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

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
            <Route exact path="/dashboard" component={Dashboard_Container} />
            <Route exact path="/students" component={Students} />
            <Route
              exact
              path="/students/edit/:id"
              component={Edit_Student_Container}
            />
            <Route exact path="/courses" component={Courses} />
          </div>
        </Router>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
