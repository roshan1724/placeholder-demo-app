import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Report.scss';

import Progressbar from '../common/progressbar/progressbar';
import PhaseReport from './Phase-Report/PhaseReport';

function Report() {
  // const navigate = useNavigate();

  const [summaryData, setSummaryData] = useState([]);
  const [findingsData, setFindingsData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);

  useEffect(() => {
    // API Call to get Dashboard Data
    fetch("/data/dashboard-summary-data.json")
    .then((response) => response.json())
    .then((response) => {
      updateSummaryProgressConfig(response['summary_data']);
      updatePhaseProgressConfig(response['phase_data']);
      setFindingsData(response['finding_data']);
    })
    .catch((err) => {
      console.warn(err);
    });
  }, []);

  const updateSummaryProgressConfig = (summaryData) => {
    const progressColorList = ['green', 'blue', 'purple'];
    const updatedConfig = summaryData.map((data, index) => {
      data.configurations = {
        "classNameList": [
          `progress-${progressColorList[index]}`,
          "regular-bar"
        ],
        "showLegends": false,
        "titleAlignment": "column"
      }    
      return data;
    });
    setSummaryData(updatedConfig);
  }

  const updatePhaseProgressConfig = (phaseDataList) => {
    const progressColorList = ['green', 'blue', 'purple'];
    const updatedPhaseDataList = phaseDataList.map((phaseData, phaseIndex) => {
      phaseData.phase_summary_data.map((data, index) => {
        data.configurations = {
          "classNameList": [
            `progress-${progressColorList[index]}`,
            "thin-bar"
          ],
          "showLegends": false,
          "titleAlignment": "row"
        }
        return data;
      });
      return phaseData;
    });
    setPhaseData(updatedPhaseDataList);
  }

  // const handleBackClick = () => {
  //   navigate('/');
  // }

  const handleDownloadReportClick = () => {
    alert('Section Under maintainance');
  }

  return (
    <section className='section-report px-3'>
      <h1 className="page-title">Incident Summary</h1>
      <div className="d-flex justify-content-between">
        <div className="page-description">
          <p className="theme-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut facilisis nulla, non aliquam libero. 
            Nullam orci tortor, auctor ac felis sit amet.
          </p>
          <p className="info-text">
            <img className="info-icon me-1" src='/images/info_icon.svg' alt='info-icon'/>
            The times represented here are simulated times, based on the actions chosen. These represent work hours, not elapsed time.
          </p>
        </div>
        <div className="page-action-wrapper">
          {/* <button className="btn btn-primary back-button me-1" onClick={handleBackClick}>
            <img src="/images/back-arrow.png" alt="Back Icon" />
            <span>Back</span>
          </button> */}
          <button className="btn btn-primary btn-filled download-button" onClick={handleDownloadReportClick}>
            <img src="/images/download_black.png" alt="Download Icon" />
            <span>Download Report</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-3">
          <div className="summary-details-wrapper">
            <div className="section-header">
              <h3 className="section-title">Total Time Taken</h3>
            </div>
            <div className="section-body py-2">
              <div className="time-wrapper">
                {
                  summaryData && summaryData.length &&
                  <div className="summary-time-wrapper">
                    {summaryData.map((timeData, index) => (
                      <Progressbar timeData={timeData} key={timeData.id}/>
                    ))}
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="summary-details-wrapper">
            <div className="section-header">
              <h3 className="section-title">Findings <span className="count">5</span></h3>
            </div>
            <div className="section-body py-2">
            {
              findingsData && findingsData.map((findingData, index) => (
                <div className="findings-content" key={findingData.id}>
                  <div className="status-wrapper" data-status={findingData.status}>
                    <img 
                      src={
                        findingData.status === 'HIGHLY_CRITICAL' 
                        ? '/images/warning_red.png'
                        : findingData.status === 'CRITICAL'
                          ? '/images/warning_orange.png'
                          : findingData.status === 'MODERATE'
                            ? '/images/warning_yellow.png'
                            : ''
                    } alt="status icon" className="status-icon" />
                    <p className="status-text c-font-12 mt-2">{findingData.time_taken}</p>
                  </div>
                  <p className="content-text c-font-14">{findingData.value}</p>
                </div>
              ))
            }
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="summary-details-wrapper">
            <div className="section-header">
              <h3 className="section-title">Phase Details</h3>
            </div>
            <div className="section-body py-2">
            {
              phaseData && phaseData.map((data, index) => (
                <PhaseReport phaseData={data} key={data.id}/>
              ))
            }
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Report;