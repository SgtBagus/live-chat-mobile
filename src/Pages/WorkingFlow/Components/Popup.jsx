import React, { useState } from "react";
import PropTypes from "prop-types";
import update from "immutability-helper";

import Container from "../../../Components/Container";

import Task from "./Task";
import InputArea from "../../../Components/Form/InputArea";
import Button from "../../../Components/Button";
import { DEFAULT_TASK_LIST } from "../enum";
import fireBaseTime from "../../../Helper/fireBaseTime";

const PopupWorkingList = ({
    note, taskLists, finish, finishDate, createdDate, updatedDate, progressNote,
}) => { 
    const [form, setForm] = useState({ descUser: progressNote });
    const { descUser } = form;

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
                            attact, id, note, finishStatus,
                            task, title, updatedAt, createdAt, finishedAt, icon, 
                        }) => (
                            <Task
                                key={id}
                                finish={finishStatus}
                                title={title}
                                task={task}
                                note={note}
                                attact={attact}
                                updatedAt={updatedAt}
                                createdAt={createdAt}
                                finishedAt={finishedAt}
                                icon={icon}
                            />
                        ))
                    }
                </ul>
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
                    label="Simpan Progress atau Keluhan anda !"
                    onClick={() => {}}
                />
            </div>
        </Container>
    );
};

PopupWorkingList.propTypes = {
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
};

PopupWorkingList.defaultProps = {
    note: "",
    taskLists: DEFAULT_TASK_LIST,
    finishDate: null,
    createdDate: null,
    updatedDate: null,
    progressNote: '',
};

export default PopupWorkingList;
