import React, { useState, useContext, useEffect } from "react";
import { v4 as uuid } from "uuid";
import update from "immutability-helper";
import { NotificationManager } from 'react-notifications';
import {
  arrayUnion, serverTimestamp, Timestamp, updateDoc, doc, onSnapshot,
} from "firebase/firestore";

import { db } from "../../../firebase";

import { ChatBotContext } from "../../../context/ChatBotContext";
import { AuthContext } from "../../../context/AuthContext";
import { catchError } from "../../../Helper/helper";

import SETUP_MESSAGES_NEW from "../config/data";

import { USE_NLP } from "../config/usenlp";
import { AI_DATA } from "../config/config";

const ChatForm = () => {
    const [form, setForm] = useState({ text: "" });
    const [onSend, setOnSend] = useState(false);
    const [chatBotDatas, setChatBotDatas] = useState({
      locale: 'en-US',
      name: 'Corpus',
      data: [],
    });
    
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatBotContext);

    const { text } = form;

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chatBotDatas", 'qLiecKdChB39oFR0xviu'), (doc) => {
            setChatBotDatas(doc.data());
        }, (error) => {
            NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
        });

        return async () => {
            await unSub();
        };
    }, []);

    const changeInputHandler = async (type, val) => {
        const newForm = update(form, {
            [type]: { $set: val },
        });

        await setForm(newForm);
    };

    const sumbitMessage = async () => {
        if (data.chatId !== 'null') {
            sendMessate(data.chatId);
        } else {
            SETUP_MESSAGES_NEW(data, currentUser, async (aiUID) => {
                sendMessate(aiUID);
            });
        }
    }

    const sendMessate = async (aiUID) => {
        setOnSend(true);

        try {
            await updateDoc(doc(db, "chatBots", aiUID), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        
            const { answer: nlpAnswer } = await USE_NLP({ data: chatBotDatas, sendMessage: text });
            await updateDoc(doc(db, "chatBots", aiUID), {
                messages: arrayUnion({
                    id: uuid(),
                    text: nlpAnswer,
                    senderId: AI_DATA.UID,
                    date: Timestamp.now(),
                }),
            });

            let lastMessageText = text;
          
            await updateDoc(doc(db, "userChatBots", currentUser.uid), {
                [aiUID + ".lastMessage"]: {
                    text: lastMessageText,
                },
                [aiUID + ".date"]: serverTimestamp(),
            });
            
            setForm({ text: "" })
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
            {/* <div>
                <div>
                    Respon:
                    <div dangerouslySetInnerHTML={{ __html: respon.answer || "" }} />
                </div>
                <div>scope: {respon.score}</div>
                <pre>{JSON.stringify(respon, null, 2)}</pre>
            </div> */}
        </>
    );
};

export default ChatForm;
