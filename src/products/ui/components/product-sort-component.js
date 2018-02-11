import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductSortComponent extends Component {
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-2">
                <div className="row">
                    <div className="col-md-4 col-sm-2 text-right">
                        <h3 className="">Sort</h3>
                    </div>
                    <div className="col-md-8 col-sm-10 blocks">
                        <div className="btn-group btn-group-lg" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-info ">Size</button>
                            <button type="button" className="btn btn-info">Price</button>
                            <button type="button" className="btn btn-info">Id</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProductSortComponent.propTypes = {

};

export default ProductSortComponent;