import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { FieldArray, getIn, useFormikContext } from "formik";
import { GetFormElements } from "../dynamic-form.helper";
import { FIELD_TYPES } from "../dynamic-form.constants";

function FieldList(props) {
  const {
    id,
    name,
    errorMessage,
    field_list,
    field_list_schema,
    fieldData,
    ...otherProps
  } = props;
  // Grab values and submitForm from context
  const { values, errors } = useFormikContext();
  return (
    <FieldArray
      id={id}
      name={name}
      render={(arrayHelpers) => (
        <Fragment>
          {values[name] && Array.isArray(values[name]) && (
            <Fragment>
              {values[name].map((field, value_index) => (
                <Fragment key={`field-${value_index}`}>
                  {fieldData &&
                    Array.isArray(fieldData) &&
                    fieldData.map((field, field_index) => (
                      <Fragment key={`key-${field.id}-${field_index}`}>
                        {field.type !== FIELD_TYPES.ACTION_BTN ? (
                          <div className={`col-${field.width}`}>
                            {GetFormElements(
                              field,
                              `${name}[${value_index}].${field.name}`,
                              errors
                            )}
                          </div>
                        ) : (
                          <div className={`col-${field.width}`}>
                            <div className="d-flex align-items-center pt-2 h-100">
                              <span
                                className="icon-wrapper clickable"
                                onClick={() => arrayHelpers.remove(value_index)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </span>
                            </div>
                          </div>
                        )}
                      </Fragment>
                    ))}
                </Fragment>
              ))}
              <div className={`col-4`}>
                <div className="d-flex align-items-center pt-2 pb-3 mb-2 h-100">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => arrayHelpers.push(field_list_schema)}
                  >
                    <span className="icon-wrapper me-2">
                      <i className={`fa-solid fa-add`}></i>
                    </span>
                    Add
                  </button>
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    ></FieldArray>
  );
}

FieldList.propTypes = {};

export default FieldList;
