import React, { Component } from "react";

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      new_folder_name: ""
    };
  }

  componentWillMount() {
    this.props.setInitialFolder(this.props.root_folder);
  }

  componentWillUpdate(next_props) {
    if (!next_props.is_current) {
      this.props.onChangeFolder(this.props.current_folder);
    }
  }

  getFiles() {
    if (this.props.current_folder && this.props.current_folder.files) {
      let folder = this.props.current_folder;
      return (
        <div>
          {folder.files.map((file, index) => {
            return (
              <File
                key={index}
                file={{ ...file }}
                onFileEdit={this.updateFile}
                onFileDelete={this.props.onDeleteFile}
              />
            );
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="row" style={{ width: "100%", float: "left" }}>
        {this.getFiles()}
      </div>
    );
  }
}

export default ScheduleContainer;
