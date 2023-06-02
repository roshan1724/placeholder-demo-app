/**
 * Component Name: Details
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of Incident details section
 */

import "./Details.scss";

import React, { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../../../../context/user/user-context";

const typingSpeed = 20;

function Details(props) {
  const { messageList } = props;
  const chatbox = useRef(null);
  const currentBotEle = useRef(null);
  const scrollViewEle = useRef(null);
  // setting the typing state og the messages received [false, false, false]
  const [typingState, setTypingState] = useState(() =>
    Array.from({ length: messageList.length }, (v, i) => false)
  );

  useEffect(() => {
    if (chatbox && chatbox.current) {
      chatbox.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (
      typingState[typingState.length - 1] &&
      scrollViewEle &&
      scrollViewEle.current
    ) {
      scrollViewEle.current?.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, [typingState]);

  const applyTypingEffect = (element, typingText, onTypeEnds) => {
    let startIndex = 0;

    const typeWriter = () => {
      if (typeof typingText === "string" && startIndex < typingText.length) {
        element.innerHTML = typingText.slice(0, startIndex + 1);
        startIndex++;

        if (element.innerHTML.length % 100 === 0) {
          scrollViewEle.current?.scrollIntoView({
            block: "end",
            behavior: "smooth",
          });
        }
        // chatbox.current.scrollTo(0, chatbox.current?.scrollHeight);
        setTimeout(typeWriter, typingSpeed);
      } else if (startIndex === typingText.length) {
        onTypeEnds();
      }
    };

    typeWriter();
  };

  useEffect(() => {
    if (currentBotEle.current) {
      const element = document.querySelector(".is-current .msg");
      const typingText = element.innerHTML;
      // Disable the last user responses;
      const newTypingState = Array.from(
        { length: messageList.length },
        (v, i) => (i === messageList.length - 1 ? false : true)
      );
      setTypingState(newTypingState);
      applyTypingEffect(element, typingText, () => {
        // Enable all the user responses;
        setTimeout(() => {
          setTypingState(() =>
            Array.from({ length: messageList.length }, (v, i) => true)
          );
        }, 100);
      });
    }
  }, [currentBotEle, messageList]);

  const userContext = useContext(UserContext);

  return (
    <section className="section-details">
      <div className="chatbox-container overflow-scrollbar" ref={chatbox}>
        {messageList.map((message, index) => (
          <>
            <div
              className={`msg-wrapper bot ${
                index === messageList.length - 1 ? "is-current" : ""
              }`}
              key={index * 2}
              ref={index === messageList.length - 1 ? currentBotEle : null}
            >
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
              } ${typingState[index] ? "d-flex" : "d-none"}`}
              key={index * 2 + 1}
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
            </div>
          </>
        ))}
        <div className="chat-bottom" ref={scrollViewEle}></div>
      </div>
    </section>
  );
}

export default Details;
