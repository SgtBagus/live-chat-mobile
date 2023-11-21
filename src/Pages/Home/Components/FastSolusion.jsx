import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE } from '../../../Components/DefaultValue/config';

export const FastSolusion = ({ data }) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    return (
        <div className="product-wrapper">
            {
                data.map(({
                    id, title, desc, stepLength, link, srcImage
                }) => {
                    return (
                        <div className="product-box" key={id} onClick={() => handelNavigate(link)}>
                            <div className="product-image">
                                <img src={srcImage} className="img-fluid" alt="" />
                            </div>
                            <div className="product-content">
                                <h5>{title}</h5>
                                <p>
                                    {desc.length > 120 ? `${desc.substring(0, 120)}...` : desc}
                                </p>
                                <div className="d-flex align-items-center">
                                    <i className="ri-list-unordered" />
                                    <p className="title-color m-0 mx-2">Total Step : {stepLength}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

FastSolusion.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            desc: PropTypes.string,
            stepLength: PropTypes.string,
            srcImage: PropTypes.string,
            link: PropTypes.string,
        })
    ),
};

FastSolusion.defaultProps = {
    data: [{
        id: 1,
        title: 'Lorem Ipsum',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        stepLength: '5',
        srcImage: DEFAULT_IMAGE,
        link: '#',
    }],
};

export default FastSolusion;
