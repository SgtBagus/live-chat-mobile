import React, { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";
import { NotificationManager } from 'react-notifications';
import {
  arrayUnion, doc, serverTimestamp, Timestamp, updateDoc, onSnapshot,
} from "firebase/firestore";

import { db } from "../../../firebase";

import Modals from "../../../Components/Modal";
import Container from "../../../Components/Container";
import InputText from "../../../Components/Form/InputText";

import { DEFAULT_IMAGE } from "../../../Components/DefaultValue/config";

import { uploadFile } from "../../../data/uploadFile";

import { ChatContext } from "../../../context/ChatContext";
import { AuthContext } from "../../../context/AuthContext";

import { checkThisFileIsImageOrNot } from "../../../Helper/checkFile";
import { catchError } from "../../../Helper/helper";

import SETUP_MESSAGES_NEW from "../config/data";

const ChatForm = ({ dataAdmin }) => {
    const { uid: adminUid } = dataAdmin;

    const [form, setForm] = useState({ file: null, text: "" });
    const [allowChat, setAllowChat] = useState(true);

    const [onSend, setOnSend] = useState(false);
    
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const { text, file } = form;
    
    useEffect(() => {
        const unSub = onSnapshot(
            doc(db, "chats", data.chatId), (doc) => {
                if (doc.exists()) {
                    setAllowChat(doc.data().allow_chat);
                }
            }
        );
    
        return () => {
            data.chatId !== 'null' && unSub();
        };
    }, [data.chatId]);


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
        setOnSend(true);

        if (data.chatId !== 'null') {
            sendMessate(data.chatId);
        } else {
            const combinedId = currentUser.uid > data ? currentUser.uid + adminUid : adminUid + currentUser.uid || null;

            SETUP_MESSAGES_NEW(dataAdmin, currentUser, combinedId, async () => {
                sendMessate(combinedId);
            });
        }
    }

    const sendMessate = async (dataChatId) => {
        try {
            if (file) {
                const thisFileisImage = checkThisFileIsImageOrNot(file);
                if (!thisFileisImage) throw new Error ('Hanya Boleh Mengupload Gambar');

                const uploadImage = await uploadFile(file, 'message/images/');
                
                await updateDoc(doc(db, "chats", dataChatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: uploadImage,
                    }),
                });
            } else {
                await updateDoc(doc(db, "chats", dataChatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                    }),
                });
            }

            let lastMessageText = text;
            if (file && text === '') {
                lastMessageText = checkThisFileIsImageOrNot(file) ? 'Mengkirimkan Gambar' : 'Mengikirimkan Video';
            }
          
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [dataChatId + ".lastMessage"]: {
                    text: lastMessageText,
                },
                [dataChatId + ".date"]: serverTimestamp(),
            });
        
            await updateDoc(doc(db, "userChats", adminUid), {
                [dataChatId + ".lastMessage"]: {
                    text: lastMessageText,
                },
                [dataChatId + ".date"]: serverTimestamp(),
            });
            
            setForm({ file: null, text: "" })
        } catch (err) {
            NotificationManager.error(catchError(err), 'Terjadi Kesalahan', 5000);
        } finally {
            setOnSend(false);
        }
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
                    disabled={onSend}
                    modalButtonCalcelDisabled={onSend}
                    modalButtonApplyDisabled={onSend}
                >
                    <Container style={{ maxHeight: '490px', overflow: 'auto' }}>
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
                                name="file"
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
                    disabled={onSend || !allowChat}
                />
                <button
                    type="submit"
                    className="msger-send-btn"
                    style={{ right: "28px" }}
                    onClick={()=> sumbitMessage()}
                    disabled={onSend || (( text === '') && (file === null) )}
                >
                    {
                        onSend
                        ? (
                            <i className="fas fa-sync-alt fa-spin" />
                        )
                        : (
                            <i className="ri-send-plane-2-line" />
                        )
                    }
                </button>
            </form>
        </>
    );
};

export default ChatForm;
