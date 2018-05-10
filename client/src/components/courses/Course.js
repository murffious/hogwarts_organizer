import React, { Component } from "react";
import PropTypes from "prop-types";
import { ItemTypes } from "../../utils/ItemTypes";

import { DragSource } from "react-dnd";

// const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;

const file_source = {
  canDrag(props) {
    return true;
  },

  isDragging() {
    console.log("File :: isDragging");
  },

  beginDrag(props, monitor, component) {
    console.log("File :: beginDrag", props);
    return {
      value: props.value,
      currentType: props.type,
      id: props.id,
      ...props
    };
  },

  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log("File :: endDrag", dropResult, item);
    if (dropResult) {
      alert(`You dropped ${item.file.name} into Current Playlist!`); // eslint-disable-line no-alert
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Course extends Component {
  constructor(props) {
    super(props);
    this.rename = this.renameFile.bind(this);
    this.delete = this.deleteFile.bind(this);
  }

  renameFile() {
    let new_name = window.prompt("New file name");

    if (new_name) {
      let file_data = { ...this.props.file };
      file_data.name = new_name;
      this.props.onFileEdit(file_data);
    }
  }

  deleteFile() {
    if (window.confirm(`Are you sure you want to delete this file?`)) {
      this.props.onFileDelete(this.props.file);
    }
  }

  toggleMenu(event) {
    let dropdown = event.target.parentElement.classList;

    if (dropdown.contains("open")) {
      dropdown.remove("open");
      return;
    }
    dropdown.add("open");
    return;
  }

  render() {
    const { id } = this.props;

    // These props are injected by React DnD,
    // as defined by your `collect` function above:
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div
        className="fm-object fm-file col-sm-3"
        style={{ backgroundColor: this.props.isDragging ? "blue" : "#fff" }}
      >
        {/* <img src={`${AWS_S3_URL}${this.props.file.thumb_src}`} alt="" style={{maxWidth: '100%', height: 'auto', display: 'block'}}/> */}
        <div className="fm-object-meta">
          <div className="fm-object-name">
            <span>{this.props.file.name}</span>
          </div>
          <div className="fm-object-controls">
            <div className="dropdown">
              <button
                className="btn btn-default dropdown-toggle"
                type="button"
                onClick={this.toggleMenu}
              >
                ...
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" onClick={this.rename}>
                  Rename
                </a>
                <a className="dropdown-item" onClick={this.delete}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.COURSE, file_source, collect)(Course);
