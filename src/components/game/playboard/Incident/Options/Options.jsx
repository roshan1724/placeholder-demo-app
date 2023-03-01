/**
 * Component Name: Options
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of Incident options
 */

import "./Options.scss";

import bootstrap from "../../../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import React, { useContext, useState } from "react";

import OptionContext from "../../../../../context/options/option-context";
import UserContext from "../../../../../context/user/user-context";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

function Options(props) {
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const optionContext = useContext(OptionContext);

  const optionsData = optionContext.optionsData.data
    ? [...optionContext.optionsData.data]
    : null;

  const userContext = useContext(UserContext);

  const activeUser = userContext.userData;

  let warnModal = null;

  setTimeout(() => {
    warnModal = new bootstrap.Modal(document.getElementById('warnModal'), {
      backdrop: true,
      keyboard: true,
      focus: true
    });
  }, 200);


  /**
   * Function to Handle Option Selection
   * @param {HTML_Event} event 
   */
  const handleOptionSelection = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  /**
   * Function to Handle Option Selection
   * @param {HTML_Event} event 
   */
  const handleKeyEventsOnSearch = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (event.target.value?.toLowerCase() === "i'm done") {
        openWarningModal();
      }

      event.target.value = '';
    }
  }

  /**
   * Function to Handle Submit Button Click
   */
  const handleSubmitClick = () => {
    const updatedList = [...new Set([...selectedOptionList, selectedOption])];
    setSelectedOptionList(updatedList);
    props.handleSubmit(selectedOption);
    setSelectedOption(null);
  };

  const openWarningModal = () => {
    if (warnModal) {
      warnModal.show();
    }

  }

  const handleModalClose = (event) => {
    if (warnModal) {
      warnModal.hide();
    }
  }

  const handleEndTurn = (event) => {
    handleModalClose(event);
    navigate('/dashboard');
  }

  return optionsData ? (
    <Fragment>
      <section className="section-options">
        <div className="title-container">
          <h1 className="title">What would you do?</h1>
          <p className="description">
            Please type what you'd like to do next.  If you're stuck, type “I need help.”  If you're ready to end your turn, type "I'm done." 
          </p>
          <div className="search-wrapper">
            <input type="search" name="user-commands" id="user-commands"
              onKeyUp={handleKeyEventsOnSearch}
              placeholder="Search Options" />
            <img src="/images/search_grey_icon.png" alt="Search Icon" />
          </div>
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
                />
                <label
                  htmlFor={"choice-" + option.option_id}
                  className="option-text"
                >
                  <span className="checkmark-holder">
                    <span className="checked"> </span>
                  </span>
                  {/* <img
                    src="/images/checkmark.png"
                    alt="checkmark"
                    className="option-checked"
                  /> */}
                  <span>{option.option_value}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="action-wrapper d-flex justify-content-center mt-auto mb-2">
            <div className="user-wrapper">
              <img
                src={activeUser.profile_img}
                alt="profile icon"
                className="profile-icon"
              />
              <p className="user-name">
                {activeUser.user_name}
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-filled submit-btn"
              onClick={handleSubmitClick}
              disabled={!selectedOption}
            >
              Submit
            </button>
          </div>
        </div>

        <button className="d-none" data-toggle="modal" data-target="#warnModal"></button>
      </section>

      {/* MODAL CONTENT */}
      <div className="modal fade" id="warnModal" tabIndex="-1" aria-labelledby="warnModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal">
          <div className="modal-content warn-modal">
            <span type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
              <img src="/images/circle_cross_grey.png" alt="Close Icon" width={30} height={30}/>
            </span>
            <div className="modal-body">
              <h3 className="modal-title" id="warnModalLabel">End your Turn</h3>
              <p className="modal-subtitle">This will end your turn. You will not be able to submit a response after this. Are you sure?</p>

              <div className="modal-action-wrapper">
                <button className="btn btn-primary" onClick={handleEndTurn}>Yes, End Turn</button>
                <button className="btn btn-primary btn-filled" onClick={handleModalClose}>No, Go Back</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <div className="loading"> ... </div>
  );
}

export default Options;
