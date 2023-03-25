import './Report-pdf.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../../utilities/constants';
import { UiActions } from '../../../../store/ui-slice';
import Progressbar from '../../progressbar/progressbar';
import PhaseReport from '../../../Report/Phase-Report/PhaseReport';

function ReportPdf ({onPrint, processingState}) {
  const [summaryData, setSummaryData] = useState([]);
  const [findingsData, setFindingsData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API Call to get Dashboard Data
    fetch(API_PATHS.DASHBOARD_DATA)
    .then((response) => response.json())
    .then((response) => {
      dispatch(UiActions.setShowLoader(false));
      updateSummaryProgressConfig(response['summary_data']);
      updatePhaseProgressConfig(response['phase_data']);
      setFindingsData(response['finding_data']);
    })
    .catch((err) => {
      dispatch(UiActions.setShowLoader(false));
      console.warn(err);
    });
  }, [dispatch]);

  const updateSummaryProgressConfig = (summaryData) => {
    const progressColorList = ['green', 'blue', 'purple'];
    const updatedConfig = summaryData.map((data, index) => {
      data.configurations = {
        "classNameList": [
          `progress-${progressColorList[index]}`,
          "regular-bar"
        ],
        "showLegends": false,
        "titleAlignment": "row"
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
            "print-preview",
            `progress-${progressColorList[index]}`,
            "thin-bar"
          ],
          "showLegends": false,
          "titleAlignment": "column"
        };
        return data;
      });
      return phaseData;
    });
    setPhaseData(updatedPhaseDataList);
  }

  return (
    <div className="report-pdf-wrapper container-fluid">
      <header className="d-flex flex-wrap justify-content-between p-3 mb-3 border-bottom">
        <a href="/" className="d-flex align-items-center mb-2 text-decoration-none">
          <img
            className="brand-logo"
            src="/images/logo_placeholder.png"
            alt="brand logo"
          />
        </a>

        <div className="page-header-right d-flex align-items-center">
          <span className="avatar-wrapper me-2">
            <img
              src="/images/people-male.png"
              alt="profile-icon"
              className="profile-image"
            />
          </span>
          <span className="profile-name">Graham Smith</span>
        </div>
      </header>

      <section className="section-report px-3">
        <h1 className="page-title game-name">Game Name Goes Here</h1>
        <div className="page-description">
          <p>
            <strong>Incident Summary : </strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut facilisis 
            nulla, non aliqam libero.  Nullam orci tortor, auctor ac felis sit amet.
          </p>
          <p className='d-flex'>
            <span className="icon-wrapper me-2">
              <i className="fa-solid fa-circle-info"></i>
            </span>
            <span>
              The times represented here are simulated times, based on the actions chosen. These represent work hours, 
              not elapsed time.
            </span>
          </p>
        </div>
        
        <div className="row">
        <div className="col-12 mt-3">
          <div className="print-summary-details-wrapper">
            <div className="section-header d-flex justify-content-between align-items-center">
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
          <div className="print-summary-details-wrapper">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h3 className="section-title">Findings <span className="count ms-1">5</span></h3>
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
          <div className="print-summary-details-wrapper">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h3 className="section-title">Phase Details</h3>
            </div>
            <div className="section-body py-2">
            {
              phaseData && phaseData.map((data, index) => (
                <PhaseReport phaseData={data} wrapperClass={'print-preview'} key={data.id}/>
              ))
            }
            </div>
          </div>
        </div>

      </div>

      </section>

      <div className="action-wrapper">
        <button className="mx-auto btn btn-primary no-print print-btn" onClick={onPrint}>
          <span className="icon-wrapper me-2">
            <i className={`fa-solid ${processingState ? 'fa-circle-notch fa-spin' : 'fa-file-arrow-down'}`}></i>
          </span>
          Download
        </button>
      </div>
    </div>
  );
} 

// function ReportPdf() {
//   const { search } = useLocation();
//   const searchParams = new URLSearchParams(search);
//   const downloadFileName = searchParams.get('fileName');
  
//   const pdfElement = document.getElementById(PRINT_PREVIEW_CONTAINER);

//   const handlePrint = () => {
//     // window.print();
//     PrintService(PRINT_PREVIEW_CONTAINER, downloadFileName, (data) => {
//       console.log('PRINT STATUS ==> ', data);
//       window.close();
//     });
//   }

//   const portal  = createPortal(<PdfContent onPrint={handlePrint}/>, pdfElement);

//   return (
//     <Fragment>
//       {
//         portal
//       }
//     </Fragment>
//   );
// }

export default ReportPdf;