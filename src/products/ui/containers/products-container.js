import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as  ProductActions from 'src/products/actions/product-actions';

import ProductComponent from 'src/products/ui/components/product-component';
import ErrorComponent from 'src/common/error-component';
import LoadingComponent from 'src/common/loading-component';

class ProductsContainer extends Component {

    componentDidMount() {
        this.props.productActions.fetchProductsData();
    }

    render() {
        const { isLoading, isError, data } = this.props.products;
        return (
            <div className="row">
                {
                    !!(isLoading) && <LoadingComponent />
                }
                {
                    !!(isError) && <ErrorComponent />
                }
                {
                    !!(data && data.length > 0) && data.map(function (prod, index) {
                        return (
                            <ProductComponent key={index} product={prod} />
                        )
                    })
                }
            </div>
        );
    }
}

ProductsContainer.propTypes = {
    products: PropTypes.object
};

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productActions: bindActionCreators(ProductActions, dispatch)
        //companyInfoActions: bindActionCreators(CompanyInfoActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
