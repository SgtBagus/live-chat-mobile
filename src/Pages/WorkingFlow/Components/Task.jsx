import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../../../Components/Button";

import { checkfileUrl } from "../../../Helper/checkFile";
import fireBaseTime from "../../../Helper/fireBaseTime";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { NotificationManager } from "react-notifications";
import { catchError } from "../../../Helper/helper";


const Task = ({
    dataTask: {
        id, statusFinish, title, task, note, attact,
        updatedDate, createdDate, finishDate, icon, 
    }, firstUnFinishId, mainId,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handelChangeFile = async (id, finishStatus) => {
        setIsLoading(true);
        try {
            await updateDoc(doc(db, "toDoTaskLists", mainId), {
                [id + ".statusFinish"]: finishStatus,
                [id + ".finishDate"]: serverTimestamp(),
                [id + ".updatedDate"]: serverTimestamp(),
            });
        } catch (err) {
            NotificationManager.error(catchError(err), 'Terjadi Kesalahan', 5000);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <li className={statusFinish ? 'finish' : ''}>
            <div className="order-box">
                <div className="main-content d-flex justify-content-between w-100">
                    <div className="left-icon">
                        {
                            statusFinish ? (
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
                                statusFinish ? (
                                    <>
                                        <small className="d-flex text-align-center fw-bold">
                                            <i className="ri-checkbox-circle-line me-1" /> Status Kegiatan: Selesai
                                        </small>
                                        <small className="d-flex text-align-center">
                                            <i className="ri-calendar-line me-1" /> Diselesikan Pada: {fireBaseTime(finishDate).toDateString().toString("MMMM yyyy")}
                                        </small>
                                    </>
                                ) : (
                                    <small className="d-flex text-align-center fw-bold">
                                        <i className="ri-close-circle-line me-1" /> Status Kegiatan: Belum Selesai
                                    </small>
                                )
                            }
                            <hr />
                            <small className="d-flex text-align-center">
                                <i className="ri-calendar-line me-1" /> Dibuat Pada: {fireBaseTime(createdDate).toDateString().toString("MMMM yyyy")}
                            </small>
                            <small className="d-flex text-align-center">
                                <i className="ri-calendar-line me-1" /> Diupdate Pada: {fireBaseTime(updatedDate).toDateString().toString("MMMM yyyy")}
                            </small>
                        </div>  
                    </div>
                </div>
                <div className="w-100">
                    <div className="button-complete-task">
                        {
                            (!statusFinish && id === firstUnFinishId) && (
                                <Button
                                    className="btn btn-success my-2"
                                    label={isLoading ? "Memperoses...!!!" : "Selesaikan Trapi !"}
                                    disabled={isLoading}
                                    onClick={() => handelChangeFile(id, !statusFinish)}
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
    dataTask: PropTypes.shape({
        id: PropTypes.string,
        finish: PropTypes.bool,
        title: PropTypes.string,
        task: PropTypes.string,
        note: PropTypes.string,
        attact: PropTypes.string,
    }),
    mainId: PropTypes.string,
};

Task.defaultProps = {
    dataTask: {
        id: '1',
        finish: false,
        title: 'Title',
        task: 'Task',
        note: 'Note',
        attact: null,
    },
    mainId: null,
};

export default Task;
