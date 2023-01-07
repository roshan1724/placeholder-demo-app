import "./Container.scss";

import React, { useEffect, useState } from 'react';

import Summary from "../Incident/Summary/Summary";
import Details from "../Incident/Details/Details";
import Options from "../Incident/Options/Options";

function Container() {

  const [incidentData, setIncidentData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    fetch("/data/user-data.json").then(response => response.json()).then(response => {
      setUserData(response);
    }).catch(err => {
      console.warn(err);
    });

    fetch("/data/incident-option-data.json").then(response => response.json()).then(response => {
      setOptionsData(response);
    }).catch(err => {
      console.warn(err);
    });

    fetch("/data/incident-data.json").then(response => response.json()).then(response => {
      setIncidentData(response);
    }).catch(err => {
      console.warn(err);
    });
  }, []);

  // const updateUserAchievements = ({user_id, linked_achievements}) => {
  //   const updateUserData = [];
  //   userData.forEach(user => {
  //     if (user.user_id === user_id) {
  //       const userAchievements = user.achievements;
  //       updateUserData.push({
  //         ...user,
  //         achievements: [
  //           ...userAchievements,
  //           ...linked_achievements
  //         ]
  //       });
  //     }
  //   });
  //   setUserData(userData);
  // }

  return (
    <section className="container-wrapper p-3 mb-3">
      <div className="row">
        <div className="col-12 col-md-4 section-container">
            <Summary className="h-100"
              userData={userData}
            />
        </div>
        <div className="col-12 col-md-4 section-container">
            <Details className="h-100"
              incidentData={incidentData}
            />
        </div>
        <div className="col-12 col-md-4 section-container">
            <Options className="h-100"
              optionsData={optionsData}
            />
        </div>
      </div>
    </section>
  );
}

export default Container;
