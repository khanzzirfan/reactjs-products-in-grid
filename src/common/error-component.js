import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from 'src/common/common.scss';

class ErrorComponent extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occured, Requested data not found!
                        </div>
                        <div className="error-actions">
                            <a href="javascript:void(0)" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
                                Take Me Home </a><a href="javascript:void(0)" className="btn btn-default btn-lg"><span className="glyphicon glyphicon-envelope"></span> Contact Support </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ErrorComponent.propTypes = {

};

export default ErrorComponent;