import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortButtonComponent from 'src/products/ui/components/sort-button-component';

class ProductSortComponent extends Component {

    handleOnSortClick = (sortOption) => {
        if (this.props.onSortClick)
            this.props.onSortClick(sortOption);
    }

    render() {
        const {currentSort}= this.props;
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2">
                <div className="row">
                    <div className="col-md-4 col-sm-2 text-right">
                        <h3 className="">Sort</h3>
                    </div>
                    <div className="col-md-8 col-sm-10 blocks">
                        <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                            <SortButtonComponent onSortClick={this.handleOnSortClick} sortOption="Size" currentSort={currentSort}/>
                            <SortButtonComponent onSortClick={this.handleOnSortClick} sortOption="Price" currentSort={currentSort}/>
                            <SortButtonComponent onSortClick={this.handleOnSortClick} sortOption="Id" currentSort={currentSort}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProductSortComponent.propTypes = {
    onSortClick: PropTypes.func,
    currentSort: PropTypes.string
};

export default ProductSortComponent;