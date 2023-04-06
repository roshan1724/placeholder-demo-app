import "./details.scss";
import { useContext } from "react";
import NewGameContext from "../../../../../context/game/new-game-context";
import GameDetailForm, {
  getSpectatorFields,
} from "../../../../../forms/game-detail-form";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameFormActions } from "../../../../../store/form-game-slice";
import AppService from "../../../../../utilities/app-service";

function GameDetails() {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);
  const detailFormValues = useSelector((state) => state.gameForm.details_form);
  const timeZones = useSelector((state) => state.ui.timeZones.zoneList);
  const cuurentTimeZone = useSelector(
    (state) => state.ui.timeZones.currentZone
  );

  const formOptionsData = {
    time_zome: [...timeZones],
    current_time_zone: cuurentTimeZone,
    hasPortalOptions: [
      { optionValue: "true", displayText: "Yes" },
      { optionValue: "false", displayText: "No" },
    ],
    emailGatewayOptions: [
      { optionValue: "proofpoint", displayText: "Proofpoint" },
      { optionValue: "barracuda", displayText: "Barracuda" },
      { optionValue: "mimecast", displayText: "Mimecast" },
      {
        optionValue: "microsoft defender for email",
        displayText: "Microsoft Defender for Email",
      },
      { optionValue: "other", displayText: "Other" },
    ],
    antivirusOptions: [
      { optionValue: "norton", displayText: "Norton" },
      { optionValue: "bitdefender", displayText: "Bitdefender" },
      { optionValue: "mcafee", displayText: "McAfee" },
      { optionValue: "kaspersky", displayText: "Kaspersky" },
      { optionValue: "avast", displayText: "Avast" },
      { optionValue: "avira", displayText: "Avira" },
      { optionValue: "panda", displayText: "Panda" },
      { optionValue: "trend micro", displayText: "Trend Micro" },
      { optionValue: "malwarebytes", displayText: "Malwarebytes" },
      { optionValue: "sophos", displayText: "Sophos" },
      { optionValue: "none", displayText: "None" },
    ],
    edrOptions: [
      { optionValue: "crowdstrike", displayText: "CrowdStrike" },
      { optionValue: "sentinelone", displayText: "SentinelOne" },
      {
        optionValue: "microsoft defender for endpoint",
        displayText: "Microsoft Defender for Endpoint",
      },
      { optionValue: "cybereason", displayText: "Cybereason" },
      { optionValue: "palo alto", displayText: "Palo Alto" },
      { optionValue: "ciso", displayText: "Ciso" },
      { optionValue: "carbon black", displayText: "Carbon Black" },
      { optionValue: "sophos", displayText: "Sophos" },
      { optionValue: "none", displayText: "None" },
      { optionValue: "other", displayText: "Other" },
    ],
  };

  const handleDateChange = (e) => {
    gameDetailForm.setFieldValue("start_date", e.target.value);
  };

  const handleTimeChange = (e) => {
    const time12hr = AppService.ConvertTime_24_to_12(e.target.value);
    gameDetailForm.setFieldValue("start_time", time12hr);
  };

  const handleBackClick = () => {
    dispatch(
      GameFormActions.updateGameForm({
        formName: "details_form",
        formData: gameDetailForm.values,
      })
    );
    setActiveStepIndex(activeStepIndex - 1);
    window?.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNextClick = async () => {
    const formSubmitBtn = document.getElementById("game-detail-form-submit");
    formSubmitBtn.click();
  };

  const submitCallback = (submitState) => {
    if (submitState) {
      setActiveStepIndex(activeStepIndex + 1);
      window?.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleDateIconClick = () => {
    const element = document.getElementById("date-copy");
    element.showPicker();
  };

  const handleTimeIconClick = () => {
    const element = document.getElementById("time-copy");
    element.showPicker();
  };

  const addSpectatorField = () => {
    gameDetailForm.setFieldValue("spectators", [
      ...gameDetailForm.values.spectators,
      getSpectatorFields(),
    ]);
  };

  const deleteSpectatorField = (index) => {
    const newSpectatorFiels = gameDetailForm.values.spectators;
    console.log("newSpectator Fields before deleting == >", newSpectatorFiels);
    newSpectatorFiels.splice(index, 1);
    console.log("newSpectator Fields after deleting == >", newSpectatorFiels);
    gameDetailForm.setFieldValue("spectators", newSpectatorFiels);
  };

  const getSpectatorUI = () => {
    return gameDetailForm.values.spectators.map((spectator, spectatorIndex) => (
      <Fragment>
        <div className="col-4">
          <div className="w-100 inner-form-wrapper">
            <div className="spectator-index pt-2">{spectatorIndex + 1}.</div>
            <div className={`form-block-wrapper w-100`}>
              <div className="custom-form-block w-100">
                <label
                  htmlFor={`game-detail-spectator-${spectatorIndex}-name`}
                  className="form-label"
                >
                  Name
                </label>
                <div className="input-group has-validation">
                  <input
                    type="text"
                    name={`spectators[${spectatorIndex}].spectator_name`}
                    id={`game-detail-spectator-${spectatorIndex}-name`}
                    className={`form-control ${
                      gameDetailForm.touched?.spectators?.at(spectatorIndex)
                        ?.spectator_name &&
                      gameDetailForm.errors?.spectators?.at(spectatorIndex)
                        ?.spectator_name
                        ? "is-invalid"
                        : ""
                    }`}
                    placeholder={`Spectator's Name`}
                    onChange={gameDetailForm.handleChange}
                    onBlur={gameDetailForm.handleBlur}
                    value={
                      gameDetailForm.values.spectators[spectatorIndex]
                        .spectator_name
                    }
                  />
                  <div className="invalid-feedback">
                    {gameDetailForm.touched?.spectators?.at(spectatorIndex)
                      ?.spectator_name &&
                    gameDetailForm.errors?.spectators?.at(spectatorIndex)
                      ?.spectator_name
                      ? gameDetailForm.errors?.spectators[spectatorIndex]
                          ?.spectator_name
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="form-block-wrapper w-100">
            <div className="custom-form-block w-100">
              <label
                htmlFor={`game-detail-spectator-${spectatorIndex}-email`}
                className="form-label"
              >
                Email
              </label>
              <div className="input-group has-validation">
                <input
                  type="text"
                  name={`spectators[${spectatorIndex}].spectator_email`}
                  id={`game-detail-spectator-${spectatorIndex}-email`}
                  className={`form-control ${
                    gameDetailForm.touched?.spectators?.at(spectatorIndex)
                      ?.spectator_email &&
                    gameDetailForm.errors?.spectators?.at(spectatorIndex)
                      ?.spectator_email
                      ? "is-invalid"
                      : ""
                  }`}
                  placeholder={`Spectator's Email`}
                  onChange={gameDetailForm.handleChange}
                  onBlur={gameDetailForm.handleBlur}
                  value={
                    gameDetailForm.values.spectators[spectatorIndex]
                      .spectator_email
                  }
                />
                <div className="invalid-feedback">
                  {gameDetailForm.touched?.spectators?.at(spectatorIndex)
                    ?.spectator_email &&
                  gameDetailForm.errors?.spectators?.at(spectatorIndex)
                    ?.spectator_email
                    ? gameDetailForm.errors?.spectators[spectatorIndex]
                        ?.spectator_email
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="spectator-action-wrapper pt-2 h-100">
            {gameDetailForm.values.spectators.length === spectatorIndex + 1 ? (
              <button className="btn btn-primary" onClick={addSpectatorField}>
                <span className="icon-wrapper me-2">
                  <i className="fa-solid fa-plus"></i>
                </span>
                Add
              </button>
            ) : (
              <span
                className="icon-wrapper"
                onClick={() => deleteSpectatorField(spectatorIndex)}
              >
                <i className="fa-solid fa-trash-can"></i>
              </span>
            )}
          </div>
        </div>
      </Fragment>
    ));
  };

  const gameDetailForm = GameDetailForm(
    formOptionsData,
    detailFormValues,
    submitCallback
  );
  // console.log("FORM VALUES ===> ", gameDetailForm.values);
  // console.log("FORM ERRORS ==> ", gameDetailForm.errors);
  // console.log("FORM VALIDITY ==> ", gameDetailForm.isValid);

  return (
    gameDetailForm.values &&
    Object.keys(gameDetailForm.values).length > 0 && (
      <section className="section-game-scenario">
        <div className="detail-form-wrapper">
          <form
            className="game-detail-form"
            onSubmit={gameDetailForm.handleSubmit}
          >
            <div className="row field-group-wrapper">
              <div className="col-12">
                <p className="field-label">
                  Schedule the game start date and time
                </p>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block flex-grow-1 date-block-wrapper">
                    <label htmlFor="game-detail-date" className="form-label">
                      Date
                    </label>
                    <div className="input-group custom-field has-validation">
                      <input
                        type="date"
                        name="start_date"
                        id="date-copy"
                        className="hide-input"
                        onChange={handleDateChange}
                      />
                      <input
                        type="text"
                        name="start_date"
                        id="game-detail-date"
                        className={`form-control ${
                          gameDetailForm.touched.start_date &&
                          gameDetailForm.errors.start_date
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Select Date"
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.start_date}
                        onClick={handleDateIconClick}
                        readOnly
                      />
                      <span
                        className="icon-wrapper input-field-icon"
                        onClick={handleDateIconClick}
                      >
                        <i className="fa-solid fa-calendar-days"></i>
                      </span>
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.start_date &&
                      gameDetailForm.errors.start_date
                        ? gameDetailForm.errors.start_date
                        : null}
                    </div>
                  </div>

                  <div className="custom-form-block flex-grow-1 time-block-wrapper">
                    <label htmlFor="game-detail-time" className="form-label">
                      Time
                    </label>
                    <div className="input-group custom-field has-validation">
                      <input
                        type="time"
                        name="start_time"
                        id="time-copy"
                        className="hide-input"
                        onChange={handleTimeChange}
                      />
                      <input
                        type="text"
                        name="start_time"
                        id="game-detail-time"
                        className={`form-control ${
                          gameDetailForm.touched.start_time &&
                          gameDetailForm.errors.start_time
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`Select Time`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.start_time}
                        onClick={handleTimeIconClick}
                        readOnly
                      />
                      <span
                        className="icon-wrapper input-field-icon"
                        onClick={handleTimeIconClick}
                      >
                        <i className="fa-regular fa-clock"></i>
                      </span>
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched?.start_time &&
                      gameDetailForm.errors?.start_time
                        ? gameDetailForm.errors?.start_time
                        : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block time-zone-field">
                    <label
                      htmlFor="game-detail-time-zone"
                      className="form-label"
                    >
                      Time Zone
                    </label>
                    <div className="input-group has-validation">
                      <select
                        name="time_zone"
                        id="game-detail-time-zone"
                        className={`form-select ${
                          gameDetailForm.touched.time_zone &&
                          gameDetailForm.errors.time_zone
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.time_zone}
                      >
                        {formOptionsData.time_zome.map((zone, zoneIndex) => (
                          <option value={zone} key={`time_zone-${zoneIndex}`}>
                            {zone}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.time_zone &&
                      gameDetailForm.errors.time_zone
                        ? gameDetailForm.errors.time_zone
                        : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12">
                <p className="field-label">"End User" details</p>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-user-name"
                      className="form-label"
                    >
                      Name *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="user_name"
                        id="game-detail-user-name"
                        className={`form-control ${
                          gameDetailForm.touched.user_name &&
                          gameDetailForm.errors.user_name
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`End User's name`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.user_name}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.user_name &&
                        gameDetailForm.errors.user_name
                          ? gameDetailForm.errors.user_name
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-user-email"
                      className="form-label"
                    >
                      Email *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="user_email"
                        id="game-detail-user-email"
                        className={`form-control ${
                          gameDetailForm.touched.user_email &&
                          gameDetailForm.errors.user_email
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`End User's Email`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.user_email}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.user_email &&
                        gameDetailForm.errors.user_email
                          ? gameDetailForm.errors.user_email
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12">
                <p className="field-label">
                  "Chief Information Security Officer (CISO)" details
                </p>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-ciso-name"
                      className="form-label"
                    >
                      Name *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="ciso_name"
                        id="game-detail-ciso-name"
                        className={`form-control ${
                          gameDetailForm.touched.cisco_name &&
                          gameDetailForm.errors.cisco_name
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`CISO's Name`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.cisco_name}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.ciso_name &&
                        gameDetailForm.errors.ciso_name
                          ? gameDetailForm.errors.ciso_name
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-ciso-email"
                      className="form-label"
                    >
                      Email *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="ciso_email"
                        id="game-detail-ciso-email"
                        className={`form-control ${
                          gameDetailForm.touched.ciso_email &&
                          gameDetailForm.errors.ciso_email
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`CISO's Email`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.ciso_email}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.ciso_email &&
                        gameDetailForm.errors.ciso_email
                          ? gameDetailForm.errors.ciso_email
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-ciso-title"
                      className="form-label"
                    >
                      Job Title *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="ciso_title"
                        id="game-detail-ciso-title"
                        className={`form-control ${
                          gameDetailForm.touched.ciso_title &&
                          gameDetailForm.errors.ciso_title
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`CISO's Job Title`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.ciso_title}
                      />
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.ciso_title &&
                      gameDetailForm.errors.ciso_title
                        ? gameDetailForm.errors.ciso_title
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12">
                <p className="field-label">"I.T. Admin" details</p>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-it-admin-name"
                      className="form-label"
                    >
                      Name *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="it_admin_name"
                        id="game-detail-it-admin-name"
                        className={`form-control ${
                          gameDetailForm.touched.it_admin_name &&
                          gameDetailForm.errors.it_admin_name
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`I.T. Admin's Name`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.it_admin_name}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.it_admin_name &&
                        gameDetailForm.errors.it_admin_name
                          ? gameDetailForm.errors.it_admin_name
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-it-admin-email"
                      className="form-label"
                    >
                      Email *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="it_admin_email"
                        id="game-detail-it-admin-email"
                        className={`form-control ${
                          gameDetailForm.touched.it_admin_email &&
                          gameDetailForm.errors.it_admin_email
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`I.T. Admin's Email`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.it_admin_email}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.it_admin_email &&
                        gameDetailForm.errors.it_admin_email
                          ? gameDetailForm.errors.it_admin_email
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-block-wrapper">
                  <div className="custom-form-block w-100">
                    <label
                      htmlFor="game-detail-it-admin-title"
                      className="form-label"
                    >
                      Job Title *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="it_admin_title"
                        id="game-detail-user-name"
                        className={`form-control ${
                          gameDetailForm.touched.it_admin_title &&
                          gameDetailForm.errors.it_admin_title
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`I.T. Admin's Job Title`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.it_admin_title}
                      />
                      {/* <select
                        name="it_admin_title"
                        id="game-detail-it-admin-title"
                        className={`form-select ${
                          gameDetailForm.touched.it_admin_title &&
                          gameDetailForm.errors.it_admin_title
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.it_admin_title}
                      >
                        <option value="">I.T. Admin's Job Title</option>
                        {formOptionsData.it_admin_jobTitle.map(
                          (title, titleIndex) => (
                            <option
                              value={title}
                              key={`it-admin-jobtitle-${titleIndex}`}
                            >
                              {title}
                            </option>
                          )
                        )}
                      </select> */}
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.it_admin_title &&
                      gameDetailForm.errors.it_admin_title
                        ? gameDetailForm.errors.it_admin_title
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper" name={`spectators`}>
              <div className="col-12">
                <p className="field-label">Spectator(s) Details</p>
              </div>
              {getSpectatorUI()}
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12 mb-2">
                <p id="game-has-portal" className="field-label">
                  Do you provide a web-based portal where employees can enter
                  tickets for the I.T. team? *
                </p>
              </div>
              <div className="col-4">
                <div className="custom-form-block">
                  <div
                    className="c-radio-groups portal-check"
                    role="group"
                    aria-labelledby="game-has-portal"
                  >
                    {formOptionsData.hasPortalOptions.map(
                      (optionData, optionIndex) => (
                        <div
                          className="form-check form-check-inline"
                          key={`portal-option_key-${optionIndex}`}
                        >
                          <input
                            type="radio"
                            name="hasPortal"
                            id={`game-portal_option-${optionIndex}`}
                            className={`form-check-input`}
                            checked={
                              gameDetailForm.values.hasPortal ===
                              optionData.optionValue
                            }
                            onChange={gameDetailForm.handleChange}
                            onBlur={gameDetailForm.handleBlur}
                            value={optionData.optionValue}
                          />
                          <label
                            htmlFor={`game-portal_option-${optionIndex}`}
                            className="form-check-label"
                          >
                            {optionData.displayText}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                  <div className="invalid-feedback">
                    {gameDetailForm.touched.hasPortal &&
                    gameDetailForm.errors.hasPortal
                      ? gameDetailForm.errors.hasPortal
                      : ""}
                  </div>
                  {gameDetailForm.values.hasPortal === "true" ? (
                    <div className="input-group has-validation mt-2">
                      <input
                        type="text"
                        name="portalValue"
                        className={`form-control ${
                          gameDetailForm.touched?.portalValue &&
                          gameDetailForm.errors?.portalValue
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`Name or URL of that portal`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.portalValue}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched?.portalValue &&
                        gameDetailForm.errors?.portalValue
                          ? gameDetailForm.errors.portalValue
                          : ""}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12">
                <p className="field-label">
                  Name of Slack or Teams channel for this simulation
                </p>
              </div>
              <div className="col-4">
                <div className="custom-form-block mt-2 w-100">
                  <div className="input-group has-validation">
                    <input
                      type="text"
                      name="im_name"
                      className={`form-control ${
                        gameDetailForm.touched.im_name &&
                        gameDetailForm.errors.im_name
                          ? "is-invalid"
                          : ""
                      }`}
                      placeholder={`Name of Slack or Teams channel`}
                      onChange={gameDetailForm.handleChange}
                      onBlur={gameDetailForm.handleBlur}
                      value={gameDetailForm.values.im_name}
                    />
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.im_name &&
                      gameDetailForm.errors.im_name
                        ? gameDetailForm.errors.im_name
                        : ""}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-4">
                <p className="recommend-text">
                  <span className="icon-wrapper">
                    <i className="fa-solid fa-circle-info"></i>
                  </span>
                  <span>
                    We recommend setting up a Slack/Teams channel for this
                    simulation where your team can discuss options and plan your
                    next move.
                  </span>
                </p>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12 mb-2">
                <p id="game-email-gateway" className="field-label">
                  What secure email gateway do you use? *
                </p>
              </div>
              <div className="col-12">
                <div className="custom-form-block">
                  <div
                    className="c-checkbox-groups w-100"
                    role={`group`}
                    aria-labelledby="game-email-gateway"
                  >
                    <div className="row w-100">
                      {formOptionsData.emailGatewayOptions.map(
                        (optionData, optionIndex) => (
                          <div
                            className="col-2"
                            key={`email-gateway_key-${optionIndex}`}
                          >
                            <div className="form-check form-check-inline">
                              <input
                                type="checkbox"
                                name="email_gateway"
                                id={`game-email_gateway_option-${optionIndex}`}
                                className={`form-check-input`}
                                checked={gameDetailForm.values.email_gateway.includes(
                                  optionData.optionValue
                                )}
                                onChange={gameDetailForm.handleChange}
                                onBlur={gameDetailForm.handleBlur}
                                value={optionData.optionValue}
                              />
                              <label
                                htmlFor={`game-email_gateway_option-${optionIndex}`}
                                className="form-check-label"
                              >
                                {optionData.displayText}
                              </label>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.email_gateway &&
                      gameDetailForm.errors.email_gateway
                        ? gameDetailForm.errors.email_gateway
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12 mb-2">
                <p id="game-antivirus" className="field-label">
                  What antivirus product do you use? *
                </p>
              </div>
              <div className="col-12">
                <div className="custom-form-block">
                  <div
                    className="c-radio-groups w-100"
                    role={`group`}
                    aria-labelledby="game-antivirus"
                  >
                    <div className="row w-100">
                      {formOptionsData.antivirusOptions.map(
                        (optionData, optionIndex) => (
                          <div
                            className="col-2"
                            key={`antivirus_key-${optionIndex}`}
                          >
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                name="antivirus"
                                id={`game-antivirus_option-${optionIndex}`}
                                className={`form-check-input`}
                                checked={
                                  gameDetailForm.values.antivirus ===
                                  optionData.optionValue
                                }
                                onChange={gameDetailForm.handleChange}
                                onBlur={gameDetailForm.handleBlur}
                                value={optionData.optionValue}
                              />
                              <label
                                htmlFor={`game-antivirus_option-${optionIndex}`}
                                className="form-check-label"
                              >
                                {optionData.displayText}
                              </label>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.antivirus &&
                      gameDetailForm.errors.antivirus
                        ? gameDetailForm.errors.antivirus
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row field-group-wrapper">
              <div className="col-12 mb-2">
                <p id="game-edr" className="field-label">
                  What Endpoint Detection and Response product do you use? *
                </p>
              </div>
              <div className="col-12">
                <div className="custom-form-block">
                  <div
                    className="c-radio-groups w-100"
                    role={`group`}
                    aria-labelledby="game-edr"
                  >
                    <div className="row w-100">
                      {formOptionsData.edrOptions.map(
                        (optionData, optionIndex) => (
                          <div className="col-2" key={`edr_key-${optionIndex}`}>
                            <div className="form-check form-check-inline">
                              <input
                                type="radio"
                                name="edr"
                                id={`game-edr_option-${optionIndex}`}
                                className={`form-check-input`}
                                checked={
                                  gameDetailForm.values.edr ===
                                  optionData.optionValue
                                }
                                onChange={gameDetailForm.handleChange}
                                onBlur={gameDetailForm.handleBlur}
                                value={optionData.optionValue}
                              />
                              <label
                                htmlFor={`game-edr_option-${optionIndex}`}
                                className="form-check-label"
                              >
                                {optionData.displayText}
                              </label>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.edr && gameDetailForm.errors.edr
                        ? gameDetailForm.errors.edr
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="d-none"
              id={`game-detail-form-submit`}
            ></button>
          </form>
        </div>
        <div className="page-action-wrapper flex-center">
          <button className="btn btn-primary" onClick={handleBackClick}>
            <span className="icon-wrapper me-2">
              <i className="fa-solid fa-arrow-left"></i>
            </span>
            Back
          </button>
          <button
            className="btn btn-primary btn-filled"
            disabled={!gameDetailForm.isValid ? "disabled" : null}
            onClick={handleNextClick}
          >
            Next
            <span className="icon-wrapper ms-2">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </div>
      </section>
    )
  );
}

export default GameDetails;
