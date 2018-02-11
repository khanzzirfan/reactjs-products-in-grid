import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SortButtonComponent extends Component {
    handleOnSortClick = () => {
        var sortBy = this.props.sortOption.toLowerCase();
        if (this.props.onSortClick)
            this.props.onSortClick(sortBy);
    }

    render() {
        const {sortOption, currentSort} = this.props;
        var activeClass = sortOption.toLowerCase() == currentSort? "btn-primary": "btn-info";

        return (
            <button type="button" className={`btn ${activeClass}`} onClick={this.handleOnSortClick}>{sortOption}</button>
        );
    }
}

SortButtonComponent.propTypes = {
    onSortClick: PropTypes.func,
    sortOption: PropTypes.string,
    currentSort: PropTypes.string
};

export default SortButtonComponent;