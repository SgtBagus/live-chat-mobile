import React from 'react'
import PropTypes from 'prop-types';

const Loading = ({
    title,
}) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <div className="overlay">
                <i className="fas fa-3x fa-sync-alt fa-spin mx-2" />
                <div className="text-bold pt-2">
                    {title}
                </div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    title: PropTypes.string,
};

Loading.defaultProps = {
    title: 'Loading...',
};

export default Loading;
