import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as  ProductActions from 'src/products/actions/product-actions';
import ProductSortComponent from 'src/products/ui/components/product-sort-component';
import AppHeaderComponent from 'src/common/app-header-component';

class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleOnSortClick = (sortBy) => {
        this.props.productActions.sortby_selection(sortBy);
    }

    render() {
        const { sortBy } = this.props;
        return (
            <div className="container text-white no-padding d-flex flex-column">
                    <AppHeaderComponent />
                    <ProductSortComponent onSortClick={this.handleOnSortClick} currentSort={sortBy} />
            </div>
        );
    }
}

AppContainer.propTypes = {
    sortBy: PropTypes.string
};

function mapStateToProps(state) {
    return {
        sortBy: state.products.sortBy
    }
}

function mapDispatchToProps(dispatch) {
    return {
        productActions: bindActionCreators(ProductActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
