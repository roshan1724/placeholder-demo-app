/**
 * Using 3rd party react-datetime library for rendering calenders and clocks
 * Docs: [link](https://github.com/arqex/react-datetime/blob/2a83208452ac5e41c43fea31ef47c65efba0bb56/README.md)
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { useFormikContext } from "formik";
import DateTime from "react-datetime";
import moment from "moment";
import "react-datetime/css/react-datetime.css";

function InputTime(props) {
  const {
    id,
    label,
    name,
    placeholder,
    errorMessage,
    fieldData,
    ...otherProps
  } = props;
  const { values, setFieldValue } = useFormikContext();

  return (
    <Fragment>
      <div className="form-block-wrapper">
        <div className="custom-form-block flex-grow-1">
          <label htmlFor={id} className="form-label">
            {label}
          </label>
          <div className="input-group custom-field has-validation">
            <DateTime
              inputProps={{
                name,
                id,
                placeholder,
                className: `form-control`,
              }}
              closeOnSelect={true}
              closeOnClickOutside={true}
              dateFormat={false}
              timeFormat={`h:mm a`}
              value={values[name]}
              onChange={(timeValue) => {
                setFieldValue(name, moment(timeValue).format("h:mm a"));
              }}
            />
            <span className="icon-wrapper input-field-icon">
              <i className="fa-solid fa-clock"></i>
            </span>
          </div>
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </Fragment>
  );
}

InputTime.propTypes = {};

export default InputTime;
