import "./details.scss";

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewGameContext from "../../../../../context/game/new-game-context";
import { GameFormActions } from "../../../../../store/form-game-slice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function NewGameDetails() {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex } = useContext(NewGameContext);
  const detailFormValues = useSelector((state) => state.gameForm.details_form);

  const gameDetailForm = {};

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

  return (
    <section className="section-game-scenario">
      <div
        className="detail-form-wrapper"
        style={{ height: "550px", width: "100%" }}
      >
        <Formik
          initialValues={{ firstName: "", lastName: "", email: "" }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            lastName: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <div>
              <label htmlFor="firstName">First Name</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" />
            </div>

            <div>
              <label htmlFor="email">Email Address</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        </Formik>
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
          disabled={!gameDetailForm.isValid ? "disabled" : null}
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

export default NewGameDetails;
