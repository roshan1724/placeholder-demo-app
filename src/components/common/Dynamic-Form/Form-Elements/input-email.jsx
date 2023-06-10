import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Field } from "formik";

function InputEmail(props) {
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
              type="email"
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

InputEmail.propTypes = {};

export default InputEmail;
