import React, { useState } from "react";
// import { v4 as uuid } from "uuid";
import update from "immutability-helper";
// import { NotificationManager } from 'react-notifications';
import {
//   arrayUnion, serverTimestamp, Timestamp, updateDoc,
//   onSnapshot,
//   doc,
//   collection, query, where
} from "firebase/firestore";

// import { db } from "../../../firebase";

// import { ChatContext } from "../../../context/ChatContext";
// import { NotificationManager } from "react-notifications";
// import { catchError } from "../../../Helper/helper";
// import { AuthContext } from "../../../context/AuthContext";

// import { catchError } from "../../../Helper/helper";

// import SETUP_MESSAGES_NEW from "../config/data";

import { useNLP } from "../config/usenlp";

const ChatForm = ({ chatBotDatas = {} }) => {
    const [form, setForm] = useState({ text: "" });
    const [onSend, setOnSend] = useState(false);
    
    
    // const { currentUser } = useContext(AuthContext);
    // const { data } = useContext(ChatContext);

    const { text } = form;
    const { respon } = useNLP({ data: chatBotDatas, sendMessage: text });

    const changeInputHandler = async (type, val) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        await setForm(newForm);
    };

    const sumbitMessage = async () => {
        console.log(respon.answer);

        // if (data.chatId !== 'null') {
        //     sendMessate(data.chatId);
        // } else {
        //     const combinedId = currentUser.uid > data ? currentUser.uid + adminUid : adminUid + currentUser.uid || null;

        //     SETUP_MESSAGES_NEW(dataAdmin, currentUser, combinedId, async () => {
        //         sendMessate(combinedId);
        //     });
        // }
    }

    // const sendMessate = async (dataChatId) => {
    //     try {
    //         if (file) {
    //             const thisFileisImage = checkThisFileIsImageOrNot(file);
    //             if (!thisFileisImage) throw new Error ('Hanya Boleh Mengupload Gambar');

    //             const uploadImage = await uploadFile(file, 'message/images/');
                
    //             await updateDoc(doc(db, "chats", dataChatId), {
    //                 messages: arrayUnion({
    //                     id: uuid(),
    //                     text,
    //                     senderId: currentUser.uid,
    //                     date: Timestamp.now(),
    //                     img: uploadImage,
    //                 }),
    //             });
    //         } else {
    //             await updateDoc(doc(db, "chats", dataChatId), {
    //                 messages: arrayUnion({
    //                     id: uuid(),
    //                     text,
    //                     senderId: currentUser.uid,
    //                     date: Timestamp.now(),
    //                 }),
    //             });
    //         }

    //         let lastMessageText = text;
    //         if (file && text === '') {
    //             lastMessageText = checkThisFileIsImageOrNot(file) ? 'Mengkirimkan Gambar' : 'Mengikirimkan Video';
    //         }
          
    //         await updateDoc(doc(db, "userChats", currentUser.uid), {
    //             [dataChatId + ".lastMessage"]: {
    //                 text: lastMessageText,
    //             },
    //             [dataChatId + ".date"]: serverTimestamp(),
    //         });
        
    //         await updateDoc(doc(db, "userChats", adminUid), {
    //             [dataChatId + ".lastMessage"]: {
    //                 text: lastMessageText,
    //             },
    //             [dataChatId + ".date"]: serverTimestamp(),
    //         });
            
    //         setForm({ file: null, text: "" })
    //     } catch (err) {
    //         NotificationManager.error(catchError(err), 'Terjadi Kesalahan', 5000);
    //     } finally {
    //         setOnSend(false);
    //     }
    // }

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
                <input
                    type="text"
                    className="msger-input"
                    placeholder="Enter your message..."
                    value={text}
                    onChange={e => changeInputHandler('text', e.target.value)}
                    disabled={onSend}
                />
                <button
                    type="button"
                    className="msger-send-btn"
                    style={{ right: "28px" }}
                    onClick={()=> sumbitMessage()}
                    disabled={onSend || text === ''}
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
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <div>
                    Respon:
                    <div dangerouslySetInnerHTML={{ __html: respon.answer || "" }} />
                </div>
                <div>scope: {respon.score}</div>
                <pre>{JSON.stringify(respon, null, 2)}</pre>
            </div>
        </>
    );
};

export default ChatForm;
