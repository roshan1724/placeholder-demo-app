import "./Container.scss";

import React, { useContext, useEffect, useState } from "react";

import Summary from "../Incident/Summary/Summary";
import Details from "../Incident/Details/Details";
import Options from "../Incident/Options/Options";

import OptionContext from "../../context/options/option-context";
import UserContext from "../../context/user/user-context";

function Container() {
  const [incidentData, setIncidentData] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [incidentCount, setIncidentCount] = useState(0);

  const optionContext = useContext(OptionContext);
  const userContext = useContext(UserContext);

  useEffect(() => {
    fetch("/data/incident-data.json")
      .then((response) => response.json())
      .then((response) => {
        setIncidentData(response.data);
        setMessageList([
          {
            incident_id: response.data[0].incident_id,
            message_text: response.data[0].incident_question,
            option_text: null,
            is_correct: false,
          },
        ]);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  const handleSubmit = (event) => {
    const currentData = messageList.map((message) => {
      if (message.incident_id === incidentData[incidentCount].incident_id) {
        userContext.updateUserAchievements({
          user_id: userContext.userData.user_id,
          linked_achievements: incidentData[incidentCount].linked_achievements,
        });
        return {
          ...message,
          option_text: optionContext.optionsData.data?.find(
            (option) => option.option_id === event
          ).option_value,
          is_correct: incidentData[incidentCount].correct_option_id === event,
        };
      }
      return message;
    });

    currentData.push({
      incident_id: incidentData[incidentCount + 1].incident_id,
      message_text: incidentData[incidentCount + 1].incident_question,
      option_text: null,
      is_correct: false,
    });
    setIncidentCount(incidentCount + 1);
    setMessageList(currentData);
  };

  return (
    userContext.userData && (
      <section className="container-wrapper p-3 mb-3">
        <div className="row">
          <div className="col-12 col-md-4 section-container">
            <Summary className="h-100" />
          </div>
          <div className="col-12 col-md-4 section-container">
            <Details className="h-100" messageList={messageList} />
          </div>
          <div className="col-12 col-md-4 section-container">
            <Options className="h-100" handleSubmit={handleSubmit} />
          </div>
        </div>
      </section>
    )
  );
}

export default Container;
