/**
 * Component Name: Options
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of Incident options
 */

import "./Options.scss";

// import bootstrap from "../../../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import React, { useContext, useState } from "react";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import OptionContext from "../../../../../context/options/option-context";
import UserContext from "../../../../../context/user/user-context";
import {
  APP_MODAL_TYPES,
  MODALVIEW_CONTAINER,
  ROUTE_PATHS,
} from "../../../../../utilities/constants";
import { UiActions } from "../../../../../store/ui-slice";
import AppModal from "../../../../common/Modal/modal";

function Options(props) {
  const navigate = useNavigate();

  const [searchedText, setSearchedText] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const [optionsData, setOptionsData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [modalComponent, setmodalComponent] = useState(null);

  const optionContext = useContext(OptionContext);
  const userContext = useContext(UserContext);
  const activeUser = userContext.userData;
  const dispatch = useDispatch();

  /**
   * Function to Handle Option Selection
   * @param {HTML_Event} event
   */
  const handleKeyEventsOnSearch = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      if (event.target.value?.toLowerCase() === "i'm done") {
        handleGameEndWarning();
      } else if (event.target.value?.toLowerCase().includes("help")) {
        openInfoModal();
      } else if (event.target.value?.toLowerCase().includes("error")) {
        openErrorModal();
      } else if (event.target.value?.toLowerCase() === "no data") {
        setOptionsData(null);
        setNoData(true);
      } else {
        // Call API to get options with searched text
        getOptions();
      }
    }
    setSearchedText(event.target.value);
  };

  /**
   * Function to call API to get options
   */
  const getOptions = () => {
    dispatch(UiActions.setShowLoader(true));
    // const queryString = searchedText;
    setTimeout(() => {
      dispatch(UiActions.setShowLoader(false));

      // If API error
      openErrorModal();
    }, 1000);
  };

  /**
   * Function to Handle Option Selection
   * @param {HTML_Event} event
   */
  const handleOptionSelection = (event) => {
    setSelectedOption(Number(event.target.value));
  };

  /**
   * Function to Handle Submit Button Click
   */
  const handleSubmitClick = () => {
    const updatedList = [...new Set([...selectedOptionList, selectedOption])];
    setSelectedOptionList(updatedList);
    props.handleSubmit(selectedOption);
    setSelectedOption(null);
    setSearchedText("");
  };

  const handleModalClose = (event) => {
    dispatch(UiActions.setShowModal(false));
    setSearchedText("");
  };

  const handleGameEndWarning = (event) => {
    openWarningModal();
  };

  const handleEndTurn = (event) => {
    handleModalClose(event);
    setSearchedText("");
    navigate(ROUTE_PATHS.DASHBOARD);
  };

  const handleGetHint = (event) => {
    // Call API to get options without search text
    handleModalClose(event);
    dispatch(UiActions.setShowLoader(true));
    setTimeout(() => {
      dispatch(UiActions.setShowLoader(false));
      setOptionsData(
        optionContext.optionsData.data
          ? [...optionContext.optionsData.data]
          : null
      );
      setNoData(false);
    }, 1000);
  };

  const handleTryAgain = (event) => {
    if (searchedText) {
      handleModalClose(event);
      getOptions();
    }
  };

  const warningModalProps = {
    modalType: APP_MODAL_TYPES.INFO,
    handleModalClose: handleModalClose,
    modalBodyClass: ["info-modal-body-class"],
    modalData: {
      title: "End your Turn",
      subTitle:
        "This will end your turn. You will not be able to submit a response after this. Are you sure?",
      actionButtons: [
        {
          text: "Yes, End Turn",
          classNames: ["btn-primary"],
          clickHandler: handleEndTurn,
        },
        {
          text: "No, Go Back",
          classNames: ["btn-primary", "btn-filled"],
          clickHandler: handleModalClose,
        },
      ],
    },
  };

  const infoModalProps = {
    modalType: APP_MODAL_TYPES.INFO,
    handleModalClose: handleModalClose,
    modalBodyClass: ["info-modal-body-class"],
    modalData: {
      title: "Get a Hint?",
      subTitle:
        "Are you sure you'd like a hint? A small penalty will be added to the scenario time.",
      actionButtons: [
        {
          text: "Yes, Get Hint",
          classNames: ["btn-primary"],
          clickHandler: handleGetHint,
        },
        {
          text: "No, Go Back",
          classNames: ["btn-primary", "btn-filled"],
          clickHandler: handleModalClose,
        },
      ],
    },
  };

  const errorModalProps = {
    modalType: APP_MODAL_TYPES.ERROR,
    handleModalClose: handleModalClose,
    modalBodyClass: ["error-modal-body-class"],
    modalData: {
      title: "Couldn’t process this request!",
      subTitle:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut facilisis nulla, non aliquam libero.",
      actionButtons: [
        {
          text: "Go Back",
          classNames: ["btn-primary"],
          clickHandler: handleModalClose,
        },
        {
          text: "Try Again",
          classNames: ["btn-primary", "btn-filled"],
          clickHandler: handleTryAgain,
        },
      ],
    },
  };

  const openWarningModal = () => {
    dispatch(UiActions.setShowModal(true));
    setmodalComponent(React.createElement(AppModal, warningModalProps));
  };

  const openInfoModal = () => {
    dispatch(UiActions.setShowModal(true));
    setmodalComponent(React.createElement(AppModal, infoModalProps));
  };

  const openErrorModal = () => {
    dispatch(UiActions.setShowModal(true));
    setmodalComponent(React.createElement(AppModal, errorModalProps));
  };

  const appModal = createPortal(
    modalComponent,
    document.getElementById(MODALVIEW_CONTAINER)
  );

  return (
    <Fragment>
      <section className="section-options">
        <div className="title-container">
          <h1 className="title">What would you do?</h1>
          <p className="description">
            Please type what you'd like to do next. If you're stuck, type “I
            need help.” If you're ready to end your turn, type "I'm done."
          </p>
          <div className="user-action-wrapper">
            <div className="search-wrapper">
              <input
                type="search"
                name="user-commands"
                id="user-commands"
                onKeyUp={handleKeyEventsOnSearch}
                onChange={(e) => setSearchedText(e.target.value)}
                value={searchedText}
                placeholder="Search Options"
              />
              <img src="/images/search_grey_icon.png" alt="Search Icon" />
            </div>
            <button className="btn btn-primary" onClick={handleGetHint}>
              Get a Hint
            </button>
            <button className="btn btn-primary" onClick={handleGameEndWarning}>
              End Turn
            </button>
          </div>
        </div>
        <div className="d-flex flex-column option-container">
          <div
            className={`${
              noData
                ? "no-content-wrapper flex-grow-1"
                : "flex-shrink-0 option-wrapper overflow-scrollbar"
            }`}
          >
            {optionsData && Array.isArray(optionsData)
              ? optionsData.map((option) => (
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
                      <span>{option.option_value}</span>
                    </label>
                  </div>
                ))
              : noData && (
                  <div className="no-option-wrapper h-100 flex-center">
                    <span className="icon-wrapper">
                      <i className="fa-solid fa-ghost"></i>
                    </span>
                    <div className="title pb-1">Oops! Nothing Here.</div>
                    <div className="subTitle pb-2">
                      <p>We found no matches.</p>
                      <p>
                        Please try again or click the "Get a Hint" button if you
                        need help.
                      </p>
                    </div>
                    <div className="action-wrappers pt-2">
                      <button
                        className="btn btn-primary"
                        onClick={handleGetHint}
                      >
                        Get a Hint
                      </button>
                      <button
                        className="btn btn-primary btn-filled"
                        onClick={handleTryAgain}
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
          </div>
          <div className="action-wrapper d-flex justify-content-center mt-auto mb-2">
            <div className="user-wrapper">
              <img
                src={activeUser.profile_img}
                alt="profile icon"
                className="profile-icon"
              />
              <p className="user-name">{activeUser.user_name}</p>
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
      </section>

      {/* MODAL CONTENT */}
      {appModal}
    </Fragment>
  );
}

export default Options;
