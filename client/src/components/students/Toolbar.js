import React, { Component } from "react";

const style = {
  margin: 2
};

const StudentEditToolbar = props => {
  return (
    <div>
      <button
        onClick={() => props.save(props.slides)}
        class="btn btn-default btn-icon-text waves-effect"
      >
        <i class="zmdi zmdi-floppy" /> Save
      </button>

      <button
        onClick={() => props.cancel()}
        class="btn btn-default btn-icon-text waves-effect"
      >
        <i class="zmdi zmdi-undo" /> Cancel
      </button>

      <button
        onClick={() => props.clear_all()}
        class="btn btn-default btn-icon-text waves-effect"
      >
        <i class="zmdi zmdi-block" /> Clear
      </button>
    </div>
  );
};

export default StudentEditToolbar;
