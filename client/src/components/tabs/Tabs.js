import React, { PureComponent, Children, cloneElement } from "react";
import PropTypes from "prop-types";
import "../../styles/Tabs.css";

class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: 0
    };
  }

  getAdditionalProps = (index, props) => ({
    handleClick: this.handleTabClick,
    tabIndex: index,
    selected: index === this.state.selectedTabIndex,
    ...props
  });

  getChildrenTabsWithProps = () => {
    return Children.map(this.props.children, (child, index) =>
      cloneElement(child, this.getAdditionalProps(index, child.props))
    );
  };

  getActiveTabContent = () => {
    const { children } = this.props;
    const { selectedTabIndex } = this.state;
    const currentChildren = children[selectedTabIndex];

    if (currentChildren) {
      return currentChildren.props.children;
    }

    return false;
  };

  handleTabClick = tabIndex => {
    this.setState({ selectedTabIndex: tabIndex });
  };

  render() {
    const childrenTabsWithProps = this.getChildrenTabsWithProps();
    const tabContent = this.getActiveTabContent();

    return (
      <div className="tabs-1">
        <ul className="tabs-list">{childrenTabsWithProps}</ul>
        <div className="tabs-content">{tabContent}</div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Tabs;
