import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
    className, label, onClick,
}) => {
    return (
        <button 
            className={`btn ${className}`}
            onClick={() => onClick()}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

Button.defaultProps = {
    className: 'explore-btn',
    label: 'Button Text',
    onClick: () => {},
};

export default Button;
