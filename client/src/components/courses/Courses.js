import React, { Component } from "react";

// For the jQuery table these need to be imported
import jQuery, { define } from "jquery";
import $ from "jquery";

import "../../styles/Table.css";
import { Row, CardPanel, Col } from "react-materialize";

import dataTable from "../DataTable";
import Table from "../Table.js";

const data = [
  {
    course_id: 1,
    course_name: "Wizardry"
  }
];
// const API_URL = process.env.REACT_APP_API
const API_URL = "http://localhost:3000/";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  //   toggleClass(event) {
  //     let currentState = this.state.activeMenu;
  //     this.setState({ activeMenu: !currentState });
  //     event.preventDefault();
  //   }

  componentWillMount() {
    this.setState({ courses: data });
  }

  formatChildRow(data) {
    return `
            <table style="width:100%">
                <tr>
                    <td>
                        <label>Courses:</label><br/>
                        <span>${data.courses}</span>
                    </td>
                    <td>
                        <label>Grades:</label><br/>
                        <span>${data.grades}</span>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>`;
  }

  getActionsDropdown(data) {
    let id = data.course_id;

    return `
        <div class="btn-group">
            <a href="/courses/edit/:${
              data.course_id
            }" class="btn bgm-bluegray" data-id="${id} aria-expanded="true"><i class="fa fa-pencil-square-o"></i> Edit Student </a>
        </div>`;
  }

  render() {
    return (
      <section id="content">
        <div>
          <h1>Students</h1>
        </div>

        <Row>
          <Col s={12} m={5}>
            <CardPanel className="lighten-4 black-text">
              <Table
                data={this.state.students}
                columns={[
                  {
                    orderable: false,
                    defaultContent: '<i class="fa fa-caret-down"></i>',
                    className: "details-control"
                  },
                  // {
                  //   orderable: false,
                  //   title: "Actions",
                  //   class: "no-wrap",
                  //   data: data => {
                  //     return this.getActionsDropdown(data);
                  //   }
                  // },

                  {
                    title: "Courses",
                    data: data => {
                      return `<span>${data.course_name}<span>`;
                    }
                  }
                ]}
                onTableReload={() => {}}
                onRowClick={table_cell => {
                  if (!table_cell.hasClass("details-control")) {
                    return false;
                  }

                  let table = $(".data-table-wrapper")
                    .find("table.dataTable")
                    .DataTable();

                  let row = table_cell.closest("tr");

                  let table_row = table.row(row);

                  if (table_row.child.isShown()) {
                    table_row.child.hide();
                    row.removeClass("shown");
                  } else {
                    table_row
                      .child(this.formatChildRow(table_row.data()))
                      .show();
                    row.addClass("shown");
                  }
                }}
                onTableLoad={() => {
                  let page = this;

                  $(".data-table-wrapper").on(
                    "click",
                    "[data-action]",
                    function() {
                      let course_id = $(this).data("id");

                      let current_row = $(this).closest("tr");
                      let updated_index = current_row.index();
                      let table = $(".data-table-wrapper")
                        .find("table.dataTable")
                        .DataTable();
                      let table_row = table.row(current_row);
                      let course_data = table_row.data();
                    }
                  );
                }}
              />
            </CardPanel>
          </Col>
        </Row>
      </section>
    );
  }
}

export default Courses;
