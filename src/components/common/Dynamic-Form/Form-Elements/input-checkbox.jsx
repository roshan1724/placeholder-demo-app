import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Field, useFormikContext } from "formik";
import InputText from "./input-text";
import { FIELD_TYPES } from "../dynamic-form.constants";

function InputCheckbox(props) {
  const {
    id,
    label,
    name,
    optionData,
    errorMessage,
    fieldData,
    isRequired,
    ...otherProps
  } = props;
  const { values, touched, errors } = useFormikContext();
  const [optionList, setOptionList] = useState([]);

  const hasOtherOption = () => {
    return optionList.find(
      (option) => option.display?.toLowerCase() === "other"
    );
  };

  useEffect(() => {
    const tempOptionList = [...optionData];
    if (
      fieldData &&
      optionData &&
      Array.isArray(optionData) &&
      fieldData.type === FIELD_TYPES.MULTI_OPTIONS_WITH_STRING_OTHER &&
      !optionData.find((option) => option.display?.toLowerCase() === "other")
    ) {
      tempOptionList.push({ display: "Other", value: "Other" });
      setOptionList(tempOptionList);
    }
  }, [optionData, fieldData]);

  const getOtherOptionView = (propName) => {
    const otherOptionTextName = `other_${propName}`;
    if (
      values[name] &&
      Array.isArray(values[name]) &&
      values[name].find((value) => value.toLowerCase() === "other")
    ) {
      // Unselecting Other Selected Options and retaining only "Other" as selected
      values[name] = [
        values[name].find((value) => value.toLowerCase() === "other"),
      ];
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
        <div className="c-checkbox-groups flex-grow-1" role="group">
          {optionList &&
            Array.isArray(optionList) &&
            optionList.map((option, option_index) => (
              <div
                className="form-check form-check-inline"
                key={`${id}-option-${option_index}`}
              >
                <Field
                  type="checkbox"
                  name={name}
                  id={`option-${id}-${option_index}`}
                  className={`form-check-input`}
                  checked={values[name].includes(option.value) ? true : false}
                  value={option.value}
                  {...otherProps}
                ></Field>
                <label
                  htmlFor={`option-${id}-${option_index}`}
                  className="form-check-label"
                >
                  {option.display} {isRequired && <sup>*</sup>}
                </label>
              </div>
            ))}
          <div className="invalid-feedback">{errorMessage}</div>
        </div>
      </div>

      {hasOtherOption() && getOtherOptionView(name)}
    </Fragment>
  );
}

InputCheckbox.propTypes = {};

export default InputCheckbox;
