import {
  InputDate,
  InputEmail,
  InputRadio,
  InputSelect,
  InputText,
  InputTime,
} from "./Form-Elements";
import { FIELD_GROUP_TYPES, FIELD_TYPES } from "./dynamic-form.constants";

const hasMultipleOptions = (fieldType) => {
  return [
    FIELD_TYPES.MULTI_OPTIONS,
    FIELD_TYPES.MULTI_OPTIONS_WITH_STRING_OTHER,
  ].includes(fieldType);
};

export const GetInitialFormValue = (formData) => {
  console.log(`form Data received as ==> `, formData);
  let initialValues = {};
  if (formData && Array.isArray(formData)) {
    formData.forEach((group) => {
      const fields = group.fields;
      if (fields && Array.isArray(fields)) {
        const isFieldList = group.type === FIELD_GROUP_TYPES.LIST;
        const fieldListNodeName = isFieldList ? group.name : "";
        const fieldNodes = {};
        fields.forEach((field) => {
          if (isFieldList) {
            fieldNodes[group.name] =
              group.value && Array.isArray(group.value) ? group.value : {};
          } else {
            if (isFieldList) {
              fieldNodes[fieldListNodeName][field.name] = hasMultipleOptions(
                field.type
              )
                ? [...field.value]
                : field.value;
            } else {
              fieldNodes[field.name] = hasMultipleOptions(field.field_type)
                ? [...field.value]
                : field.value;
            }
          }
        });
        initialValues = Object.assign({}, initialValues, fieldNodes);
      }
    });
    console.log(`InitialValues Created ==> `, initialValues);
  }
  return initialValues;
};

export const SetFormValidations = (values) => {
  const errors = {};
  console.log("Form Values ==> ", values);
};

export const GetFormElements = (fieldData, fieldName, timeZones = null) => {
  switch (fieldData.type) {
    case FIELD_TYPES.DATE:
      return (
        <InputDate
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          placeholder={fieldData.placeholder}
          value={fieldData.value}
          errorMessage="Invalid Date"
          fieldData={fieldData}
        ></InputDate>
      );
    case FIELD_TYPES.TIME:
      return (
        <InputTime
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          placeholder={fieldData.placeholder}
          value={fieldData.value}
          errorMessage="Invalid Time"
          fieldData={fieldData}
        ></InputTime>
      );
    case FIELD_TYPES.DROPDOWN: {
      const optionData =
        fieldName === "time_zone" ? timeZones : fieldData.options;
      return (
        optionData && (
          <InputSelect
            id={fieldData.id}
            label={fieldData.label}
            name={fieldName}
            optionData={optionData}
            selectedValue={fieldData.value}
            errorMessage="Invalid Select Data"
            fieldData={fieldData}
          ></InputSelect>
        )
      );
    }
    case FIELD_TYPES.STRING:
      return (
        <InputText
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          value={fieldData.value}
          placeholder={fieldData.placeholder}
          errorMessage="Error"
          fieldData={fieldData}
        ></InputText>
      );
    case FIELD_TYPES.EMAIL:
      return (
        <InputEmail
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          value={fieldData.value}
          placeholder={fieldData.placeholder}
          errorMessage="Error"
          fieldData={fieldData}
        ></InputEmail>
      );
    case FIELD_TYPES.OPTIONS:
    case FIELD_TYPES.OPTIONS_WITH_STRING_OTHER:
      return (
        <InputRadio
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          optionData={fieldData.options}
          errorMessage="Invalid"
          fieldData={fieldData}
        ></InputRadio>
      );
    default:
      return null;
  }
};
