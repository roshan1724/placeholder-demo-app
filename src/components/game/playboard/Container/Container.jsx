/**
 * Component Name: Container
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Contains the design layout of the page body
 */

import "./Container.scss";

import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Incident from "../Incident/Incident";
import Options from "../Incident/Options/Options";

import OptionContext from "../../../../context/options/option-context";
import UserContext from "../../../../context/user/user-context";
import { UiActions } from "../../../../store/ui-slice";
import { API_PATHS } from "../../../../utilities/constants";

function Container({ gameMode }) {
  const [incidentData, setIncidentData] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [incidentCount, setIncidentCount] = useState(0);

  const optionContext = useContext(OptionContext);
  const userContext = useContext(UserContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API Call to get Incident Data
    fetch(API_PATHS.INCIDENT_DATA)
      .then((response) => response.json())
      .then((response) => {
        dispatch(UiActions.setShowLoader(false));
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
        dispatch(UiActions.setShowLoader(false));
        console.warn(err);
      });
  }, [dispatch]);

  /**
   * Function to handle Submit selected options
   * @param {HTML_Event} event
   */
  const handleSubmit = (event) => {
    console.log(event);
    dispatch(UiActions.setShowLoader(true));

    // Simulate API Call to Submit correct selected options
    setTimeout(() => {
      dispatch(UiActions.setShowLoader(false));

      const currentData = messageList.map((message) => {
        if (message.incident_id === incidentData[incidentCount].incident_id) {
          if (incidentData[incidentCount].correct_option_id === event) {
            userContext.updateUserAchievements({
              user_id: userContext.userData.user_id,
              linked_achievements:
                incidentData[incidentCount].linked_achievements,
            });
          }
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
    }, 200);
  };

  return (
    userContext.userData && (
      <section className="container-wrapper p-3 mb-3">
        <div className="row">
          {
            <div className="col-12 col-md-7 section-container">
              <Incident className="h-100" messageList={messageList} />
              <img
                src="/images/resizer_icon.png"
                alt="resizer icon"
                className="seperator-icon"
              />
            </div>
          }
          <div className="col-12 col-md-5 section-container">
            <Options
              className="h-100"
              handleSubmit={handleSubmit}
              gameMode={gameMode}
            />
          </div>
        </div>
      </section>
    )
  );
}

export default Container;
