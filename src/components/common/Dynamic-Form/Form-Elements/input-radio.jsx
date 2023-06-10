import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Field, useFormikContext } from "formik";
import InputText from "./input-text";
import { FIELD_TYPES } from "../dynamic-form.constants";

function InputRadio(props) {
  const {
    id,
    label,
    name,
    optionData,
    errorMessage,
    fieldData,
    ...otherProps
  } = props;
  const { values } = useFormikContext();

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    const tempOptionList = [...optionData];
    if (
      fieldData &&
      optionData &&
      Array.isArray(optionData) &&
      fieldData.type === FIELD_TYPES.OPTIONS_WITH_STRING_OTHER &&
      !optionData.find((option) => option.display?.toLowerCase() === "other")
    ) {
      tempOptionList.push({ display: "Other", value: "Other" });
      setOptionList(tempOptionList);
    }
  }, [optionData, fieldData]);

  const hasOtherOption = () => {
    return optionList.find(
      (option) => option.display?.toLowerCase() === "other"
    );
  };

  const getOtherOptionView = (propName) => {
    const otherOptionTextName = `other_${propName}`;
    if (
      values[name] &&
      typeof values[name] === "string" &&
      values[name].toLowerCase() === "other"
    ) {
      return (
        <InputText
          id={`other-${id}`}
          label="Other"
          name={otherOptionTextName}
          placeholder="Enter a value"
          errorMessage="Error"
        ></InputText>
      );
    } else {
      values[otherOptionTextName] = "";
      return null;
    }
  };
  return (
    <Fragment>
      <div className="custom-form-block">
        <div className="c-radio-groups flex-grow-1" role="group">
          {optionList &&
            Array.isArray(optionList) &&
            optionList.map((option, option_index) => (
              <div
                className="form-check form-check-inline"
                key={`${id}-option-${option_index}`}
              >
                <pre>{JSON.stringify()}</pre>
                <Field
                  type="radio"
                  name={name}
                  id={`option-${id}-${option_index}`}
                  className={`form-check-input`}
                  checked={values[name] === option.value ? true : false}
                  value={option.value}
                  {...otherProps}
                ></Field>
                <label
                  htmlFor={`option-${id}-${option_index}`}
                  className="form-check-label"
                >
                  {option.display}
                </label>
              </div>
            ))}
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>

      {hasOtherOption() && (
        <div className="col-4" style={{ paddingRight: "12px" }}>
          {getOtherOptionView(name)}
        </div>
      )}
    </Fragment>
  );
}

InputRadio.propTypes = {};

export default InputRadio;
