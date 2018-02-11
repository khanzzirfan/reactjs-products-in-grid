import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as  ProductActions from 'src/products/actions/product-actions';

import ProductComponent from 'src/products/ui/components/product-component';
import ErrorComponent from 'src/common/error-component';
import LoadingComponent from 'src/common/loading-component';
import ProductSortComponent from 'src/products/ui/components/product-sort-component';

class ProductsContainer extends Component {

    constructor(props) {
        super(props);
        this.handleBottomScroll = this.handleBottomScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleBottomScroll);
        this.handleFetchProducts();
    }

    componentWillMount(){
        window.removeEventListener('scroll', this.handleBottomScroll);
    }

    handleBottomScroll (e) {

        e.preventDefault();
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        const {hasMore} = this.props.products;
        console.log('At the bottom');
        if(reachedBottom && hasMore){
            this.handleFetchProducts();
        }
    }

    handleFetchProducts = () => {
        var { page, sortBy, limit } = this.props.products;
        let nextPage = page + 1;
        let queryParams = {
            page: nextPage,
            sortBy: sortBy,
            limit: limit
        }
        this.props.productActions.fetchProductsData(queryParams);
    }

    onLoadMore = () => {
        this.handleFetchProducts();
    }

    render() {
        const { isLoading, isError, data, hasMore } = this.props.products;
        return (
            <div className="row">
                {
                    !!(isLoading && data.length <= 0) && <LoadingComponent />
                }
                {
                    !!(isError) && <ErrorComponent />
                }
                {
                    !!(data && data.length > 0) && <ProductSortComponent />
                }
                {
                    !!(data && data.length > 0) && data.map(function (prod, index) {
                        return (
                            <ProductComponent key={index} product={prod} />
                        )
                    })
                }
                {
                    !!(isLoading && hasMore && data.length > 0) && <LoadingComponent />
                }
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={this.onLoadMore}> Load more </button>
                </div>
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
