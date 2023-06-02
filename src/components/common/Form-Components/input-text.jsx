import "./form-component.scss";

import React from "react";
import PropTypes from "prop-types";
import { FORM_CONSTANTS } from "../../../utilities/constants";

function InputText(props) {
  return <div>InputText</div>;
}

InputText.propTypes = {
  formikForm: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon_name: PropTypes.string,
  validations: PropTypes.arrayOf(
    PropTypes.shape({
      validation_type: PropTypes.oneOf(FORM_CONSTANTS.VALIDATIONS),
      error_message: PropTypes.string,
    })
  ),
};

export default InputText;
