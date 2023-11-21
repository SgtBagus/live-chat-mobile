
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Container = (
    { className, children, title, link, linkName }
) => {
    const navigate = useNavigate();
    const handelNavigate = (path) => {
        return navigate(path);
    }

    return (
        <section className={className}>
            <div className="custom-container">
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
    className: PropTypes.string,
    title: PropTypes.string,
    link: PropTypes.string,
    linkName: PropTypes.string,
    children: PropTypes.node,
};

Container.defaultProps = {
    className: '',
    title: null,
    link: null,
    linkName: null,
    children: null,
};

export default Container;
