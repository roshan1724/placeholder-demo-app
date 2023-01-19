/**
 * Context State Name: OptionState
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Global Context State to handle Incident Options
 */

import React, { useEffect, useState } from "react";
import OptionContext from "./option-context";

const OptionState = (props) => {
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
    // API Call to get Option Data
    fetch("/data/incident-option-data.json")
      .then((response) => response.json())
      .then((response) => {
        setOptionsData(response);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

  return (
    <OptionContext.Provider value={{ optionsData }}>
      {props.children}
    </OptionContext.Provider>
  );
};

export default OptionState;
