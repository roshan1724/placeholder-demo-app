import "./newGame.scss";

import NewGameContext from "../../../context/game/new-game-context";
import Stepper from "../../common/Stepper/Stepper";
import { useEffect, useState } from "react";
import GameScenario from "./Step/Scenario/scenario";
// import GameDetails from "./Step/Details/details";
import GameEmailSetup from "./Step/EmailSetup/email-setup";
// import NewGameDetails from "./Step/Details/game-details";
import { useDispatch } from "react-redux";
import { UiActions } from "../../../store/ui-slice";
import { API_PATHS } from "../../../utilities/constants";
import NewGameFormDetails from "./Step/Details/new-game-form-details";
import { GetSortedFormData } from "../../common/Dynamic-Form/dynamic-form.helper";

const stepperData = [
  {
    stepperCounter: "1",
    stepperLabel: "Select Scenario",
    stepperContent: <GameScenario />,
  },
  {
    stepperCounter: "2",
    stepperLabel: "Game Details",
    stepperContent: <NewGameFormDetails />,
  },
  // {
  //   stepperCounter: "3",
  //   stepperLabel: "New Game Details",
  //   stepperContent: <NewGameFormDetails />,
  // },
  {
    stepperCounter: "3",
    stepperLabel: "Introduction Email",
    stepperContent: <GameEmailSetup />,
  },
];

function AddNewGame() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    fetch(API_PATHS.GAME_SCENARIO_FORM)
      .then((response) => response.json())
      .then((response) => {
        dispatch(UiActions.setShowLoader(false));
        const formData = response["data"];
        setFormData(GetSortedFormData(formData));
      })
      .catch((error) => {
        dispatch(UiActions.setShowLoader(false));
        console.error(`Error in API call ==> `, error);
      });
  }, [dispatch]);

  const getStepContent = () => {
    return stepperData[activeStepIndex].stepperContent;
  };

  return (
    <section className="section-add-newgame px-3">
      <div className="page-title">Add New Game</div>
      <NewGameContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData }}
      >
        <div className="stepper-wrapper">
          <Stepper data={stepperData} />
        </div>
        <div className="step-content-wrapper">{getStepContent()}</div>
      </NewGameContext.Provider>
    </section>
  );
}

export default AddNewGame;
