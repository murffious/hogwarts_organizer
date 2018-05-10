import React, { Component } from "react";
import $ from "jquery";
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import { Row, CardPanel, Col } from "react-materialize";

// import '../../../css/app_1.css';
// import '../../../css/app_2.css';
// import '../../../css/demo.css';
import "../../styles/StudentInfoCard.css";

// const API_TOKEN = process.env.REACT_APP_API_TOKEN;
// const API_URL = process.env.REACT_APP_API_URL_BASE + '/trudigital';

class StudentInfoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      key: "",
      user: {
        first_name: "",
        last_name: "jhkhhjhkj",
        phone_number: "",
        email: ""
      },
      haveUserId: false,
      loggedInUser: {}
    };
  }

  toggleClass() {
    const currentState = this.state.active;
    this.setState({ active: !currentState });

    const id = this.state.user._id;
    // this.props.fetchUser(id);
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   user: nextProps.user,
    //   loggedInUser: nextProps.loggedInUser
    // });
  }

  // Loads the input with the correct values on edit click

  handleChangeFor = propertyName => event => {
    const { user } = this.state;
    const updatedUser = {
      ...user,
      [propertyName]: event.target.value
    };
    this.setState({ user: updatedUser });
  };

  onButtonPress() {
    // let user = this.state.user
    // this.props.updateUser()
  }
  saveUser() {
    let self = this;
    // Checks all inputs and makes an array of ones that are checked to use for save to db
    var checkedValues = $(
      'input[name="first_name"], input[name="last_name"], input[name="Phone-Number"], input[name="email"]'
    )
      .map(function() {
        return this.value;
      })
      .get();
    var data = {
      first_name: checkedValues[0],
      last_name: checkedValues[1],
      phone_number: checkedValues[2],
      email: checkedValues[3]
    };
    // call to save
    // add a notification here that it was saved later
    this.toggleClass();
    const id = this.state.user._id;
    this.refresh();
  }
  refresh() {
    this.setState({ key: Math.random() });
  }

  render() {
    return (
      <div>
        <div className="col-xs-4">
          <h2>{this.state.active ? "Edit Student Info" : "Student Info"}</h2>
        </div>
        <div className="col-xs-8 text-right">
          <button
            id="show-edit-user"
            onClick={this.toggleClass.bind(this)}
            className={
              this.state.active
                ? "btn btn-address waves-effect hidden"
                : "btn btn-address waves-effect"
            }
          >
            Edit
          </button>
          <button
            id="cancel-edit-user"
            onClick={this.toggleClass.bind(this)}
            className={
              this.state.active
                ? "btn btn-default waves-effect"
                : "btn btn-default waves-effect hidden"
            }
            style={{ marginRight: "4px" }}
          >
            Cancel
          </button>
          <button
            id="save-user"
            onClick={this.saveUser.bind(this)}
            className={
              this.state.active
                ? "btn btn-success waves-effect"
                : "btn btn-success waves-effect hidden"
            }
          >
            Save
          </button>
        </div>

        <div
          id="static-user"
          key={this.state.key}
          className={this.state.active ? "hidden" : null}
        >
          <Row>
            <Col s={12} m={5}>
              <CardPanel className="lighten-4 black-text">
                <div>
                  <div className="data-label">Name</div>
                  <div className="m-l-15">james Fraond</div>
                </div>
                <br />
                <div>
                  <div className="data-label">Phone number</div>
                  <div className="m-l-15">324523452345</div>
                </div>
                <br />
                <div>
                  <div className="data-label">Email</div>
                  <div className="m-l-15">@asdfasdf.com</div>
                </div>
              </CardPanel>
            </Col>
          </Row>
        </div>
        <div
          className="container"
          id="edit-user"
          className={this.state.active ? null : "hidden"}
          style={{ maxWidth: "600px" }}
        >
          <Row>
            <Col s={12} m={5}>
              <CardPanel className="lighten-4 black-text">
                <form className="card-content">
                  <p>
                    <input
                      type="text"
                      name="last_name"
                      id="user-last-name"
                      required="required"
                      value={this.state.user.last_name || ""}
                      onChange={this.handleChangeFor("last_name")}
                      className="input col s2 validate"
                    />
                    <label>First Name</label>
                  </p>

                  <p>
                    <input
                      className="input col s2"
                      type="text"
                      className="validate"
                    />
                    <label>Last Name</label>
                  </p>

                  <p>
                    <input
                      className="input-field"
                      type="text"
                      className="validate"
                    />
                    <label>Email</label>
                  </p>
                </form>
              </CardPanel>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StudentInfoCard;
