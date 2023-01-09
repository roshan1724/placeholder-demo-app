import "./Details.scss";

import React, { useContext } from "react";
import UserContext from "../../../context/user/user-context";

function Details(props) {
  const { messageList } = props;

  const userContext = useContext(UserContext);

  return (
    <section className="section-details">
      <div className="title-container">
        <h1 className="title">Incident Details</h1>
      </div>
      <div className="chatbox-container overflow-scrollbar">
        {messageList.map((message) => (
          <>
            <div className="msg-wrapper bot">
              <span className="icon-wrapper">?</span>
              <div className="msg-container">
                <p className="msg">{message?.message_text}</p>
              </div>
            </div>

            <div
              className={`msg-wrapper user ${
                !message.option_text && "awaiting"
              }`}
            >
              <span className="icon-wrapper">
                <img
                  src={userContext.userData?.profile_img}
                  alt="user icon"
                  className="user-icon"
                />
              </span>
              <div className="msg-container">
                <p className="user-name">
                  {userContext.userData?.user_name}
                  <span className="user-type">
                    {" "}
                    ({userContext.userData?.user_dept}){" "}
                  </span>
                </p>
                <p className="msg">
                  {message.option_text
                    ? message.option_text
                    : "Awaiting response..."}
                </p>
              </div>
              {message?.is_correct && (
                <span className="icon-wrapper achievement">
                  <img
                    src="/images/victory_cup.png"
                    alt="victory cup"
                    className="badge-icon"
                  />
                </span>
              )}
            </div>
          </>
        ))}
      </div>
    </section>
  );
}

export default Details;
