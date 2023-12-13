import React from "react";
import PropTypes from "prop-types";

import Button from "../../../Components/Button";

import { checkfileUrl } from "../../../Helper/checkFile";

const Task = ({
    finish, title, task, note, attact,
    updatedAt, createdAt, finishDate, icon,
}) => {
    return (
        <li className={finish ? 'finish' : ''}>
            <div className="order-box">
                <div className="main-content d-flex justify-content-between w-100">
                    <div className="left-icon">
                        {
                            finish ? (
                                <i className="ri-check-line" />
                            ) : (
                                <i className={icon} />
                            )
                        }
                    </div>
                    <div className="right-content">
                        <h4>{title}</h4>
                        <div>
                            <span className="mb-2">{task}</span>
                            <p>{note}</p>                
                            {
                                attact && (
                                    <>
                                        {
                                            checkfileUrl(attact) ? (
                                                <img
                                                    src={attact}
                                                    className="img-fluid"
                                                    style={{ objectFit: "cover" }}
                                                    alt="gambar Todo-list"
                                                />
                                            ) : (
                                                <video
                                                    className="w-100"
                                                    controls
                                                    style={{ objectFit: 'cover' }}
                                                >
                                                    <source src={attact} type="video/mp4" />
                                                    Device anda tidak support video HTML.
                                                </video>
                                            )
                                        }
                                    </>
                                )
                            }
                        </div>
                        <hr />
                        <div className="d-flex flex-column my-2">
                            {
                                finish ? (
                                    <>
                                        <h6 className="d-flex text-align-center fw-bold">
                                            <i className="ri-checkbox-circle-line me-1" /> Status Kegiatan: Selesai
                                        </h6>
                                        <h6 className="d-flex text-align-center">
                                            <i className="ri-calendar-line me-1" /> Diselesikan Pada: {finishDate}
                                        </h6>
                                    </>
                                ) : (
                                    <h6 className="d-flex text-align-center fw-bold">
                                        <i className="ri-close-circle-line me-1" /> Status Kegiatan: Belum Selesai
                                    </h6>
                                )
                            }
                            <hr />
                            <small className="d-flex text-align-center">
                                <i className="ri-calendar-line me-1" /> Dibuat Pada: {createdAt}
                            </small>
                            <small className="d-flex text-align-center">
                                <i className="ri-calendar-line me-1" /> Diupdate Pada: {updatedAt}
                            </small>
                        </div>  
                    </div>
                </div>
                <div className="w-100">
                    <div className="button-complete-task">
                        {
                            finish ? (
                                <Button
                                    className="btn btn-danger my-2"
                                    label="Trapi Ini belum selesai !"
                                    onClick={() => {}}
                                />
                            ) : (
                                <Button
                                    className="btn btn-success my-2"
                                    label="Selesaikan Trapi !"
                                    onClick={() => {}}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </li>
    );
};

Task.propTypes = {
    finish: PropTypes.bool,
    title: PropTypes.string,
    task: PropTypes.string,
    note: PropTypes.string,
    attact: PropTypes.string,
};

Task.defaultProps = {
    finish: false,
    title: 'Title',
    task: 'Task',
    note: 'Note',
    attact: null,
};

export default Task;
