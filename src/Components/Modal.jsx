import React from "react";
import PropTypes from 'prop-types';

const Modals = (
    {
        className, style, target, icon,
        modalHeight, modalTitle, children,
        modalButtonCancel, modalButtonApply,
        modalButtonCancelOnClick, modalButtonApplyOnClick,       
    }
) => {
    return (
        <>
            <button
                type="button"
                className={className}
                style={style}
                data-bs-toggle="offcanvas"
                data-bs-target={`#${target}`}
            >
                <i className={icon} />
            </button>

            <div
                className="offcanvas offcanvas-bottom theme-bottom-offcanvas category-filter-offcanvas"
                tabIndex="-1"
                id={target}
                style={{ height: modalHeight }}
            >
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title">{modalTitle}</h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    >
                        <i className="ri-close-fill"></i>
                    </button>
                </div>
                <div className="offcanvas-body px-0">
                    {children}
                    <div className="category-group">
                        <button
                            type="button"
                            className="btn"
                            data-bs-dismiss="offcanvas"
                            onClick={modalButtonCancelOnClick}
                        >
                            {modalButtonCancel}
                        </button>
                        <button
                            type="button"
                            className="btn btn-gradient theme-bg-color"
                            data-bs-dismiss="offcanvas"
                            onClick={modalButtonApplyOnClick}
                        >
                            {modalButtonApply}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

Modals.propTypes = {
    className: PropTypes.string,
    style: PropTypes.shape({}),
    target: PropTypes.string,
    icon: PropTypes.string,
    modalHeight: PropTypes.string,
    modalTitle: PropTypes.string,

    children: PropTypes.node,

    modalButtonCancel: PropTypes.string,
    modalButtonApply: PropTypes.string,
    modalButtonCancelOnClick: PropTypes.func,
    modalButtonApplyOnClick: PropTypes.func,       
};

Modals.defaultProps = {
    className: 'btn btn-primary',
    style: {},
    target: 'modalsPopup',
    icon: 'ri-information-line',
    modalHeight: '100%',
    modalTitle: 'Filter',

    children: null,

    modalButtonCancel: 'Cancel',
    modalButtonApply: 'Apply',
    modalButtonCancelOnClick: () => {},
    modalButtonApplyOnClick: () => {}, 
};

export default Modals;
