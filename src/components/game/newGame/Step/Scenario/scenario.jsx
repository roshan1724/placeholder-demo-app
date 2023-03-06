import { useContext, useState } from 'react';
import NewGameContext from '../../../../../context/game/new-game-context';
import './scenario.scss';


const gameScenarioList = [
  {
    scenario_id: "SC-0001",
    icon_name: ['envelope'],
    scenario_name: "Email Compromise",
    scenario_details: {
      messaging_type: ['Microsoft Outlook'],
      user_type: ['End User', 'I.T Admin'],
      organisation_type: ['Government', 'Tech Companies', 'Institutions']
    }
  },
  {
    scenario_id: "SC-0002",
    icon_name: ['fish', 'anchor'],
    scenario_name: "Phishing Attack",
    scenario_details: {
      messaging_type: ['Google Workspace email'],
      user_type: ['Executive Team', 'I.T Admin', 'Legal'],
      organisation_type: ['Government', 'Tech Companies', 'Sports Org.']
    }
  },
  {
    scenario_id: "SC-0003",
    icon_name: ['skull'],
    scenario_name: "Malicious Insider",
    scenario_details: {
      messaging_type: ['Git Hub', 'Dropbox', 'Dtex Systems'],
      user_type: ['Executive Team', 'I.T Admin'],
      organisation_type: ['Government', 'Tech Companies', 'Education', 'Sports Org.']
    }
  },
  {
    scenario_id: "SC-0004",
    icon_name: ['anchor'],
    scenario_name: "Spearphishing Attack",
    scenario_details: {
      messaging_type: ['Git Hub', 'Dropbox', 'Dtex Systems'],
      user_type: ['Executive Team', 'I.T Admin'],
      organisation_type: ['Government', 'Tech Companies', 'Education', 'Sports Org.']
    }
  },
  {
    scenario_id: "SC-0005",
    icon_name: ['shield-halved'],
    scenario_name: "Physical Security Breach",
    scenario_details: {
      messaging_type: ['Google Workspace email'],
      user_type: ['Executive Team', 'I.T Admin', 'Legal'],
      organisation_type: ['Government', 'Tech Companies', 'Sports Org.']
    }
  },
  {
    scenario_id: "SC-0006",
    icon_name: ['network-wired'],
    scenario_name: "Network Breach",
    scenario_details: {
      messaging_type: ['Git Hub', 'Dropbox', 'Dtex Systems'],
      user_type: ['Executive Team', 'I.T Admin'],
      organisation_type: ['Government', 'Tech Companies', 'Education', 'Sports Org.']
    }
  },
  {
    scenario_id: "SC-0007",
    icon_name: ['envelope'],
    scenario_name: "Lorem Ipsum",
    scenario_details: {
      messaging_type: ['Microsoft Outlook'],
      user_type: ['End User', 'I.T Admin'],
      organisation_type: ['Government', 'Tech Companies', 'Institutions']
    }
  },
  {
    scenario_id: "SC-0008",
    icon_name: ['fish', 'anchor'],
    scenario_name: "Consectetur Adipiscing",
    scenario_details: {
      messaging_type: ['Google Workspace email'],
      user_type: ['Executive Team', 'I.T Admin', 'Legal'],
      organisation_type: ['Government', 'Tech Companies', 'Sports Org.']
    }
  }
];

function GameScenario () {
  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  const handleCardSelection = (scenarioId) => {
    const selectedScenario = gameScenarioList.findIndex(scenarioData => scenarioData.scenario_id === scenarioId);
    console.log('Selected Scenarion ==> ', selectedScenario);
    setSelectedScenarioId(scenarioId);
  }

  const handleNextClick = () => {
    setActiveStepIndex(activeStepIndex + 1);
  }

  return (
    <section className="section-game-scenario">
      <div className="scenario-list-container">
        <div className="row">
          {
            gameScenarioList.map((data, scenarioIndex) => (
              <div className="col-12 col-sm-6 col-md-3" key={`scenario-card-${scenarioIndex}`}>
                <div className={`scenario-card h-100 ${selectedScenarioId && selectedScenarioId === data.scenario_id ? 'selected' : ''}`}
                onClick={() => handleCardSelection(data.scenario_id)}>
                  <span className="scenario-check icon-wrapper">
                    <i class="fa-solid fa-check"></i>
                  </span>
                  <div className="icon-wrapper main">
                    {
                      data.icon_name.map((name, iconIndex) => (
                        <i className={`fa-solid fa-${name}`} key={`scenario-icon-${iconIndex}`}></i>
                      ))
                    }
                  </div>
                  <div className="scenario-name">{data.scenario_name}</div>
                  <ul className="list-group list-group-flush">
                    <li className='list-group-item'>
                      <div className="row">
                        <div className="col-2">
                          <sapn className="icon-wrapper">
                            <i className="fa-solid fa-bullseye"></i>
                          </sapn>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.messaging_type.join(', ')}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item'>
                      <div className="row">
                        <div className="col-2">
                          <sapn className="icon-wrapper">
                            <i className="fa-solid fa-users"></i>
                          </sapn>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.user_type.join(', ')}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className='list-group-item'>
                      <div className="row">
                        <div className="col-2">
                          <sapn className="icon-wrapper">
                            <i className="fa-solid fa-building"></i>
                          </sapn>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.organisation_type.join(', ')}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="action-wrapper pt-3">
        <span>&nbsp;</span>
        <button
          className="btn btn-primary btn-filled"
          disabled={(!selectedScenarioId || selectedScenarioId < 0) && 'disabled'}
          onClick={handleNextClick}>
          Next
          <span className="icon-wrapper ms-2">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </section>
  );
}

export default GameScenario;