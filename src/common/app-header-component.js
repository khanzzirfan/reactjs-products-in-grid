import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppHeaderComponent extends Component {
    render() {
        return (
                <div className="col-md-12 col-lg-12">
                    <h3 className="text-center">{`Creatella  `}
                        <small>
                            Products grid
                </small>
                    </h3>
                    <span>This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.    </span>
                </div>

        );
    }
}

AppHeaderComponent.propTypes = {

};

export default AppHeaderComponent;