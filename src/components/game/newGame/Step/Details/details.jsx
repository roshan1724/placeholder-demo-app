import "./details.scss";
import { useContext } from "react";
import NewGameContext from "../../../../../context/game/new-game-context";
import GameDetailForm, {
  getSpectatorFields,
} from "../../../../../forms/game-detail-form";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GameFormActions } from "../../../../../store/form-game-slice";

function GameDetails() {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);
  const detailFormValues = useSelector((state) => state.gameForm.details_form);

  const formOptionsData = {
    start_time: {
      hours: Array.from({ length: 12 }, (v, k) => k + 1),
      minutes: Array.from({ length: 60 }, (v, k) => k + 1),
      meredian: ["AM", "PM"],
    },
    time_zome: ["UTC", "IST", "CST"],
    cisco_jobTitle: ["Job Title 1", "Job Title 2"],
    it_admin_jobTitle: ["Job Title 1", "Job Title 2"],
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
      { optionValue: "cisco", displayText: "Cisco" },
      { optionValue: "carbon black", displayText: "Carbon Black" },
      { optionValue: "sophos", displayText: "Sophos" },
      { optionValue: "none", displayText: "None" },
      { optionValue: "other", displayText: "Other" },
    ],
  };

  const handleDateChange = (e) => {
    gameDetailForm.setFieldValue("start_date", e.target.value);
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
                  Name*
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
                Email *
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

  // useEffect(() => {
  //   if (gameDetailForm && isFirstRender) {
  //     console.log("Rendering useEffect");
  //     gameDetailForm.setValues(detailFormValues, true);
  //     setIsFirstRender(false);
  //   }
  // }, [isFirstRender, detailFormValues]);

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
                  <div className="custom-form-block">
                    <label htmlFor="game-detail-date" className="form-label">
                      Date
                    </label>
                    <div className="input-group date-field has-validation">
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

                  <div className="custom-form-block time-block-wrapper">
                    <label htmlFor="game-detail-time" className="form-label">
                      Time
                    </label>
                    <div className="input-group has-validation time-fields">
                      <select
                        name="start_time.hours"
                        id="game-detail-time-hours"
                        className={`form-select ${
                          gameDetailForm.touched?.start_time?.hours &&
                          gameDetailForm.errors?.start_time?.hours
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.start_time.hours}
                      >
                        <option value="" selected disabled>
                          Hours
                        </option>
                        {formOptionsData.start_time.hours.map(
                          (hr, hourIndex) => (
                            <option value={hr} key={`hour-key-${hourIndex}`}>
                              {hr}
                            </option>
                          )
                        )}
                      </select>

                      <select
                        name="start_time.minutes"
                        id="game-detail-time-minutes"
                        className={`form-select ${
                          gameDetailForm.touched?.start_time?.minutes &&
                          gameDetailForm.errors?.start_time?.minutes
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.start_time.minutes}
                      >
                        <option value="" selected disabled>
                          Min
                        </option>
                        {formOptionsData.start_time.minutes.map(
                          (min, minuteIndex) => (
                            <option
                              value={min}
                              key={`minute-key-${minuteIndex}`}
                            >
                              {min}
                            </option>
                          )
                        )}
                      </select>

                      <select
                        name="start_time.meredian"
                        id="game-detail-time-meredian"
                        className={`form-select ${
                          gameDetailForm.touched?.start_time?.meredian &&
                          gameDetailForm.errors?.start_time?.meredian
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.start_time.meredian}
                      >
                        {formOptionsData.start_time.meredian.map(
                          (mrd, meredianIndex) => (
                            <option
                              value={mrd}
                              key={`meredian-key-${meredianIndex}`}
                            >
                              {mrd}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="invalid-feedback">
                      {(gameDetailForm.touched?.start_time?.hours &&
                        gameDetailForm.errors?.start_time?.hours) ||
                      (gameDetailForm.touched?.start_time?.minutes &&
                        gameDetailForm.errors?.start_time?.minutes)
                        ? gameDetailForm.errors?.start_time?.hours ||
                          gameDetailForm.errors?.start_time?.minutes
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
                      htmlFor="game-detail-cisco-name"
                      className="form-label"
                    >
                      Name *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="cisco_name"
                        id="game-detail-cisco-name"
                        className={`form-control ${
                          gameDetailForm.touched.cisco_name &&
                          gameDetailForm.errors.cisco_name
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`CISCO's Name`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.cisco_name}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.cisco_name &&
                        gameDetailForm.errors.cisco_name
                          ? gameDetailForm.errors.cisco_name
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
                      htmlFor="game-detail-cisco-email"
                      className="form-label"
                    >
                      Email *
                    </label>
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        name="cisco_email"
                        id="game-detail-cisco-email"
                        className={`form-control ${
                          gameDetailForm.touched.cisco_email &&
                          gameDetailForm.errors.cisco_email
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder={`CISCO's Email`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.cisco_email}
                      />
                      <div className="invalid-feedback">
                        {gameDetailForm.touched.cisco_email &&
                        gameDetailForm.errors.cisco_email
                          ? gameDetailForm.errors.cisco_email
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
                      htmlFor="game-detail-cisco-title"
                      className="form-label"
                    >
                      Job Title *
                    </label>
                    <div className="input-group has-validation">
                      <select
                        name="cisco_title"
                        id="game-detail-cisco-title"
                        className={`form-select ${
                          gameDetailForm.touched.cisco_title &&
                          gameDetailForm.errors.cisco_title
                            ? "is-invalid"
                            : ""
                        }`}
                        onChange={gameDetailForm.handleChange}
                        onBlur={gameDetailForm.handleBlur}
                        value={gameDetailForm.values.cisco_title}
                      >
                        <option value="">CISCO's Job Title</option>
                        {formOptionsData.cisco_jobTitle.map(
                          (title, titleIndex) => (
                            <option
                              value={title}
                              key={`cisco-jobtitle-${titleIndex}`}
                            >
                              {title}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div className="invalid-feedback">
                      {gameDetailForm.touched.cisco_title &&
                      gameDetailForm.errors.cisco_title
                        ? gameDetailForm.errors.cisco_title
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
                      <select
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
                      </select>
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
