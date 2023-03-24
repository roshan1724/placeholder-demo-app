import './Dasboard.scss';

import Progressbar from '../common/progressbar/progressbar';
import PhaseReport from '../Report/Phase-Report/PhaseReport';
import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Area from '../common/Chart/Area';
import { API_PATHS, ROUTE_PATHS } from '../../utilities/constants';
import { useDispatch, useSelector } from 'react-redux';
import { UiActions } from '../../store/ui-slice';


function Dashboard() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loader = useSelector((state) => state.ui.showLoader);

  const [summaryData, setSummaryData] = useState([]);
  const [findingsData, setFindingsData] = useState([]);
  const [phaseData, setPhaseData] = useState([]);
  const [selectedPhaseData, setSelectedPhaseData] = useState(null);

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API Call to get Dashboard Data
    setTimeout(() => {
      fetch(API_PATHS.DASHBOARD_DATA)
      .then((response) => response.json())
      .then((response) => {
        setSummaryData(response['summary_data']);
        setFindingsData(response['finding_data']);
        setPhaseData(response['phase_data']);

        dispatch(UiActions.setShowLoader(false));
      })
      .catch((err) => {
        console.warn(err);
      });
    }, 1000);
  }, [dispatch]);

  const handlePhaseActionClick = ($event, phaseIndex) => {
    setSelectedPhaseData(phaseData[phaseIndex]);
  }

  const handleReportViewClick = () => {
    navigate(ROUTE_PATHS.REPORT);
  }

  const handleModalClose = () => {
    setSelectedPhaseData(null);
  }

  return (
    <Fragment>
      <section className="section-dashboard px-3">
        <h1 className="page-title">Incident Summary</h1>
        <p className="theme-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut facilisis nulla, non aliquam libero. 
          Nullam orci tortor, auctor ac felis sit amet.
        </p>
        <p className="info-text">
          <img className="info-icon me-1" src='/images/info_icon.svg' alt='info-icon'/>
          The times represented here are simulated times, based on the actions chosen. These represent work hours, not elapsed time.
        </p>
        { !loader &&
          <div className="row">
            <div className="col-12">
              <div className="summary-chart-wrapper my-3">
                <h3 className="section-title">Total Time <span>(Cumalative)</span></h3>
                <div className="row">
                  <div className="col-6">
                    <div className="chart-wrapper">
                      <Area />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="summary-wrapper">
                      {
                        summaryData && 
                        <div className="summary-time-data">
                          {summaryData.map((timeData, index) => (
                            <Progressbar timeData={timeData} key={timeData.id} className="regular-bar"/>  
                          ))}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="summary-details-wrapper">
                <div className="section-header">
                  <h3 className="section-title">Findings <span className="count">12</span></h3>
                  <button className="btn btn-primary" onClick={handleReportViewClick}>View Report</button>
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
            <div className="col-6">
              <div className="summary-details-wrapper">
                <div className="section-header">
                  <h3 className="section-title">Time for each phase section</h3>
                  <button className="btn btn-primary" onClick={handleReportViewClick}>View Report</button>
                </div>
                <div className="section-body py-2">
                {
                phaseData && phaseData.map((data, phaseIndex) => (
                  <div className="phase-content mb-2" key={data.id}>
                    <div className="row">
                      <div className="col-3">
                        <div className="phase-name-wrapper">
                          <p className="phase-index c-font-14">Phase {phaseIndex + 1}</p>
                          <p className="phase-title c-font-18">{data.phase_name}</p>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="phase-summary-progress h-100">
                        {
                          data.phase_summary_data.length > 0 && data.phase_summary_data.map((dataEle, index) => (
                            <Progressbar timeData={dataEle} key={data.id + dataEle.id} className="thin-bar"/>
                          ))
                        }
                        </div>
                      </div>
                      <div className="col-1 action-wrapper">
                        <div className="action-content" onClick={($event) => handlePhaseActionClick($event, phaseIndex)} data-bs-toggle="modal" data-bs-target="#phaseModal">
                          <img src="/images/cta_link.png" alt="" className='action-icon'/>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                }
                </div>
              </div>

            </div>
          </div>
        }
      </section>

      {/* MODAL CONTENT */}
      <div className="modal fade" id="phaseModal" tabIndex="-1" aria-labelledby="phaseModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content phase-modal">
            <span type="button" className="close-btn" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
              <img src="/images/circle_cross_grey.png" alt="Close Icon" width={30} height={30}/>
            </span>
            <div className="modal-body">
            {
              selectedPhaseData && 
              <PhaseReport phaseData={selectedPhaseData}/>
            }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;