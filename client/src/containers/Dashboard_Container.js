import React, { Component } from "react";
import { Row, CardPanel, Col } from "react-materialize";

class Dashboard_Container extends Component {
  render() {
    return (
      <div>
        TABS OVerview Instructions
        <Row>
          <Col s={12} m={5}>
            <CardPanel className="teal lighten-4 black-text">
              Welcome to my Full Stack react site to demonstrate some very
              important skills. 1 year
              <span>
                best practices - choice of technologies MySQL Node
                Materialize_react jQuery DataTable.net Bonus React Dnd - never
                got there Express sequelize Create React App - Features * Client
                side search on students * Paginated list for viewing students *
                Paginated list for viewing courses * The database and
                application manages data for a single school year * The database
                used to store the data should be a relational database
                (preferably MySQL) * The API should follow REST or GraphQL best
                practices * The backend should be implemented in one of the
                following languages: NodeJS, PHP, Java * Create CRUD endpoints
                for the data models * Create a React interface that will
                facilitate the following functionality: * Viewing students *
                Editing students * Creating new students * Deleting students *
                Create a React interface that will facilitate the following
                functionality: * Viewing courses * Editing courses * Creating
                new courses * Deleting courses * Implement one or more of the
                following on the front-end: * Client side search on students *
                Paginated list for viewing students * Paginated list for viewing
                courses * Drag and drop interface for enrolling students into
                courses * Interface for assigning grades to students for the
                courses that they are enrolled in. If you finish these
                requirements under the time limit feel free to make
                improvements. Some suggestions include: * Server-side search on
                students * Custom endpoint for calculating cumulative GPA based
                on grade
              </span>
            </CardPanel>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard_Container;
