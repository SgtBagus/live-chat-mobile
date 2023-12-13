import React from "react";
import PropTypes from "prop-types";

import PopupWorkingList from "./Popup";
import { DEFAULT_TASK_LIST } from "../enum";

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
    target, modalHeight, title, task, note,
    toDoProgress, taskList, progressNote, finish,
    finishDate, createdDate, updatedDate,
}) => {
    const lastItemInMap =  Array.from(taskList.values()).pop();
    const {
        finish: finishLastTask, icon: iconLastTask, title: titleLastTask,
        task: taskLastTask,
    } = lastItemInMap;

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
                    <h6 className="d-flex text-align-center">
                        <i className="ri-calendar-line me-1" /> Dibuat Pada: {createdDate}
                    </h6>
                    <h6 className="d-flex text-align-center">
                        <i className="ri-calendar-line me-1" /> Diupdate Pada: {updatedDate}
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
                        taskList={taskList}
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
    title: PropTypes.string,
    note: PropTypes.string,
    task: PropTypes.string,
    toDoProgress: PropTypes.number,
    taskList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            task: PropTypes.string,
            note: PropTypes.string,
            attact: PropTypes.string,
            icon: PropTypes.string,
            status: PropTypes.bool,
            finishAt: PropTypes.string,
            createdAt: PropTypes.string,
            updatedAt: PropTypes.string,
        })
    ),
    progressNote: PropTypes.string,
    status: PropTypes.bool,
    finishDate: PropTypes.string,
    createdDate: PropTypes.string,
    updatedDate: PropTypes.string,
};

ModalsWorkingList.defaultProps = {
    target: "modalsPopup",
    modalHeight: "100%",
    title: "Filter",
    note: "",
    task: "",
    toDoProgress: 0,
    taskList: DEFAULT_TASK_LIST,
    progressNote: '',
    status: false,
    finishDate: '',
    createdDate: '',
    updatedDate: '',
};

export default ModalsWorkingList;
