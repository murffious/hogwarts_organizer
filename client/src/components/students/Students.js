import React, { Component } from "react";
// For the jQuery table these need to be imported
import jQuery, { define } from "jquery";
import $ from "jquery";
import "../../styles/Table.css";
import { Row, CardPanel, Col } from "react-materialize";
import dataTable from "../DataTable";
import Table from "../Table.js";
import API from "../../controller_api/student_api";

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  getStudents = () => {
    API.getStudents()
      .then(res => {
        this.setState({
          students: res.data,
          message: !res.length ? "No Students Found, Try a Adding Some" : ""
        });
      })
      .catch(err => console.log(err));
  };

  deleteStudent = id => {
    API.deleteStudent(id)
      .then(res => {
        // May speed up by copy and mutate copy of state..?
        this.getStudents();
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    // Grab all students
    this.getStudents();

    // Delete Student Button
    $("body").on("click", '[data-action="delete"]', e => {
      let id = $(e.currentTarget).data("id");
      let delete_student = window.confirm(
        `Are you sure you want to delete this Student?`
      );
      if (delete_student) {
        this.deleteStudent(id);
      }
    });
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
    let id = data.id;
    return `
        <div class="btn-group">
            <a href="/students/edit/:${id}" class="btn bgm-bluegray" data-id=${id} aria-expanded="true"><i class="fa fa-pencil-square-o"></i> </a>
            <a id="delete" data-action="delete" class="btn bgm-bluegray" data-id=${id} aria-expanded="true"><i class="fa fa-trash" aria-hidden="true"></i> </a>
        </div>`;
  }

  render() {
    return (
      <section id="content">
        <div>
          <h1>Students</h1>
        </div>

        {/* <Row>
          <Col s={12} m={5}>
            <CardPanel className="lighten-4 black-text"> */}
        <Table
          data={this.state.students}
          columns={[
            {
              orderable: false,
              defaultContent:
                '<span>View Details<i class="fa fa-caret-down"></i></span>',
              className: "details-control"
            },
            {
              title: "Students",
              data: data => {
                return `<span>${data.student_name}<span>`;
              }
            },
            {
              orderable: false,
              title: "Actions",
              class: "no-wrap",
              data: data => {
                return this.getActionsDropdown(data);
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
              table_row.child(this.formatChildRow(table_row.data())).show();
              row.addClass("shown");
            }
          }}
          onTableLoad={() => {
            let page = this;

            $(".data-table-wrapper").on("click", "[data-action]", function() {
              let student_id = $(this).data("id");

              let current_row = $(this).closest("tr");
              let updated_index = current_row.index();
              let table = $(".data-table-wrapper")
                .find("table.dataTable")
                .DataTable();
              let table_row = table.row(current_row);
              let student_data = table_row.data();
            });
          }}
        />
        {/* </CardPanel>
          </Col>
        </Row> */}
      </section>
    );
  }
}

export default Students;
