import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { useFormikContext, FieldArray } from "formik";
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
  const { values, errors, submitForm } = useFormikContext();
  return (
    <FieldArray
      id={id}
      name={name}
      render={(arrayHelpers) => (
        <Fragment>
          {values[name] &&
            Array.isArray(values[name]) &&
            values[name].map((field, value_index) => (
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
                            {values[name].length === value_index + 1 ? (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  arrayHelpers.push(field_list_schema)
                                }
                              >
                                <span className="icon-wrapper me-2">
                                  <i className={`fa-solid ${field.icon}`}></i>
                                </span>
                                {field.label}
                              </button>
                            ) : (
                              <span
                                className="icon-wrapper"
                                onClick={() => arrayHelpers.remove(value_index)}
                              >
                                <i className="fa-solid fa-trash-can"></i>
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Fragment>
                  ))}
              </Fragment>
            ))}
        </Fragment>
      )}
    ></FieldArray>
  );
}

FieldList.propTypes = {};

export default FieldList;
