import React, { Component } from "react";
import $ from "jquery";
// import "../../styles/Table.css";
$.DataTable = require("datatables.net");

function reloadTableData(data) {
  const table = $(".data-table-wrapper")
    .find("table")
    .DataTable();

  table.clear();
  table.rows.add(data);
  table.draw();
}

export default class Table extends Component {
  shouldComponentUpdate(next_props) {
    reloadTableData(next_props.data);
    this.props.onTableReload();
    return false;
  }

  componentDidMount() {
    $(this.refs.main).DataTable({
      dom: '<"data-table-wrapper"lftipr>',
      data: this.props.data,
      columns: this.props.columns,
      ordering: true
    });

    let component = this;

    $(".data-table-wrapper").on("click", "td", function() {
      component.props.onRowClick($(this));
    });
    this.props.onTableLoad();
  }

  componentWillUnmount() {
    $(".data-table-wrapper")
      .find("table.dataTable")
      .DataTable()
      .destroy(true);
  }

  render() {
    return (
      <div>
        <table
          ref="main"
          className="table table-striped"
          style={{ width: "100%" }}
        />
      </div>
    );
  }
}
