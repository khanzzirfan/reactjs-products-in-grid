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
import EndOfDataComponent from 'src/common/end-of-data-component.js';

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

    componentWillReceiveProps(nextProps){
        if(nextProps.products && this.props.products.sortBy !== nextProps.products.sortBy){
            debugger;
            //likely sortBy has changed;
            let queryParams = {
                page: nextProps.products.page + 1,
                sortBy: nextProps.products.sortBy,
                limit: nextProps.products.limit
            }
            this.props.productActions.fetchProductsData(queryParams);
        }
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

    handleOnSortClick = (sortBy) => {
        this.props.productActions.sortby_selection(sortBy);
    }

    render() {
        const { isLoading, isError, data, hasMore, sortBy } = this.props.products;
        return (
            <div className="row">
                {
                    !!(isLoading && data.length <= 0) && <LoadingComponent />
                }
                {
                    !!(isError) && <ErrorComponent />
                }
                {
                    !!(data && data.length > 0) && <ProductSortComponent onSortClick = {this.handleOnSortClick} currentSort={sortBy}/>
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
                {
                    /**When data loading finished and has no more data to laod show end of data */
                    !!(isLoading==false && hasMore==false) && <EndOfDataComponent />
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
