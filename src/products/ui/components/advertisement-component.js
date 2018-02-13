import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AdvertisementComponent extends Component {
    render() {
        const { adsId } = this.props;
        return (
            <div className="col-md-12 col-sm-12 text-center">
                
                    <img id={adsId} src={`/ads/?r=${adsId}`} className="rounded" alt={`/ads/?r=${adsId}`} />
                
            </div>
        );
    }
}

AdvertisementComponent.propTypes = {
    adsId: PropTypes.number
};

export default AdvertisementComponent;