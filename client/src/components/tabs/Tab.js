import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Tab extends PureComponent {
	handleClick = () => {
		this.props.handleClick(this.props.tabIndex);
	};

	render() {
		return (
			<li
				className={`tabs-item ${this.props.selected
					? 'tabs-item--selected'
					: ''}`}
				onClick={this.handleClick}
			>
				{this.props.title}
			</li>
		);
	}
}

Tab.propTypes = {
	title: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	tabIndex: PropTypes.number,
	selected: PropTypes.bool,
};

export default Tab;