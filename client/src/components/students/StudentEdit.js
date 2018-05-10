import React, { Component } from "react";
import update from "immutability-helper";
import { DragDropContext, DropTarget } from "react-dnd";
import { Motion, spring } from "react-motion";
import HTML5Backend from "react-dnd-html5-backend";
// import Course from "./Course";
import Slide from "../courses/Slide";
// import PlaylistEditToolbar from './Toolbar';
import { ItemTypes } from "../../utils/ItemTypes";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
// import SlideView from '@trudigital/trudigital-render';
// import PreviewModal from './PreviewModal';
import axios from "axios";

// This is a global to handle incoming new slides from FileManager
let new_slide = 0;
let new_item;

// const API_URL = `${process.env.REACT_APP_API_URL_BASE}/trudigital`;
// const config = {
//     headers: {
//         'accept': 'application/json',
//         'content-type': 'application/x-www-form-urlencoded',
//         'authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`,
//     },
// };

// overwrite style
const modalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0,0.5)"
    // zIndex: 10000,
    // position: "fixed"
  }
};

const mainStyle = {
  app: {
    margin: "120px 0"
  },
  button: {
    backgroundColor: "#408cec",
    border: 0,
    padding: "12px 20px",
    color: "#fff",
    margin: "0 auto",
    width: 150,
    display: "block",
    borderRadius: 3
  }
};

const playlist_target = {
  hover(props, monitor, component) {
    // This is fired very often and lets you perform side effects
    // in response to the hover. You can't handle enter and leave
    // here—if you need them, put monitor.isOver() into collect() so you
    // can just use componentWillReceiveProps() to handle enter/leave.

    // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const componentRect = findDOMNode(component).getBoundingClientRect();

    // You can check whether we're over a nested drop target
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    // You will receive hover() even for items for which canDrop() is false
    const canDrop = monitor.canDrop();
  }
  // drop(props, monitor, { allowedDropEffect }) {
  //   new_item = monitor.getItem();
  //   new_slide++;
  //   return monitor.getItem();
  // }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}
class StudentEdit extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    allowedDropEffect: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.moveCard = this.moveCard.bind(this);
    this.clearAll = this.clearAll.bind(this);

    this.state = {
      cards: [
        {
          course_name: "math",
          id: 1
        },
        {
          course_name: "matsadsssssh",
          id: 2
        },
        {
          course_name: "masadfth",
          id: 3
        }
      ]
    };
  }

  moveCard(dragIndex, hoverIndex, value) {
    console.log(dragIndex, hoverIndex, value);
    console.log(this.state);
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    // this.editSlideDuration(dragIndex);

    this.setState(
      update(this.state, {
        cards: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }
      })
    );
  }

  componentDidUpdate() {
    if (new_slide === 1) {
      let new_content = {
        id: new_item.id
        // grade: 20,
        // type: "file",
        // content: new_item.file,
      };
      this.setState({
        cards: [
          ...this.state.cards,
          {
            id: new_item.id
            // grade: 20,
            // type: "file",
            // content: new_item.file,
            // schedule: { start_date: 0, start_time: 0, end_date: 0, end_time: 0 }
          }
        ]
      });
      new_slide = new_slide - 1;
    }
  }

  editSlideDuration(index, value) {
    let cards = [...this.state.cards]; // create the copy of state array
    cards[index].duration = 20; //new value
    this.setState({ cards }); //update the value
  }

  clearAll() {
    if (window.confirm("Do you really want to clear all contents?")) {
      this.setState({ cards: [] });
    }
  }

  removeSlide(index) {
    let cards = this.state.cards;
    cards.splice(index, 1);
    this.setState({ cards });
  }

  // closeModal() {
  // 	this.setState({
  // 		isModalOpen: false
  // 	})
  // }

  // openModal(web_src) {
  // 	this.setState({
  //           web_src,
  //           isModalOpen: true,
  //       })
  //   }

  render() {
    const { cards } = this.state;
    const {
      canDrop,
      isOver,
      allowedDropEffect,
      connectDropTarget
    } = this.props;
    const isActive = canDrop && isOver;

    return connectDropTarget(
      <div className="fm-object fm-folder" style={{ width: "410px" }}>
        <div className="fm-object-meta">
          <h3>Class Schedule:</h3>
          <p>#Courses {cards.length}</p>
          <button className="btn btn-danger waves-effect">
            <i className="zmdi zmdi-arrow-back" />
          </button>
          <p>Last updated: </p>
        </div>
        <div style={{ marginBottom: "10px" }}>Toolbar</div>
        <div className="container" />
        {cards
          ? cards.map((card, i) => (
              <Motion
                key={i}
                style={{
                  y: spring(card.order * 80, { stiffness: 500, damping: 32 })
                }}
              >
                {({ y }) => (
                  <Slide
                    update={this.editSlideDuration.bind(this)}
                    content={card}
                    id={card.id}
                    index={i}
                    moveCard={this.moveCard}
                    style={{
                      transform: "translate3d(0, " + y + "px, 0)"
                    }}
                    onRemoveSlide={() => {
                      this.removeSlide(i);
                    }}
                    onPreviewSlide={web_src => {
                      this.openModal(web_src);
                    }}
                  />
                )}
              </Motion>
            ))
          : null}
      </div>
    );
  }
}
export default DropTarget(
  ItemTypes.COURSE,
  playlist_target,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(StudentEdit);
