import React, { Component } from "react";
import $ from "jquery";
import { Row, CardPanel, Col, Input } from "react-materialize";

// import '../../css/app_1.css';
// import '../../css/app_2.css';
// import '../../css/demo.css';
import "../../styles/StudentGrades.css";

// const API_TOKEN = process.env.REACT_APP_API_TOKEN;
// const API_URL = process.env.REACT_APP_API_URL_BASE + '/trudigital';
// PUt in notifiers
class StudentGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org_id: "",
      childVisible: false,
      selectedId: null,
      viewButton: true
    };
    this.renderHwInputs = this.renderHwInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggleAll() {
    var btn_text = $("#toggle-text").text();
    if (btn_text === "Select all") {
      $("input:checkbox").prop("checked", "checked");
      $("#toggle-text").text("Deselect all");
    } else if (btn_text === "Deselect all") {
      $("input:checkbox").prop("checked", false);
      $("#toggle-text").text("Select all");
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ org_id: nextProps.organization._id });
  }

  saveCCsettings() {
    let self = this;
    // Checks all inputs and makes an array of ones that are checked to use for save to db
    var checkedValues = $("input:checkbox:checked")
      .map(function() {
        return this.value;
      })
      .get();

    var data = { categories: checkedValues };

    // $.ajax({
    //     url: `${API_URL}/organization/${this.props.organization._id}/edit/`,
    //     method: 'PUT',
    //     data: JSON.stringify(data),
    //     contentType: "application/json",
    //     dataType: "json",
    //     headers: {'Authorization':`Bearer ${API_TOKEN}`}
    // }).done(function (response) {
    // // add a notification here that it was saved later
    // self.props.getBusiness(self.props.organization._id);
    // })
  }

  renderHwInputs() {
    let assignments = [];
    for (let i = 0; i < 10; i++) {
      assignments.push(
        <Input
          name="group1"
          type="checkbox"
          value="green"
          label={`Assignment ${i}`}
          className="filled-in"
          defaultChecked="checked"
        />
      );
    }
    return assignments;
  }

  onClick() {
    this.setState({ childVisible: !this.state.childVisible });
    this.setState({ viewButton: !this.state.viewButton });
  }

  render() {
    let ccSettings = ["assign 1"];
    return (
      <section id="content">
        <div className="container">
          {/* <div className="block-header">
            <h1>Cruise Control Settings</h1>
          </div> */}

          <div className="card-header">
            <div id="business-categories">
              <h2>Grades</h2>
              <div className="row m-l-10 m-r-10 m-b-25 m-t-25">
                <p>Courses</p>
                <span onClick={this.onClick()}>Math</span> Science Music
                <div className="col-xs-12 pull-right text-right">
                  <button
                    className="btn btn-info bgm-teal"
                    onClick={this.toggleAll.bind(this)}
                    id="toggle-text"
                    type="button"
                  >
                    Deselect all
                  </button>
                </div>
              </div>
              <Row>
                <Col s={12} m={5}>
                  <CardPanel className="lighten-4 black-text">
                    <div
                      id="account-cc-categories"
                      className="row m-l-10 m-r-10"
                    >
                      <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" />
                      {this.renderHwInputs()}
                      <div className="col-xs-12 pull-right text-right">
                        <button
                          onClick={this.saveCCsettings.bind(this)}
                          className="btn btn-success bgm-teal"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </CardPanel>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default StudentGrades;
