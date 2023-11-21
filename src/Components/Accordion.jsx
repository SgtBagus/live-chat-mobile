import React from 'react';
import PropTypes from 'prop-types';

export const Accordion = ({
    idAccordion, data,
}) => {
    return (
        <div className="accordion accordion-style-1" id={idAccordion}>
            {
                data.map(({
                    id, title, desc, show,
                }) => {
                    const idAccordion = `pannelHeading-${id}`;

                    return (
                        <div className="accordion-item" key={id}>
                            <h2 className="accordion-header">
                                <button
                                    type="button"
                                    className={`accordion-button ${show || 'collapsed'}`}
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${idAccordion}`}
                                    aria-expanded="false"
                                >
                                    {title}
                                </button>
                            </h2>
                            <div id={idAccordion} className={`accordion-collapse collapse ${show && 'show'}`} style={{}}>
                                <div className="accordion-body">
                                    <p>{ desc }</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

Accordion.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            desc: PropTypes.string,
            show: PropTypes.bool,
        })
    ),
};

Accordion.defaultProps = {
    data: [{
        id: 1,
        title: 'Lorem Ipsum',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        show: true,
    }],
};

export default Accordion;
