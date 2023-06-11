import * as Yup from "yup";
import {
  InputDate,
  InputEmail,
  InputRadio,
  InputSelect,
  InputText,
  InputTime,
} from "./Form-Elements";
import {
  FIELD_GROUP_TYPES,
  FIELD_TYPES,
  VALIDATION_TYPES,
} from "./dynamic-form.constants";

const hasMultipleOptions = (fieldType) => {
  return [
    FIELD_TYPES.MULTI_OPTIONS,
    FIELD_TYPES.MULTI_OPTIONS_WITH_STRING_OTHER,
  ].includes(fieldType);
};

export const GetInitialFormValue = (formData) => {
  // console.log(`form Data received as ==> `, formData);
  let _initialValues = {};
  if (formData && Array.isArray(formData)) {
    formData.forEach((group) => {
      const fields = group.fields;
      if (fields && Array.isArray(fields)) {
        const _fieldNodes = {};
        fields.forEach((field) => {
          if (group.type === FIELD_GROUP_TYPES.LIST) {
            _fieldNodes[group.name] =
              group.value && Array.isArray(group.value) ? group.value : {};
          } else {
            if (group.type === FIELD_GROUP_TYPES.LIST) {
              _fieldNodes[group.name][field.name] = hasMultipleOptions(
                field.type
              )
                ? [...field.value]
                : field.value;
            } else {
              _fieldNodes[field.name] = hasMultipleOptions(field.field_type)
                ? [...field.value]
                : field.value;
            }
          }
        });
        _initialValues = Object.assign({}, _initialValues, _fieldNodes);
      }
    });
    // console.log(`InitialValues Created ==> `, _initialValues);
  }
  return _initialValues;
};

const getYupValidator = (formField, _schema) => {
  formField.validations.forEach((validation) => {
    if (validation.type === VALIDATION_TYPES.REQUIRED) {
      _schema = _schema.required(validation.error_message);
    }
    if (validation.type === VALIDATION_TYPES.EMAIL) {
      _schema = _schema.email(validation.error_message);
    }
  });
  return _schema;
};

const getFieldsSchema = (fields, _fieldSchema, timeZones = null) => {
  if (fields && Array.isArray(fields) && fields.length) {
    fields.forEach((field) => {
      switch (field.type) {
        case FIELD_TYPES.DROPDOWN:
        case FIELD_TYPES.OPTIONS: {
          _fieldSchema[field.name] = Yup.string();
          const fieldOptions =
            field.name === "time_zone" && timeZones ? timeZones : field.options;
          _fieldSchema[field.name].oneOf(
            [...fieldOptions.map((option) => option.value)],
            "No CHOICE AS SUCH"
          );
          break;
        }
        case FIELD_TYPES.ACTION_BTN:
          break;
        default:
          _fieldSchema[field.name] = Yup.string();
          break;
      }

      if (
        field.validations &&
        Array.isArray(field.validations) &&
        field.validations.length
      ) {
        _fieldSchema[field.name] = getYupValidator(
          field,
          _fieldSchema[field.name]
        );
      } else if (field.type !== FIELD_TYPES.ACTION_BTN) {
        _fieldSchema[field.name] = _fieldSchema[field.name].optional();
      }
    });
    return _fieldSchema;
  }
};

export const getValidationSchema = (formData, timeZones = null) => {
  let _schemaData = {};
  if (formData && Array.isArray(formData)) {
    formData.forEach((group) => {
      // Fields List
      if (group.type === FIELD_GROUP_TYPES.FIELDS) {
        const fieldSchema = getFieldsSchema(
          group.fields,
          _schemaData,
          timeZones
        );
        _schemaData = { ...fieldSchema };
      } else if (group.type === FIELD_GROUP_TYPES.LIST) {
        const _subSchema = getFieldsSchema(group.fields, {});
        _schemaData[group.name] = Yup.array().of(
          Yup.object().shape(_subSchema)
        );
      }
    });
  }
  return Yup.object().shape(_schemaData);
};

// export const SetFormValidations = (values) => {
//   const errors = {};
//   console.log("Form Values ==> ", values);
// };

const isFieldRequired = (fieldData) => {
  return (
    fieldData &&
    fieldData.validations &&
    Array.isArray(fieldData.validations) &&
    fieldData.validations.find(
      (validation) => validation.type === VALIDATION_TYPES.REQUIRED
    )
  );
};

export const GetFormElements = (
  fieldData,
  fieldName,
  errors,
  timeZones = null
) => {
  switch (fieldData.type) {
    case FIELD_TYPES.DATE:
      return (
        <InputDate
          id={fieldData.id}
          label={fieldData.label}
          name={fieldName}
          placeholder={fieldData.placeholder}
          value={fieldData.value}
          isRequired={isFieldRequired(fieldData)}
          errorMessage={errors[fieldName]}
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
          isRequired={isFieldRequired(fieldData)}
          errorMessage={errors[fieldName]}
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
            isRequired={isFieldRequired(fieldData)}
            errorMessage={errors[fieldName]}
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
          isRequired={isFieldRequired(fieldData)}
          errorMessage={errors[fieldName]}
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
          isRequired={isFieldRequired(fieldData)}
          errorMessage={errors[fieldName]}
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
          isRequired={isFieldRequired(fieldData)}
          errorMessage={errors[fieldName]}
          fieldData={fieldData}
        ></InputRadio>
      );
    default:
      return null;
  }
};
