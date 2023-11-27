import React, { useContext, useEffect, useState } from "react";
import { NotificationManager } from 'react-notifications';
import {
    onSnapshot, where, collection, query,
} from "firebase/firestore";

import { db } from "../../firebase";

import { ChatContextProvider } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import ChatForm from "./Components/Form";
import Messages from "./Components/Messages";

import Container from "../../Components/Container";

import { DEFAULT_IMAGE } from "../../Components/DefaultValue/config";

import { catchError } from "../../Helper/helper";

const Chat = () => {
    const [dataAdmin, setDataAdmin] = useState({
        displayName: 'Username', photoURL: DEFAULT_IMAGE, userDesc: 'Desc',
    });

    const { displayName, photoURL, userDesc } = dataAdmin;
    const { currentUser } = useContext(AuthContext);
    const { dispatchLoading } = useContext(LoadingContext);

    useEffect(() => {
        dispatchLoading(true);
        const unSub = async () => {
            const res = await query(collection(db, "users"), where("is_admin", "==", true));
            await onSnapshot(res, async (data) => {
                data.forEach((doc) => {
                    setDataAdmin(doc.data());
                });
                dispatchLoading(false);
            }, (error) => {
                NotificationManager.warning(catchError(error), 'Terjadi Kesalahan', 5000);
            });
        };

        return () => { currentUser && unSub() };
    }, [currentUser, dispatchLoading]);

    return (
      <>
        {currentUser && !currentUser.emailVerified ? (
          <Container className="chatting-header prfile-header">
            <div className="custom-container">
              <div className="header-box w-100 text-center d-flex flex-column">
                <h1 className="mb-2">Verifikasi Email Anda !</h1>
                <h5>Mohon Lakukan Verifikasi Email terlebih dahulu, agar dapat menggukan semua Feature Kami !</h5>
              </div>
            </div>
          </Container>
        ) : (
          <ChatContextProvider>
            <Container className="chatting-header prfile-header">
              <div className="custom-container">
                <div className="header-box">
                  <div className="header-profile">
                    <div className="profile-image">
                      <img src={photoURL} className="img-fluid" alt="" />
                    </div>
                    <div className="name-content">
                      <h1>{displayName}</h1>
                      <h5>{userDesc}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <Container className="p-2">
              <div
                className="message-box p-3"
                style={{
                  backgroundColor: "darkgrey",
                  position: "relative",
                  height: "calc(100vh - 272px)",
                  borderRadius: "20px",
                  overflow: "unset",
                }}
              >
                <Messages />
                <ChatForm dataAdmin={dataAdmin} />
              </div>
            </Container>
          </ChatContextProvider>
        )}
      </>
    );
};

export default Chat;