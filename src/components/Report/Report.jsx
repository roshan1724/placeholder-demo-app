import "./Report.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PdfDownloader from "../common/PdfDownloader/PdfDownloader";
import { UiActions } from "../../store/ui-slice";

import Progressbar from "../common/progressbar/progressbar";
import PhaseReport from "./Phase-Report/PhaseReport";
import { GameReportActions } from "../../store/game-report-slice";
import {
  API_PATHS,
  MAX_INPUT_LIMIT,
  PRINTABLE_REPORT_TYPE,
} from "../../utilities/constants";

function Report() {
  const [reportData, setReportData] = useState(null);
  const [draftReport, setDraftReport] = useState(null);
  const [enableEdit, setEnableEdit] = useState(false);
  const [editCancelled, setEditCancelled] = useState(false);
  const [reportChanged, setReportChanged] = useState(false);

  const [summaryData, setSummaryData] = useState([]);
  const [findingsData, setFindingsData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.showLoader);
  const initialReportData = useSelector(
    (state) => state.gameReport.reportData.initialReport
  );
  const modifiedReportData = useSelector(
    (state) => state.gameReport.reportData.modifiedReport
  );
  const reportToPrint = useSelector(
    (state) => state.gameReport.printableReport
  );

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API Call to get Dashboard Data
    fetch(API_PATHS.DASHBOARD_DATA)
      .then((response) => response.json())
      .then((response) => {
        dispatch(UiActions.setShowLoader(false));
        // Deciding which data to render on initial load
        let reportDataToRender;
        if (
          response["modified_report"] &&
          Object.keys(response["modified_report"]).length > 0
        ) {
          reportDataToRender = response["modified_report"];
          dispatch(
            GameReportActions.setModifiedReport({
              reportData: response["modified_report"],
            })
          );
          dispatch(
            GameReportActions.setReportToPrint(
              PRINTABLE_REPORT_TYPE.MODIFIED_REPORT
            )
          );
        } else {
          reportDataToRender = response["generated_report"];
          // Setting the Initial Report
          dispatch(
            GameReportActions.setInitialReport({
              reportData: response["generated_report"],
            })
          );
          dispatch(
            GameReportActions.setReportToPrint(
              PRINTABLE_REPORT_TYPE.GENERATED_REPORT
            )
          );
        }

        setReportData(reportDataToRender);
        initializeReportData(reportDataToRender);
        dispatch(
          GameReportActions.setInitialReport({
            reportData: reportDataToRender,
          })
        );
      })
      .catch((err) => {
        dispatch(UiActions.setShowLoader(false));
        console.warn(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, editCancelled]);

  /**
   * @param {Object} reportData - Active report data to render in UI
   */
  const initializeReportData = (reportData) => {
    console.log("reportData ==> ", reportData);
    updateSummaryProgressConfig(reportData["summary_data"]);
    updatePhaseProgressConfig(reportData["phase_data"]);
    setFindingsData(reportData["finding_data"]);
  };

  /**
   * Reset UI States
   */
  const resetReportState = () => {
    setReportData(null);
    setDraftReport(null);
    setEnableEdit(false);
    setEditCancelled(true);
    setReportChanged(false);
  };

  const updateSummaryProgressConfig = (summaryData) => {
    const progressColorList = ["green", "blue", "purple"];
    const updatedConfig = summaryData.map((data, index) => {
      data.configurations = {
        classNameList: [`progress-${progressColorList[index]}`, "regular-bar"],
        showLegends: false,
        titleAlignment: "column",
      };
      return data;
    });
    setSummaryData(updatedConfig);
  };

  const updatePhaseProgressConfig = (phaseDataList) => {
    const progressColorList = ["green", "blue", "purple"];
    const updatedPhaseDataList = phaseDataList.map((phaseData, phaseIndex) => {
      phaseData.phase_summary_data.map((data, index) => {
        data.configurations = {
          classNameList: [`progress-${progressColorList[index]}`, "thin-bar"],
          showLegends: false,
          titleAlignment: "row",
        };
        return data;
      });
      return phaseData;
    });
    setPhaseData(updatedPhaseDataList);
  };

  /**
   * Function to save the updated UI (draftReport) data to server
   */
  const handleSaveEditedReportBtnClick = () => {
    console.log("Save Report Button Clicked ....", reportData);
    console.log("Draft Report  ....", draftReport);

    dispatch(
      GameReportActions.setModifiedReport({
        reportData: draftReport,
      })
    );
    dispatch(
      GameReportActions.setReportToPrint(PRINTABLE_REPORT_TYPE.MODIFIED_REPORT)
    );
    dispatch(UiActions.setShowLoader(true));
    setTimeout(() => {
      dispatch(UiActions.setShowLoader(false));
      console.log("API call to save data response");
      // TODO: Add API Call to save data responses.
      // After saving data
      resetReportState();
    }, 500);
  };

  /**
   * Function to Cancel te edited report and re-render UI
   */
  const handleCancelEditedReportBtnClick = () => {
    dispatch(
      GameReportActions.setInitialReport({
        reportData: initialReportData,
      })
    );
    resetReportState();
  };

  /**
   * Function to handle Report Action Button (EDIT, SAVE, CANCEL)
   * @param {HTMLElementEventMap} event
   */
  const handleReportActionBtnClick = (event) => {
    if (enableEdit) {
      if (reportChanged) {
        // Btn Text: 'Save Report'
        handleSaveEditedReportBtnClick();
      } else {
        // Btn Text: 'Cancel'
        handleCancelEditedReportBtnClick();
      }
    } else {
      // Btn Text: 'Edit Report'
      // Render a copy of the current report
      console.log("Creating a copy ==> ");
      const currentReportCopy = JSON.parse(JSON.stringify(reportData));
      setDraftReport(currentReportCopy);
      initializeReportData(currentReportCopy);
      setEnableEdit(true);
    }
  };

  /**
   * Function to handle Individual Findings data update
   * @param {HTMLElementEventMap} event - Current HTML Event
   * @param {string} findingDataId - Id of the Updated Findings Data
   */
  const handleFindingsItemUpdate = (event, findingDataId) => {
    let updatedText = event.target.innerHTML;
    if (updatedText?.length >= MAX_INPUT_LIMIT) {
      updatedText = updatedText.substring(0, MAX_INPUT_LIMIT);
    }

    const updatedFindingsData = draftReport.finding_data.map((data) => {
      data.value = data.id === findingDataId ? updatedText : data.value;
      return data;
    });
    console.log(`updatedFindingsData ==> `, updatedFindingsData);
    setReportChanged(true);
  };

  /**
   * Function to save updted phase data
   * @param {Object} modifiedPhaseData - updated copy of phase data
   */
  const handlePhaseDataUpdate = (modifiedPhaseData) => {
    const updatedPhaseData = draftReport.phase_data.map((data) => {
      data = data.id === modifiedPhaseData.id ? { ...modifiedPhaseData } : data;
      return data;
    });
    console.log(`updatedPhaseData ==> `, updatedPhaseData);
    setReportChanged(true);
  };

  /**
   * Function to toogle Report View
   * Initial Report <--> Modified Report
   */
  const toggleViewReport = (event) => {
    // Toggling the report data to render
    const showInitialReport =
      reportToPrint !== PRINTABLE_REPORT_TYPE.GENERATED_REPORT;
    const reportDataToRender = showInitialReport
      ? JSON.parse(JSON.stringify(initialReportData))
      : JSON.parse(JSON.stringify(modifiedReportData));

    dispatch(
      GameReportActions.setReportToPrint(
        showInitialReport
          ? PRINTABLE_REPORT_TYPE.GENERATED_REPORT
          : PRINTABLE_REPORT_TYPE.MODIFIED_REPORT
      )
    );
    console.log("view Initial Report ==> ", showInitialReport);
    setReportData(reportDataToRender);
    initializeReportData(reportDataToRender);
  };

  return (
    !loader && (
      <section className="section-report px-3">
        <h1 className="page-title">Game Name Goes Here</h1>
        <div className="d-flex justify-content-between">
          <div className="page-description">
            <p className="theme-text c-font-15">
              <span className="page-subtitle">Incident Summary : </span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
              facilisis nulla, non aliquam libero. Nullam orci tortor, auctor ac
              felis sit amet.
            </p>
            <p className="info-text">
              <img
                className="info-icon me-1"
                src="/images/info_icon.svg"
                alt="info-icon"
              />
              The times represented here are simulated times, based on the
              actions chosen. These represent work hours, not elapsed time.
            </p>
          </div>
          <div className="page-action-wrapper">
            <button
              className={`btn btn-primary me-2 ${
                modifiedReportData ? "" : "d-none"
              }`}
              onClick={toggleViewReport}
            >
              View{" "}
              {reportToPrint === PRINTABLE_REPORT_TYPE.GENERATED_REPORT
                ? "Updated"
                : "Initial"}{" "}
              Report
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={handleReportActionBtnClick}
              disabled={
                modifiedReportData &&
                reportToPrint === PRINTABLE_REPORT_TYPE.GENERATED_REPORT
              }
            >
              {enableEdit
                ? reportChanged
                  ? "Save Report"
                  : "Cancel"
                : "Edit Report"}
            </button>
            <button
              className={`btn btn-primary me-2 ${
                enableEdit && reportChanged ? "" : "d-none"
              }`}
              onClick={handleCancelEditedReportBtnClick}
            >
              Cancel
            </button>
            <PdfDownloader
              isComponent={true}
              isDisabled={enableEdit}
            ></PdfDownloader>
          </div>
        </div>
        <div className="row page-details-row">
          <div className="col-12 page-summary">
            <div className="summary-details-wrapper">
              <div className="section-header">
                <h3 className="section-title">Total Time Taken</h3>
              </div>
              <div className="section-body">
                <div className="time-wrapper">
                  {summaryData && summaryData.length && (
                    <div className="summary-time-wrapper">
                      {summaryData.map((timeData, index) => (
                        <Progressbar timeData={timeData} key={timeData.id} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="summary-details-wrapper">
              <div className="section-header">
                <h3 className="section-title">
                  Findings <span className="count">5</span>
                </h3>
              </div>
              <div className="section-body">
                {findingsData &&
                  findingsData.map((findingData, index) => (
                    <div
                      className={`findings-content ${
                        enableEdit ? "highlight-edit" : ""
                      }`}
                      key={findingData.id}
                    >
                      <div
                        className="status-wrapper"
                        data-status={findingData.status}
                      >
                        <span className="icon-wrapper">
                          <i className="fa-solid fa-triangle-exclamation"></i>
                        </span>
                        <p className="status-text c-font-14">
                          {findingData.time_taken}
                        </p>
                      </div>
                      <p
                        className="flex-grow-1 content-text c-font-15"
                        contentEditable={enableEdit}
                        suppressContentEditableWarning={true}
                        onKeyDown={(e) => {
                          console.log("Key Pressed => ", e);
                          if (
                            e.target.innerHTML.length >= MAX_INPUT_LIMIT &&
                            !["Backspace", "Delete"].includes(e.key)
                          ) {
                            e.preventDefault();
                            return false;
                          }
                        }}
                        onPaste={(e) => {
                          if (e.target.innerHTML.length >= MAX_INPUT_LIMIT) {
                            e.target.innerHTML = e.target.innerHTML.substring(
                              0,
                              MAX_INPUT_LIMIT
                            );
                            e.preventDefault();
                            return false;
                          }
                        }}
                        onInput={(e) =>
                          handleFindingsItemUpdate(e, findingData.id)
                        }
                      >
                        {findingData.value}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="summary-details-wrapper phase-details">
              <div className="section-header">
                <h3 className="section-title">Phase Details</h3>
              </div>
              <div className="section-body">
                {phaseData &&
                  phaseData.map((data, phaseIndex) => (
                    <PhaseReport
                      phaseData={data}
                      key={data.id}
                      isEditable={enableEdit}
                      handleContentEdit={(modifiedPhaseData) =>
                        handlePhaseDataUpdate(modifiedPhaseData, phaseIndex)
                      }
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default Report;
