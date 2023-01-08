import "./Options.scss";

import React, { useContext, useState } from "react";

import OptionContext from "../../../context/options/option-context";

function Options(props) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const optionContext = useContext(OptionContext);

  const optionsData = optionContext.optionsData.data
    ? [...optionContext.optionsData.data]
    : null;

  const handleOptionSelection = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  const handleSubmitClick = () => {
    const updatedList = [...new Set([...selectedOptionList, selectedOption])];
    setSelectedOptionList(updatedList);
    props.handleSubmit(selectedOption);
  };

  return optionsData ? (
    <section className="section-options">
      <div className="title-container">
        <h1 className="title">What would you do ?</h1>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur ut facilisis nulla, non
          aliquam libero. Turpis id velit vehicula imperdiet eget ?
        </p>
        <img
          src="/images/people-male.png"
          alt="profile-icon"
          className="profile-icon"
        />
      </div>

      <div className="d-flex flex-column option-container">
        <div className="flex-shrink-0 option-wrapper overflow-scrollbar">
          {optionsData.map((option) => (
            <div className="option-content" key={option.option_id}>
              <input
                type="radio"
                name="incident_option"
                className={`option-input ${
                  selectedOptionList.includes(option.option_id)
                    ? "disable-selected"
                    : ""
                }`}
                id={"choice-" + option.option_id}
                value={option.option_id}
                onChange={handleOptionSelection}
                disabled={
                  selectedOptionList.includes(option.option_id)
                    ? "disabled"
                    : ""
                }
              />
              <label
                htmlFor={"choice-" + option.option_id}
                className="option-text"
              >
                <span className="checkmark-holder"></span>
                <img
                  src="/images/checkmark.png"
                  alt="checkmark"
                  className="option-checked"
                />
                <span>{option.option_value}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="action-wrapper d-flex justify-content-center mt-auto mb-2">
          <button
            type="submit"
            className="btn submit-btn"
            onClick={handleSubmitClick}
          >
            {" "}
            Submit{" "}
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="loading"> ... </div>
  );
}

export default Options;
