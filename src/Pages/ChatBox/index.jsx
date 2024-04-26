import React from "react";
import { ChatBotContextProvider } from "../../context/ChatBotContext";

import ChatForm from "./Components/Form";
import Messages from "./Components/Messages";
import Container from "../../Components/Container";

const Chat = () => {
  return (
    <ChatBotContextProvider>
      <Container className="chatting-header prfile-header">
        <div className="custom-container">
          <div className="header-box">
            <div className="header-profile">
              <div className="profile-image">
                <img src="https://images-platform.99static.com//9pruL3GMSNpmFA6rrYtb8tlGCeU=/86x1262:1113x2290/fit-in/500x500/99designs-contests-attachments/131/131688/attachment_131688576" className="img-fluid" alt="" style={{ objectFit: 'cover' }}/>
              </div>
              <div className="name-content">
                <h1>Saya Dokter Robot !</h1>
                <h5>Semua chat ini di generate, jadi untuk hasil yang optimal disarankan ke profesional</h5>
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
          <ChatForm />
        </div>
      </Container>
    </ChatBotContextProvider>
  );
};

export default Chat;
