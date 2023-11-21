
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Container = (
    { children, title, link, linkName }
) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    return (
        <section>
            <div className="custom-container my-3">
                {
                    title && (
                        <div className="title d-flex align-items-center justify-content-between">
                            <h4 className="text-dark-bg">{ title }</h4>
                            {
                                link && (
                                    <div
                                        className="content-color lh-1"
                                        onClick={() => handelNavigate(link)}
                                        style={{
                                            cursor: 'pointer', 
                                        }}
                                    >
                                        {linkName}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                { children }
            </div>
        </section>
    )
}

Container.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    linkName: PropTypes.string,
    children: PropTypes.node,
};

Container.defaultProps = {
    title: null,
    link: null,
    linkName: null,
    children: null,
};

export default Container;
