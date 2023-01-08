import "./Summary.scss";

import React, { useContext } from "react";
import UserContext from "../../../context/user/user-context";

function Summary(props) {
  const userContext = useContext(UserContext);

  const activeUser = userContext.userData;

  return (
    <section className="section-summary">
      <div className="title-container">
        <h1 className="title">Incident Summary</h1>
        <p className="description">
          Graham Smith (User) hasn't received any emails from outside the
          company for at least 8 hours
        </p>
      </div>
      <div className="achievement-container">
        {activeUser.achievements && activeUser.achievements.length > 0 && (
          <h4 className="title">Accomplishments</h4>
        )}
        {activeUser.achievements.map((data) => (
          <div className="achievement-wrapper" key={data?.achievement_id}>
            <img
              src="/images/victory_cup.png"
              alt="victory cup"
              className="badge-icon"
            />
            <div className="achievement-user-wrapper active">
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
    </section>
  );
}

export default Summary;
