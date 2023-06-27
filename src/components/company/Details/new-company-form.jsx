import "./Details.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_PATHS, ROUTE_PATHS } from "../../../utilities/constants";
import DynamicForm from "../../common/Dynamic-Form/dynamic-form";
import { useDispatch } from "react-redux";
import { UiActions } from "../../../store/ui-slice";
import { GetSortedFormData } from "../../common/Dynamic-Form/dynamic-form.helper";

function CompanyDetailForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(null);
  const [formValid, setFormValid] = useState(false);
  const submitButtonId = "company-detail-form-submit";

  useEffect(() => {
    dispatch(UiActions.setShowLoader(true));
    fetch(API_PATHS.COMPANY_DETAIL_FORM)
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

  const handleSaveBtnClick = async () => {
    const formSubmitBtn = document.getElementById(submitButtonId);
    formSubmitBtn.click();
  };

  const submitCallback = (submitState) => {
    if (submitState) {
      navigate(ROUTE_PATHS.COMPANY_EMAIL_SETUP);
    }
  };

  return (
    <div className="section-company-details">
      <h1 className="title">Company Details</h1>
      <p className="subtitle c-font-15">
        You need to configure your Company Details before you can launch a game.
      </p>
      <div className="company-detail-form">
        <div className="company-form-container c-font-14">
          <DynamicForm
            formData={formData}
            isValidatingForm={setFormValid}
            submitButtonId={submitButtonId}
            submitCallback={submitCallback}
          />
        </div>
      </div>
      <div className="action-wrapper">
        <span>&nbsp;</span>
        <button
          type="button"
          className="btn btn-primary btn-filled"
          disabled={!formValid ? "disabled" : null}
          onClick={handleSaveBtnClick}
        >
          Save & Continue
          <span className="icon-wrapper ps-2">
            <i className="fa-solid fa-arrow-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
}

export default CompanyDetailForm;
