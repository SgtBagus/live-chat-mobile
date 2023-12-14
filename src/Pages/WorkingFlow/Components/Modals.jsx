import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { doc, onSnapshot } from "firebase/firestore";
import { NotificationManager } from "react-notifications";

import { db } from "../../../firebase";

import PopupWorkingList from "./Popup";
import Loading from "../../../Components/Loading";

import fireBaseTime from "../../../Helper/fireBaseTime";

import { DEFAULT_TASK_LIST } from "../enum";

import { catchError } from "../../../Helper/helper";

const createProgressBar = (value) => (
    <div className="progress-bar-section my-2">
        <div className="landing-progress-bar">
            <div className="progress my-2">
                <div className="progress-bar" role="progressbar" style={{ width: `${value}%` }}/>
            </div>
            <h5>{parseFloat(value).toFixed(0)}% Selesai</h5>
        </div>
    </div>
)

const getPercentage = (data = []) => {
    const totalValue = data.length;
    const totalFinish = data.filter(x => x.statusFinish).length;

    return (totalFinish/totalValue * 100.0);
}

const ModalsWorkingList = ({
    target, modalHeight,
    dataTodo: {
        id: mainId, title, task, note, progressNote, statusFinish,
        finishDate, createdDate, updatedDate,
    }
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [taskLists, setTaskList] = useState([]);
    const [lastTaskList, setLastTaskList] = useState({ id: null });
    const [unfinishTask, setUnfinishTask] = useState({ id: null });

    useEffect(() => {
        setIsLoading(true);

        const getTaskList = onSnapshot(doc(db, "toDoTaskLists", mainId), (doc) => {
            const getData = Object.entries(doc.data());
            const res = getData.map(x => x[1]);
            
            const sortingList = res.sort((a, b) => a.orderNumber - b.orderNumber);
            const getUnfinishTask = sortingList.filter(x => !x.statusFinish)[0];
            const lastItemInMap =  Array.from(sortingList.values()).pop();

            setTaskList(res);
            setUnfinishTask(getUnfinishTask);
            setLastTaskList(lastItemInMap);

            setIsLoading(false);
        }, (error) => {
            NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
        });
    
        return () => { getTaskList(); };
    }, [mainId]);

    return (
        <>
            <div
                className="address-box w-100"
                data-bs-toggle="offcanvas"
                data-bs-target={`#${target}`}
            >
                <div className="address-name">
                    <div className="address-icon">
                        {
                            statusFinish
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
                    {createProgressBar(getPercentage(taskLists))}
                    <h5 className="my-2">Trapi Terakhir</h5>
                    {
                        isLoading ? (
                            <Loading title="Memuat..." />
                        ) : (
                            <ul className="order-tracking-list">
                                {
                                    unfinishTask ? (
                                        <li
                                            className={unfinishTask.statusFinish ? 'finish' : '' }
                                        >
                                            <div className="order-box">
                                                <div className="main-content d-flex justify-content-between w-100">
                                                    <div className="left-icon">
                                                        {
                                                            unfinishTask.statusFinish
                                                            ? (<i className="ri-check-line" />)
                                                            : (<i className={unfinishTask.icon} />)
                                                        }
                                                    </div>
                                                    <div className="right-content">
                                                        <h4>{unfinishTask.title}</h4>
                                                        
                                                        {
                                                            unfinishTask.task && (
                                                                <h6>
                                                                    {
                                                                        unfinishTask.task.length > 22
                                                                        ? <>{unfinishTask.task.substring(0, 22)}.....<b>Lihat Detail !</b></>
                                                                        : unfinishTask.task
                                                                    }
                                                                </h6>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ) : (
                                        <li
                                            className={lastTaskList.statusFinish ? 'finish' : '' }
                                        >
                                            <div className="order-box">
                                                <div className="main-content d-flex justify-content-between w-100">
                                                    <div className="left-icon">
                                                        {
                                                            lastTaskList.statusFinish
                                                            ? (<i className="ri-check-line" />)
                                                            : (<i className={lastTaskList.icon} />)
                                                        }
                                                    </div>
                                                    <div className="right-content">
                                                        <h4>{lastTaskList.title}</h4>
                                                        
                                                        {
                                                            lastTaskList.task && (
                                                                <h6>
                                                                    {
                                                                        lastTaskList.task.length > 22
                                                                        ? <>{lastTaskList.task.substring(0, 22)}.....<b>Lihat Detail !</b></>
                                                                        : lastTaskList.task
                                                                    }
                                                                </h6>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                        )
                    }
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
                        statusFinish ? (
                            <div>
                                <h6 className="d-flex text-align-center fw-bold">
                                    <i className="ri-checkbox-circle-line me-1" /> Status Kegiatan: Selesai
                                </h6>
                                <h6 className="d-flex text-align-center">
                                    <i className="ri-calendar-line me-1" /> Diselesikan Pada: {fireBaseTime(finishDate).toDateString().toString("MMMM yyyy")}
                                </h6>
                            </div>
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
                                statusFinish
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
                            {createProgressBar(getPercentage(taskLists))}
                        </div>
                    </div>
                </div>
                <div className="offcanvas-body p-0">
                    <PopupWorkingList
                        note={note}
                        taskLists={taskLists}
                        mainId={mainId}
                        statusFinish={statusFinish}
                        firstUnFinishId={unfinishTask ? unfinishTask.id : null}
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
                finishDate: PropTypes.shape({}),
                createdDate: PropTypes.shape({}),
                updatedDate: PropTypes.shape({}),
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
