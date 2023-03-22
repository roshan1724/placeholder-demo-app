import './Incident.scss';

import Summary from './Summary/Summary';
import Details from './Details/Details';

function Incident(props) {

  const tabNames = [{
    id: 1,
    tabName: 'incident_details',
    displayName: 'Incident Details'
  }, {
    id: 2,
    tabName: 'executive_summary',
    displayName: 'Executive Summary'
  }]

  const renderTabBody = (tabName) => {
    switch (tabName) {
      case 'incident_details':
        return (
          <Details className="h-100" messageList={props.messageList} />
        );
      case 'executive_summary':
        return (
          <Summary className="h-100" />
        )
      default:
        break;
    }
  }

  return (
    <section className='section-incident p-0'>
      <ul className="nav nav-tabs nav-fill mb-2" id="incident-tab" role="tablist">
        {tabNames.map((tabData, tabIndex) => (
          <li key={`tab-${tabData.id}-${tabIndex}`} className="nav-item" role="presentation">
            <button 
              className={tabIndex === 0 ? 'nav-link active': 'nav-link'} 
              id={tabData.tabName + '-tab'}
              data-bs-toggle="tab"
              data-bs-target={'#' + tabData.tabName + '-body'}
              type="button"
              role="tab"
              aria-controls={tabData.tabName + '-body'}
              aria-selected="true"
            >
              {tabData.displayName}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content" id="incident-tab-content">
        {tabNames.map((tabData, tabIndex) => (
          <div
            key={`content-${tabData.id}-${tabIndex}`}
            className={tabIndex === 0 ? 'tab-pane fade show active': 'tab-pane fade'}
            id={tabData.tabName + '-body'}
            role="tabpanel"
            aria-labelledby={tabData.tabName + '-tab'}
          >
            {renderTabBody(tabData.tabName)}
          </div>
        ))}
      </div>
    </section>
  );

}

export default Incident;