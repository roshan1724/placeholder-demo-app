import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Field } from "formik";

function InputText(props) {
  const {
    id,
    label,
    name,
    value,
    placeholder,
    errorMessage,
    fieldData,
    ...otherProps
  } = props;
  return (
    <Fragment>
      <div className="form-block-wrapper">
        <div className="custom-form-block flex-grow-1">
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          <div className="input-group custom-field has-validation">
            <Field
              type="text"
              id={id}
              className={`form-control`}
              name={name}
              // value={value}
              placeholder={placeholder}
              {...otherProps}
            ></Field>
          </div>
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </Fragment>
  );
}

InputText.propTypes = {};

export default InputText;
