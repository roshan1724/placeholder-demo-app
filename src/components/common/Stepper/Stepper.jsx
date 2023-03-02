import { Fragment, useContext } from "react";
import NewGameContext from "../../../context/game/new-game-context";
import "./Stepper.scss";


function Stepper (props) {
  const stepperData = props.data;
  const { activeStepIndex } = useContext(NewGameContext);


  return (
    <Fragment>
      <div className="stepper-container mx-auto">
        {
          stepperData && stepperData.length > 0 
          ? stepperData.map((stepData, stepIndex) => (
            <div
              className={`stepper-content-wrapper ${stepIndex !== 0 ? 'step-full' : ''}`} 
              key={`stepper-content-${stepIndex}`}>
              {
                stepIndex !== 0
                ? <span className="stepper-line"></span> 
                : null
              }
              <span className={
                `stepper-block ${stepIndex < activeStepIndex 
                  ? 'visited'
                  : stepIndex === activeStepIndex 
                    ? 'active' 
                    : ''}`}>
                <span className="stepper-counter">{stepData.stepperCounter}</span>
                <span className="stepper-label pt-2">{stepData.stepperLabel}</span>
              </span>
            </div>
          ))
          : null
        }
      </div>
      {/* <div className="stepper-container label-only mx-auto">
        {
          stepperData && stepperData.length > 0 
          ? stepperData.map((stepData, stepIndex) => (
            <div
              className={`stepper-content-wrapper`} 
              key={`stepper-label-${stepIndex}`}>
              {stepData.stepperLabel}
            </div>
          ))
          : null
        }
      </div> */}
    </Fragment>
  );
}

export default Stepper;