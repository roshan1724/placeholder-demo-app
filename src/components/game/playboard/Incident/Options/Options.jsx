/**
 * Component Name: Options
 * Created Date: 6th January 2023
 * Owner: Roshan Kumar [roshankumar1724@gmail.com]
 * Description: Design layout of Incident options
 */

import "./Options.scss";

import React, { useContext, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import OptionContext from "../../../../../context/options/option-context";
// import UserContext from "../../../../../context/user/user-context";
import {
  APP_MODAL_TYPES,
  GAME_MODES,
  MODALVIEW_CONTAINER,
  ROUTE_PATHS,
} from "../../../../../utilities/constants";
import { UiActions } from "../../../../../store/ui-slice";
import AppModal from "../../../../common/Modal/modal";

function Options(props) {
  const navigate = useNavigate();

  const [gameMode, setGameMode] = useState(props.gameMode);
  const [searchedText, setSearchedText] = useState("");
  // const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionList, setSelectedOptionList] = useState([]);
  const [optionsData, setOptionsData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const [modalComponent, setmodalComponent] = useState(null);

  const optionContext = useContext(OptionContext);
  // const userContext = useContext(UserContext);
  // const activeUser = userContext.userData;
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
        handleGameHelpInfo();
      } else if (event.target.value?.toLowerCase().includes("error")) {
        handleGameError();
      } else if (event.target.value?.toLowerCase() === "no data") {
        setOptionsData(null);
        setNoData(true);
      } else {
        // Call API to get options with searched text
        getOptions();
      }
    }
  };

  /**
   * Function to call API to get options
   */
  const getOptions = () => {
    setSectionLoading(true);
    const queryString = searchedText;
    // Call API Here to get options with query String
    setTimeout(() => {
      setSectionLoading(false);
      if (queryString.toLowerCase() === "answer") {
        setOptionsData(
          optionContext.optionsData.data
            ? [...optionContext.optionsData.data]
            : null
        );
      } else {
        // If API error
        openErrorModal();
      }
    }, 1000);
  };

  /**
   * Function to Handle Option Selection
   * @param {HTML_Event} event
   */
  const handleOptionSelection = (event) => {
    const _selectedOption = Number(event.target.value);
    // setSelectedOption(_selectedOption);

    // Temporary Fix
    const updatedList = [...new Set([...selectedOptionList, _selectedOption])];
    setSelectedOptionList(updatedList);
    props.handleSubmit(_selectedOption);
    setOptionsData(null);
    // setSelectedOption(null);
    setSearchedText("");
  };

  /**
   * Function to Handle Submit Button Click
   */
  // const handleSubmitClick = () => {
  //   const updatedList = [...new Set([...selectedOptionList, selectedOption])];
  //   setSelectedOptionList(updatedList);
  //   props.handleSubmit(selectedOption);
  //   setOptionsData(null);
  //   setSelectedOption(null);
  //   setSearchedText("");
  // };

  const handleModalClose = (event) => {
    dispatch(UiActions.setShowModal(false));
    setSearchedText("");
  };

  const handleGameEndWarning = (event) => {
    openWarningModal();
  };

  const handleGameHelpInfo = (event) => {
    openInfoModal();
  };

  const handleGameError = (event) => {
    openErrorModal();
  };

  const handleAcceeptEndTurn = (event) => {
    handleModalClose(event);
    setGameMode(GAME_MODES.VIEW_ONLY);
    navigate(ROUTE_PATHS.GAME_PLAYBOARD_VIEW_ONLY);
    openSuccessModal();
  };

  const handleEndTurn = (event) => {
    handleModalClose(event);
    // setSelectedOption(null);
    setSearchedText("");
    // setGameMode(GAME_MODES.VIEW_ONLY);
    // navigate(ROUTE_PATHS.GAME_PLAYBOARD_VIEW_ONLY);
  };

  const handleGetHint = (event) => {
    // Call API to get options without search text
    handleModalClose(event);
    setSectionLoading(true);
    setTimeout(() => {
      setSectionLoading(false);
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

  const successModalProps = {
    modalType: APP_MODAL_TYPES.SUCCESS,
    handleModalClose: handleModalClose,
    modalBodyClass: ["success-modal-body-class"],
    modalData: {
      title: "Thanks for playing!",
      subTitle: `You are now a "Watcher", and can continue to watch the scenario as it unfolds.`,
      actionButtons: [
        {
          text: "Okay",
          classNames: ["btn-primary", "btn-filled"],
          clickHandler: handleEndTurn,
        },
      ],
    },
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
          clickHandler: handleAcceeptEndTurn,
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

  const openSuccessModal = () => {
    dispatch(UiActions.setShowModal(true));
    setmodalComponent(React.createElement(AppModal, successModalProps));
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
            Please type what you'd like to do next, and ChaosTrack will present
            you with your options.
          </p>
          <div
            className={`user-action-wrapper ${
              gameMode === GAME_MODES.VIEW_ONLY ? "d-none" : ""
            }`}
          >
            <div className="search-wrapper custom-form-block">
              <div className="input-group">
                <input
                  type="search"
                  name="user-commands"
                  id="user-commands"
                  onKeyUp={handleKeyEventsOnSearch}
                  onChange={(e) => setSearchedText(e.target.value)}
                  value={searchedText}
                  disabled={gameMode === GAME_MODES.VIEW_ONLY}
                  placeholder="Search Options"
                />
                <span
                  className={`action-wrapper ${searchedText ? "" : "d-none"}`}
                >
                  <i className="fa-solid fa-xmark"></i>
                </span>
                <span className="input-group-text last-child">
                  <i className="fa-solid fa-search"></i>
                </span>
              </div>
            </div>
            <button
              className="btn btn-primary"
              disabled={gameMode === GAME_MODES.VIEW_ONLY}
              onClick={handleGameHelpInfo}
            >
              Get a Hint
            </button>
            <button
              className={`btn btn-primary ${
                gameMode === GAME_MODES.VIEW_ONLY ? "d-none" : ""
              }`}
              onClick={handleGameEndWarning}
            >
              End Turn
            </button>
          </div>
        </div>
        <div className="d-flex flex-column option-container">
          <div
            className={`${
              noData || sectionLoading
                ? "no-content-wrapper flex-grow-1"
                : "flex-shrink-0 option-wrapper overflow-scrollbar"
            }`}
          >
            {optionsData &&
            Array.isArray(optionsData) &&
            gameMode !== GAME_MODES.VIEW_ONLY ? (
              optionsData.map((option) => (
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
            ) : noData ? (
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
                  <button className="btn btn-primary" onClick={handleGetHint}>
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
            ) : sectionLoading ? (
              <div className="section-loader-wrapper h-100 flex-center">
                <span className="icon-wrapper">
                  {/* <i className="fa-solid fa-ellipsis fa-beat-fade"></i> */}
                  <i className="fa-solid fa-ellipsis fa-spin-pulse"></i>
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* <div
            className={`action-wrapper d-flex justify-content-center mt-auto mb-2 ${
              gameMode === GAME_MODES.VIEW_ONLY ? "d-none" : ""
            }`}
          >
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
              className="btn btn-primary btn-filled submit-btn d-none"
              onClick={handleSubmitClick}
              disabled={!selectedOption}
            >
              Submit Response
            </button>
          </div> */}
        </div>
      </section>

      {/* MODAL CONTENT */}
      {appModal}
    </Fragment>
  );
}

export default Options;
