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

    handleBottomScroll = _.debounce(function(e){

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
    }, 350);

 
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

    getRandomAdsId() {
        let adRange = 10;
        var newAdId = 0;
        var isAdIdAvailable = true;
        while (isAdIdAvailable) {
            newAdId = Math.floor(Math.random(new Date().getTime()) * adRange);
            if (this.advertisementIds.length == 0) {
                this.advertisementIds.push(newAdId);
                isAdIdAvailable = false;
            }
            else {
                var lastId = this.advertisementIds[this.advertisementIds.length -1];
                if (newAdId !== lastId) {
                    this.advertisementIds.push(newAdId);
                    isAdIdAvailable = false;
                }
            }
        }
        return newAdId;
    }

    /**A unique for the keys in the list*/
    generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    render() {
        const { isLoading, isError, data, hasMore, sortBy } = this.props.products;
        let productComponent = [];
        var adsCount = 0;
        var that = this;
        if (data && data.length > 0) {
            data.forEach(function (prod, index) {
                productComponent.push(<ProductComponent key={that.generateKey(prod.id)} product={prod} />);
                // if ((index + 1) % 20 === 0) {
                //     let adsId = that.getRandomAdsId();
                //     productComponent.push(<AdvertisementComponent key={index} adsId={adsId} />);
                // }
            });
        }

        return (
            <div className="row">
                {
                    !!(isLoading && data.length <= 0) && <LoadingComponent />
                }
                {
                    !!(isError) && <ErrorComponent />
                }
                {productComponent}
                {
                    !!(isLoading && hasMore && data.length > 0) && <LoadingComponent />
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
