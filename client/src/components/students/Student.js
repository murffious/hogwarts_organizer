// import React from "react";

// export const Student = props => (
//   <li className="list-group-item">
//     llsdalf;kjalsjdfl;jas;ldfjl;kajsd;flasjdfjas
//     als;kdfjl;kjalsjdfl;lkasdjf;lkasdjf sakdfj;lasldfj
//     <p>sadfasdf</p>
//   </li>
// );
import React, { Component } from "react";
import { Row, CardPanel, Col } from "react-materialize";

export class Student extends Component {
  render() {
    return (
      <div>
        <div className="fm-toolbar">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <label className="btn btn-default">
                  Upload file{" "}
                  <input
                    label="Upload Files"
                    type="file"
                    hidden
                    onChange={e => {
                      this.handleDropdownFileUpload(e.target.files);
                    }}
                  />
                </label>
              </div>
              <div className="col-md-2">
                <button
                  type="button"
                  className="btn btn-default"
                  onClick={() => {}}
                >
                  New Folder
                </button>
              </div>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => {}}
              >
                New Folder
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => {}}
              >
                New Folder
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => {}}
              >
                New Folder
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={() => {}}
              >
                New Folder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
