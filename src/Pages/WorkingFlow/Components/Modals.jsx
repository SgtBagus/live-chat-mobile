import React from "react";
import PropTypes from "prop-types";
import Container from "../../../Components/Container";

const ModalsWorkingList = ({
    target, modalHeight, modalTitle,
}) => {
    return (
        <>
            <div
                className="address-box"
                data-bs-toggle="offcanvas"
                data-bs-target={`#${target}`}
            >
                <div className="address-name">
                    <div className="address-icon" style={{ width: '35px', height: '35px' }}>
                        <i className="ri-information-line" style={{ fontSize: '25px' }} />
                    </div>
                    <h3>Trapi Sakit Lambung !</h3>
                </div>
                <div className="order-detail-box m-0 p-0 border-0">
                    <div className="product-title">
                        <h4>Lakukan Beberapa Langka Berikut !</h4>
                    </div>
                    <ul className="order-tracking-list">
                        <li className="finish">
                            <div className="order-box">
                                <div className="left-icon">
                                    <i className="ri-check-line" />
                                </div>
                                <div className="right-content">
                                    <h4>Senam Perut</h4>
                                    <h6>Lakukan seperti video beri...<b>Lihat Detail !</b></h6>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="order-box">
                                <div className="left-icon">
                                    <i className="ri-task-line" />
                                </div>
                                <div className="right-content">
                                    <h4>Trapi berdiri</h4>
                                    <h6>Lakukan seperti video beri...<b>Lihat Detail !</b></h6>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr className="my-3"/>
                <div className="address-detail">
                    <h5 className="fw-bold">Progress atau keluhan !</h5>
                    <p className="h5">
                        <q>Perkembangan adalah kunci menuju keberhasilan, dan kelihatan trapi merupakan bukti perjalanan yang berarti.</q>
                    </p>
                </div>
                <h6 className="h5 fw-bold d-flex text-align-center justify-content-end">< i className="ri-calendar-line me-1" /> 19 Feb 2023</h6>
            </div>

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
                    <Container style={{ maxHeight: '490px', overflow: 'auto' }}>
                        this is it
                    </Container>
                </div>
            </div>
        </>
    );
};

ModalsWorkingList.propTypes = {
    target: PropTypes.string,
    modalHeight: PropTypes.string,
    modalTitle: PropTypes.string,
};

ModalsWorkingList.defaultProps = {
    target: "modalsPopup",
    modalHeight: "100%",
    modalTitle: "Filter",
};

export default ModalsWorkingList;
