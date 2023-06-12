import "./details.scss";

import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import NewGameContext from "../../../../../context/game/new-game-context";
import { GameFormActions } from "../../../../../store/form-game-slice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import DynamicForm from "../../../../common/Dynamic-Form/dynamic-form";

function NewGameFormDetails() {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex, formData } =
    useContext(NewGameContext);
  const detailFormValues = useSelector((state) => state.gameForm.details_form);
  const timeZones = useSelector((state) => state.ui.timeZones.zoneList);
  const currentTimeZone = useSelector(
    (state) => state.ui.timeZones.currentZone
  );

  const [formValid, setFormValid] = useState(false);

  const handleBackClick = () => {
    dispatch(
      GameFormActions.updateGameForm({
        formName: "details_form",
        formData: detailFormValues,
      })
    );
    setActiveStepIndex(activeStepIndex - 1);
    window?.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNextClick = async () => {
    const formSubmitBtn = document.getElementById("game-detail-form-submit");
    formSubmitBtn.click();
  };

  const submitCallback = (submitState) => {
    if (submitState) {
      setActiveStepIndex(activeStepIndex + 1);
      window?.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-game-scenario">
      {formData && Array.isArray(formData) && (
        <Fragment>
          <div
            className="detail-form-wrapper"
            style={{ minHeight: "550px", width: "100%" }}
          >
            <DynamicForm
              formData={formData}
              timeZones={timeZones}
              currentTimeZone={currentTimeZone}
              isValidatingForm={setFormValid}
              submitCallback={submitCallback}
            ></DynamicForm>
          </div>
          <div className="page-action-wrapper flex-center">
            <button className="btn btn-primary" onClick={handleBackClick}>
              <span className="icon-wrapper me-2">
                <i className="fa-solid fa-arrow-left"></i>
              </span>
              Back
            </button>
            <button
              className="btn btn-primary btn-filled"
              disabled={!formValid ? "disabled" : null}
              onClick={handleNextClick}
            >
              Next
              <span className="icon-wrapper ms-2">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </button>
          </div>
        </Fragment>
      )}
    </section>
  );
}

export default NewGameFormDetails;
