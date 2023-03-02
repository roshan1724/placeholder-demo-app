import './newGame.scss';

import NewGameContext from '../../../context/game/new-game-context';
import Stepper from '../../common/Stepper/Stepper';
import { useState } from 'react';
import GameScenario from './Step/Scenario/scenario';
import GameDetails from './Step/Details/details';


const stepperData = [
  {
    stepperCounter: "1",
    stepperLabel: "Select Scenario",
    stepperContent: <GameScenario />
  },
  {
    stepperCounter: "2",
    stepperLabel: "Game Details",
    stepperContent: <GameDetails />
  },
  {
    stepperCounter: "3",
    stepperLabel: "Introduction Email"
  },
];

function AddNewGame () {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const getStepContent = () => {
    return stepperData[activeStepIndex].stepperContent;
  }

  return (
    <section className='section-add-newgame'>
      <div className="page-title">Add New Game</div>
      <NewGameContext.Provider value={{activeStepIndex, setActiveStepIndex}}>
        <div className="stepper-wrapper">
          <Stepper data={stepperData}/>
        </div>
        <div className="step-content-wrapper">
          {
            getStepContent()
          }
        </div>
      </NewGameContext.Provider>
    </section>
  );
}

export default AddNewGame;