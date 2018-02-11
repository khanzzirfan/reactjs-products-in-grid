import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from 'src/products/products.scss';

class ProductComponent extends Component {
    render() {
        const { product } = this.props;
        debugger;
        return (
            <div className="col-lg-4 col-md-4 col-sm-6 portfolio-item">
                <div className="card h-100">
                    <div className="face">
                        {product.face}
                    </div>
                    <div className="card-body">
                        <p className="card-text">id: {product.id} </p>
                        <p className="card-text"> size: {product.size}</p>
                        <p className="card-text">price: ${product.price} </p>
                        <p className="card-text">date: {product.date} </p>
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