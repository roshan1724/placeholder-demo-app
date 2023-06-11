import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Form, Formik } from "formik";
import { FieldList } from "./Form-Elements";
import { FIELD_GROUP_TYPES } from "./dynamic-form.constants";
import {
  GetFormElements,
  GetInitialFormValue,
  SetFormValidations,
  getValidationSchema,
} from "./dynamic-form.helper";
import { useSelector } from "react-redux";

const DynamicForm = (props) => {
  const {
    formData,
    timeZones,
    currentTimeZone,
    isValidatingForm,
    submitCallback,
  } = props;
  const [formInitialValue, setFormInitialValue] = useState(null);
  const [formValidations, setFormValidations] = useState(null);

  useEffect(() => {
    setFormInitialValue(GetInitialFormValue(formData));
    const _validations = getValidationSchema(formData);
    console.log("Validations ==> ", _validations);
    setFormValidations(_validations);
  }, [formData]);

  const handleErrors = (errors) => {
    // console.log("ERROR => ", errors);
    if (Object.keys(errors).length) {
      isValidatingForm(false);
    } else {
      isValidatingForm(true);
    }
  };

  return (
    formInitialValue &&
    formValidations && (
      <div className="form-wrapper">
        <Formik
          enableReinitialize={true}
          initialValues={formInitialValue}
          validationSchema={formValidations}
          // validate={(values) => {
          //   console.info("Updated Dynamic Form ==> ", values);
          //   SetFormValidations(values);
          // }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(`Submitting Vlaues ==> `, values);
            submitCallback(true);
          }}
        >
          {({ values, touched, errors, isSubmitting }) => (
            <Form className="game-detail-form">
              <div className="row">
                {formData &&
                  Array.isArray(formData) &&
                  formData.map((formGroup, group_index) => (
                    <Fragment key={`${group_index}-${formGroup.id}`}>
                      <div key={formGroup.id} className="col-12">
                        <p className="field-label">{formGroup.label}</p>
                      </div>
                      {formGroup.type &&
                      formGroup.type === FIELD_GROUP_TYPES.FIELDS ? (
                        formGroup.fields &&
                        Array.isArray(formGroup.fields) &&
                        formGroup.fields.map((formField) => (
                          <div
                            key={`${formGroup.id}-${formField.id}`}
                            className={`col-${formField.width}`}
                          >
                            {formField.name === "time_zone"
                              ? GetFormElements(
                                  formField,
                                  formField.name,
                                  errors,
                                  timeZones
                                )
                              : GetFormElements(
                                  formField,
                                  formField.name,
                                  errors
                                )}
                          </div>
                        ))
                      ) : formGroup.type === FIELD_GROUP_TYPES.LIST ? (
                        <>
                          <FieldList
                            id={formGroup.id}
                            name={formGroup.name}
                            field_list={values[formGroup.name]}
                            field_list_schema={{ name: "", email: "" }} // TODO: get schema form a function
                            errorMessage={"Empty List"}
                            fieldData={formGroup.fields}
                          ></FieldList>
                        </>
                      ) : (
                        <>NO MATCHING GROUP TYPE</>
                      )}
                    </Fragment>
                  ))}
                <hr />
                {handleErrors(errors)}
                <hr />
                {/* VALUES:
                <pre>{JSON.stringify(values, null, 2)}</pre> */}
                {/* TOUCHED:
                <pre>{JSON.stringify(touched, null, 2)}</pre> */}
                {/* ERRORS
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                <button
                  type="submit"
                  id="game-detail-form-submit"
                  className="no-print"
                  disabled={isSubmitting}
                  style={{ display: "none" }}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    )
  );
};

DynamicForm.propTypes = {};

export default DynamicForm;
