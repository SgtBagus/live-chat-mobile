import React, { useContext, useEffect } from "react";

import { ChatContextProvider } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { LoadingContext } from "../../context/LoadingContext";

import ChatForm from "./Components/Form";
import Messages from "./Components/Messages";

import Container from "../../Components/Container";

const Chat = () => {
    const { currentUser, dataAdmin } = useContext(AuthContext);
    const { dispatchLoading } = useContext(LoadingContext);

    const { uid, displayName, photoURL, userDesc } = dataAdmin;

    useEffect(() => {
      dispatchLoading(true);

      return () => {
        if (uid) {
          dispatchLoading(false);
        }
      };
    }, [dispatchLoading, uid]);

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