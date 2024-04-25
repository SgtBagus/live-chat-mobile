import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { NotificationManager } from 'react-notifications';

import { AuthContext } from "../../../context/AuthContext";
import { ChatBotContext } from "../../../context/ChatBotContext";

import Message from "./Message";

import Loading from "../../../Components/Loading";

import { db } from "../../../firebase";
import { catchError } from "../../../Helper/helper";

const Messages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { data: { chatId }, dispatch } = useContext(ChatBotContext);

    useEffect(() => {
        setIsLoading(true);

        const getFetchChats = () => {
            const unsub = onSnapshot(doc(db, "userChatBots", currentUser.uid), (doc) => {
                const { idChatBot } = doc.data() || { idChatBot: null };

                console.log(idChatBot);
                if (idChatBot) {
                    dispatch({
                        type: "SET_DEFAULT_USER",
                        payload: { chatId: idChatBot },
                    });
                }
            }, (error) => {
                NotificationManager.error(catchError(error), 'Terjadi Kesalahan', 5000);
            });

            return () => { unsub() };
        };

        const getMessate = () => {
            const unsub = onSnapshot(doc(db, "chatBots", chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
        
                setIsLoading(false);
            });

            return () => { unsub() };
        }

        if (currentUser) { getFetchChats(); getMessate(); }
    }, [chatId, currentUser, dispatch]);

    return (
        <div
            className="msger"
            style={{
                overflow: 'hidden auto',
                height: 'calc(100vh - 374px)',
            }}
        >
            {
                isLoading ? (
                    <Loading title="Memuat..." />
                ) : (
                    <div className="msger-chat">
                        {
                            chatId !== 'null'
                            ? (
                                <>
                                    {
                                        messages.map((m) => (
                                            <Message message={m} key={m.id} />
                                        ))
                                    }
                                </>
                            )
                            : (
                                <div
                                  className="msg right-msg mb-1"
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                  }}
                                >
                                    <div className="msg-bubble w-100" style={{ borderRadius: '15px'}}>
                                        Masih Kosong, silakan mulai chat nya !
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default Messages;
