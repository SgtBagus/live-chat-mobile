import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Button = ({
    className, label, link,
}) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    return (
        <button 
            className={`btn ${className}`}
            onClick={() => handelNavigate(link)}
        >
            {label}
        </button>
    )
}

Button.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    link: PropTypes.string,
};

Button.defaultProps = {
    className: 'explore-btn',
    label: 'Button Text',
    link: '#',
};

export default Button;
