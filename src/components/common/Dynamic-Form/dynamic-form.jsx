import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { Form, Formik } from "formik";
import { FieldList } from "./Form-Elements";
import { FIELD_GROUP_TYPES } from "./dynamic-form.constants";
import {
  GetFormElements,
  GetInitialFormValue,
  SetFormValidations,
} from "./dynamic-form.helper";
import { useSelector } from "react-redux";

const DynamicForm = (props) => {
  const [formData, setFormData] = useState(null);
  const [formInitialValue, setFormInitialValue] = useState(null);
  const [formValidations, setFormValidations] = useState(null);

  const timeZones = useSelector((state) => state.ui.timeZones.zoneList);
  const curentTimeZone = useSelector((state) => state.ui.timeZones.currentZone);

  const sortByViewOrder = (formData) => {
    if (formData && Array.isArray(formData)) {
      formData.sort(
        (firstElement, secondElement) =>
          firstElement["view_order"] - secondElement["view_order"]
      );
      // return formData.splice(0, 1);
      return formData;
    }
    return null;
  };

  useEffect(() => {
    fetch("/data/game-scenario-detail-form.json")
      .then((response) => response.json())
      .then((response) => {
        const formData = response["data"];
        setFormData(sortByViewOrder(formData));
      });
  }, []);

  useEffect(() => {
    setFormInitialValue(GetInitialFormValue(formData));
  }, [formData]);

  return (
    formInitialValue && (
      <div className="form-wrapper">
        {/* <Formik { ...props} > */}
        <Formik
          enableReinitialize={true}
          initialValues={formInitialValue}
          validate={(values) => {
            console.info("Updated Dynamic Form ==> ", values);
            // SetFormValidations(values);
          }}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ values }) => (
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
                                  timeZones
                                )
                              : GetFormElements(formField, formField.name)}
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
                <pre>{JSON.stringify(values, null, 2)}</pre>
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
