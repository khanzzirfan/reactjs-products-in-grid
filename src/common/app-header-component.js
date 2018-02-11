import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppHeaderComponent extends Component {
    render() {
        return (
            <h1 className="my-4">Creatella
                <small>     
                    This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.   
                </small>
            </h1>
        );
    }
}

AppHeaderComponent.propTypes = {

};

export default AppHeaderComponent;