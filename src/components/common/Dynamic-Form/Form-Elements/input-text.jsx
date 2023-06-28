import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Field, getIn, useFormikContext } from "formik";

function InputText(props) {
  const {
    id,
    label,
    name,
    value,
    placeholder,
    errorMessage,
    fieldData,
    isRequired,
    ...otherProps
  } = props;
  const { errors, touched } = useFormikContext();
  return (
    <Fragment>
      <div className="form-block-wrapper">
        <div className="custom-form-block flex-grow-1">
          <label htmlFor={id} className="form-label">
            {label} {isRequired && <sup>*</sup>}
          </label>
          <div className="input-group custom-field has-validation">
            <Field
              type="text"
              id={id}
              className={`form-control ${
                getIn(touched, name) && getIn(errors, name) ? "is-invalid" : ""
              }`}
              name={name}
              // value={value}
              placeholder={placeholder}
              {...otherProps}
            ></Field>
          </div>
          <div className="invalid-feedback">
            {getIn(touched, name) && getIn(errors, name) ? errorMessage : ""}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

InputText.propTypes = {};

export default InputText;
