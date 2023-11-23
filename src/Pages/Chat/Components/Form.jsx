import React, { useState } from "react";
import update from "immutability-helper";
import { NotificationManager } from 'react-notifications';


import Modals from "../../../Components/Modal";
import Container from "../../../Components/Container";
import InputText from "../../../Components/Form/InputText";

import { DEFAULT_IMAGE } from "../../../Components/DefaultValue/config";

import { checkThisFileIsImageOrNot } from "../../../Helper/checkFile";

const ChatForm = () => {
    const [form, setForm] = useState({ file: null, text: "" });
    
    const { text, file } = form;
    const changeInputHandler = async (type, val) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        await setForm(newForm);
    };

    
    const checkImage = (e) => {
        const thisFileisImage = checkThisFileIsImageOrNot(e.target.files[0]);
        if (!thisFileisImage) {
            NotificationManager.warning('Hanya Boleh Mengungah Gambar', 'Terjadi Kesalahan', 50000);
        } else {
            changeInputHandler('file', e.target.files[0])
        }
    }
    
    const cancelUploadImage = () => {
        setForm({ file: null, text });
    }

    const sumbitMessage = () => {
        console.log(file);
        console.log(text);
    }

    return (
        <>
            <form
                className="msger-inputarea p-3"
                style={{
                    position: "absolute",
                    WebkitTransform: "unset",
                    transform: "unset",
                    bottom: "0px",
                    left: "0",
                    backdropFilter: "unset",
                    backgroundColor: "#516b74",
                    borderRadius: "0 0 20px 20px",
                }}
            >
                <Modals
                    className="btn emoji-button"
                    style={{ left: "28px" }}
                    target="filter"
                    icon="ri-image-line"
                    modalHeight="75%"
                    modalTitle="Upload Gambar"
                    modalButtonCancel="Tutup"
                    modalButtonApply="Kirim"
                    modalButtonCancelOnClick={() => cancelUploadImage()}
                    modalButtonApplyOnClick={() => sumbitMessage()}
                >
                    <Container className="price-range-section">
                        <img
                            src={file ? URL.createObjectURL(file) : DEFAULT_IMAGE}
                            className="img-fluid rounded"
                            alt="Banner Images"
                        />
                        <div className="my-2 w-100">
                            <input
                                required
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={(e) => {
                                    try {
                                        checkImage(e);
                                    } catch {
                                        changeInputHandler('file', null)};
                                    }
                                }
                            />
                            <label
                                htmlFor="file"
                                className="w-100 text-center"
                                style={{ marginBottom: "unset" }}
                            >
                                <div className="btn btn-primary btn-block my-2">
                                    <i className="fas fa-file mx-2" />
                                    Upload Foto Anda
                                </div>
                                <span> Mohon upload File dengan format png, jpeg, dan jpg </span>
                            </label>
                        </div>
                        <div className="my-2 w-100">
                            <div className="form-style-6">
                                <label className="form-label" style={{ color: 'black' }}>Pesan Anda</label>
                                <InputText
                                    type="text"
                                    name="text"
                                    value={text}
                                    placeholder="Pesan Anda !"
                                    style={{
                                        border: '1px solid rgba(var(--title), 1)',
                                        borderRadius: 'calc(4px + (8 - 4) * ((100vw - 320px) / (600 - 320)))',
                                        fontSize: 'calc(15px + (16 - 15) * ((100vw - 320px) / (600 - 320)))',
                                    }}
                                    changeEvent={(val, e) => changeInputHandler("text", val, e)}
                                />
                            </div>
                        </div>
                    </Container>
                </Modals>
                <input
                    type="text"
                    className="msger-input"
                    placeholder="Enter your message..."
                    value={text}
                    onChange={e => changeInputHandler('text', e.target.value)}
                />
                <button
                    type="submit"
                    className="msger-send-btn"
                    style={{ right: "28px" }}
                    onClick={()=> sumbitMessage()}
                >
                    <i className="ri-send-plane-2-line" />
                </button>
            </form>
        </>
    );
};

export default ChatForm;
