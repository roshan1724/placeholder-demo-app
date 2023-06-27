import "./dynamic-form.scss";
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Form, Formik } from "formik";
import {
  GetInitialFormValue,
  RenderFormGroups,
  SetFormValidations,
  getValidationSchema,
} from "./dynamic-form.helper";

const DynamicForm = (props) => {
  const {
    formData,
    timeZones,
    currentTimeZone,
    isValidatingForm,
    submitButtonId,
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
              <div
                className={`layout`}
                data-layout={`${formData && formData.layout}`}
              >
                {formData &&
                  formData.layout_data &&
                  Array.isArray(formData.layout_data) && (
                    <div className="row">
                      {formData.layout_data.map((layoutData, dataIndex) => (
                        <Fragment key={`key-${dataIndex}-${layoutData.id}`}>
                          <div
                            className={`col-${
                              layoutData.layout_width || 12
                            } layout-${dataIndex}`}
                          >
                            {RenderFormGroups(
                              layoutData.groups,
                              values,
                              touched,
                              errors,
                              timeZones
                            )}
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  )}
                {/* <hr /> */}
                {handleErrors(errors)}
                {/* <hr />
                VALUES:
                <pre>{JSON.stringify(values, null, 2)}</pre>
                TOUCHED:
                <pre>{JSON.stringify(touched, null, 2)}</pre>
                ERRORS
                <pre>{JSON.stringify(errors, null, 2)}</pre> */}
                <button
                  type="submit"
                  id={`${submitButtonId}`}
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
