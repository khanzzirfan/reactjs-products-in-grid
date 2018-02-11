import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EndOfDataComponent extends Component {
    render() {
        return (
            <div className="col-md-12 text-center">
                <span>{"~ end of catalogue ~"}</span>
            </div>
        );
    }
}

EndOfDataComponent.propTypes = {

};

export default EndOfDataComponent;