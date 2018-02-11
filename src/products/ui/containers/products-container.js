import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ProductComponent from 'src/products/ui/components/product-component';

class ProductsContainer extends Component {


    render() {
        return (
            <div className="row">
                {
                    _.times(10, function(n) {
                        return (
                            <ProductComponent key={n} />
                        )
                    })
                }
            </div>
        );
    }
}

ProductsContainer.propTypes = {

};

export default ProductsContainer;