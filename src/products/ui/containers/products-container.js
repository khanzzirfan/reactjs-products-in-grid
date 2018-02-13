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
import { getRandomInRange } from 'src/utils/app-utils';
import AdvertisementComponent from 'src/products/ui/components/advertisement-component';
import s from 'src/products/products.scss';

class ProductsContainer extends Component {

    constructor(props) {
        super(props);
        this.handleBottomScroll = this.handleBottomScroll.bind(this);
        this.advertisementIds = [];
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleBottomScroll);
        this.handleFetchProducts();
    }

    componentWillMount() {
        window.removeEventListener('scroll', this.handleBottomScroll);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products && this.props.products.sortBy !== nextProps.products.sortBy) {
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

    handleBottomScroll = _.debounce(function (e) {

        e.preventDefault();
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const reachedBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        const { hasMore } = this.props.products;
        console.log('At the bottom');
        if (reachedBottom && hasMore) {
            //debounce to send call only for few seconds;
            this.handleFetchProducts();
        }
    }, 300);


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

    generateAdsId() {
        let adRange = 10;
        var newAdId = 0;
        newAdId = Math.floor(Math.random(new Date().getTime()) * adRange);
        while(this.advertisementIds.length > 0 && newAdId === this.advertisementIds[this.advertisementIds.length - 1]){
            newAdId = Math.floor(Math.random(new Date().getTime()) * adRange);
        }
        return newAdId;
    }

    render() {
        const { isLoading, isError, data, hasMore, sortBy } = this.props.products;
        let productComponent = [];
        let productsArray = [];
        var counter = 0;
        var that = this;

        Object.keys(data).forEach(function (key) {
            productsArray = productsArray.concat(data[key]);
        });

        if (productsArray && productsArray.length > 0) {
            productsArray.forEach(function (prod, index) {
                productComponent.push(<ProductComponent key={prod.id} product={prod} />);
                if ((index + 1) % 20 === 0) {
                    let advertisementId = that.advertisementIds[counter++];
                    if(advertisementId ===undefined){
                        advertisementId = that.generateAdsId();
                        that.advertisementIds.push(advertisementId);
                    }
                    productComponent.push(<AdvertisementComponent key={index} adsId={advertisementId} />);
                }
            });
        }

        return (
            <div className="row">
                {
                    !!(isLoading && productComponent.length <= 0) && <LoadingComponent />
                }
                {
                    !!(isError) && <ErrorComponent />
                }
                {productComponent}
                {
                    !!(isLoading && hasMore && productComponent.length > 0) && <LoadingComponent />
                }
                {
                    /**When data loading finished and has no more data to laod show end of data */
                    !!(isLoading == false && hasMore == false) && <EndOfDataComponent />
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
