/**
 * Component Name: Details
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of Incident details section
 */

import "./Details.scss";

import React, { useContext, useEffect, useRef } from "react";
import UserContext from "../../../context/user/user-context";

function Details(props) {
  const { messageList } = props;
  const chatbox = useRef(null);

  useEffect(() => {
    if (chatbox && chatbox.current) {
      chatbox.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [])

  const userContext = useContext(UserContext);

  return (
    <section className="section-details">
      <div className="chatbox-container overflow-scrollbar" ref={chatbox}>
        {messageList.map((message, index) => (
          <>
            <div className="msg-wrapper bot" key={index * 2}>
              <span className="icon-wrapper">
                <img
                  src="/images/question_bot_icon.png"
                  alt="bot icon"
                  className="bot-icon"
                />
              </span>
              <div className="msg-container">
                <p className="msg">{message?.message_text}</p>
              </div>
            </div>

            <div
              className={`msg-wrapper user ${
                !message.option_text && "awaiting"
              }`}
              key={(index * 2) + 1}
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
