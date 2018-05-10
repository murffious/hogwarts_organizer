import React, { Component } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
// import SlideInfo from "./SlideInfo";

const AWS_S3_URL = process.env.REACT_APP_AWS_S3_URL;

const card_source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const card_target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
    const canDrop = monitor.canDrop();
  }
};

class Slide extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  render() {
    const {
      style,
      content,
      isDragging,
      connectDragSource,
      connectDropTarget,
      index
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    const zIndex = isDragging ? 2 : 1;
    return connectDragSource(
      connectDropTarget(
        <div
          className="card"
          style={{ zIndex, opacity, ...style }}
          ref={node => (this.node = node)}
          key={content.index}
        >
          {content.course_name}
          {/* {content} */}
          {/* {!content.content.thumb_src.includes("http")?
            <img src={`${AWS_S3_URL}${content.content.thumb_src}`} width="95%" />:
            <img src={content.content.thumb_src} width="95%"/>}<br /> */}
          {/* <SlideInfo
                    onRemoveSlide={this.props.onRemoveSlide} 
                    onPreviewSlide={this.props.onPreviewSlide}
                    update={this.props.update}
                    key={content._id}
                    index={index}
                    duration={content.duration}
                    web_src={content.content.web_src[0]}  
                /> */}
        </div>
      )
    );
  }
}

export default DropTarget(ItemTypes.COURSE, card_target, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.COURSE, card_source, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(Slide)
);
