import "./details.scss";

import React, { Fragment, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewGameContext from "../../../../../context/game/new-game-context";
import { GameFormActions } from "../../../../../store/form-game-slice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function NewGameDetails() {
  const dispatch = useDispatch();
  const { activeStepIndex, setActiveStepIndex, formData } =
    useContext(NewGameContext);
  const detailFormValues = useSelector((state) => state.gameForm.details_form);
  const timeZones = useSelector((state) => state.ui.timeZones.zoneList);
  const currentTimeZone = useSelector(
    (state) => state.ui.timeZones.currentZone
  );

  const hasMultipleOptions = (fieldType) => {
    return ["MULTI_OPTIONS", "MULTI_OPTIONS_WITH_STRING_OTHER"].includes(
      fieldType
    );
  };

  const hasFieldOptions = (fieldName, fieldType) => {
    return (
      fieldName !== "time_zone" &&
      [
        "DROPDOWN",
        "OPTIONS",
        "MULTI_OPTIONS",
        "OPTIONS_WITH_STRING_OTHER",
        "MULTI_OPTIONS_WITH_STRING_OTHER",
        "OPTIONS_WITH_STRING_BOOLEAN_TRUE",
        "OPTIONS_WITH_STRING_BOOLEAN_FALSE",
      ].includes(fieldType)
    );
  };

  const getInitialValues = () => {
    console.log(`form Data received as ==> `, formData);
    let initialValues = {};
    if (formData && Array.isArray(formData)) {
      formData.forEach((group) => {
        const fields = group.fields;
        if (fields && Array.isArray(fields)) {
          const isFieldList = fields[0].field_type === "FIELD_LIST";
          const fieldListNodeName = isFieldList ? fields[0].field_name : "";
          const fieldNodes = {};
          fields.forEach((field) => {
            if (field.field_type === "FIELD_LIST") {
              fieldNodes[field.field_name] = {};
            } else {
              if (isFieldList) {
                fieldNodes[fieldListNodeName][field.field_name] =
                  hasMultipleOptions(field.field_type)
                    ? [...field.field_value]
                    : field.field_value;
              } else {
                fieldNodes[field.field_name] = hasMultipleOptions(
                  field.field_type
                )
                  ? [...field.field_value]
                  : field.field_value;
              }
            }
          });
          initialValues = Object.assign({}, initialValues, fieldNodes);
        }
      });
      console.log(`InitialValues Created ==> `, initialValues);
    }
    return initialValues;
  };

  const getValidationSchema = () => {
    console.log(`form Validation Schema ...`);

    return Yup.object({});
  };

  const getFormOptionsData = () => {
    const formOptionsData = {
      time_zone: [...timeZones],
      current_time_zone: currentTimeZone,
    };
    if (formData && Array.isArray(formData)) {
      formData.forEach((group) => {
        const fields = group.fields;
        if (fields && Array.isArray(fields)) {
          fields.forEach((field) => {
            if (
              field &&
              hasFieldOptions(field.field_name, field.field_type) &&
              Array.isArray(field.options)
            ) {
              const optionsNodeName = String(field.field_name).concat(
                "Options"
              );
              formOptionsData[optionsNodeName] = [...field.options];
            }
          });
        }
      });
      console.log("formOptionsData ==> ", formOptionsData);
    }
    return formOptionsData;
  };

  const gameDetailForm = {
    initialValues: null,
    validationSchema: null,
    formOptionsData: null,
  };

  const classWidthMap = {
    "1-of-12": "col-1",
    "2-of-12": "col-2",
    "3-of-12": "col-3",
    "4-of-12": "col-4",
    "5-of-12": "col-5",
    "6-of-12": "col-6",
    "7-of-12": "col-7",
    "8-of-12": "col-8",
    "9-of-12": "col-9",
    "10-of-12": "col-10",
    "11-of-12": "col-11",
    "12-of-12": "col-12",
  };

  const inputTypeMap = {
    STRING: "text",
    NUMBER: "number",
    DATE: "date",
    TIME: "time",
    DATE_TIME: "datetime-local",
    URL: "url",
    OPTIONS: "radio",
    OPTIONS_WITH_STRING_OTHER: "radio",
    OPTIONS_WITH_STRING_BOOLEAN_TRUE: "radio",
    OPTIONS_WITH_STRING_BOOLEAN_FALSE: "radio",
    MULTI_OPTIONS: "checkbox",
    MULTI_OPTIONS_WITH_STRING_OTHER: "checkbox",
  };

  useEffect(() => {
    gameDetailForm.initialValues = getInitialValues();
    gameDetailForm.validationSchema = getValidationSchema();
    gameDetailForm.formOptionsData = getFormOptionsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const getSelectOptions = (fieldName) => {
    const formOptionsData = getFormOptionsData();
    const optionsList =
      fieldName === "time_zone"
        ? formOptionsData[fieldName]
        : Object(formOptionsData).keys.includes(
            String(fieldName).concat("Options")
          )
        ? formOptionsData[String(fieldName).concat("Options")]
        : [];
    return optionsList.map((option, optionIndex) => (
      <option
        key={`${fieldName}-option-${optionIndex}`}
        value={fieldName === "time_zone" ? option : option.option_value}
      >
        {fieldName === "time_zone" ? option : option.display_text}
      </option>
    ));
  };

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
      {formData && Array.isArray(formData) && (
        <Fragment>
          <div
            className="detail-form-wrapper"
            style={{ height: "550px", width: "100%" }}
          >
            <Formik
              initialValues={gameDetailForm.initialValues}
              validationSchema={gameDetailForm.validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form className="game-detail-form">
                {formData.map((group) => (
                  <div className="row field-group-wrapper" key={group.group_id}>
                    <div className="col-12">
                      <p className="field-label">{group.group_label}</p>
                    </div>
                    {group.fields &&
                      Array.isArray(group.fields) &&
                      group.fields.map((field) => (
                        <div
                          className={`${
                            classWidthMap[field.field_width]
                          } form-block-wrapper`}
                          key={`${group.group_id + field.field_id}`}
                        >
                          <div className="custom-form-block flex-grow-1">
                            {inputTypeMap[field.field_type] ? (
                              <Fragment>
                                <label
                                  htmlFor={`${field.field_id}`}
                                  className="form-label"
                                >
                                  {field.field_label}
                                </label>
                                <div className="input-group custom-field has-validation">
                                  <Field
                                    type={inputTypeMap[field.field_type]}
                                    className={`form-control`}
                                    id={field.field_id}
                                    name={field.field_name}
                                    placeholder={field.field_placeholder}
                                    value={field.field_value}
                                  />
                                  <ErrorMessage
                                    name={field.field_name}
                                    className="invalid-feedback"
                                  />
                                </div>
                              </Fragment>
                            ) : field.field_type === "DROPDOWN" ? (
                              <Fragment>
                                <label
                                  htmlFor={`${field.field_id}`}
                                  className="form-label"
                                >
                                  {field.field_label}
                                </label>
                                <div className="input-group has-validation">
                                  <Field
                                    as="select"
                                    className={`form-control`}
                                    id={field.field_id}
                                    name={field.field_name}
                                    value={field.field_value}
                                  >
                                    {getSelectOptions(field.field_name)}
                                  </Field>
                                </div>
                              </Fragment>
                            ) : null}
                          </div>
                        </div>
                      ))}
                  </div>
                ))}
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
        </Fragment>
      )}
    </section>
  );
}

export default NewGameDetails;
