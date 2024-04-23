import React, { useContext, useEffect, useRef } from "react";

import { AuthContext } from "../../../context/AuthContext";

import fireBaseTime from "../../../Helper/fireBaseTime";

import { checkfileUrl } from "../../../Helper/checkFile";

const MessagesComponents = ({ message }) => {
    const { currentUser } = useContext(AuthContext);

    const ref = useRef();
  
    useEffect(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const { senderId, id, img, text, date } = message;
    const { uid: currentUid } = currentUser;
    
    return (
      <div
        ref={ref}
        className={`msg ${
          senderId === currentUid ? "right" : "left"
        }-msg mb-1`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: senderId === currentUid ? "flex-end" : "flex-start",
          position: "relative",
        }}
      >
        {img && (
          <>
            {checkfileUrl(img) ? (
              <img
                src={img}
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "calc(100% - 60px)",
                  borderRadius: text !== "" ? "15px 15px 0 0" : "15px",
                }}
                alt={`messages-images-${id}`}
              />
            ) : (
              <video
                controls
                className="img-fluid"
                style={{
                  objectFit: "cover",
                  width: "calc(100% - 60px)",
                  borderRadius: text !== "" ? "15px 15px 0 0" : "15px",
                }}
              >
                <source src={img} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            )}
          </>
        )}

        {text !== "" && (
          <div
            className="msg-bubble"
            style={
              img
                ? senderId === currentUid
                  ? { borderRadius: "0 0 0 15px" }
                  : { borderRadius: "0 0 15px 0" }
                : null
            }
          >
            {text}
          </div>
        )}
        <div className="msg-info">
          <div className="msg-info-time my-2" style={{ position: "unset" }}>
            {`${fireBaseTime(date)
              .toDateString()
              .toString("MMMM yyyy")} - ${fireBaseTime(
              date
            ).toLocaleTimeString()}`}
          </div>
        </div>
      </div>
    );
};

MessagesComponents.propTypes = {};

MessagesComponents.defaultProps = {};

export default MessagesComponents;
