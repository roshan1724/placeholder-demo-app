import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewGameContext from "../../../../../context/game/new-game-context";
import { GameFormActions } from "../../../../../store/form-game-slice";
import { UiActions } from "../../../../../store/ui-slice";
import { API_PATHS } from "../../../../../utilities/constants";
import "./scenario.scss";

function GameScenario() {
  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);
  const [gameScenarioList, setGameScenarioList] = useState(null);
  const [selectedScenarioId, setSelectedScenarioId] = useState(null);

  const dispatch = useDispatch();
  const scenarioFormValue = useSelector(
    (state) => state.gameForm.scenario_form
  );

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    // API call to get game scenarios
    fetch(API_PATHS.GAME_SCENARIO_LIST)
      .then((response) => response.json())
      .then((response) => {
        dispatch(UiActions.setShowLoader(false));
        setGameScenarioList(response["data"]);
      })
      .catch((error) => {
        dispatch(UiActions.setShowLoader(false));
        console.error("Error in API Call ==> ", error);
      });
  }, [dispatch]);

  useEffect(() => {
    setSelectedScenarioId(scenarioFormValue);
  }, [scenarioFormValue]);

  const getIconRender = (iconName, iconIndex) => {
    if (iconName === "phishing") {
      return (
        <span className="material-icons" key={`scenario-icon-${iconIndex}`}>
          {iconName}
        </span>
      );
    } else {
      return (
        <i
          className={`fa-solid fa-${iconName}`}
          key={`scenario-icon-${iconIndex}`}
        ></i>
      );
    }
  };

  const handleCardSelection = (scenarioId) => {
    const selectedScenario = gameScenarioList.find(
      (scenarioData) => scenarioData.scenario_id === scenarioId
    );
    console.log("Selected Scenarion ==> ", selectedScenario);
    if (selectedScenario.scenario_label !== "COMING SOON") {
      setSelectedScenarioId(selectedScenario.scenario_id);
    }
  };

  const handleNextClick = () => {
    dispatch(
      GameFormActions.updateGameForm({
        formName: "scenario_form",
        formData: selectedScenarioId,
      })
    );
    setActiveStepIndex(activeStepIndex + 1);
  };

  return (
    <section className="section-game-scenario">
      <div className="scenario-list-container">
        <div className="row">
          {gameScenarioList &&
            Array.isArray(gameScenarioList) &&
            gameScenarioList.map((data, scenarioIndex) => (
              <div
                className="col-12 col-sm-6 col-md-3"
                key={`scenario-card-${scenarioIndex}`}
              >
                <div
                  className={`scenario-card h-100 ${
                    selectedScenarioId &&
                    selectedScenarioId === data.scenario_id
                      ? "selected"
                      : ""
                  } ${!!data.scenario_label ? "disabled" : ""}`}
                  onClick={() => handleCardSelection(data.scenario_id)}
                >
                  <span className="scenario-check icon-wrapper">
                    <i className="fa-solid fa-check"></i>
                  </span>
                  {data.scenario_label && (
                    <span className="scenario-label ribbon">
                      {data.scenario_label}
                    </span>
                  )}
                  <div className="main">
                    <span className="icon-wrapper flex-center">
                      {data.icon_name.map((name, iconIndex) =>
                        getIconRender(name, iconIndex)
                      )}
                    </span>
                  </div>
                  <div className="scenario-name">{data.scenario_name}</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <span className="icon-wrapper">
                            <i className="fa-solid fa-bullseye"></i>
                          </span>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.messaging_type.join(", ")}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <span className="icon-wrapper">
                            <i className="fa-solid fa-users"></i>
                          </span>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.user_type.join(", ")}
                          </p>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-2">
                          <span className="icon-wrapper">
                            <i className="fa-solid fa-building"></i>
                          </span>
                        </div>
                        <div className="col-10">
                          <p className="item-text">
                            {data.scenario_details.organisation_type.join(", ")}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="action-wrapper pt-3">
        <span>&nbsp;</span>
        <button
          className="btn btn-primary btn-filled"
          disabled={
            (!selectedScenarioId || selectedScenarioId < 0) && "disabled"
          }
          onClick={handleNextClick}
        >
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
