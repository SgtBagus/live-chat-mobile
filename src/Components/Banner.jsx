import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_IMAGE } from './DefaultValue/config';

export const Banner = (
    { src, alt }
) => {
    return (
        <img src={src} className="img-fluid rounded" alt={alt} />
    )
}

Banner.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
};

Banner.defaultProps = {
    src: DEFAULT_IMAGE,
    alt: 'Banner Image',
};

export default Banner;
