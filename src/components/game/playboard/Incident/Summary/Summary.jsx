/**
 * Component Name: Summary
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of incident summary section
 */

import "./Summary.scss";

import React, { useContext } from "react";
import UserContext from "../../../../../context/user/user-context";

function Summary(props) {
  const userContext = useContext(UserContext);

  const activeUser = userContext.userData;

  return (
    <section className="section-summary">
      <div className="title-container">
        <h1 className="title">Game name goes here</h1>
        <p className="description">
          <span className="text-highlight">Incident Summary</span>:
          Graham Smith (User) hasn't received any emails from outside the
          company for at least 8 hours
        </p>
      </div>
      <div className="achievement-container">
        {activeUser.achievements && activeUser.achievements.length > 0 && (
          <h4 className="title">Major Decisions</h4>
        )}
        <div className="achievement-holder overflow-scrollbar">
          {activeUser.achievements.map((data, index) => (
            <div className="achievement-wrapper" key={data?.achievement_id}>
              {/* <img
                src="/images/victory_cup.png"
                alt="victory cup"
                className="badge-icon"
              /> */}
              <div className={`achievement-user-wrapper ${index === 0 && 'active'}`}>
                <img
                  src={activeUser.profile_img}
                  alt="victory cup"
                  className="profile-icon"
                />
                <div className="user-details">
                  <p className="user-name">
                    {activeUser.user_name}
                    <span className="user-type"> ({activeUser.user_dept}) </span>
                  </p>
                  <p className="achievement-name">{data?.achievement_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Summary;
