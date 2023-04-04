import "./Report.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PdfDownloader from "../common/PdfDownloader/PdfDownloader";
import { UiActions } from "../../store/ui-slice";

import Progressbar from "../common/progressbar/progressbar";
import PhaseReport from "./Phase-Report/PhaseReport";

function Report() {
  const [summaryData, setSummaryData] = useState([]);
  const [findingsData, setFindingsData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.showLoader);

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API Call to get Dashboard Data
    fetch("/data/dashboard-summary-data.json")
      .then((response) => response.json())
      .then((response) => {
        dispatch(UiActions.setShowLoader(false));
        updateSummaryProgressConfig(response["summary_data"]);
        updatePhaseProgressConfig(response["phase_data"]);
        setFindingsData(response["finding_data"]);
      })
      .catch((err) => {
        dispatch(UiActions.setShowLoader(false));
        console.warn(err);
      });
  }, [dispatch]);

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
            <PdfDownloader isComponent={true}></PdfDownloader>
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
                    <div className="findings-content" key={findingData.id}>
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
                      <p className="content-text c-font-15">
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
                  phaseData.map((data, index) => (
                    <PhaseReport phaseData={data} key={data.id} />
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
