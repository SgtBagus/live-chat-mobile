import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE_ICON } from './DefaultValue/config';

export const CategoryList = ({
    data,
}) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    return (
        <ul className="category-list">
            {
                data.map((
                    { id, src, title, link }
                ) => (
                    <li key={id}>
                        <div
                            className="category-box"
                            onClick={() => handelNavigate(link)}
                            style={{
                                cursor: 'pointer', 
                            }}
                        >
                            <img src={src} className="img-fluid rounded-circle" alt="" />
                            <h5>{title}</h5>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

CategoryList.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            src: PropTypes.string,
            title: PropTypes.string,
            link: PropTypes.string,
        })
    ),
};

CategoryList.defaultProps = {
    data: [{
        id: 1,
        src: DEFAULT_IMAGE_ICON,
        title: 'Category List',
        link: '#',
    }],
};

export default CategoryList;
