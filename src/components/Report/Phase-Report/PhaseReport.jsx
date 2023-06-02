import "./PhaseReport.scss";
import { useEffect, useState } from "react";
import Progressbar from "../../common/progressbar/progressbar";
import { MAX_INPUT_LIMIT } from "../../../utilities/constants";

function PhaseReport({
  phaseData,
  wrapperClass = "",
  isEditable = false,
  handleContentEdit = null,
}) {
  const [draftPhaseData, setDraftPhaseData] = useState(undefined);

  useEffect(() => {
    setDraftPhaseData(null);
    if (isEditable) {
      setDraftPhaseData(JSON.parse(JSON.stringify(phaseData)));
    }
  }, [isEditable, phaseData]);

  /**
   * Function to handle Individual Company data update
   * @param {HTMLElementEventMap} event - Current HTML Event
   * @param {string} companyDataId - Id of the Updated Company Data
   */
  const handleCompanyItemUpdate = (event, companyDataId) => {
    if (isEditable) {
      let updatedText = event.target?.innerText;
      if (updatedText?.length >= MAX_INPUT_LIMIT) {
        updatedText = updatedText.substring(0, MAX_INPUT_LIMIT);
        event.preventDefault();
      }

      const tempCompanyDataList = draftPhaseData["comany_data"][
        "data_list"
      ].map((data) => {
        data.value = data.id === companyDataId ? updatedText : data.value;
        return data;
      });
      console.log(`updated Company Data List ==> `, tempCompanyDataList);

      handleContentEdit(draftPhaseData);
    }
  };

  return (
    <div
      className={`phase-report-container ${wrapperClass ? wrapperClass : ""}`}
    >
      <div className="row summary-row">
        <div
          className={`col-12 ${
            wrapperClass === "print-preview" ? "col-md-12" : "col-md-6"
          }`}
        >
          <h3 className="section-subtitle">
            Phase {phaseData["phase_index"]} :{" "}
            <span>{phaseData["phase_name"]}</span>
          </h3>
          <p className="section-description">
            {phaseData["phase_description"]}
          </p>
        </div>
        <div
          className={`col-12 ${
            wrapperClass === "print-preview" ? "col-md-12" : "col-md-6"
          }`}
        >
          <div className="summary-wrapper page-break-inside-avoid">
            {phaseData["phase_summary_data"] && (
              <div className="summary-time-data">
                {phaseData["phase_summary_data"].map((timeData, index) => (
                  <Progressbar timeData={timeData} key={timeData.id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="seperator" />
      <div className="row details-row">
        <div
          className={`col-12 ${
            wrapperClass === "print-preview" ? "col-md-12" : "col-md-6"
          }`}
        >
          <h3 className="section-subtitle">
            <span>{phaseData["path_data"]["title"]}</span>
          </h3>
          <div className="path-data-wrapper px-2">
            {phaseData["path_data"]["data_list"] &&
              phaseData["path_data"]["data_list"].map((data, index) => (
                <div
                  className="row path-data-container page-break-inside-avoid"
                  key={data.id}
                  data-status={data.status}
                >
                  <div className="col-1 status-wrapper">
                    <img
                      src={
                        data.status === "success"
                          ? "/images/circle_tick_green.png"
                          : data.status === "fail"
                          ? "/images/circle_cross_red.png"
                          : ""
                      }
                      alt="status icon"
                      className="status-icon d-block"
                    />
                  </div>
                  <p className="col-9 content-text c-font-14">{data.value}</p>
                  <p className="col-2 content-time c-font-14">
                    {data.time_taken}
                  </p>
                </div>
              ))}
          </div>
          {phaseData["path_data"]["total_time"] && (
            <div className="mt-2 time-wrapper c-font-14">
              <span data-state="mute">Time - </span>
              <span
                data-state={
                  phaseData["path_data"]["total_time"].week > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["path_data"]["total_time"].week}W :{" "}
              </span>
              <span
                data-state={
                  phaseData["path_data"]["total_time"].day > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["path_data"]["total_time"].day}D :{" "}
              </span>
              <span
                data-state={
                  phaseData["path_data"]["total_time"].hour > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["path_data"]["total_time"].hour}h :{" "}
              </span>
              <span
                data-state={
                  phaseData["path_data"]["total_time"].minute > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["path_data"]["total_time"].minute}m
              </span>
            </div>
          )}
        </div>
        <div
          className={`col-12 ${
            wrapperClass === "print-preview" ? "col-md-12" : "col-md-6"
          }`}
        >
          <h3 className="section-subtitle d-flex justify-content-between">
            <span>{phaseData["comany_data"]["title"]}</span>
          </h3>
          <div className="company-data-wrapper px-2">
            {phaseData["comany_data"]["data_list"] &&
              phaseData["comany_data"]["data_list"].map((data, index) => (
                <div
                  className={`row company-data-container page-break-inside-avoid ${
                    isEditable ? "highlight-edit" : ""
                  }`}
                  key={data.id}
                  data-status={data.status}
                >
                  <div className="col-3 profile-wrapper">
                    <img
                      src={
                        data.user_id === "1"
                          ? "/images/people-male.png"
                          : data.user_id === "2"
                          ? "/images/people-female.png"
                          : data.user_id === "3"
                          ? "/images/people-male-2.png"
                          : ""
                      }
                      alt="status icon"
                      className="profile-icon"
                    />
                    <p className="profile-details">
                      <span className="profile-name c-font-12">
                        {data.user_id === "1"
                          ? "Graham Smith"
                          : data.user_id === "2"
                          ? "Angela Taylor"
                          : data.user_id === "3"
                          ? "Ian Lee"
                          : ""}
                      </span>
                      <span className="profile-dept c-font-12">
                        {data.user_id === "1"
                          ? "User"
                          : data.user_id === "2"
                          ? "IT Dept."
                          : data.user_id === "3"
                          ? "CISO"
                          : ""}
                      </span>
                    </p>
                  </div>
                  <p
                    className="col-7 content-text c-font-14"
                    contentEditable={isEditable}
                    suppressContentEditableWarning={true}
                    onKeyDown={(e) => {
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
                    onInput={(event) => handleCompanyItemUpdate(event, data.id)}
                  >
                    {data.value}
                  </p>
                  <p className="col-2 content-time c-font-14">
                    {data.time_taken}
                  </p>
                </div>
              ))}
          </div>
          {phaseData["comany_data"]["total_time"] && (
            <div className="mt-2 time-wrapper c-font-14">
              <span data-state="mute">Time - </span>
              <span
                data-state={
                  phaseData["comany_data"]["total_time"].week > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["comany_data"]["total_time"].week}W :{" "}
              </span>
              <span
                data-state={
                  phaseData["comany_data"]["total_time"].day > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["comany_data"]["total_time"].day}D :{" "}
              </span>
              <span
                data-state={
                  phaseData["comany_data"]["total_time"].hour > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["comany_data"]["total_time"].hour}h :{" "}
              </span>
              <span
                data-state={
                  phaseData["comany_data"]["total_time"].minute > 0
                    ? "active"
                    : "mute"
                }
              >
                {phaseData["comany_data"]["total_time"].minute}m
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhaseReport;
