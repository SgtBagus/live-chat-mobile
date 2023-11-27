import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
    className, label, onClick,
    style, disabled, type,
}) => {
    return (
        <button
            type={type}
            className={`btn ${className}`}
            onClick={() => onClick()}
            style={style && (style)}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
    onClick: PropTypes.func,
    style: PropTypes.shape({}),
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

Button.defaultProps = {
    className: 'explore-btn',
    label: 'Button Text',
    onClick: () => {},
    style: {},
    disabled: false,
    type: 'button',
};

export default Button;
