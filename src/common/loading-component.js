import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from 'src/common/common.scss';

class LoadingComponent extends Component {
    render() {
        return (
            <div className="col-md-12 text-center">
                <div className="d-flex flex-column justify-content-center">
                    <div className="p-2">
                        <div className="loading">
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                            <div className="loading-bar"></div>
                        </div>
                    </div>
                    <div className="p-2"> </div>
                    <div className="p-2"> </div>
                    <div className="p-2"> Loading....</div>
                </div>
            </div>
        );
    }
}

LoadingComponent.propTypes = {

};

export default LoadingComponent;