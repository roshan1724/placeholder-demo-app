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

function InputDate(props) {
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

  // Disabling weekends from Calender
  const validDays = (current) => {
    return current.day() !== 0 && current.day() !== 6;
  };

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
              dateFormat={`DD-MM-YYYY`}
              timeFormat={false}
              isValidDate={validDays}
              value={values[name]}
              onChange={(dateValue) => {
                setFieldValue(name, moment(dateValue).format("DD-MM-YYYY"));
              }}
            />
            <span className="icon-wrapper input-field-icon">
              <i className="fa-solid fa-calendar-days"></i>
            </span>
          </div>
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>
    </Fragment>
  );
}

InputDate.propTypes = {};

export default InputDate;
