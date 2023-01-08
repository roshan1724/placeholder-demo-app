import React, { useEffect, useState } from "react";
import OptionContext from "./option-context";

const OptionState = (props) => {
  const [optionsData, setOptionsData] = useState([]);

  useEffect(() => {
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
