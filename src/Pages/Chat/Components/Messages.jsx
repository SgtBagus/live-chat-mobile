import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../../../context/AuthContext";
import { ChatContext } from "../../../context/ChatContext";

import Message from "./Message";

import Loading from "../../../Components/Loading";

import { db } from "../../../firebase";

const Messages = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { data, dispatch } = useContext(ChatContext);

    useEffect(() => {
        setIsLoading(true);

        const getFetchChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                const chatMessage = Object.entries(doc.data())[0] || null;

                if (chatMessage) {
                    dispatch({
                        type: "SET_DEFAULT_USER",
                        payload: {      
                            chatId: chatMessage[0],
                            user: {
                                displayName: chatMessage[1].userInfo.displayName,
                                photoURL: chatMessage[1].userInfo.photoURL,
                                uid: chatMessage[1].userInfo.uid,
                            },
                        },
                    });
                }
            });

            return () => { unsub() };
        };

        const getMessate = () => {
            const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
        
                setIsLoading(false);
            });

            return () => { unsub() };
        }

        if (currentUser) { getFetchChats(); getMessate(); }
    }, [currentUser, data.chatId, dispatch]);

    return (
        <div className="msger" style={{
            overflow: 'hidden auto',
            height: 'calc(100vh - 374px)',
        }}>
            {
                isLoading ? (
                    <Loading title="Memuat..." />
                ) : (
                    <div className="msger-chat">
                        {messages.map((m) => (
                            <Message message={m} key={m.id} />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Messages;
