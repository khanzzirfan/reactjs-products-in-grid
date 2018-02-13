import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getCustomisedRelativeDate, currencyFormat} from 'src/utils/app-utils';

class ProductComponent extends Component {
    

    render() {
        const { product } = this.props;
        let relativeTime = getCustomisedRelativeDate(product.date);
        let currencyValue = currencyFormat(product.price);
        return (
            <div className="col-lg-3 col-md-3 col-sm-6 portfolio-item">
                <div className="card h-100">
                    <div className={"face"} id="product-face" style={{ fontSize: product.size + 'px' }}>
                        {product.face}
                    </div>
                    <div className="card-body">
                        <p className="card-text">id: {product.id} </p>
                        <p className="card-text"> size: {product.size}</p>
                        <p className="card-text">price: {currencyValue} </p>
                        <p className="card-text">date: {relativeTime}</p>
                    </div>
                </div>
            </div>
        );
    }
}

ProductComponent.propTypes = {
    product: PropTypes.object
};

export default ProductComponent;