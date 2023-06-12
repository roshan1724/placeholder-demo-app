import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Field } from "formik";

function InputSelect(props) {
  const {
    id,
    label,
    name,
    optionData,
    selectedValue,
    errorMessage,
    fieldData,
    isRequired,
    ...otherProps
  } = props;
  return (
    <Fragment>
      <div className="form-block-wrapper">
        <div className="custom-form-block flex-grow-1">
          <label htmlFor={id} className="form-label">
            {label} {isRequired && <sup>*</sup>}
          </label>
          <div className="input-group has-validation">
            <Field
              as="select"
              name={name}
              id={id}
              className={`form-select`}
              defaultValue={selectedValue}
              {...otherProps}
            >
              {optionData &&
                Array.isArray(optionData) &&
                optionData.map((option, option_index) => (
                  <option
                    value={option.value}
                    key={`${name}-option-${option_index}`}
                  >
                    {option.display}
                  </option>
                ))}
            </Field>
          </div>
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </Fragment>
  );
}

InputSelect.propTypes = {};

export default InputSelect;
