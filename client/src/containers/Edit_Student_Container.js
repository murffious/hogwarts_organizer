import React, { Component } from "react";
import API from "../controller_api/student_api";
import StudentEdit from "../components/students/StudentEdit";
import Tab from "../components/tabs/Tab";
import Tabs from "../components/tabs/Tabs";
import { Student } from "../components/students/Student";
import "../styles/Student_Manager.css";
import { Row, CardPanel, Col } from "react-materialize";
import StudentGrades from "../components/grades/StudentGrades";
import StudentInfoCard from "../components/students/StudentInfo";

class Edit_Student_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {},
      student_id: this.props.match.params.id.replace(/:/g, ""),
      key: ""
    };

    // this.cancelChanges = this.cancelChanges.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    console.log(this.state.student_id);
    this.getStudent(this.state.student_id);
  }

  //   componentWillReceiveProps(nextProps) {
  //     this.setState({
  //       student: nextProps.playlist,
  //       key: Math.random()
  //     });
  //   }

  getStudent = id => {
    API.getStudent(id)
      .then(res => {
        console.log(res);
        this.setState({
          student: res.data,
          message: !res.length ? "Student Not Found" : ""
        });
      })
      .catch(err => console.log(err));
  };

  updateStudent = () => {
    let student_info = "";
    API.updateStudent(student_info)
      .then(res => {
        // May speed up by copy and mutate copy of state..?
        this.getStudents();
      })
      .catch(err => console.log(err));
    // this.props.updatePlaylist(_id, edit_playlist_obj, null);
  };

  cancelChanges() {
    // this.getPlaylist();
  }

  render() {
    return (
      <section id="content">
        <div>
          <h1>Edit Student</h1>
        </div>
        <div className="">
          <div className="">
            <div key={this.state.key} style={{ display: "flex" }}>
              <Tabs>
                {/* Put cool folder icon here */}
                <Tab title="Student Profile">
                  {/* <Row>
                    <Col s={12} m={5}>
                      <CardPanel className="lighten-4 black-text">
                        EDIt button then inputs
                        <span>
                          I am a very simple card. I am good at containing small
                          bits of information. I am convenient because I require
                          little markup to use effectively. I am similar to what
                          is called a panel in other frameworks.
                        </span>
                      </CardPanel>
                    </Col>
                  </Row> */}
                  <StudentInfoCard />
                </Tab>
                <Tab title="Course Schedule">
                  <StudentEdit />
                </Tab>
                <Tab title="Grades">
                  <StudentGrades />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Edit_Student_Container;
