import React from "react";
import PropTypes from "prop-types";

import fireBaseTime from "../../../Helper/fireBaseTime";
import { DEFAULT_TASK_LIST } from "../enum";

import PopupWorkingList from "./Popup";

const createProgressBar = (value) => (
    <div className="progress-bar-section my-2">
        <div className="landing-progress-bar">
            <div className="progress my-2">
                <div className="progress-bar" role="progressbar" style={{ width: `${value}%` }}/>
            </div>
            <h5>{value}% Selesai</h5>
        </div>
    </div>
)

const ModalsWorkingList = ({
    target, modalHeight,
    dataTodo: {
        title, task, note, taskLists, progressNote, finish,
        finishDate, createdDate, updatedDate,
    }
}) => {
    const lastItemInMap =  Array.from(taskLists.values()).pop();
    const {
        finish: finishLastTask, icon: iconLastTask, title: titleLastTask,
        task: taskLastTask,
    } = lastItemInMap;

    const toDoProgress = 50;

    return (
        <>
            <div
                className="address-box"
                data-bs-toggle="offcanvas"
                data-bs-target={`#${target}`}
            >
                <div className="address-name">
                    <div className="address-icon">
                        {
                            finish
                            ? (<i className="ri-checkbox-circle-fi" style={{ fontSize: '25px' }} />)
                            : (<i className="ri-information-fill" style={{ fontSize: '25px' }} />)
                        }
                    </div>
                    <p className="h3">{title}</p>
                </div>
                <div className="order-detail-box m-0 p-0 border-0">
                    <div className="product-title">
                        <h4>{task}</h4>
                    </div>
                    {createProgressBar(toDoProgress)}
                    <h5 className="my-2">Trapi Terakhir</h5>
                    <ul className="order-tracking-list">
                        <li className={finishLastTask ? 'finish' : '' }>
                            <div className="order-box">
                                <div className="main-content d-flex justify-content-between">
                                    <div className="left-icon">
                                        {
                                            finishLastTask
                                            ? (<i className="ri-check-line" />)
                                            : (<i className={iconLastTask} />)
                                        }
                                    </div>
                                    <div className="right-content">
                                        <h4>{titleLastTask}</h4>
                                        
                                        {
                                            taskLastTask && (
                                                <h6>
                                                    {
                                                        taskLastTask.length > 22
                                                        ? <>{taskLastTask.substring(0, 22)}.....<b>Lihat Detail !</b></>
                                                        : taskLastTask
                                                    }
                                                </h6>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className="address-detail">
                    <h5 className="fw-bold">Progress atau keluhan !</h5>
                    <p className="h5">
                        <q>{progressNote}</q>
                    </p>
                </div>
                <hr />
                <div className="d-flex flex-column">
                    {
                        finish ? (
                            <>
                                <h6 className="d-flex text-align-center fw-bold">
                                    <i className="ri-checkbox-circle-line me-1" /> Status Kegiatan: Selesai
                                </h6>
                                <h6 className="d-flex text-align-center">
                                    <i className="ri-calendar-line me-1" /> Diselesikan Pada: {fireBaseTime(finishDate).toDateString().toString("MMMM yyyy")}
                                </h6>
                            </>
                        ) : (
                            <h6 className="d-flex text-align-center fw-bold">
                                <i className="ri-close-circle-line me-1" /> Status Kegiatan: Belum Selesai
                            </h6>
                        )
                    }
                    <hr />
                    <h6 className="d-flex text-align-center">
                        <i className="ri-calendar-line me-1" /> Dibuat Pada: {fireBaseTime(createdDate).toDateString().toString("MMMM yyyy")}
                    </h6>
                    <h6 className="d-flex text-align-center">
                        <i className="ri-calendar-line me-1" /> Diupdate Pada: {fireBaseTime(updatedDate).toDateString().toString("MMMM yyyy")}
                    </h6>
                </div>
            </div>




            <div
                className="offcanvas offcanvas-bottom theme-bottom-offcanvas category-filter-offcanvas"
                tabIndex="-1"
                id={target}
                style={{ height: modalHeight }}
            >
                <div className="offcanvas-header">
                    <h4 className="offcanvas-title d-flex align-items-center">
                        <div className="address-icon me-2">
                            {
                                finish
                                ? (<i className="ri-checkbox-circle-fi" style={{ fontSize: '25px' }} />)
                                : (<i className="ri-information-fill" style={{ fontSize: '25px' }} />)
                            }
                        </div>
                        <p className="h3">{title}</p>
                    </h4>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                    >
                        <i className="ri-close-fill"></i>
                    </button>
                </div>
                <div className="offcanvas-header bg-white p-3">
                    <div className="order-detail-box m-0 p-0 border-0 w-100">
                        <div className="d-flex flex-column" style={{ alignItems: 'normal' }}>
                            <h4>{task}</h4>
                            {createProgressBar(toDoProgress)}
                        </div>
                    </div>
                </div>
                <div className="offcanvas-body p-0">
                    <PopupWorkingList
                        note={note}
                        taskLists={taskLists}
                        finish={finish}
                        finishDate={finishDate}
                        createdDate={createdDate}
                        updatedDate={updatedDate}
                        progressNote={progressNote}
                    />
                </div>
            </div>
        </>
    );
};

ModalsWorkingList.propTypes = {
    target: PropTypes.string,
    modalHeight: PropTypes.string,
    dataTodo: PropTypes.shape({
        title: PropTypes.string,
        note: PropTypes.string,
        task: PropTypes.string,
        taskLists: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string,
                title: PropTypes.string,
                task: PropTypes.string,
                note: PropTypes.string,
                attact: PropTypes.string,
                icon: PropTypes.string,
                status: PropTypes.bool,
                finishAt: PropTypes.shape({}),
                createdAt: PropTypes.shape({}),
                updatedAt: PropTypes.shape({}),
            })
        ),
        progressNote: PropTypes.string,
        status: PropTypes.bool,
        finishDate: PropTypes.shape({}),
        createdDate: PropTypes.shape({}),
        updatedDate: PropTypes.shape({}),
    }),
};

ModalsWorkingList.defaultProps = {
    target: "modalsPopup",
    modalHeight: "100%",
    dataTodo: {
        title: "Filter",
        note: "",
        task: "",
        taskLists: DEFAULT_TASK_LIST,
        progressNote: '',
        status: false,
        finishDate: null,
        createdDate: null,
        updatedDate: null,
    }
};

export default ModalsWorkingList;
