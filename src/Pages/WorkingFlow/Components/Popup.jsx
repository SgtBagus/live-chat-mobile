import React, { useState } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";
import { NotificationManager } from "react-notifications";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

import { db } from "../../../firebase";

import Task from "./Task";
import Container from "../../../Components/Container";
import InputArea from "../../../Components/Form/InputArea";
import Button from "../../../Components/Button";
import Loading from "../../../Components/Loading";

import fireBaseTime from "../../../Helper/fireBaseTime";
import { catchError } from "../../../Helper/helper";

import { DEFAULT_TASK_LIST } from "../enum";

const PopupWorkingList = ({
    mainId, taskListId,
    note, taskLists, progressNote,
    statusFinish, firstUnFinishId,
    finishDate, createdDate, updatedDate,
}) => { 
    const [form, setForm] = useState({ descUser: progressNote });
    const [isLoading, setIsLoading] = useState(false);
    const { descUser } = form;

    const handelChangeNota = async (id) => {
        setIsLoading(true);
        try {
            await updateDoc(doc(db, "toDoLists", mainId), {
                "progressNote": descUser,
                "updatedDate": serverTimestamp(),
            });

            NotificationManager.success("Success", 'Berhasil mengupdate data!', 5000);
        } catch (err) {
            NotificationManager.error(catchError(err), 'Terjadi Kesalahan', 5000);
        } finally {
            setIsLoading(false);
        }
    }

    const changeInputHandler = async (type, val) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        await setForm(newForm);
    };

    return (
        <Container style={{ overflow: 'auto' }}>
            <div className="order-detail-box m-0 p-0 border-0">
                <div className="product-title">
                    <h4>Catatan</h4>
                </div>
                <p>{note}</p>
                <hr />
                
                <ul className="order-tracking-list pop-up-list m-0">
                    {
                        taskLists.map(({
                            attact, id, note, statusFinish,
                            task, title, updatedDate, createdDate, finishDate, icon, 
                        }) => (
                            <Task
                                key={id}
                                firstUnFinishId={firstUnFinishId}
                                taskListId={taskListId}
                                dataTask={{
                                    id, statusFinish, title, task,
                                    note, attact, updatedDate,
                                    createdDate, finishDate, icon,
                                }}
                            />
                        ))
                    }
                </ul>
                <hr />
                {
                    isLoading
                    ? (
                        <Loading title="Memuat..." />
                    )
                    : (
                        <div className="d-flex flex-column">
                            {
                                statusFinish ? (
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
                    )
                }
                <hr />

                <h6 className="h5 fw-bold d-flex text-align-center my-2">Progress atau Keluhan Anda ! </h6>
                <InputArea
                    rows="5"
                    changeEvent={(val, e) => changeInputHandler("descUser", val, e)}
                    value={descUser}
                    placeholder="Masukan Progress atau Keluhan anda disini, selama anda menjalankan trapi !"
                />
                <Button
                    className="btn btn-success my-2"
                    label={isLoading ? "Memperoses...!!!" : "Simpan Progress atau Keluhan anda !"}
                    disabled={isLoading}
                    onClick={() => handelChangeNota()}
                />
            </div>
        </Container>
    );
};

PopupWorkingList.propTypes = {
    mainId: PropTypes.string,
    note: PropTypes.string,
    taskLists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            task: PropTypes.string,
            note: PropTypes.string,
            attact: PropTypes.string,
            icon: PropTypes.string,
            finish: PropTypes.bool,
            finishDate: PropTypes.shape({}),
            createdAt: PropTypes.shape({}),
            updatedAt: PropTypes.shape({}),
        })
    ),
    finish: PropTypes.bool,
    finishDate: PropTypes.shape({}),
    createdDate: PropTypes.shape({}),
    updatedDate: PropTypes.shape({}),
    progressNote: PropTypes.string,
    firstUnFinishId: PropTypes.string,
};

PopupWorkingList.defaultProps = {
    mainId: "",
    note: "",
    taskLists: DEFAULT_TASK_LIST,
    finishDate: null,
    createdDate: null,
    updatedDate: null,
    progressNote: '',
    firstUnFinishId: null,
};

export default PopupWorkingList;
